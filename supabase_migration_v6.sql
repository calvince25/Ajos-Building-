-- MIGRATION V6: Fix Row-Level Security (RLS) Policy issues
-- Fixes context-switching / null auth.uid() issue in SECURITY DEFINER functions
-- and enum type casting issues inside RLS.

-- 1. Redefine get_user_role to take an optional user_id argument and return text (to avoid enum casting issues)
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid)
RETURNS text AS $$
  SELECT role::text FROM public.profiles
  WHERE id = user_id
    AND account_status = 'approved';
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;

-- 2. Define a zero-argument overload of get_user_role for backward compatibility
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text AS $$
  SELECT public.get_user_role(auth.uid());
$$ LANGUAGE sql SECURITY DEFINER SET search_path = public;

-- 3. Recreate RLS write policy for careers table to pass auth.uid() directly
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
