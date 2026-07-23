"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VehicleForm } from "@/components/admin/VehicleForm";
import { useVehicleStore } from "@/lib/vehicle-store";

export default function NuevoVehiculoPage() {
  const { create } = useVehicleStore();

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
          Nuevo vehículo
        </span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] text-balance">
          Publicar vehículo
        </h1>
        <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] max-w-xl text-pretty">
          Completa los datos del vehículo. Podrás guardarlo como borrador y volver más tarde.
        </p>
      </header>

      <VehicleForm onSubmit={create} submitLabel="Publicar vehículo" />
    </div>
  );
}