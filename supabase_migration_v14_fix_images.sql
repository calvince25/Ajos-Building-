-- =====================================================================
-- MIGRATION V14: Seeding and fixing hero/content service images in Supabase
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- =====================================================================

UPDATE services 
SET 
  hero_image_url = 'https://images.unsplash.com/photo-1599707254554-027aeb4deacd?w=1600&h=800&fit=crop&auto=format',
  content_image_url = 'https://images.unsplash.com/photo-1599707254554-027aeb4deacd?w=800&h=1000&fit=crop&auto=format'
WHERE slug = 'commercial-construction';

UPDATE services 
SET 
  hero_image_url = 'https://images.unsplash.com/photo-1527335988388-b40ee248d80c?w=1600&h=800&fit=crop&auto=format',
  content_image_url = 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&h=900&fit=crop&auto=format'
WHERE slug = 'industrial-infrastructure';

UPDATE services 
SET 
  hero_image_url = 'https://images.unsplash.com/photo-1601074231509-dce351c05199?w=1600&h=800&fit=crop&auto=format',
  content_image_url = 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=900&fit=crop&auto=format'
WHERE slug = 'residential-development';

UPDATE services 
SET 
  hero_image_url = 'https://images.unsplash.com/photo-1583024011792-b165975b52f5?w=1600&h=800&fit=crop&auto=format',
  content_image_url = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=900&fit=crop&auto=format'
WHERE slug = 'renovation-retrofit';

UPDATE services 
SET 
  hero_image_url = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=800&fit=crop&auto=format',
  content_image_url = 'https://images.unsplash.com/photo-1574691250077-03a929faece5?w=800&h=900&fit=crop&auto=format'
WHERE slug = 'architectural-engineering';

UPDATE services 
SET 
  hero_image_url = 'https://images.unsplash.com/photo-1580901369227-308f6f40bdeb?w=1600&h=800&fit=crop&auto=format',
  content_image_url = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=900&fit=crop&auto=format'
WHERE slug = 'civil-earthworks';

UPDATE services 
SET 
  hero_image_url = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=800&fit=crop&auto=format',
  content_image_url = 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=1000&fit=crop&auto=format'
WHERE slug = 'interior-exterior-finishes';

UPDATE services 
SET 
  hero_image_url = 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&h=800&fit=crop&auto=format',
  content_image_url = 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800&h=1000&fit=crop&auto=format'
WHERE slug = 'carpentry-timber-works';

UPDATE services 
SET 
  hero_image_url = 'https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=1600&h=800&fit=crop&auto=format',
  content_image_url = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=1000&fit=crop&auto=format'
WHERE slug = 'masonry-building-materials';

UPDATE services 
SET 
  hero_image_url = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=800&fit=crop&auto=format',
  content_image_url = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1000&fit=crop&auto=format'
WHERE slug = 'land-surveying';

UPDATE services 
SET 
  hero_image_url = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=800&fit=crop&auto=format',
  content_image_url = 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&h=1000&fit=crop&auto=format'
WHERE slug = 'construction-project-management';
