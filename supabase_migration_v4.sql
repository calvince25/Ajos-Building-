-- Supabase Migration V4
-- Adds missing editable image columns and fixes RLS policies for settings.

-- 1. Fix RLS policies for website_settings and seo_metadata to allow editors to modify them
DROP POLICY IF EXISTS "Admins/SuperAdmins can edit website settings" ON website_settings;
CREATE POLICY "Admins/SuperAdmins can edit website settings" ON website_settings FOR ALL 
  USING (get_user_role() IN ('editor', 'admin', 'super_admin'))
  WITH CHECK (get_user_role() IN ('editor', 'admin', 'super_admin'));

DROP POLICY IF EXISTS "Admins/SuperAdmins can edit SEO metadata" ON seo_metadata;
CREATE POLICY "Admins/SuperAdmins can edit SEO metadata" ON seo_metadata FOR ALL 
  USING (get_user_role() IN ('editor', 'admin', 'super_admin'))
  WITH CHECK (get_user_role() IN ('editor', 'admin', 'super_admin'));

-- 2. Add content_image_url to services table
ALTER TABLE services ADD COLUMN IF NOT EXISTS content_image_url TEXT;
