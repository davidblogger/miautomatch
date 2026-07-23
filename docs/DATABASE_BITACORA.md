# Bitácora de Base de Datos — Mi Auto Match

**Proyecto:** pkuwhrloxvtdcgkvdkbv.supabase.co
**Última actualización:** 23 Julio 2026
**Estado:** Plan 1 (Auth) en ejecución

---

## Schema Actual

### Tablas

#### `public.profiles`
Extiende `auth.users` con información de perfil.

| Columna | Tipo | Null | Default | Constraints |
|---------|------|------|---------|-------------|
| `id` | uuid | NOT NULL | — | PK, FK → `auth.users(id)` |
| `role` | text | NOT NULL | `'user'` | CHECK IN (`'admin'`, `'user'`) |
| `name` | text | NOT NULL | — | — |
| `phone` | text | — | — | — |
| `city` | text | — | — | — |
| `status` | text | NOT NULL | `'pending'` | CHECK IN (`'active'`, `'pending'`, `'suspended'`) |
| `created_at` | timestamptz | — | `now()` | — |
| `last_active_at` | timestamptz | — | `now()` | — |

#### `public.user_favorites`
Relación N:M entre usuarios y vehículos favoritos.

| Columna | Tipo | Null | Default | Constraints |
|---------|------|------|---------|-------------|
| `user_id` | uuid | NOT NULL | — | FK → `profiles(id)`, PK |
| `vehicle_id` | text | NOT NULL | — | PK |
| `created_at` | timestamptz | — | `now()` | — |

---

## RLS (Row Level Security)

### `profiles`
| Policy | Operation | Condition |
|--------|-----------|-----------|
| Users can view own profile | SELECT | `auth.uid() = id` |
| Users can update own profile | UPDATE | `auth.uid() = id` |
| Admins can view all profiles | SELECT | ` EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')` |
| Admins can update all profiles | UPDATE | ` EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')` |

### `user_favorites`
| Policy | Operation | Condition |
|--------|-----------|-----------|
| Users can view own favorites | SELECT | `auth.uid() = user_id` |
| Users can insert own favorites | INSERT | `auth.uid() = user_id` |
| Users can delete own favorites | DELETE | `auth.uid() = user_id` |

---

## Triggers

### `on_auth_user_created`
Dispara después de insertar un usuario en `auth.users` para auto-crear el profile.

```sql
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
