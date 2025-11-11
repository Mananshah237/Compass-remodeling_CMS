-- ============================================
-- CMS Setup Script for Compass Remodeling
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Admin Profiles Table
-- Admins are auth users allowed to access /admin
create table if not exists admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade
);

alter table admin_profiles enable row level security;

-- RLS: only the same user can read their own admin row
drop policy if exists "admins can read self" on admin_profiles;
create policy "admins can read self"
on admin_profiles for select
using (auth.uid() = id);

-- 2. Services Table
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text,
  created_at timestamp with time zone default now()
);

alter table services enable row level security;

-- Services RLS Policies
drop policy if exists "public can read services" on services;
create policy "public can read services"
on services for select using (true);

drop policy if exists "admin can write services" on services;
create policy "admin can write services"
on services for all
using (exists (select 1 from admin_profiles ap where ap.id = auth.uid()));

-- 3. Gallery Table
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  created_at timestamp with time zone default now()
);

alter table gallery enable row level security;

-- Gallery RLS Policies
drop policy if exists "public can read gallery" on gallery;
create policy "public can read gallery"
on gallery for select using (true);

drop policy if exists "admin can write gallery" on gallery;
create policy "admin can write gallery"
on gallery for all
using (exists (select 1 from admin_profiles ap where ap.id = auth.uid()));

-- 4. Testimonials Table
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text,
  video_url text not null,
  created_at timestamp with time zone default now()
);

alter table testimonials enable row level security;

-- Testimonials RLS Policies
drop policy if exists "public can read testimonials" on testimonials;
create policy "public can read testimonials"
on testimonials for select using (true);

drop policy if exists "admin can write testimonials" on testimonials;
create policy "admin can write testimonials"
on testimonials for all
using (exists (select 1 from admin_profiles ap where ap.id = auth.uid()));

-- 5. Contact Messages Table
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamp with time zone default now()
);

alter table contact_messages enable row level security;

-- Contact Messages RLS Policies
drop policy if exists "public can insert messages" on contact_messages;
create policy "public can insert messages"
on contact_messages for insert
with check (true);

drop policy if exists "admin can read messages" on contact_messages;
create policy "admin can read messages"
on contact_messages for select
using (exists (select 1 from admin_profiles ap where ap.id = auth.uid()));

drop policy if exists "admin can delete messages" on contact_messages;
create policy "admin can delete messages"
on contact_messages for delete
using (exists (select 1 from admin_profiles ap where ap.id = auth.uid()));

-- ============================================
-- Storage Bucket Policies
-- ============================================

-- Create media bucket if it doesn't exist (run this in Storage UI first)
-- Then run these policies:

-- Allow public read:
drop policy if exists "public read media" on storage.objects;
create policy "public read media"
on storage.objects for select
using (bucket_id = 'media');

-- Allow admins to write to media:
drop policy if exists "admin write media" on storage.objects;
create policy "admin write media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'media' and
  exists (select 1 from admin_profiles ap where ap.id = auth.uid())
);

drop policy if exists "admin update media" on storage.objects;
create policy "admin update media"
on storage.objects for update
to authenticated
using (bucket_id = 'media' and exists (select 1 from admin_profiles ap where ap.id = auth.uid()))
with check (bucket_id = 'media');

drop policy if exists "admin delete media" on storage.objects;
create policy "admin delete media"
on storage.objects for delete
to authenticated
using (bucket_id = 'media' and exists (select 1 from admin_profiles ap where ap.id = auth.uid()));

-- ============================================
-- IMPORTANT: After signing up, insert your user ID:
-- insert into admin_profiles (id) values ('<YOUR_AUTH_USER_ID>');
-- ============================================

