-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION V7: SQL Function Security & Row-Level Security (RLS) Hardening
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 1: Harden RLS Policies on profiles Table
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Drop the overly permissive select policy that allowed any approved editor to view all profile details (including emails).
DROP POLICY IF EXISTS "Approved users can read profiles" ON public.profiles;

-- 2. Replace with a stricter policy allowing only 'admin' and 'super_admin' roles to view all user profiles.
-- Regular users/editors can still view their own profiles via the existing "Users can read own profile" policy.
CREATE POLICY "Admins and Super Admins can read all profiles"
  ON public.profiles FOR SELECT
  USING (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'));


-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 2: Recreate SECURITY DEFINER Functions with Explicit search_path = public
-- This mitigates PostgreSQL Search Path Hijacking / Privilege Escalation.
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. handle_new_user()
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_role user_role;
  v_status TEXT;
BEGIN
  -- First ever user becomes super_admin and is auto-approved
  IF NOT EXISTS (SELECT 1 FROM public.profiles) THEN
    v_role := 'super_admin';
    v_status := 'approved';
  ELSE
    v_role := 'editor';
    v_status := 'pending';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role, account_status, is_approved)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    v_role,
    v_status,
    (v_status = 'approved')
  );

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;


-- 2. is_approved_user()
CREATE OR REPLACE FUNCTION public.is_approved_user()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND account_status = 'approved'
  );
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;


-- 3. protect_default_admin()
CREATE OR REPLACE FUNCTION public.protect_default_admin()
RETURNS trigger AS $$
BEGIN
  -- Block DELETE of super_admin
  IF TG_OP = 'DELETE' THEN
    IF OLD.role = 'super_admin' THEN
      RAISE EXCEPTION 'The Default Admin account cannot be deleted.';
    END IF;
    RETURN OLD;
  END IF;

  -- Block UPDATE that demotes super_admin or suspends/deletes them
  IF TG_OP = 'UPDATE' THEN
    IF OLD.role = 'super_admin' THEN
      -- Prevent role change
      IF NEW.role != 'super_admin' THEN
        RAISE EXCEPTION 'The Default Admin role cannot be changed.';
      END IF;
      -- Prevent status change to anything other than approved
      IF NEW.account_status != 'approved' THEN
        RAISE EXCEPTION 'The Default Admin account cannot be suspended, rejected, or deleted.';
      END IF;
      -- Prevent is_approved from being set to false
      IF NEW.is_approved = false THEN
        RAISE EXCEPTION 'The Default Admin account cannot be unapproved.';
      END IF;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;


-- 4. delete_user_completely()
CREATE OR REPLACE FUNCTION public.delete_user_completely(target_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  caller_role user_role;
  caller_status TEXT;
  target_role user_role;
BEGIN
  -- Verify caller is an approved super_admin
  SELECT role, account_status INTO caller_role, caller_status
  FROM public.profiles WHERE id = auth.uid();

  IF caller_role IS DISTINCT FROM 'super_admin' OR caller_status IS DISTINCT FROM 'approved' THEN
    RAISE EXCEPTION 'Only the Default Admin can permanently delete users.';
  END IF;

  -- Prevent deleting the super_admin
  SELECT role INTO target_role FROM public.profiles WHERE id = target_user_id;
  IF target_role = 'super_admin' THEN
    RAISE EXCEPTION 'The Default Admin account cannot be deleted.';
  END IF;

  -- Hard-delete from auth.users. CASCADE will remove the profile row too.
  DELETE FROM auth.users WHERE id = target_user_id;

  RETURN jsonb_build_object('success', true, 'deleted_id', target_user_id);

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;


-- 5. update_user_status()
CREATE OR REPLACE FUNCTION public.update_user_status(
  target_user_id UUID,
  new_status TEXT
)
RETURNS JSONB AS $$
DECLARE
  caller_role user_role;
  caller_status TEXT;
  target_role user_role;
BEGIN
  -- Validate new_status value
  IF new_status NOT IN ('pending', 'approved', 'rejected', 'suspended') THEN
    RAISE EXCEPTION 'Invalid status value: %. Allowed: pending, approved, rejected, suspended', new_status;
  END IF;

  -- Verify caller is approved super_admin
  SELECT role, account_status INTO caller_role, caller_status
  FROM public.profiles WHERE id = auth.uid();

  IF caller_role IS DISTINCT FROM 'super_admin' OR caller_status IS DISTINCT FROM 'approved' THEN
    RAISE EXCEPTION 'Only the Default Admin can change user statuses.';
  END IF;

  -- Prevent modifying super_admin
  SELECT role INTO target_role FROM public.profiles WHERE id = target_user_id;
  IF target_role = 'super_admin' THEN
    RAISE EXCEPTION 'The Default Admin status cannot be changed.';
  END IF;

  -- Apply the update
  UPDATE public.profiles
  SET
    account_status = new_status,
    is_approved = (new_status = 'approved'),
    updated_at = NOW()
  WHERE id = target_user_id;

  RETURN jsonb_build_object('success', true);

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;


-- 6. update_user_role()
CREATE OR REPLACE FUNCTION public.update_user_role(
  target_user_id UUID,
  new_role TEXT
)
RETURNS JSONB AS $$
DECLARE
  caller_role user_role;
  caller_status TEXT;
  target_role user_role;
BEGIN
  -- Validate role
  IF new_role NOT IN ('admin', 'editor') THEN
    RAISE EXCEPTION 'Invalid role: %. Only admin or editor allowed.', new_role;
  END IF;

  -- Verify caller is approved super_admin
  SELECT role, account_status INTO caller_role, caller_status
  FROM public.profiles WHERE id = auth.uid();

  IF caller_role IS DISTINCT FROM 'super_admin' OR caller_status IS DISTINCT FROM 'approved' THEN
    RAISE EXCEPTION 'Only the Default Admin can change user roles.';
  END IF;

  -- Prevent modifying super_admin
  SELECT role INTO target_role FROM public.profiles WHERE id = target_user_id;
  IF target_role = 'super_admin' THEN
    RAISE EXCEPTION 'The Default Admin role cannot be changed.';
  END IF;

  UPDATE public.profiles
  SET role = new_role::user_role, updated_at = NOW()
  WHERE id = target_user_id;

  RETURN jsonb_build_object('success', true);

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
