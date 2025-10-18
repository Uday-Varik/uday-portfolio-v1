-- Supabase schema for the dynamic MVP portfolio
create table if not exists site_settings (
  id bigint primary key,
  site_title text not null,
  tagline text,
  contact_pitch text,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

create table if not exists navigation_links (
  id bigint primary key,
  label text not null,
  href text not null,
  position int default 0,
  created_at timestamptz default timezone('utc', now())
);

create table if not exists pages (
  id bigint primary key,
  slug text unique not null,
  hero_heading text,
  hero_subheading text,
  call_to_action_label text,
  call_to_action_url text,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

create table if not exists projects (
  id bigint primary key,
  title text not null,
  summary text,
  tech_stack text,
  case_study_url text,
  is_featured boolean default false,
  position int default 0,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

create table if not exists blog_posts (
  id bigint primary key,
  title text not null,
  slug text unique,
  excerpt text,
  url text,
  published_at timestamptz,
  read_time_minutes int,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

create table if not exists testimonials (
  id bigint primary key,
  author_name text not null,
  role text,
  quote text not null,
  position int default 0,
  created_at timestamptz default timezone('utc', now())
);

create table if not exists contact_channels (
  id bigint primary key,
  label text not null,
  url text not null,
  description text,
  display_value text,
  position int default 0,
  created_at timestamptz default timezone('utc', now())
);

-- Enable Row Level Security (RLS)
alter table site_settings enable row level security;
alter table navigation_links enable row level security;
alter table pages enable row level security;
alter table projects enable row level security;
alter table blog_posts enable row level security;
alter table testimonials enable row level security;
alter table contact_channels enable row level security;

-- Basic policies that allow public read access and service role full access
create policy "Public read" on site_settings for select using (true);
create policy "Public read" on navigation_links for select using (true);
create policy "Public read" on pages for select using (true);
create policy "Public read" on projects for select using (true);
create policy "Public read" on blog_posts for select using (true);
create policy "Public read" on testimonials for select using (true);
create policy "Public read" on contact_channels for select using (true);

create policy "Service role full access" on site_settings for all using (auth.role() = 'service_role');
create policy "Service role full access" on navigation_links for all using (auth.role() = 'service_role');
create policy "Service role full access" on pages for all using (auth.role() = 'service_role');
create policy "Service role full access" on projects for all using (auth.role() = 'service_role');
create policy "Service role full access" on blog_posts for all using (auth.role() = 'service_role');
create policy "Service role full access" on testimonials for all using (auth.role() = 'service_role');
create policy "Service role full access" on contact_channels for all using (auth.role() = 'service_role');
