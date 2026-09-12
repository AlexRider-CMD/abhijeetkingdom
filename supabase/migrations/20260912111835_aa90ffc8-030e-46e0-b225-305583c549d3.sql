create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(trim(display_name)) between 1 and 80),
  avatar_url text,
  status text not null default 'Available' check (char_length(status) between 1 and 80),
  about text default '' check (char_length(about) <= 240),
  role text not null default 'member' check (role in ('admin', 'member', 'guest')),
  notifications_enabled boolean not null default true,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "Members can view family profiles"
on public.profiles for select
to authenticated
using (true);

create policy "Members can create their own profile"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

create policy "Members can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

create table public.family_activity (
  id uuid primary key default gen_random_uuid(),
  actor_name text not null check (char_length(trim(actor_name)) between 1 and 80),
  activity_type text not null check (activity_type in ('message', 'memory', 'call', 'event', 'announcement', 'member_joined')),
  title text not null check (char_length(trim(title)) between 1 and 160),
  detail text not null default '' check (char_length(detail) <= 500),
  happened_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

grant select on public.family_activity to authenticated;
grant all on public.family_activity to service_role;

alter table public.family_activity enable row level security;

create policy "Members can view family activity"
on public.family_activity for select
to authenticated
using (true);