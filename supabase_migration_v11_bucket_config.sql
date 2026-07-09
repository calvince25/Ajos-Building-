-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION V11: Storage Bucket Parameter Reset (Fix HTTP 400 Upload Errors)
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ═══════════════════════════════════════════════════════════════════════════

-- A HTTP 400 Bad Request error during file uploads usually indicates that 
-- the Supabase Storage Bucket ("media") is configured with restrictive MIME types 
-- (e.g. only images) or size limits that reject PDF, DOCX, or larger files.
--
-- Running this script resets those configuration limits so any file format is accepted.

UPDATE storage.buckets 
SET 
  allowed_mime_types = NULL, -- Lift all MIME type restrictions (PDF, DOCX, etc. allowed)
  max_file_size = 52428800    -- Increase maximum file size limit to 50MB
WHERE id = 'media';
