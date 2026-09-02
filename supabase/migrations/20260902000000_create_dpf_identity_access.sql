create extension if not exists "pgcrypto";

create type public.dpf_global_role as enum (
  'standard',
  'dpf_admin'
);

create type public.dpf_club_role as enum (
  'club_user',
  'club_admin'
);

create type public.dpf_membership_status as enum (
  'active',
  'invited',
  'suspended',
  'removed'
);

create type public.dpf_entitlement_status as enum (
  'active',
  'expired',
  'cancelled',
  'completed',
  'revoked'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  global_role public.dpf_global_role not null default 'standard',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clubs (
  id text primary key,
  name text not null,
  slug text unique,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.club_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  club_id text not null references public.clubs(id) on delete cascade,
  role public.dpf_club_role not null default 'club_user',
  status public.dpf_membership_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (user_id, club_id)
);

create table public.user_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  entitlement_id text not null,
  status public.dpf_entitlement_status not null default 'active',
  starts_at timestamptz,
  expires_at timestamptz,
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index club_memberships_user_id_idx
  on public.club_memberships(user_id);

create index club_memberships_club_id_idx
  on public.club_memberships(club_id);

create index user_entitlements_user_id_idx
  on public.user_entitlements(user_id);

create index user_entitlements_entitlement_id_idx
  on public.user_entitlements(entitlement_id);

create unique index user_entitlements_active_unique_idx
  on public.user_entitlements(user_id, entitlement_id)
  where status = 'active';

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger clubs_set_updated_at
before update on public.clubs
for each row
execute function public.set_updated_at();

create trigger club_memberships_set_updated_at
before update on public.club_memberships
for each row
execute function public.set_updated_at();

create trigger user_entitlements_set_updated_at
before update on public.user_entitlements
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    display_name
  )
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'name'
    )
  );

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.clubs enable row level security;
alter table public.club_memberships enable row level security;
alter table public.user_entitlements enable row level security;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
);

create policy "club_memberships_select_own"
on public.club_memberships
for select
to authenticated
using (
  user_id = auth.uid()
);

create policy "user_entitlements_select_own"
on public.user_entitlements
for select
to authenticated
using (
  user_id = auth.uid()
);

create policy "clubs_select_for_members"
on public.clubs
for select
to authenticated
using (
  exists (
    select 1
    from public.club_memberships membership
    where membership.club_id = clubs.id
      and membership.user_id = auth.uid()
      and membership.status = 'active'
  )
);

revoke insert, update, delete
on public.profiles
from authenticated;

revoke insert, update, delete
on public.club_memberships
from authenticated;

revoke insert, update, delete
on public.user_entitlements
from authenticated;

revoke insert, update, delete
on public.clubs
from authenticated;
