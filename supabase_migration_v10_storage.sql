-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION V10: Supabase Storage Bucket Policies for Job Applications
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ═══════════════════════════════════════════════════════════════════════════

-- Enable public/anonymous uploads to the "media" bucket under "applications/" path
-- This allows job applicants to submit their CVs, cover letters, and certificates.

DROP POLICY IF EXISTS "Allow public uploads to applications folder" ON storage.objects;

CREATE POLICY "Allow public uploads to applications folder"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'media' 
  AND name LIKE 'applications/%'
);

-- Allow public read access to these uploaded documents so they can be viewed/downloaded
DROP POLICY IF EXISTS "Allow public read access to applications folder" ON storage.objects;

CREATE POLICY "Allow public read access to applications folder"
ON storage.objects FOR SELECT
TO public
USING (
  bucket_id = 'media' 
  AND name LIKE 'applications/%'
);
