"use client";

import Link from "next/link";
import { ArrowUpRight, Car, Eye, Users, TrendingUp } from "lucide-react";
import { useVehicleStore } from "@/lib/vehicle-store";

const ACTIVITY_LABELS = {
  created: "publicó",
  updated: "actualizó",
  deleted: "eliminó",
  sold: "marcó como vendido",
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "ahora";
  if (mins < 60) return `hace ${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `hace ${hours}h`;
  return `hace ${Math.floor(hours / 24)}d`;
}

export default function DashboardPage() {
  const { vehicles, activities } = useVehicleStore();

  const total = vehicles.length;
  const published = vehicles.filter((v) => v.status === "published").length;
  const drafts = vehicles.filter((v) => v.status === "draft").length;
  const sold = vehicles.filter((v) => v.status === "sold").length;
  const financingCount = vehicles.filter((v) => v.acceptsFinancing).length;
  const avgPrice = Math.round(
    vehicles.reduce((acc, v) => acc + v.price, 0) / Math.max(1, vehicles.length)
  );

  const stats = [
    { label: "Vehículos publicados", value: published, trend: `de ${total}`, icon: Car, tone: "primary" as const },
    { label: "Aceptan financiamiento", value: financingCount, trend: `+${drafts} pendientes`, icon: Users, tone: "accent" as const },
    { label: "Vendidos este mes", value: sold, trend: "+12%", icon: TrendingUp, tone: "primary" as const },
    { label: "Precio promedio", value: `$${(avgPrice / 1000000).toFixed(1)}M`, trend: "CLP", icon: Eye, tone: "accent" as const },
  ];

  return (
    <div className="space-y-10">
      <header>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
          Vista general
        </span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] text-balance">
          Dashboard
        </h1>
        <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] max-w-xl text-pretty">
          Resumen de actividad, métricas clave y próximos pasos para tu plataforma.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="group bg-white border border-[var(--color-border)] rounded-2xl p-5 hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-md)] transition-all"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    k.tone === "primary"
                      ? "bg-[var(--color-primary-50)] text-[var(--color-primary)]"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-[var(--color-text-muted)] bg-[var(--color-surface)] px-2 py-0.5 rounded-full">
                  {k.trend}
                </span>
              </div>
              <div className="mt-5">
                <div className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] font-mono">
                  {k.value}
                </div>
                <div className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
                  {k.label}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white border border-[var(--color-border)] rounded-3xl p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Publicaciones por mes</h2>
              <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
                Vehículos creados en los últimos 6 meses
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
              Mensual
            </span>
          </div>

          <div className="h-64 flex items-end gap-3">
            {[3, 5, 8, 4, 6, 4].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-[var(--color-primary-50)] rounded-t-lg relative group">
                  <div
                    className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-t-lg transition-all"
                    style={{ height: `${(v / 8) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                  {["Jun", "Jul", "Ago", "Sep", "Oct", "Nov"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white border border-[var(--color-border)] rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold tracking-tight">Actividad reciente</h2>
            <Link href="/vehiculos" className="text-[12px] text-[var(--color-primary)] hover:underline">
              Ver todo
            </Link>
          </div>

          <ul className="space-y-4">
            {activities.slice(0, 6).map((a) => (
              <li key={a.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center text-[11px] font-semibold text-[var(--color-primary)] shrink-0">
                  {a.user[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-[var(--color-text-primary)] leading-snug">
                    <span className="font-semibold">{a.user}</span>{" "}
                    <span className="text-[var(--color-text-secondary)]">
                      {ACTIVITY_LABELS[a.type]}
                    </span>{" "}
                    <span className="font-medium truncate inline-block max-w-full align-bottom">
                      {a.vehicleLabel}
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--color-text-muted)] mt-1">
                    {timeAgo(a.timestamp)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-primary)] rounded-3xl p-8 text-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(27,90,138,0.6) 0%, transparent 50%)",
          }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              {drafts} vehículos pendientes de aprobación
            </h3>
            <p className="mt-1 text-[14px] text-white/70">
              Revisa y aprueba los nuevos ingresos para publicarlos en el inventario.
            </p>
          </div>
          <Link
            href="/vehiculos"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-[var(--color-primary)] font-medium text-[14px] hover:bg-white/95 transition-colors"
          >
            Revisar pendientes
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}