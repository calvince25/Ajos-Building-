-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION V8: Fix Remaining Zero-Argument get_user_role() RLS Policies
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- This fixes authorization issues where logged-in editors/admins couldn't
-- see draft/archived careers, media, settings, etc. due to auth.uid() context loss.
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 1: Fix Careers & Blog Posts SELECT Policies
-- ─────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Allow public read careers" ON public.careers;
CREATE POLICY "Allow public read careers" ON public.careers FOR SELECT 
  USING (status = 'published' OR public.get_user_role(auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Allow public read blog_posts" ON public.blog_posts;
CREATE POLICY "Allow public read blog_posts" ON public.blog_posts FOR SELECT 
  USING (status = 'published' OR public.get_user_role(auth.uid()) IS NOT NULL);


-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 2: Fix Profiles Management Policy
-- ─────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Super Admins can manage all profiles" ON public.profiles;
CREATE POLICY "Super Admins can manage all profiles" ON public.profiles FOR ALL 
  USING (public.get_user_role(auth.uid()) = 'super_admin'::user_role);


-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 3: Fix Media & Submissions Policies
-- ─────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Authenticated users can manage media records" ON public.media_library;
CREATE POLICY "Authenticated users can manage media records" ON public.media_library FOR ALL 
  USING (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'));

DROP POLICY IF EXISTS "Authorized users can manage contact messages" ON public.contact_messages;
CREATE POLICY "Authorized users can manage contact messages" ON public.contact_messages FOR ALL 
  USING (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'));

DROP POLICY IF EXISTS "Authorized users can manage quote requests" ON public.quote_requests;
CREATE POLICY "Authorized users can manage quote requests" ON public.quote_requests FOR ALL 
  USING (public.get_user_role(auth.uid()) IN ('editor', 'admin', 'super_admin'));


-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 4: Fix Website Settings & SEO Metadata Policies
-- ─────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Admins/SuperAdmins can edit website settings" ON public.website_settings;
CREATE POLICY "Admins/SuperAdmins can edit website settings" ON public.website_settings FOR ALL 
  USING (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'))
  WITH CHECK (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'));

DROP POLICY IF EXISTS "Admins/SuperAdmins can edit SEO metadata" ON public.seo_metadata;
CREATE POLICY "Admins/SuperAdmins can edit SEO metadata" ON public.seo_metadata FOR ALL 
  USING (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'))
  WITH CHECK (public.get_user_role(auth.uid()) IN ('admin', 'super_admin'));


-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 5: Seed or Update Social Links in website_settings
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO public.website_settings (key, value)
VALUES (
  'socials',
  '{"facebook": "https://www.facebook.com/profile.php?id=61591546598393", "twitter": "#", "linkedin": "#", "instagram": "#", "tiktok": "https://vm.tiktok.com/ZSCceUaN2/"}'::jsonb
)
ON CONFLICT (key) DO UPDATE
SET value = coalesce(public.website_settings.value, '{}'::jsonb) || '{"facebook": "https://www.facebook.com/profile.php?id=61591546598393", "tiktok": "https://vm.tiktok.com/ZSCceUaN2/"}'::jsonb;
