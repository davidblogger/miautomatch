"use client";

import Link from "next/link";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { useVehicleStore } from "@/lib/vehicle-store";

export default function EditarVehiculoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getById, update } = useVehicleStore();
  const router = useRouter();
  const vehicle = getById(id);

  useEffect(() => {
    if (!vehicle) router.replace("/vehiculos");
  }, [vehicle, router]);

  if (!vehicle) return null;

  return (
    <div className="space-y-6">
      <Link
        href="/vehiculos"
        className="inline-flex items-center gap-2 text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al inventario
      </Link>

      <header>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
          Editando
        </span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] text-balance">
          {vehicle.brand} {vehicle.model}
        </h1>
        <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] max-w-xl text-pretty">
          Actualiza la información del vehículo. Los cambios se reflejan de inmediato en el
          inventario.
        </p>
      </header>

      <VehicleForm
        initial={vehicle}
        onSubmit={(data) => update(id, data)}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}