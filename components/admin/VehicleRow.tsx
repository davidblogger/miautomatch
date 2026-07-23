"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatPrice, formatMileage } from "@/lib/cn";
import type { AdminVehicle } from "@/lib/types";

const STATUS_STYLES = {
  published: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  draft: "bg-amber-50 text-amber-700 border border-amber-100",
  sold: "bg-slate-100 text-slate-600 border border-slate-200",
};

const STATUS_LABELS = {
  published: "Publicado",
  draft: "Borrador",
  sold: "Vendido",
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "ahora";
  if (mins < 60) return `hace ${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `hace ${days}d`;
  return new Date(iso).toLocaleDateString("es-CL");
}

export function VehicleRow({
  vehicle,
  onDelete,
  index,
}: {
  vehicle: AdminVehicle;
  onDelete: (v: AdminVehicle) => void;
  index: number;
}) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.4) }}
      className="group border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-primary-50)]/40 transition-colors"
    >
      <td className="py-3 pl-4 pr-3">
        <Link href={`/vehiculos/${vehicle.id}`} className="flex items-center gap-3 group/link">
          <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-[var(--color-primary-50)] border border-[var(--color-border)] shrink-0">
            <Image
              src={vehicle.images[0]}
              alt={vehicle.model}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] truncate">
              {vehicle.brand}
            </div>
            <div className="font-semibold text-[14px] text-[var(--color-text-primary)] truncate group-hover/link:text-[var(--color-primary)] transition-colors">
              {vehicle.model}
            </div>
            {vehicle.version && (
              <div className="text-[12px] text-[var(--color-text-secondary)] truncate">
                {vehicle.version}
              </div>
            )}
          </div>
        </Link>
      </td>
      <td className="py-3 px-3 text-[13px] text-[var(--color-text-secondary)] font-mono whitespace-nowrap">
        {vehicle.year}
      </td>
      <td className="py-3 px-3 text-[13px] font-semibold font-mono text-[var(--color-text-primary)] whitespace-nowrap">
        {formatPrice(vehicle.price)}
      </td>
      <td className="py-3 px-3 text-[13px] text-[var(--color-text-secondary)] font-mono whitespace-nowrap">
        {formatMileage(vehicle.mileage)}
      </td>
      <td className="py-3 px-3">
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium",
            STATUS_STYLES[vehicle.status]
          )}
        >
          {STATUS_LABELS[vehicle.status]}
        </span>
      </td>
      <td className="py-3 px-3 text-[12px] text-[var(--color-text-muted)] whitespace-nowrap">
        {timeAgo(vehicle.updatedAt)}
      </td>
      <td className="py-3 pr-4 pl-3">
        <div className="flex items-center gap-1 justify-end">
          <Link
            href={`/vehiculo/${vehicle.id}`}
            target="_blank"
            aria-label="Ver"
            className="w-8 h-8 rounded-lg hover:bg-white text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] flex items-center justify-center transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={`/vehiculos/${vehicle.id}`}
            aria-label="Editar"
            className="w-8 h-8 rounded-lg hover:bg-white text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] flex items-center justify-center transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => onDelete(vehicle)}
            aria-label="Eliminar"
            className="w-8 h-8 rounded-lg hover:bg-rose-50 text-[var(--color-text-secondary)] hover:text-rose-600 flex items-center justify-center transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}