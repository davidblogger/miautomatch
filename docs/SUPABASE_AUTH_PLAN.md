# Plan 1: Supabase Auth + Perfil de Usuario

**Estado:** En ejecución  
**Fecha:** 23 Julio 2026  
**Alcance:** Auth real con email/contraseña + tabla profiles + favoritos. Vehicles y Blog siguen mock.

## Estado de implementación

### ✅ Implementado (commit 9831f37)
- `.env.local` con credenciales Supabase (variables de entorno configuradas)
- `npm install @supabase/supabase-js @supabase/ssr`
- `lib/supabase/client.ts` y `server.ts` (createBrowserClient / createServerClient)
- `proxy.ts` (antes `middleware.ts`) — protección de rutas `/dashboard`, `/vehiculos`, `/blog`, `/usuarios`
- `app/auth/callback/route.ts` — handling del auth callback
- Login real con `signInWithPassword` (`app/(admin)/login/page.tsx`)
- Registro con `signUp` + metadata nombre (`app/(admin)/registro/page.tsx`)
- `lib/use-current-user.ts` — hook para sesión del usuario logueado
- Sidebar actualizado: avatar dinámico, logout real via Supabase

### ⏳ Pendiente
- Crear tablas `profiles` y `user_favorites` en Supabase (ejecutar SQL manualmente)
- Habilitar Email provider en Supabase Dashboard → Authentication → Providers
- Migrar `/usuarios` admin para usar datos reales de Supabase (actualmente sigue con mock `ADMIN_USERS`)
- El schema SQL del Paso 2 aún debe ejecutarse en el SQL Editor de Supabase

---

## Schema a ejecutar en Supabase (pendiente)

---

## Dependencias

- Proyecto Supabase ya creado en supabase.com
- Variables de entorno pendientes de configurar en `.env.local`
- npm install `@supabase/supabase-js @supabase/ssr` (pendiente)

---

## Paso 1 — Variables de entorno

En `.env.local` (crear si no existe):

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-public
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

**Dónde encontrar los valores:** Dashboard Supabase → Settings → API

---

## Paso 2 — Schema de base de datos

Ejecutar en el **SQL Editor** del dashboard de Supabase:

```sql
-- Tabla profiles (extiende auth.users)
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

-- Tabla de favoritos (relación N:M)
create table if not exists user_favorites (
  user_id uuid references profiles(id) on delete cascade,
  vehicle_id text not null,
  created_at timestamptz default now(),
  primary key (user_id, vehicle_id)
);

-- Trigger: auto-crear profile al registrarse
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

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- RLS
alter table profiles enable row level security;
alter table user_favorites enable row level security;

-- Policies: users ven/gestionan solo su propio profile
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Policies: users ven/gestionan solo sus favoritos
create policy "Users can view own favorites"
  on user_favorites for select using (auth.uid() = user_id);

create policy "Users can insert own favorites"
  on user_favorites for insert with check (auth.uid() = user_id);

create policy "Users can delete own favorites"
  on user_favorites for delete using (auth.uid() = user_id);

-- Policy: admins pueden ver y editar todos los profiles
create policy "Admins can view all profiles"
  on profiles for select using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update all profiles"
  on profiles for update using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );
```

**Habilitar Email auth** en Dashboard Supabase → Authentication → Providers → Email → Enable.

---

## Paso 3 — Paquetes

```bash
npm install @supabase/supabase-js @supabase/ssr
```

---

## Paso 4 — Arquitectura de archivos

```
lib/supabase/
├── client.ts       # createBrowserClient (cliente)
├── server.ts       # createServerClient (server components)
└── middleware.ts   # protege rutas, verifica sesión

app/
├── login/page.tsx           # auth real con signInWithPassword
├── auth/callback/route.ts   # handle auth callback
└── middleware.ts            # protege rutas /dashboard/*

lib/
├── supabase/
│   ├── client.ts
│   ├── server.ts
│   └── types.ts       # tipos generados de Supabase (opcional)
```

---

## Paso 5 — Supabase clients

**`lib/supabase/client.ts`** — cliente del navegador:

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**`lib/supabase/server.ts`** — cliente para server components y API routes:

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server component - ignore
          }
        },
      },
    }
  );
}
```

**`middleware.ts`** — proteger rutas:

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/vehiculos") ||
    request.nextUrl.pathname.startsWith("/blog") ||
    request.nextUrl.pathname.startsWith("/usuarios");

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
```

