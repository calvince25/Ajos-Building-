-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION V5: Complete Auth & Authorization Redesign
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 1: Add account_status column to profiles
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS account_status TEXT NOT NULL DEFAULT 'pending'
  CHECK (account_status IN ('pending', 'approved', 'rejected', 'suspended', 'deleted'));

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 2: Migrate existing data from is_approved boolean → account_status
-- ─────────────────────────────────────────────────────────────────────────────

-- Approved users
UPDATE public.profiles
  SET account_status = 'approved'
  WHERE is_approved = true;

-- Pending/unapproved users
UPDATE public.profiles
  SET account_status = 'pending'
  WHERE is_approved = false OR is_approved IS NULL;

-- Super admin is ALWAYS approved regardless of is_approved value
UPDATE public.profiles
  SET account_status = 'approved'
  WHERE role = 'super_admin';

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 3: Update handle_new_user trigger to use account_status
-- ─────────────────────────────────────────────────────────────────────────────

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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 4: Update get_user_role() to gate on approval status
-- Only returns a role if the user is 'approved'. Unapproved users get NULL.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles
  WHERE id = auth.uid()
    AND account_status = 'approved';
$$ LANGUAGE sql SECURITY DEFINER;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 5: Helper function — is current user approved?
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.is_approved_user()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND account_status = 'approved'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 6: Default Admin Protection Trigger
-- Blocks any DELETE or role/status change on the super_admin row.
-- ─────────────────────────────────────────────────────────────────────────────

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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop old trigger if exists, then recreate
DROP TRIGGER IF EXISTS protect_default_admin_trigger ON public.profiles;

CREATE TRIGGER protect_default_admin_trigger
  BEFORE DELETE OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_default_admin();

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 7: delete_user_completely RPC function
-- Permanently removes a user from BOTH auth.users AND profiles.
-- Can only be called by the super_admin (enforced inside the function).
-- auth.users delete cascades to profiles automatically.
-- ─────────────────────────────────────────────────────────────────────────────

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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 8: update_user_status RPC — for approve/reject/suspend (super_admin only)
-- ─────────────────────────────────────────────────────────────────────────────

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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 9: update_user_role RPC — for role changes (super_admin only)
-- ─────────────────────────────────────────────────────────────────────────────

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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 10: Update Profiles RLS Policies
-- Remove the overly-permissive "Public profiles are viewable by everyone"
-- and gate all writes through the new RPC functions.
-- ─────────────────────────────────────────────────────────────────────────────

-- Drop old policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Super Admins can manage all profiles" ON public.profiles;

-- Approved users can read all profiles (for user management tab)
CREATE POLICY "Approved users can read profiles"
  ON public.profiles FOR SELECT
  USING (is_approved_user());

-- Users can read their own profile (needed during login/pending check)
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own non-sensitive fields
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id AND account_status = 'approved')
  WITH CHECK (
    auth.uid() = id
    -- Prevent self-promotion
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
    AND account_status = 'approved'
  );

-- Super admin manages all (but trigger prevents modifying themselves destructively)
CREATE POLICY "Super Admin manages all profiles"
  ON public.profiles FOR ALL
  USING (get_user_role() = 'super_admin');

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 11: Verification queries (run these to confirm migration success)
-- ─────────────────────────────────────────────────────────────────────────────

-- Check column added:
-- SELECT column_name, data_type, column_default FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'account_status';

-- Check super admin is approved:
-- SELECT email, role, account_status, is_approved FROM public.profiles WHERE role = 'super_admin';

-- Check trigger exists:
-- SELECT trigger_name FROM information_schema.triggers WHERE event_object_table = 'profiles';

-- Check functions exist:
-- SELECT routine_name FROM information_schema.routines WHERE routine_name IN ('delete_user_completely','update_user_status','update_user_role','protect_default_admin','get_user_role','is_approved_user');
