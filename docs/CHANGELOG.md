# Changelog

Todos los cambios relevantes del proyecto, organizados por fase.

El formato sigue una convención inspirada en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/):
- **Added** para funcionalidades nuevas.
- **Changed** para cambios en funcionalidades existentes.
- **Removed** para funcionalidades eliminadas.
- **Fixed** para corrección de bugs.

---

## [Fase 2 — Dashboard admin] — 22 Julio 2026

### Added
- Route group `(admin)` con layout propio (`AdminShell`) aislado del frontend público.
- Página `/login` mock con form glass; cualquier credencial redirige a `/dashboard`.
- Sidebar glass oscuro con logo `LOGO-WP-WHITE.png`, indicator animado (`layoutId`), items `Dashboard`, `Vehículos`, `Blog`, `Usuarios` (Blog/Usuarios marcados "Pronto").
- Topbar con breadcrumb dinámico, búsqueda global, notificaciones y avatar.
- Dashboard overview (`/dashboard`) con 4 KPIs computados en vivo desde el store, gráfico SVG de barras y feed de actividad reciente.
- Página `/vehiculos` con tabla densa, búsqueda, filtros (estado, combustible), ordenamiento, paginación y acciones por fila.
- Páginas `/vehiculos/nuevo` y `/vehiculos/[id]` con `VehicleForm` completo (4 secciones colapsables).
- Componente `ImageUploader` con drag & drop, fallback de URL y reordenar imágenes.
- Componente `ConfirmDialog` para confirmación de eliminación con animación.
- Componente `EmptyState` para estados vacíos.
- Componente `FilterBar` glass sticky reutilizable.
- Store local con React Context (`VehicleProvider`) que expone `create`, `update`, `remove`, `toggleStatus` y registra actividad.
- 30 vehículos mock en `lib/admin-data.ts` con marcas, versiones y precios realistas.

### Changed
- Dashboard overview ahora consume datos reales del store (no mock estático).

---

## [Fase 1 — Frontend público] — 21 Julio 2026

### Added
- Design system completo: tokens de color (`#014477` primario), sombras, glass effect, gradientes (`gradient-hero`, `gradient-soft`, `gradient-text`).
- Tipografía: Inter (display + body) + JetBrains Mono (datos técnicos), ambas vía `next/font/google`.
- Páginas públicas: `/`, `/inventario`, `/vehiculo/[id]`, `/contacto`.
- Hero con slider full-width (`HeroSlider`) que combina transición **fade + slide** sobre 4 imágenes de vehículos, con auto-advance cada 15s y dots clicables.
- Bloques: `Hero`, `Brands`, `FeaturedVehicles`, `WhyMiAutoMatch`, `Testimonials`, `CTASection`.
- Componentes UI: `Button` (5 variantes × 3 tamaños), `GlassCard`, `Badge`, `Input`, `SearchBar`, `HeroSlider`.
- Layout: `Header` glass con scroll-aware, `Footer` dark con gradient radial y logos sociales SVG inline.
- Logo `LOGO-WP.png` en `Header` (navbar público).
- Mock data de vehículos en `lib/data.ts` para alimentar el sitio.
- Animaciones Framer Motion con respeto a `prefers-reduced-motion`.

### Changed
- Navbar público: enlaces cambiados a `font-bold` + color azul oscuro (`var(--color-primary-dark)`).
- Footer público: logo reemplazado por `LOGO-WP-WHITE.png` (en lugar del placeholder "M").
- Navbar público: añadido el link "Inicio" → `/`.

### Removed
- Placeholder inicial de Next.js (`create-next-app`).

---

## [Setup inicial] — 21 Julio 2026

### Added
- Proyecto Next.js 16.2.11 inicializado con App Router, TypeScript y Tailwind CSS v4.
- Estructura base: `app/`, `components/`, `lib/`, `public/`, `hooks/`.
- Configuración de `next.config.ts` con `images.remotePatterns` para Unsplash.
- Repositorio inicializado y conectado a `https://github.com/davidblogger/miautomatch.git`.

---

## Tipos de commits

El proyecto sigue convenciones inspiradas en [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nueva funcionalidad
- `fix:` corrección de bug o ajuste menor
- `docs:` cambios solo en documentación
- `chore:` tareas de mantenimiento (sin impacto en runtime)
- `style:` cambios de estilo sin lógica

Ejemplos del proyecto:
- `feat(admin): dashboard shell with sidebar, topbar and mock login`
- `feat(admin): full vehicles CRUD with table, filters and image uploader`
- `fix: navbar links bold and dark blue color`
- `fix: footer logo replaced with LOGO-WP-WHITE.png`
- `docs: add DASHBOARD_PLAN.md for Phase 2`