---

## Paso 6 — Login page

Reemplazar el form mock actual (`app/login/page.tsx`) por:

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  // ... UI del form glass con email + password inputs
}
```

---

## Paso 7 — Auth callback route

**`app/auth/callback/route.ts`**:

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
```

---

## Paso 8 — UserStore migrado a Supabase

El `UserStore` actual (Context + mock) se reemplaza:

```typescript
// lib/user-store.tsx
"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AdminUser } from "@/lib/types";

type UserStore = {
  user: AdminUser | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  updateProfile: (data: Partial<AdminUser>) => Promise<void>;
  addFavorite: (vehicleId: string) => Promise<void>;
  removeFavorite: (vehicleId: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const UserContext = createContext<UserStore | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();

    const { data: favorites } = await supabase
      .from("user_favorites")
      .select("vehicle_id")
      .eq("user_id", authUser.id);

    setUser({
      id: authUser.id,
      role: profile?.role ?? "user",
      name: profile?.name ?? authUser.email?.split("@")[0] ?? "",
      email: authUser.email ?? "",
      phone: profile?.phone,
      city: profile?.city,
      status: profile?.status ?? "pending",
      joinedAt: profile?.created_at ?? authUser.created_at,
      lastActiveAt: profile?.last_active_at,
      favoriteVehicleIds: favorites?.map((f: { vehicle_id: string }) => f.vehicle_id) ?? [],
    });
    setLoading(false);
  }, []);

  const updateProfile = useCallback(async (data: Partial<AdminUser>) => {
    if (!user) return;
    await supabase
      .from("profiles")
      .update(data)
      .eq("id", user.id);
    setUser((prev) => prev ? { ...prev, ...data } : null);
  }, [user]);

  const addFavorite = useCallback(async (vehicleId: string) => {
    if (!user) return;
    await supabase.from("user_favorites").insert({ user_id: user.id, vehicle_id: vehicleId });
    setUser((prev) => prev ? {
      ...prev,
      favoriteVehicleIds: [...(prev.favoriteVehicleIds ?? []), vehicleId],
    } : null);
  }, [user]);

  const removeFavorite = useCallback(async (vehicleId: string) => {
    if (!user) return;
    await supabase.from("user_favorites").delete()
      .eq("user_id", user.id)
      .eq("vehicle_id", vehicleId);
    setUser((prev) => prev ? {
      ...prev,
      favoriteVehicleIds: (prev.favoriteVehicleIds ?? []).filter((id) => id !== vehicleId),
    } : null);
  }, [user]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const value = useMemo<UserStore>(
    () => ({ user, loading, fetchUser, updateProfile, addFavorite, removeFavorite, signOut }),
    [user, loading, fetchUser, updateProfile, addFavorite, removeFavorite, signOut]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserStore() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserStore must be used inside UserProvider");
  return ctx;
}
```

---

## Paso 9 — Admin global: UserStore lee de Supabase

El admin global (MiAutoMatch) necesita ver todos los usuarios. Se puede mantener una función `getAllUsers()` separada que use el service role key para admins:

```typescript
async function getAllUsers() {
  const supabase = createClient();
  const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
  return data ?? [];
}
```

---

## Paso 10 — Admin layout: quitar UserProvider mock

```typescript
// app/(admin)/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <VehicleProvider>
        <BlogProvider>
          <AdminShell>{children}</AdminShell>
        </BlogProvider>
      </VehicleProvider>
    </ToastProvider>
  );
}
```

`UserProvider` se mueve solo al layout de la sección de perfil de usuario (mi cuenta).

---

## Criterios de aceptación

- [ ] Login con email + contraseña funciona (auth real)
- [ ] Session persiste al recargar (middleware)
- [ ] Perfil del usuario se guarda en Supabase
- [ ] Favoritos se guardan en Supabase (tabla user_favorites)
- [ ] Admin global ve todos los usuarios (políticas RLS)
- [ ] Admin global puede editar roles y estados
- [ ] Logout funciona correctamente
- [ ] Build + lint verdes

---

## Siguiente paso

Una vez completado este plan (Auth + Perfil), se ejecuta el **Plan 2: Automotora** (`docs/AUTOMOTORA_PLAN.md`).
