# Mi Auto Match — Plan Dashboard Fase 2

> Creado: 21 Julio 2026

---

## 1. Tipo y Alcance

**Dashboard administrador interno** para gestionar el inventario de vehículos.
- UI completa con datos mock
- Arquitectura lista para conectar Supabase después
- Sin SQL ni RLS en esta fase

**Stack:**
- Next.js App Router (route group `(admin)`)
- TypeScript
- Tailwind CSS v4
- Framer Motion (microinteracciones)
- Lucide React (iconos)
- Estado local con `useState` + tipos estrictos
- Mock data en `lib/data.ts` (extendido para gestión)

---

## 2. Estructura de Carpetas

```
app/
├── (admin)/                    # Route group sin afectar URL
│   ├── layout.tsx              # AdminShell: sidebar + topbar
│   ├── dashboard/
│   │   └── page.tsx            # Overview (KPIs + actividad reciente)
│   ├── vehiculos/
│   │   ├── page.tsx            # Lista con tabla + filtros
│   │   ├── nuevo/
│   │   │   └── page.tsx        # Crear vehículo
│   │   └── [id]/
│   │       └── page.tsx        # Editar vehículo
│   └── login/
│       └── page.tsx            # Login admin (mock por ahora)
│
└── components/
    └── admin/
        ├── AdminShell.tsx      # Layout wrapper con sidebar
        ├── Sidebar.tsx         # Navegación lateral
        ├── Topbar.tsx          # Barra superior (search, perfil)
        ├── StatCard.tsx        # Tarjeta de KPI
        ├── DataTable.tsx       # Tabla reutilizable
        ├── VehicleForm.tsx     # Form crear/editar
        ├── ImageUploader.tsx   # Upload con preview
        ├── ConfirmDialog.tsx    # Modal de confirmación
        ├── EmptyState.tsx      # Estado vacío
        └── FilterBar.tsx       # Filtros de tabla
```

**Layout URL final:**
- `/dashboard` — overview
- `/vehiculos` — listado
- `/vehiculos/nuevo` — crear
- `/vehiculos/[id]` — editar
- `/login` — acceso admin

---

## 3. Design System

### Reutilizado del Frontend
- Mismos tokens de `globals.css`
- Glass effect, gradientes, sombras
- Paleta `#014477` primario
- Inter + JetBrains Mono

### Adaptaciones Dashboard
- Sidebar oscuro (glass oscuro)
- Tablas con filas `hover:bg-primary-50`
- Densidad mayor (más datos visibles)
- Formularios con inputs glass
- Jerarquía de botones clara (primary = guardar, ghost = cancelar)

---

## 4. Layout del AdminShell

```
┌─────────────────────────────────────────────────┐
│ [Sidebar 280px]  │  Topbar (64px)              │
│                   ├─────────────────────────────┤
│  Logo             │                             │
│                   │   Contenido                 │
│  ▸ Dashboard      │   (Page children)            │
│  ▸ Vehículos     │                             │
│  ▸ Blog           │                             │
│  ▸ Usuarios       │                             │
│                   │                             │
│  ─────            │                             │
│  ▸ Config         │                             │
│  ▸ Salir          │                             │
└─────────────────────────────────────────────────┘
```

- **Topbar:** breadcrumbs + búsqueda global + notificaciones + avatar
- **Sidebar:** fija, colapsable, íconos Lucide

---

## 5. Página 1: `/dashboard` (Overview)

### Composición (bento grid — no cards uniformes)

1. **Header:** título grande + fecha actual
2. **Fila superior:** 4 StatCards asimétricos
   - Vehículos activos
   - Visitas hoy
   - Leads del mes
   - Tasa conversión
3. **Mitad izquierda (8 cols):** gráfico de barras SVG — "Vehículos publicados por mes"
4. **Mitad derecha (4 cols):** lista de actividad reciente (últimos 5 vehículos)
5. **Footer:** banner con próximas acciones pendientes

**Patrones:** bento grid, tabla inline, gráfico SVG

---

## 6. Página 2: `/vehiculos` (Listado)

### Composición

1. **Topbar local:** título + botón "Nuevo vehículo" (primary)
2. **FilterBar glass sticky:** búsqueda, marca, año, estado (Publicado/Borrador/Vendido), ordenar
3. **DataTable con:**
   - Thumbnail miniatura (80×60)
   - Marca + Modelo (bold)
   - Año
   - Precio (mono)
   - Kilometraje (mono)
   - Estado (badge)
   - Fecha actualización
   - Acciones (ver, editar, eliminar)
4. **Paginación** al pie
5. **Estado vacío** cuando no hay resultados

### Interacciones
- Click en fila → `/vehiculos/[id]`
- Click en ícono eliminar → ConfirmDialog
- Toggle de estado inline (publicado/borrador)

---

## 7. Página 3: `/vehiculos/nuevo` y `/vehiculos/[id]`

**VehicleForm reutilizable para crear y editar.**

### Layout 2 columnas

**Columna izquierda (8 cols):**
- Sección "Información general": marca, modelo, versión, año
- Sección "Especificaciones": combustible, transmisión, potencia, kilometraje, color
- Sección "Precio y financiamiento": precio, moneda, acepta financiamiento, descuento
- Sección "Descripción": textarea largo

