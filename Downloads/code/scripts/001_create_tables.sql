-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  before_image_url TEXT,
  category TEXT DEFAULT 'general',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create homepage content table
CREATE TABLE IF NOT EXISTS public.homepage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_cta_text TEXT DEFAULT 'Get Started',
  about_section TEXT,
  testimonials JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create admin profiles table
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Services: Allow anyone to view, only admins to modify
CREATE POLICY "services_select_all" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "services_insert_admin" ON public.services
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE admin_profiles.id = auth.uid()
  ));

CREATE POLICY "services_update_admin" ON public.services
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE admin_profiles.id = auth.uid()
  ));

CREATE POLICY "services_delete_admin" ON public.services
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE admin_profiles.id = auth.uid()
  ));

-- Gallery: Allow anyone to view, only admins to modify
CREATE POLICY "gallery_select_all" ON public.gallery
  FOR SELECT USING (true);

CREATE POLICY "gallery_insert_admin" ON public.gallery
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE admin_profiles.id = auth.uid()
  ));

CREATE POLICY "gallery_update_admin" ON public.gallery
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE admin_profiles.id = auth.uid()
  ));

CREATE POLICY "gallery_delete_admin" ON public.gallery
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE admin_profiles.id = auth.uid()
  ));

-- Homepage: Allow anyone to view, only admins to modify
CREATE POLICY "homepage_select_all" ON public.homepage
  FOR SELECT USING (true);

CREATE POLICY "homepage_insert_admin" ON public.homepage
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE admin_profiles.id = auth.uid()
  ));

CREATE POLICY "homepage_update_admin" ON public.homepage
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE admin_profiles.id = auth.uid()
  ));

CREATE POLICY "homepage_delete_admin" ON public.homepage
  FOR DELETE USING (EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE admin_profiles.id = auth.uid()
  ));

-- Admin profiles: Admins can only view/manage their own profile
CREATE POLICY "admin_profiles_select_own" ON public.admin_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "admin_profiles_update_own" ON public.admin_profiles
  FOR UPDATE USING (auth.uid() = id);
