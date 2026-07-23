# Plan: Módulo Automotora (Dealer)

**Estado:** Planificado — pendiente de ejecución  
**Fecha:** 23 Julio 2026  
**Complejidad:** Alta  
**Alcance:** CRUD completo de dealers, vendedores y relación N:M con vehículos. Perfil público del dealer.

---

## Resumen del modelo

- Una **Automotora** puede tener varios **Vendedores**.
- Un **Vendedor** pertenece a una sola Automotora.
- Un **Vehículo** puede pertenecer a varias Automotoras (N:M). El mismo auto puede estar en el inventario de múltiples dealers.
- Cada Automotora tiene un **perfil público** (`/automotora/[slug]`) con sus vehículos.
- El **Dealer Admin** solo ve y gestiona sus propios datos (vehículos, vendedores, métricas).
- El **Admin Global** de MiAutoMatch puede ver y gestionar todo.

---

## Decisiones de diseño confirmadas

| Pregunta | Respuesta |
|----------|-----------|
| Vendedor → dealer | 1:N (un vendedor = una automotora) |
| Vehículo → dealer | N:M (un vehículo puede estar en varias automotoras) |
| Dealer público | Perfil público propio (`/automotora/[slug]`) |
| Permisos dealer admin | Solo ve lo suyo (RLS) |

---

## 1. Schema de base de datos (Supabase)

### Tablas existentes afectadas

**`profiles`** — agregar `dealer_id`:

```sql
alter table profiles add column dealer_id uuid references profiles(id);
```

### Nuevas tablas

```sql
-- Tabla dealers (automotoras)
create table dealers (
  id uuid references profiles(id) on delete cascade primary key,
  slug text unique not null,
  business_name text not null,
  rut text,
  logo text,
  cover_image text,
  description text,
  phone text,
  email text,
  website text,
  address text,
  city text,
  region text,
  is_verified boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tabla sellers (vendedores) — pertenece a un dealer
create table sellers (
  id uuid references profiles(id) on delete cascade primary key,
  dealer_id uuid references profiles(id) on delete restrict not null,
  position text,
  avatar text,
  bio text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Relación N:M dealers ↔ vehicles
create table dealer_vehicles (
  dealer_id uuid references profiles(id) on delete cascade,
  vehicle_id text not null,
  is_featured boolean default false,
  is_active boolean default true,
  listed_at timestamptz default now(),
  primary key (dealer_id, vehicle_id)
);

-- Tabla vehicles (migración desde mock)
create table vehicles (
  id text primary key,
  brand text not null,
  model text not null,
  version text,
  year integer not null,
  price bigint not null,
  mileage integer,
  fuel text,
  transmission text,
  power text,
  color text,
  category text,
  description text,
  images text[],
  accepts_financing boolean default false,
  discount integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Reviews de dealers
create table dealer_reviews (
  id uuid primary key default gen_random_uuid(),
  dealer_id uuid references profiles(id) on delete cascade,
  author_name text not null,
  author_email text,
  rating integer check (rating between 1 and 5),
  comment text,
  is_approved boolean default false,
  created_at timestamptz default now()
);
```

### RLS (Row Level Security)

```sql
-- Dealer vehicles
create policy "Dealer admin manages own vehicles"
  on dealer_vehicles for all using (
    exists (select 1 from profiles where id = auth.uid()
      and (role = 'admin' or id = dealer_id))
  );

create policy "Anyone can view active dealer vehicles"
  on dealer_vehicles for select using (is_active = true);

-- Sellers
create policy "Dealer admin manages own sellers"
  on sellers for all using (
    exists (select 1 from profiles where id = auth.uid()
      and (role = 'admin' or id = dealer_id))
  );

-- Vehicles: admin global y dealers con vehículos asignados
create policy "Admin and dealers can view vehicles"
  on vehicles for select using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
    or exists (select 1 from dealer_vehicles dv
      where dv.vehicle_id = vehicles.id
      and (dv.dealer_id = auth.uid()
        or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')))
  );

-- Reviews
create policy "Anyone can read approved reviews"
  on dealer_reviews for select using (is_approved = true);

create policy "Dealer can manage own reviews"
  on dealer_reviews for all using (
    exists (select 1 from profiles where id = auth.uid()
      and (role = 'admin' or id = dealer_id))
  );
```

### Trigger

```sql
create or replace function handle_new_dealer()
returns trigger as $$
begin
  update profiles set role = 'dealer' where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_dealer_created
  after insert on dealers
  for each row execute procedure handle_new_dealer();
```

---

## 2. Tipos TypeScript

```typescript
type UserRole = "admin" | "user" | "dealer" | "seller";

type Dealer = {
  id: string;
  slug: string;
  businessName: string;
  rut?: string;
  logo?: string;
  coverImage?: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  region?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type Seller = {
  id: string;
  dealerId: string;
  position?: string;
  avatar?: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
};

type DealerVehicle = {
  dealerId: string;
  vehicleId: string;
  isFeatured: boolean;
  isActive: boolean;
  listedAt: string;
};

type DealerReview = {
  id: string;
  dealerId: string;
  authorName: string;
  authorEmail?: string;
  rating: number;
  comment?: string;
  isApproved: boolean;
  createdAt: string;
};
```

---

## 3. Página pública `/automotora/[slug]`

