# Decisiones arquitectónicas

Documento vivo con las decisiones técnicas más relevantes del proyecto y el **por qué** detrás de cada una. Inspirado en ADRs (Architecture Decision Records).

---

## ADR-001 · Liquid Glass Design con alcance limitado

**Fecha:** 21 Julio 2026 · **Estado:** Aceptado

**Contexto:** El brief pedía una experiencia premium comparable a Apple, Stripe, Linear, Porsche Digital. El glass effect estaba entre los recursos visuales a usar.

**Decisión:** Aplicar `backdrop-filter: blur(20px) saturate(180%)` únicamente a:
- Navbar (header público y admin)
- SearchBar del hero
- Cards de vehículos (cards destacados, cards de specs)
- Filtros del inventario
- Panel lateral del hero y overlays

**Alternativas consideradas:**
- Glass en toda la página: rechazado — empastelaba todo y restaba legibilidad.
- Sin glass (flat): rechazado — perdía el carácter premium pedido.

**Consecuencias:**
- Look premium sin saturación.
- Performance razonable: `backdrop-filter` solo donde aporta valor.
- El resto de la página mantiene superficies blancas y secciones con gradient sutil.

---

## ADR-002 · Paleta con `#014477` como azul corporativo

**Fecha:** 21 Julio 2026 · **Estado:** Aceptado

**Decisión:** El color primario es `#014477` (azul corporativo, no saturado). Se complementa con:
- `#012E55` (primary-dark) para hover y acentos.
- `#1B5A8A` (primary-light) para gradients.
- `#EAF4FB` (primary-50) para backgrounds suaves.
- `#D7E6F2` (border) para divisores.
- `#F8FBFD` (surface) para fondos de sección.
- `#0A1A2E` (ink) para texto oscuro y footer.

**Por qué:** Pedido explícito del brief. Azul corporativo transmite **tecnología + confianza** sin saturar (a diferencia de un azul eléctrico).

**Consecuencias:** Toda la paleta se tokenizó en `globals.css` con `@theme`, accesible vía `var(--color-*)`.

---

## ADR-003 · Inter + JetBrains Mono como tipografía

**Fecha:** 21 Julio 2026 · **Estado:** Aceptado

**Decisión:**
- **Inter** como fuente principal (display + body). Cargada con `next/font/google` para auto-hospedaje y rendimiento.
- **JetBrains Mono** para datos numéricos y técnicos (precios, kilometrajes, badges de año).

**Por qué:** Inter es la opción moderna más sólida para SaaS premium (la usan Linear, Vercel, Stripe). JetBrains Mono alinea números en columnas y da carácter "técnico" a datos clave.

**Consecuencias:** Jerarquía clara entre texto editorial y datos. Sin overrrides de fonts por componente — la base resuelve todo.

---

## ADR-004 · HeroSlider con combinación fade + slide, 15s entre slides

**Fecha:** 21 Julio 2026 · **Estado:** Aceptado

**Decisión:** El hero muestra un slider full-width con 4 imágenes que combina:
- **Fade in** (opacity 0 → 1)
- **Slide in** (x: 40 → 0, scale: 1.08 → 1)
- **Duración:** 0.9s por transición
- **Auto-advance:** cada 15s
- Dots clicables con `layoutId` (efecto de "pill" animado, idéntico al patrón Linear/Apple).

**Por qué:** La sensación tecnológica premium pide animación que no distraiga. 5–8s era muy rápido (se siente ansioso); 15s permite disfrutar cada imagen sin perder el ritmo.

**Consecuencias:**
- 4 fotos en `HeroSlider.tsx` curadas (no imágenes random).
- Background overlay `gradient-hero` con radial gradient azul para legibilidad del texto.
- `prefers-reduced-motion` respetado globalmente.

---

## ADR-005 · Sidebar del dashboard con glass oscuro sobre `--color-ink`

**Fecha:** 22 Julio 2026 · **Estado:** Aceptado

**Decisión:** El sidebar del dashboard usa glass oscuro (`rgba(10, 26, 46, 0.55)` + `backdrop-filter`) sobre fondo `--color-ink`, con grid pattern sutil.

**Por qué:**
- Contraste con el frontend público (que es claro) — el admin debe sentirse como un "panel interno".
- Mantiene coherencia de marca (mismo azul corporativo) pero invierte la luminosidad.
- Glass oscuro sobre fondo oscuro crea profundidad sin saturar.

**Alternativa considerada:** Sidebar blanco — rechazado por romper el contraste con el resto del dashboard y sentirse "menos serio".

---

## ADR-006 · Dashboard con route group `(admin)` y layout propio

**Fecha:** 22 Julio 2026 · **Estado:** Aceptado

**Decisión:** Las rutas admin viven en `app/(admin)/` (route group) con su propio `layout.tsx` que aplica `AdminShell`. Esto:
- Aísla el chrome (no muestra el `Header` y `Footer` público).
- Permite URLs limpias (`/dashboard`, `/vehiculos`) sin prefijo.
- Comparte el `RootLayout` (`app/layout.tsx`) — solo cambia el chrome intermedio.

