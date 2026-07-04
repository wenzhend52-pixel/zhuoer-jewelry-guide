-- Future Supabase schema for the in-store guide.
-- The current MVP uses mock data and does not connect to Supabase yet.

create extension if not exists "pgcrypto";

create table if not exists public.store_jewelries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text not null default '',
  image_url text not null default '',
  element text not null check (element in ('metal', 'wood', 'water', 'fire', 'earth')),
  gemstone text not null default '',
  material text not null default '',
  color text not null default '',
  style_tags text[] not null default '{}',
  try_on_note text not null default '',
  recommendation_reason text not null default '',
  display_status text not null default 'available',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.test_results (
  id uuid primary key default gen_random_uuid(),
  result_code text unique not null,
  birth_date date not null,
  birth_time time not null,
  birth_city text not null,
  metal_score integer not null,
  wood_score integer not null,
  water_score integer not null,
  fire_score integer not null,
  earth_score integer not null,
  recommended_element text not null check (recommended_element in ('metal', 'wood', 'water', 'fire', 'earth')),
  recommended_colors text[] not null default '{}',
  recommended_gemstones text[] not null default '{}',
  recommended_materials text[] not null default '{}',
  wearing_advice text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.recommendation_templates (
  id uuid primary key default gen_random_uuid(),
  element text not null check (element in ('metal', 'wood', 'water', 'fire', 'earth')),
  title text not null,
  colors text[] not null default '{}',
  gemstones text[] not null default '{}',
  materials text[] not null default '{}',
  style_advice text not null default '',
  staff_script text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
