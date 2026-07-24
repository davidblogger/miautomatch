# Bitácora de sesiones

Registro cronológico de las sesiones de trabajo. Cada entrada incluye objetivo, lo que se completó, lo que quedó pendiente y las decisiones relevantes.

---

## Sesión 23 Julio 2026 ( tarde)

**Objetivo:** Integración Supabase Auth real.

**Completado:**
- ✅ Segundo proyecto Supabase creado (el primero tenía auth roto).
- ✅ `.env.local` con nuevas keys JWT.
- ✅ `lib/supabase/client.ts` + `server.ts` con `createBrowserClient` / `createServerClient`.
- ✅ Login y registro reales con `signInWithPassword` + `signUp` en páginas standalone (`app/login/`, `app/registro/`).
- ✅ Toggle de visibilidad de contraseña (eye/eye-off icons).
- ✅ `proxy.ts` protegiendo rutas admin.
- ✅ `use-current-user.ts` hook + integración en `Topbar.tsx` y `Sidebar.tsx`.
- ✅ Profile de "David Mijares" creado manualmente en Supabase.
- ✅ SQL del schema `profiles` + `user_favorites` + trigger corregido + RLS + policies ejecutado por el usuario.
- ✅ `docs/DATABASE_BITACORA.md` creada con schema completo.
- ✅ `docs/CHANGELOG.md`, `docs/DECISIONS.md`, `docs/SESSIONS.md` actualizados.
- ✅ Commits subidos.

**Decisiones:**
- Primer proyecto Supabase descartado por auth irrecuperable (`AuthRetryableFetchError`).
- Trigger corregido: `Name` → `name` (minúscula) para capturar nombre del metadata.
- Login/registro sacados del route group `(admin)` — son standalone.
- `setup-supabase.sql` eliminado (contenía pasos destructivos para el usuario admin).

**Pendiente:**
- ⏳ Bug: Topbar y Sidebar muestran el email (o prefijo del email) en vez del nombre real del usuario. El profile existe en Supabase (`name: "David Mijares"`), pero `useCurrentUser` podría estar cayendo al fallback. Necesita revisión: verificar que el hook realmente lea `profile.name` y no el email.
- ⏳ Migrar `/usuarios` a datos reales de Supabase (sigue con mock `ADMIN_USERS`).
- ⏳ Plan 2 (Automotora) — pendiente.

---

## Sesión 23 Julio 2026 (planificación)

**Objetivo:** Planificar Supabase (incremento 1: Auth + Perfil) y Automotora (incremento 2).

**Completado:**
- ✅ Plan 1: `docs/SUPABASE_AUTH_PLAN.md` — Auth real email/password + profiles + favoritos + middleware.
- ✅ Plan 2: `docs/AUTOMOTORA_PLAN.md` — Dealers, vendedores, N:M vehículos, perfil público `/automotora/[slug]`.

**Secuencia de implementación confirmada:**
1. **Plan 1** → Supabase Auth + Perfil (auth real, profiles, favoritos). Dependencias: proyecto Supabase creado, variables de entorno.
2. **Plan 2** → Automotora (dealers, sellers, dealer_vehicles, reviews, perfil público). Requiere Plan 1 completo.

**Decisiones Supabase Auth:**
- Email + contraseña (no magic link, no OAuth)
- Roles en tabla `profiles` (no hardcoded)
- Incremento 1: solo auth + perfil + favoritos. Vehicles y Blog siguen mock.
- Enfoque incremental (tabla por tabla, probando)

**Decisiones Automotora:**
- Vendedor → Dealer: 1:N (un vendedor = una automotora)
- Vehículo → Dealer: N:M (un vehículo puede estar en varias automotoras)
- Dealer tiene perfil público (`/automotora/[slug]`)
- Dealer Admin ve solo lo suyo (RLS)
- Admin global ve todo

**Pendiente:**
- ⏳ Ejecutar SQL del schema en Supabase (profiles, user_favorites, triggers, RLS policies)
- ⏳ Habilitar Email provider en Supabase Dashboard
- ⏳ Migrar `/usuarios` admin para usar datos reales de Supabase
- ⏳ Ejecutar Plan 2 (Automotora) después de que schema esté activo

---

## Sesión 23 Julio 2026 (prev)

**Objetivo:** Documentar el contexto del proyecto (bitácora, decisiones, sesiones).

**Completado:**
- ✅ Creación de `docs/CHANGELOG.md` con historial completo del proyecto.
- ✅ Creación de `docs/DECISIONS.md` con 11 ADRs documentados.
- ✅ Creación de `docs/SESSIONS.md` (este archivo).
- ✅ Decisión de mantener `DASHBOARD_PLAN.md` separado de la bitácora.