**Componentes:**

```
components/dealer/
├── DealerProfile.tsx      # Header con logo, nombre, stats, rating
├── DealerVehicleGrid.tsx  # Grid de vehículos del dealer
├── DealerReviews.tsx      # Reviews aprobadas
└── DealerContactForm.tsx  # Formulario de contacto
```

**Datos:** Logo, nombre, descripción, ciudad, teléfono, rating promedio, grid de vehículos activos (consume `dealer_vehicles` → `vehicles`), reviews aprobadas, formulario de contacto.

---

## 4. Dashboard del Dealer Admin — `/dealer`

```
app/(dealer)/
├── layout.tsx              # DealerShell (sidebar limitado)
├── page.tsx                # Dashboard: mis vehículos, métricas
├── vehicles/
│   ├── page.tsx            # Mis vehículos asignados
│   ├── [id]/page.tsx       # Editar
│   └── assign/page.tsx     # Asignar vehículos del catálogo
├── sellers/
│   ├── page.tsx
│   ├── nuevo/page.tsx
│   └── [id]/page.tsx
├── reviews/page.tsx
└── settings/page.tsx
```

**Lo que NO ve el dealer admin:** otros dealers, admin global, métricas generales.

---

## 5. Admin global: gestión de dealers

```
app/(admin)/
└── automotoras/
    ├── page.tsx              # Lista de dealers
    ├── nuevo/page.tsx       # Crear dealer
    └── [id]/page.tsx        # Ver/editar
```

---

## 6. Migración de vehículos

Los `ADMIN_VEHICLES` migran a la tabla `vehicles`. La relación N:M con dealers se gestiona desde `dealer_vehicles`.

**Flujo de asignación:** Dealer → `/dealer/vehicles/assign` → ve catálogo → marca los que quiere listar → se insertan en `dealer_vehicles`.

---

## 7. DealerStore

```typescript
type DealerStore = {
  dealers: Dealer[];
  getById: (id: string) => Dealer | undefined;
  getBySlug: (slug: string) => Dealer | undefined;
  create: (data: Omit<Dealer, "id" | "createdAt" | "updatedAt">) => Promise<Dealer>;
  update: (id: string, data: Partial<Dealer>) => Promise<void>;
  remove: (id: string) => Promise<void>;

  getSellers: (dealerId: string) => Seller[];
  createSeller: (data: Omit<Seller, "id" | "createdAt">) => Promise<Seller>;
  updateSeller: (id: string, data: Partial<Seller>) => Promise<void>;
  removeSeller: (id: string) => Promise<void>;

  getDealerVehicles: (dealerId: string) => (Vehicle & DealerVehicle)[];
  assignVehicle: (dealerId: string, vehicleId: string) => Promise<void>;
  unassignVehicle: (dealerId: string, vehicleId: string) => Promise<void>;

  getDealerReviews: (dealerId: string) => DealerReview[];
  approveReview: (reviewId: string) => Promise<void>;
  removeReview: (reviewId: string) => Promise<void>;
};
```

---

## 8. Navegación

**Sidebar admin global:**

```
Dashboard · Vehículos · Blog · Usuarios · Automotoras [NUEVO] · Configuración
```

**Sidebar dealer admin (nuevo):**

```
Dashboard (dealer) · Mis Vehículos · Vendedores · Reviews · Mi Perfil
```

---

## 9. Orden de implementación

### Fase A — Schema + types
1. Crear tablas en Supabase
2. Triggers y RLS
3. Agregar `dealer_id` a `profiles`
4. Actualizar tipos en `lib/types.ts`
5. Migrar `ADMIN_VEHICLES` a tabla `vehicles`

### Fase B — Perfil público del dealer
6. Página `/automotora/[slug]`
7. Componentes `DealerProfile`, `DealerVehicleGrid`, `DealerReviews`
8. Reviews desde la página pública

### Fase C — Dealer admin dashboard
9. Route group `(dealer)` con `DealerShell`
10. Dashboard dealer + KPIs
11. CRUD vendedores
12. Asignar/desasignar vehículos

### Fase D — Admin global: gestión de dealers
13. Página `/automotoras`
14. Crear/editar dealer
15. Ver perfil público desde admin

### Fase E — Conectar VehicleStore a Supabase
16. Reemplazar `VehicleStore` (Context) por Supabase
17. Actualizar relación N:M con `dealer_vehicles`

---

## 10. Criterios de aceptación

- [ ] Dealer puede registrarse (trigger crea profile + dealer)
- [ ] Dealer admin inicia sesión y ve solo sus datos
- [ ] Dealer puede agregar/quitar vehículos de su inventario
- [ ] Dealer puede crear, editar y eliminar sus vendedores
- [ ] Dealer puede aprobar/eliminar reviews
- [ ] Página pública `/automotora/[slug]` muestra perfil, vehículos y reviews
- [ ] Admin global ve todas las automotoras
- [ ] Admin global puede crear, editar, suspender dealers
- [ ] RLS impide que dealer A vea datos de dealer B
- [ ] Build + lint verdes

---

## Pendiente

- **Auth real con Supabase** debería ejecutarse **antes** de este plan (incremento 1 de la migración).
- **Flujo de registro de dealers** — ¿desde el frontend público? ¿desde el admin global?
- **Notificaciones por email** — puede ser fase posterior.