**Por qué:** Un admin no debe compartir navegación con el sitio público. Tener un layout dedicado permite evolucionar el dashboard sin tocar el frontend.

---

## ADR-007 · Login mock simple (sin backend)

**Fecha:** 22 Julio 2026 · **Estado:** Aceptado

**Decisión:** La pantalla `/login` valida solo que los campos no estén vacíos y redirige a `/dashboard`. No verifica credenciales reales ni persiste sesión.

**Por qué:**
- El plan actual no incluye Supabase real (UI completa + mock data).
- Cualquier credencial funciona para acelerar demos y desarrollo.
- Cuando se conecte Supabase, el `handleSubmit` se reemplaza por `supabase.auth.signInWithPassword(...)` sin tocar la UI.

**Consecuencias:**
- Botón "Mock auth" visible en pantalla para claridad.
- Sin middleware de protección: las rutas admin son accesibles sin login (deliberado para esta fase).

---

## ADR-008 · Store local con React Context en lugar de Zustand/Redux

**Fecha:** 22 Julio 2026 · **Estado:** Aceptado

**Decisión:** El estado de vehículos (lista, CRUD, actividades) vive en `VehicleProvider` (React Context + `useState`).

**Por qué:**
- Para mock data en memoria, Context es suficiente y evita una dependencia más.
- La API (`vehicles`, `create`, `update`, `remove`, `toggleStatus`) está pensada para ser reemplazable por Supabase queries más adelante sin cambiar los consumidores.
- Zustand/Redux sería sobre-ingeniería para esta fase.

**Limitaciones conocidas:**
- El estado se pierde al recargar (es por diseño).
- No hay sincronización entre pestañas.

**Migración futura:** Reemplazar el cuerpo de `VehicleProvider` por calls a Supabase manteniendo la misma interfaz pública.

---

## ADR-009 · ImageUploader con upload local + URL (sin Supabase Storage aún)

**Fecha:** 22 Julio 2026 · **Estado:** Aceptado

**Decisión:** El `ImageUploader` acepta:
- Archivos locales (drag & drop o file picker) — convertidos a `data:` URLs con `FileReader`.
- URLs externas (pegadas manualmente).

Las imágenes se guardan como strings en el array `images` del vehículo.

**Por qué:**
- Pedido explícito del usuario: "Upload directo + preview" en lugar de Supabase Storage.
- Funciona offline para demos.
- `data:` URLs para archivos locales permiten preview inmediato sin servidor.

**Limitaciones conocidas:**
- `data:` URLs no son ideales para producción (grandes, no cacheables).
- Cuando se conecte Supabase Storage, se cambiará por `supabase.storage.from('vehicles').upload(...)` y se guardará la URL pública.

---

## ADR-010 · VehicleForm con secciones colapsables

**Fecha:** 22 Julio 2026 · **Estado:** Aceptado

**Decisión:** El formulario de vehículo tiene 4 secciones colapsables:
1. Información general (marca, modelo, versión, año)
2. Especificaciones (combustible, transmisión, potencia, kilometraje, color, categoría)
3. Precio y financiamiento
4. Descripción

Cada sección es un `<button>` que controla su propio estado (`openSection`). El sidebar sticky a la derecha contiene galería, estado y botones de acción.

**Por qué:**
- Formularios largos completos abruman; las secciones reducen la carga cognitiva.
- El sidebar sticky permite acceder siempre a "Guardar" sin scroll.
- Animación con `AnimatePresence` da feedback visual al expandir/colapsar.

**Alternativas consideradas:**
- Tabs horizontales — rechazado, oculta información al cambiar.
- Stepper multi-página — sobre-ingeniería para el flujo actual.

---

## ADR-011 · Mantener `DASHBOARD_PLAN.md` separado de la bitácora

**Fecha:** 22 Julio 2026 · **Estado:** Aceptado

**Decisión:** La planificación detallada del dashboard vive en `docs/DASHBOARD_PLAN.md`. La bitácora de contexto del proyecto se divide en:
- `docs/CHANGELOG.md` (qué cambió, cuándo)
- `docs/DECISIONS.md` (por qué se eligieron las cosas — este archivo)
- `docs/SESSIONS.md` (qué se hizo en cada sesión, qué queda pendiente)

**Por qué:**
- El plan es un documento de **diseño** (forward-looking): qué se va a hacer.
- La bitácora es un documento de **historia** (backward-looking): qué se hizo y por qué.
- Mezclar ambos en un solo archivo generaba ruido.

**Consecuencias:** Cuando el plan se complete, se puede mover a `docs/archive/` o eliminar sin perder contexto histórico.

---

## Convenciones del documento

- Cada ADR tiene un **número secuencial** que no se reutiliza.
- **Fecha** de la decisión (no de último cambio).
- **Estado:** Aceptado · Propuesto · Deprecated · Superseded by ADR-XXX.
- Cuando una decisión se reemplaza, el ADR antiguo recibe `Superseded by ADR-NNN` y se mantiene en el archivo como referencia histórica.