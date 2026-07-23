import { Car, Plus } from "lucide-react";

export default function VehiculosPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
            Inventario
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] text-balance">
            Vehículos
          </h1>
          <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] max-w-xl text-pretty">
            Gestiona el inventario, edita publicaciones y aprueba nuevos ingresos.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[var(--color-primary)] text-white font-medium text-[14px] hover:bg-[var(--color-primary-dark)] transition-colors shadow-[0_8px_24px_-8px_rgba(1,68,119,0.5)]">
          <Plus className="w-4 h-4" />
          Nuevo vehículo
        </button>
      </header>

      <section className="bg-white border border-[var(--color-border)] rounded-3xl p-12 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-50)] flex items-center justify-center mx-auto">
          <Car className="w-6 h-6 text-[var(--color-primary)]" />
        </div>
        <h2 className="mt-5 text-xl font-semibold tracking-tight">
          Módulo en construcción
        </h2>
        <p className="mt-2 text-[14px] text-[var(--color-text-secondary)] max-w-md mx-auto text-pretty">
          Próximamente: tabla con filtros, creación de vehículos con galería de imágenes y
          gestión de estados.
        </p>
      </section>
    </div>
  );
}