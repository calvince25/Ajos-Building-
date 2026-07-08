-- MIGRATION V6: Fix Row-Level Security (RLS) Policy issues
-- Fixes context-switching / null auth.uid() issue in SECURITY DEFINER functions.
-- This version preserves the original 'user_role' return type to prevent PostgreSQL 42P13 errors
-- ("cannot change return type of existing function") and avoids dropping dependent policies.

-- 1. Create the new overloaded function get_user_role(uuid) returning the enum user_role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS user_role AS $$
  SELECT role FROM public.profiles
  WHERE id = user_id
    AND account_status = 'approved';
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;

-- 2. Replace the body of the existing zero-argument get_user_role() function, keeping its return type as user_role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS user_role AS $$
  SELECT public.get_user_role(auth.uid());
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;

-- 3. Recreate RLS write policy for careers table to pass auth.uid() directly
-- This ensures auth.uid() is evaluated in the RLS context before calling the SECURITY DEFINER function.
DROP POLICY IF EXISTS "Editors/Admins/SuperAdmins can write careers" ON public.careers;
CREATE POLICY "Editors/Admins/SuperAdmins can write careers" ON public.careers FOR ALL 
  USING (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'))
  WITH CHECK (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'));

-- 4. Recreate RLS write policies for other critical dashboard tables to prevent similar errors
DROP POLICY IF EXISTS "Editors/Admins/SuperAdmins can write services" ON public.services;
CREATE POLICY "Editors/Admins/SuperAdmins can write services" ON public.services FOR ALL 
  USING (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'))
  WITH CHECK (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'));

DROP POLICY IF EXISTS "Editors/Admins/SuperAdmins can write projects" ON public.projects;
CREATE POLICY "Editors/Admins/SuperAdmins can write projects" ON public.projects FOR ALL 
  USING (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'))
  WITH CHECK (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'));

DROP POLICY IF EXISTS "Editors/Admins/SuperAdmins can write team_members" ON public.team_members;
CREATE POLICY "Editors/Admins/SuperAdmins can write team_members" ON public.team_members FOR ALL 
  USING (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'))
  WITH CHECK (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'));

DROP POLICY IF EXISTS "Editors/Admins/SuperAdmins can write testimonials" ON public.testimonials;
CREATE POLICY "Editors/Admins/SuperAdmins can write testimonials" ON public.testimonials FOR ALL 
  USING (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'))
  WITH CHECK (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'));

DROP POLICY IF EXISTS "Editors/Admins/SuperAdmins can write blog_posts" ON public.blog_posts;
CREATE POLICY "Editors/Admins/SuperAdmins can write blog_posts" ON public.blog_posts FOR ALL 
  USING (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'))
  WITH CHECK (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'));

DROP POLICY IF EXISTS "Editors/Admins/SuperAdmins can write faqs" ON public.faqs;
CREATE POLICY "Editors/Admins/SuperAdmins can write faqs" ON public.faqs FOR ALL 
  USING (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'))
  WITH CHECK (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'));
