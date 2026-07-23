-- ============================================================
-- Mi Auto Match — Supabase Schema Setup
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- -------------------------------------------------------
-- 1. Tabla profiles (extiende auth.users)
-- -------------------------------------------------------
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null default 'user' check (role in ('admin', 'user')),
  name text not null,
  phone text,
  city text,
  status text not null default 'pending'
    check (status in ('active', 'pending', 'suspended')),
  created_at timestamptz default now(),
  last_active_at timestamptz default now()
);

-- -------------------------------------------------------
-- 2. Tabla favoritos (relación N:M)
-- -------------------------------------------------------
create table if not exists user_favorites (
  user_id uuid references profiles(id) on delete cascade,
  vehicle_id text not null,
  created_at timestamptz default now(),
  primary key (user_id, vehicle_id)
);

-- -------------------------------------------------------
-- 3. Trigger: auto-crear profile al registrarse
-- -------------------------------------------------------
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, name, role, status)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'name',
      split_part(new.email, '@', 1)
    ),
    'user',
    'pending'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- -------------------------------------------------------
-- 4. RLS — Row Level Security
-- -------------------------------------------------------
alter table profiles enable row level security;
alter table user_favorites enable row level security;

-- Profiles: users ven/gestionan solo su propio perfil
drop policy if exists "Users can view own profile" on profiles;
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Profiles: admins ven y gestionan todos
drop policy if exists "Admins can view all profiles" on profiles;
create policy "Admins can view all profiles"
  on profiles for select using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

drop policy if exists "Admins can update all profiles" on profiles;
create policy "Admins can update all profiles"
  on profiles for update using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Favorites: users ven/gestionan solo sus favoritos
drop policy if exists "Users can view own favorites" on user_favorites;
create policy "Users can view own favorites"
  on user_favorites for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own favorites" on user_favorites;
create policy "Users can insert own favorites"
  on user_favorites for insert with check (auth.uid() = user_id);

drop policy if exists "Users can delete own favorites" on user_favorites;
create policy "Users can delete own favorites"
  on user_favorites for delete using (auth.uid() = user_id);

-- -------------------------------------------------------
-- 5. Crear usuario admin David
--    Usa auth.admin para insertar en auth.users
-- -------------------------------------------------------
-- Elimina si ya existe (para poder re-ejecutar)
delete from auth.users where email = 'davidblogger@gmail.com';

select auth.admin.create_user(
  {
    email: 'davidblogger@gmail.com',
    password: 'D3veloper..2026',
    email_confirm: true,
    user_metadata: { name: 'David Méndez' }
  }
) as user;

-- -------------------------------------------------------
-- 6. Actualizar rol y estado del admin
-- -------------------------------------------------------
update profiles
set role = 'admin', status = 'active', name = 'David Méndez'
where email = 'davidblogger@gmail.com';

-- -------------------------------------------------------
-- Verificación
-- -------------------------------------------------------
select
  (select count(*) from profiles) as total_profiles,
  (select count(*) from user_favorites) as total_favorites,
  (select role from profiles where email = 'davidblogger@gmail.com') as david_role,
  (select status from profiles where email = 'davidblogger@gmail.com') as david_status;