**Columna derecha (4 cols) — sticky:**
- ImageUploader con preview (drop zone + hasta 8 imágenes + reordenar)
- Estado: Publicado / Borrador / Vendido (radio cards)
- Botones: Guardar (primary), Guardar borrador (secondary), Cancelar (ghost)

### Validación
- Campos requeridos con asterisco
- Mensajes inline
- Submit deshabilitado si hay errores

---

## 8. Componentes Clave

| Componente | Props clave | Notas |
|------------|-------------|-------|
| `AdminShell` | `{ children }` | sidebar + topbar + main |
| `Sidebar` | items[], activePath | glass oscuro, nav links |
| `Topbar` | title, actions | breadcrumb + search + avatar |
| `StatCard` | label, value, trend, icon | puede ser ancho, alto o cuadrado |
| `DataTable<T>` | columns[], data[], onAction | headers sticky, filas hover |
| `VehicleForm` | initial?, onSubmit | secciones colapsables |
| `ImageUploader` | value[], onChange | drop zone + grid preview |
| `ConfirmDialog` | title, message, onConfirm | modal + backdrop blur |
| `EmptyState` | icon, title, description, action | centrado |
| `FilterBar` | filters[], onChange | glass, sticky top |

---

## 9. Tipos TypeScript

```typescript
type VehicleStatus = "published" | "draft" | "sold";

type AdminVehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: "Gasolina" | "Diésel" | "Híbrido" | "Eléctrico";
  transmission: "Automática" | "Manual";
  power: string;
  color: string;
  category: string;
  description?: string;
  images: string[];
  status: VehicleStatus;
  featured: boolean;
  acceptsFinancing: boolean;
  discount?: number;
  createdAt: string;
  updatedAt: string;
};

type ActivityItem = {
  id: string;
  type: "created" | "updated" | "deleted" | "sold";
  vehicleId: string;
  vehicleLabel: string;
  timestamp: string;
  user: string;
};
```

---

## 10. Mock Data

Extender `lib/data.ts` con:
- 30+ vehículos en distintos estados (published, draft, sold)
- Array `ACTIVITIES` con historial simulado
- Stats computados dinámicamente desde los vehículos
- Función `generateMockVehicles()` para crear el set completo

---

## 11. Microinteracciones

- **Sidebar nav:** hover con glass más intenso + indicator animado (`layoutId`)
- **Tabla filas:** hover con `bg-primary-50` sutil, transición 200ms
- **Botones:** `hover:scale 1.02`, `tap:scale 0.97`
- **Modales:** entrada con `scale 0.95 → 1` + backdrop blur
- **Estadísticas:** counter animado (números que suben al cargar)
- **ImageUploader:** drop zone con glow al arrastrar archivo
- **Toasts:** feedback de éxito/error tras acciones

---

## 12. Estructura Visual por Sección

| Página | Patrón | Fondo |
|--------|--------|-------|
| `/dashboard` | Bento grid + tabla inline | Blanco con gradient radial sutil |
| `/vehiculos` | Tabla densa + filtros glass sticky | Blanco |
| `/vehiculos/[id]` | Form 2 cols (8/4) con sidebar sticky | `surface` (#F8FBFD) |

**Regla:** ningún patrón se repite entre páginas consecutivas.

---

## 13. Orden de Implementación

1. **Setup** — route group `(admin)`, AdminShell, Sidebar, Topbar
2. **Login page** — `/login` mock (email/password, redirige a `/dashboard`)
3. **Dashboard overview** — KPIs, gráfico SVG, actividad reciente
4. **Lista de vehículos** — DataTable, FilterBar, paginación
5. **Form de vehículo** — VehicleForm con todas las secciones
6. **ImageUploader** — preview, agregar, eliminar, reordenar
7. **CRUD completo** — crear, editar, eliminar con confirmación
8. **Polish** — animaciones, estados vacíos, loading skeletons
9. **Verificación** — build + lint

---

## 14. Criterios de Aceptación

- [ ] Sidebar y topbar consistentes en todas las páginas admin
- [ ] `/dashboard` con KPIs reales computados del mock
- [ ] `/vehiculos` con tabla funcional (filtros, sort, paginación)
- [ ] `/vehiculos/nuevo` permite crear vehículo con preview de imágenes
- [ ] `/vehiculos/[id]` permite editar y eliminar
- [ ] ConfirmDialog antes de eliminar
- [ ] Toast/feedback tras cada acción
- [ ] Responsive (sidebar colapsable en mobile)
- [ ] Mantiene design system (glass, paleta, tipografía)
- [ ] Build y lint sin errores

---

## 15. Fuera de Alcance (esta fase)

- Blog (queda para fase futura)
- Gestión de usuarios (queda para fase futura)
- Configuración del sistema
- SQL / RLS / Supabase real
- Notificaciones reales
- Integración con backend

---

## 16. Notas

- El dashboard NO sigue el diseño "Liquid Glass" del frontend público — es más denso, funcional, orientado a productividad
- Mantiene la paleta de colores y tipografía del frontend para coherencia de marca
- Las imágenes de vehículos se manejan por URL (no upload real a Supabase Storage en esta fase)
- El login es mock: cualquier email/password funciona y redirige al dashboard