**Pendiente:**
- ⏳ Decidir siguiente módulo del dashboard (Blog o Usuarios).
- ⏳ Polish general del dashboard (toasts de feedback, loading skeletons).

**Decisiones tomadas:** Ver ADR-011 en `DECISIONS.md`.

---

## Sesión 22 Julio 2026

**Objetivo:** Construir el dashboard admin completo con CRUD de vehículos.

**Completado:**
- ✅ Setup base del dashboard: route group `(admin)`, `AdminShell`, `Sidebar`, `Topbar`.
- ✅ Página `/login` mock con glass form y redirección a `/dashboard`.
- ✅ Dashboard overview con KPIs reales (consume store), gráfico SVG, actividad reciente.
- ✅ Página `/vehiculos` con tabla, búsqueda, filtros, ordenamiento, paginación.
- ✅ `VehicleForm` con 4 secciones colapsables + validación inline.
- ✅ `ImageUploader` con drag & drop, URL input y reordenar.
- ✅ `ConfirmDialog` para confirmación de eliminación.
- ✅ `EmptyState` para estados vacíos.
- ✅ `FilterBar` glass sticky reutilizable.
- ✅ `VehicleProvider` (Context) con `create`, `update`, `remove`, `toggleStatus`.
- ✅ 30 vehículos mock en `lib/admin-data.ts` con datos realistas.

**Pendiente:**
- ⏳ Módulo Blog (sin implementar aún).
- ⏳ Módulo Usuarios (sin implementar aún).
- ⏳ Toast/feedback visual tras acciones (estructura lista, sin librería).
- ⏳ Conectar Supabase real (próxima fase mayor).

**Decisiones tomadas:**
- ADR-005 (sidebar glass oscuro)
- ADR-006 (route group admin)
- ADR-007 (login mock)
- ADR-008 (Context vs Zustand)
- ADR-009 (ImageUploader local)
- ADR-010 (VehicleForm colapsable)

---

## Sesión 21 Julio 2026 (noche)

**Objetivo:** Ajustes de marca y pulido del frontend público.

**Completado:**
- ✅ Logo `LOGO-WP.png` agregado al `Header` (navbar público).
- ✅ Logo `LOGO-WP-WHITE.png` agregado al `Footer`.
- ✅ Navbar público: enlaces cambiados a `font-bold` + color azul oscuro (`var(--color-primary-dark)`).
- ✅ Navbar público: añadido link "Inicio" → `/`.
- ✅ HeroSlider ajustado a 15s entre transiciones.
- ✅ Slider del hero reestructurado: ahora full-width con overlay gradient en lugar de card lateral.
- ✅ Commit y push de cada cambio individual.

**Pendiente:** Ninguno para esta sesión.

**Decisiones tomadas:** Ninguna mayor (solo ajustes de estilo solicitados).

---

## Sesión 21 Julio 2026 (tarde)

**Objetivo:** Construir el frontend público MVP de Mi Auto Match.

**Completado:**
- ✅ Design system completo: tokens (`globals.css`), glass utilities, gradientes, sombras.
- ✅ Configuración de fonts: Inter + JetBrains Mono via `next/font/google`.
- ✅ Páginas públicas:
  - `/` Home con Hero (slider + búsqueda + stats), Brands, FeaturedVehicles, WhyMiAutoMatch, Testimonials, CTASection.
  - `/inventario` con filtros glass sticky y grid de vehículos.
  - `/vehiculo/[id]` con gallery + specs glass + CTA + relacionados.
  - `/contacto` con form glass e info cards.
- ✅ Componentes UI: `Button`, `GlassCard`, `Badge`, `Input`, `SearchBar`, `HeroSlider`.
- ✅ Layout: `Header` glass con scroll-aware, `Footer` dark con gradient.
- ✅ Mock data de vehículos en `lib/data.ts`.
- ✅ Animaciones Framer Motion con respeto a `prefers-reduced-motion`.
- ✅ Build verde, lint limpio.
- ✅ Repositorio creado en GitHub y conectado.

**Pendiente:**
- ⏳ Módulo dashboard admin (sería la siguiente fase).

**Decisiones tomadas:**
- ADR-001 (Liquid Glass Design)
- ADR-002 (paleta `#014477`)
- ADR-003 (Inter + JetBrains Mono)
- ADR-004 (HeroSlider fade + slide)

---

## Convenciones

- Las sesiones se numeran por **fecha** (no por orden de inicio).
- Cada sesión tiene **objetivo claro**, **completado** (✅), **pendiente** (⏳) y **decisiones**.
- Los IDs de ADRs (ADR-NNN) referencian a `docs/DECISIONS.md`.
- Esta bitácora se actualiza **al final de cada sesión** o cada vez que se toma una decisión relevante.