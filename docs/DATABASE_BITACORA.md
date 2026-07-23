# Bitácora de Base de Datos — Mi Auto Match

**Proyecto:** pkuwhrloxvtdcgkvdkbv.supabase.co
**Última actualización:** 23 Julio 2026
**Estado:** Plan 1 (Auth) completo

---

## Schema Actual

### Tablas

#### `public.profiles`
Extiende `auth.users` con información de perfil.

```sql
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  role text NOT NULL DEFAULT 'user'::text,
  name text NOT NULL,
  phone text,
  city text,
  status text NOT NULL DEFAULT 'pending'::text,
  created_at timestamp with time zone DEFAULT now(),
  last_active_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
```

#### `public.user_favorites`
Relación N:M entre usuarios y vehículos favoritos.

```sql
CREATE TABLE public.user_favorites (
  user_id uuid NOT NULL,
  vehicle_id text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_favorites_pkey PRIMARY KEY (user_id, vehicle_id),
  CONSTRAINT user_favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
```

---

## RLS (Row Level Security)

### `profiles`

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
CREATE POLICY "Admins can update all profiles" ON profiles FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
```

### `user_favorites`

```sql
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own favorites" ON user_favorites;
CREATE POLICY "Users can view own favorites" ON user_favorites FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own favorites" ON user_favorites;
CREATE POLICY "Users can insert own favorites" ON user_favorites FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own favorites" ON user_favorites;
CREATE POLICY "Users can delete own favorites" ON user_favorites FOR DELETE USING (auth.uid() = user_id);
```

---

## Triggers

### `on_auth_user_created`
Dispara después de insertar un usuario en `auth.users` para auto-crear el profile.

```sql
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
begin
  INSERT INTO profiles (id, name, role, status)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    'user',
    'pending'
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
```

**Nota:** Extrae el nombre desde `raw_user_meta_data->>'name'` (minúscula). El `signUp` debe enviar `name` en minúscula en el metadata.

---

## Próximas tablas pendientes (Plan 2 — Automotora)

```sql
-- dealers, sellers, vehicles, dealer_vehicles, dealer_reviews
-- Ver docs/AUTOMOTORA_PLAN.md para schema completo
```

---

## Historial de cambios

| Fecha | Cambio |
|-------|--------|
| 23 Jul 2026 | Creación de `profiles` y `user_favorites` + trigger + RLS |
