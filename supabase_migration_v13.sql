-- =====================================================================
-- MIGRATION V13: Contact Messages enhancements + Careers rich text
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- =====================================================================

-- 1. Add is_read flag to contact_messages (for read/unread management)
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;

-- 2. Add phone field to contact_messages (optional phone number from contact form)
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS phone TEXT;

-- 3. Add rich text HTML description field to careers
ALTER TABLE careers ADD COLUMN IF NOT EXISTS description_html TEXT;

-- 4. Create index for faster unread queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- =====================================================================
-- OPTIONAL: Email notification via Supabase Database Webhook
-- After deploying the Edge Function (see supabase/functions/contact-notification/index.ts),
-- create the webhook in Supabase Dashboard:
--   Database → Webhooks → Create new webhook
--   Table: contact_messages
--   Events: INSERT
--   HTTP method: POST
--   URL: https://<your-project-ref>.supabase.co/functions/v1/contact-notification
--   Headers: Authorization: Bearer <your-anon-key>
-- =====================================================================
