"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, ChevronLeft, ChevronRight, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterBar } from "@/components/admin/FilterBar";
import { VehicleRow } from "@/components/admin/VehicleRow";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import { useVehicleStore } from "@/lib/vehicle-store";
import { useToast } from "@/lib/toast-store";
import type { AdminVehicle } from "@/lib/types";

const PAGE_SIZE = 8;

const SORT_OPTIONS = [
  { label: "Más recientes", value: "recent" },
  { label: "Más antiguos", value: "oldest" },
  { label: "Precio: mayor a menor", value: "price_desc" },
  { label: "Precio: menor a mayor", value: "price_asc" },
  { label: "Mayor kilometraje", value: "mileage_desc" },
];

export function VehiculosView() {
  const { vehicles, remove } = useVehicleStore();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fuelFilter, setFuelFilter] = useState("all");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState<AdminVehicle | null>(null);

  const filtered = useMemo(() => {
    let list = [...vehicles];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (v) =>
          v.brand.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.version?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") list = list.filter((v) => v.status === statusFilter);
    if (fuelFilter !== "all") list = list.filter((v) => v.fuel === fuelFilter);

    switch (sort) {
      case "oldest":
        list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "mileage_desc":
        list.sort((a, b) => b.mileage - a.mileage);
        break;
      default:
        list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
    return list;
  }, [vehicles, search, statusFilter, fuelFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
            Inventario
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] text-balance">
            Vehículos
          </h1>
          <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] max-w-xl text-pretty">
            {vehicles.length} vehículos en total · {filtered.length} coinciden con tu búsqueda.
          </p>
        </div>
        <Link
          href="/vehiculos/nuevo"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[var(--color-primary)] text-white font-medium text-[14px] hover:bg-[var(--color-primary-dark)] transition-colors shadow-[0_8px_24px_-8px_rgba(1,68,119,0.5)]"
        >
          <Plus className="w-4 h-4" />
          Nuevo vehículo
        </Link>
      </header>

      <FilterBar
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        filters={[
          {
            label: "Estado",
            value: statusFilter,
            onChange: (v) => {
              setStatusFilter(v);
              setPage(1);
            },
            options: [
              { label: "Todos", value: "all" },
              { label: "Publicado", value: "published" },
              { label: "Borrador", value: "draft" },
              { label: "Vendido", value: "sold" },
            ],
          },
          {
            label: "Combustible",
            value: fuelFilter,
            onChange: (v) => {
              setFuelFilter(v);
              setPage(1);
            },
            options: [
              { label: "Todos", value: "all" },
              { label: "Gasolina", value: "Gasolina" },
              { label: "Diésel", value: "Diésel" },
              { label: "Híbrido", value: "Híbrido" },
              { label: "Eléctrico", value: "Eléctrico" },
            ],
          },
          {
            label: "Ordenar",
            value: sort,
            onChange: setSort,
            options: SORT_OPTIONS,
          },
        ]}
      />

      <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState
                icon={Car}
                title="Sin resultados"
                description="No encontramos vehículos con los filtros actuales. Prueba ajustando la búsqueda."
                action={
                  <button
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("all");
                      setFuelFilter("all");
                      setPage(1);
                    }}
                    className="text-[13px] font-medium text-[var(--color-primary)] hover:underline"
                  >
                    Limpiar filtros
                  </button>
                }
              />
            </motion.div>
          ) : (
            <motion.div key="table" layout className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                    <th className="py-3 pl-4 pr-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                      Vehículo
                    </th>
                    <th className="py-3 px-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                      Año
                    </th>
                    <th className="py-3 px-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                      Precio
                    </th>
                    <th className="py-3 px-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                      Kilometraje
                    </th>
                    <th className="py-3 px-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                      Estado
                    </th>
                    <th className="py-3 px-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                      Actualizado
                    </th>
                    <th className="py-3 pr-4 pl-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium text-right">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.map((v, i) => (
                    <VehicleRow
                      key={v.id}
                      vehicle={v}
                      index={i}
                      onDelete={(vehicle) => setToDelete(vehicle)}
                    />
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {filtered.length > 0 && (
        <div className="flex items-center justify-between text-[13px] text-[var(--color-text-secondary)]">
          <div>
            Mostrando {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} de{" "}
            {filtered.length}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Anterior"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 font-mono">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Siguiente"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) {
            remove(toDelete.id);
            toast("Vehículo eliminado", {
              description: `${toDelete.brand} ${toDelete.model} fue removido del inventario.`,
              variant: "success",
            });
          }
        }}
        title="¿Eliminar este vehículo?"
        message={
          toDelete
            ? `Vas a eliminar "${toDelete.brand} ${toDelete.model}". Esta acción no se puede deshacer.`
            : ""
        }
      />
    </div>
  );
}