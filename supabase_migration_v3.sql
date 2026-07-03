-- MIGRATION V3: User Approval Flow

-- 1. Add is_approved column to profiles if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT FALSE;

-- 2. Update the trigger function to automatically approve the FIRST user, and leave subsequent users pending
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, is_approved)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    -- First user is super_admin, subsequent are editor by default
    CASE 
      WHEN NOT EXISTS (SELECT 1 FROM public.profiles) THEN 'super_admin'::user_role
      ELSE 'editor'::user_role
    END,
    -- First user is auto-approved, subsequent are false
    CASE 
      WHEN NOT EXISTS (SELECT 1 FROM public.profiles) THEN TRUE
      ELSE FALSE
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Ensure any existing super_admins are automatically approved
UPDATE profiles SET is_approved = TRUE WHERE role = 'super_admin';
