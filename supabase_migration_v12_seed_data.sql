-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION V12: Database Seeding & Schema Alterations (Projects & Team Members)
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 1: Alter projects Table to Support category Column
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS category TEXT;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 2: Seed Default Projects
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO public.projects (id, title, slug, category, location, year, value, image_url, status)
VALUES 
  (1, 'Apex Tower — Commercial Hub', 'apex-tower-commercial-hub', 'Commercial', 'Downtown Chicago, IL', '2024', 'KES 42M', 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=700&h=500&fit=crop&auto=format', 'published'),
  (2, 'Meridian Business Park', 'meridian-business-park', 'Industrial', 'Houston, TX', '2023', 'KES 18M', 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=700&h=500&fit=crop&auto=format', 'published'),
  (3, 'Northgate Residential Estate', 'northgate-residential-estate', 'Residential', 'Atlanta, GA', '2024', 'KES 9.5M', 'https://images.unsplash.com/photo-1601074231509-dce351c05199?w=700&h=500&fit=crop&auto=format', 'published')
ON CONFLICT (id) DO UPDATE 
SET 
  title = EXCLUDED.title, 
  slug = EXCLUDED.slug, 
  category = EXCLUDED.category, 
  location = EXCLUDED.location, 
  year = EXCLUDED.year, 
  value = EXCLUDED.value, 
  image_url = EXCLUDED.image_url, 
  status = EXCLUDED.status;

-- Sync the internal ID sequence generator for projects table
SELECT setval(pg_get_serial_sequence('public.projects', 'id'), COALESCE(max(id), 1) + 1) FROM public.projects;

-- ─────────────────────────────────────────────────────────────────────────────
-- STEP 3: Seed Default Team Members
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO public.team_members (id, name, title, image_url, projects_completed, years_experience, display_order, status)
VALUES 
  (1, 'Marcus Reed', 'Chief Executive Officer', 'https://images.unsplash.com/photo-1647580427155-0483906cb9de?w=300&h=380&fit=crop&auto=format', 120, 22, 1, 'published'),
  (2, 'Dr. Priya Nair', 'Lead Structural Engineer', 'https://images.unsplash.com/photo-1774600166818-e554a4d4c376?w=300&h=380&fit=crop&auto=format', 84, 16, 2, 'published'),
  (3, 'Sofia Almeida', 'Principal Architect', 'https://images.unsplash.com/photo-1716037991590-c975184b37df?w=300&h=380&fit=crop&auto=format', 67, 14, 3, 'published'),
  (4, 'Derek Osei', 'Senior Project Manager', 'https://images.unsplash.com/photo-1625722776951-39123efa4dc3?w=300&h=380&fit=crop&auto=format', 95, 18, 4, 'published')
ON CONFLICT (id) DO UPDATE 
SET 
  name = EXCLUDED.name, 
  title = EXCLUDED.title, 
  image_url = EXCLUDED.image_url, 
  projects_completed = EXCLUDED.projects_completed, 
  years_experience = EXCLUDED.years_experience, 
  display_order = EXCLUDED.display_order, 
  status = EXCLUDED.status;

-- Sync the internal ID sequence generator for team_members table
SELECT setval(pg_get_serial_sequence('public.team_members', 'id'), COALESCE(max(id), 1) + 1) FROM public.team_members;
