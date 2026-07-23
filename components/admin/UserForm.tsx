"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, Heart, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { useToast } from "@/lib/toast-store";
import { useVehicleStore } from "@/lib/vehicle-store";
import type { AdminUser, UserRole, UserStatus } from "@/lib/types";

const DEFAULT_USER: Omit<AdminUser, "id" | "joinedAt"> = {
  role: "user",
  name: "",
  email: "",
  phone: "",
  city: "",
  status: "pending",
  favoriteVehicleIds: [],
};

export function UserForm({
  initial,
  onSubmit,
  onRemove,
  submitLabel = "Guardar usuario",
}: {
  initial?: AdminUser;
  onSubmit: (data: Omit<AdminUser, "id" | "joinedAt">) => void;
  onRemove?: () => void;
  submitLabel?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { vehicles } = useVehicleStore();
  const [data, setData] = useState<Omit<AdminUser, "id" | "joinedAt">>(
    initial ? { ...initial } : DEFAULT_USER
  );
  const [submitting, setSubmitting] = useState(false);
  const [favSearch, setFavSearch] = useState("");

  const errors = {
    name: data.name.trim().length < 2,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email),
  };
  const hasErrors = Object.values(errors).some(Boolean);

  function update<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleFavorite(vehicleId: string) {
    const ids = data.favoriteVehicleIds ?? [];
    if (ids.includes(vehicleId)) {
      update("favoriteVehicleIds", ids.filter((id) => id !== vehicleId));
    } else {
      update("favoriteVehicleIds", [...ids, vehicleId]);
    }
  }

  function handleSave() {
    setSubmitting(true);
    onSubmit(data);
    toast(initial ? "Usuario actualizado" : "Usuario creado", {
      description: data.name,
      variant: "success",
    });
    setTimeout(() => router.push("/usuarios"), 350);
  }

  const inputCls =
    "w-full h-11 px-4 rounded-xl bg-white border border-[var(--color-border)] text-[14px] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all";

  const favoriteVehicles = vehicles.filter((v) =>
    (data.favoriteVehicleIds ?? []).includes(v.id)
  );
  const filteredVehicles = vehicles.filter(
    (v) =>
      !favSearch ||
      v.brand.toLowerCase().includes(favSearch.toLowerCase()) ||
      v.model.toLowerCase().includes(favSearch.toLowerCase())
  );

  return (
    <form className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 space-y-4">
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 space-y-5">
          <div>
            <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1">
              Nombre<span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Nombre completo"
              className={cn(inputCls, "mt-2", errors.name && "ring-2 ring-rose-200")}
            />
          </div>

          <div>
            <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1">
              Email<span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="correo@ejemplo.com"
              className={cn(inputCls, "mt-2", errors.email && "ring-2 ring-rose-200")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                Teléfono
              </label>
              <input
                type="tel"
                value={data.phone ?? ""}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+56 9 1234 5678"
                className={cn(inputCls, "mt-2")}
              />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                Ciudad
              </label>
              <input
                type="text"
                value={data.city ?? ""}
                onChange={(e) => update("city", e.target.value)}
                placeholder="Santiago"
                className={cn(inputCls, "mt-2")}
              />
            </div>
          </div>
        </div>

        {data.role === "user" && (
          <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
                Favoritos
              </h3>
              <span className="text-[11px] text-[var(--color-text-muted)]">
                ({favoriteVehicles.length} vehículos)
              </span>
            </div>

            {favoriteVehicles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {favoriteVehicles.map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary-50)] transition-colors"
                  >
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-[var(--color-primary-50)] shrink-0">
                      {v.images[0] ? (
                        <Image
                          src={v.images[0]}
                          alt={`${v.brand} ${v.model}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[var(--color-primary-50)]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-[var(--color-text-primary)] truncate">
                        {v.brand} {v.model}
                      </div>
                      <div className="text-[11px] text-[var(--color-text-muted)]">
                        {v.year} · {(v.price / 1000000).toFixed(1)}M
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(v.id)}
                      aria-label="Quitar de favoritos"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-[var(--color-text-muted)]">
                Aún no tiene vehículos favoritos.
              </p>
            )}

            <div className="relative">
              <input
                type="text"
                value={favSearch}
                onChange={(e) => setFavSearch(e.target.value)}
                placeholder="Buscar vehículo para agregar…"
                className={cn(inputCls, "pr-10")}
              />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
            </div>

            <AnimatePresence>
              {favSearch && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="max-h-48 overflow-y-auto rounded-xl border border-[var(--color-border)] bg-white">
                    {filteredVehicles.length === 0 ? (
                      <p className="p-4 text-[13px] text-[var(--color-text-muted)] text-center">
                        Sin resultados
                      </p>
                    ) : (
                      filteredVehicles.map((v) => {
                        const isFav = (data.favoriteVehicleIds ?? []).includes(v.id);
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => !isFav && toggleFavorite(v.id)}
                            disabled={isFav}
                            className={cn(
                              "w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--color-surface)] transition-colors",
                              isFav && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            <div className="relative w-12 h-9 rounded-lg overflow-hidden bg-[var(--color-primary-50)] shrink-0">
                              {v.images[0] ? (
                                <Image
                                  src={v.images[0]}
                                  alt={`${v.brand} ${v.model}`}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              ) : null}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[13px] font-medium truncate">
                                {v.brand} {v.model}
                              </div>
                              <div className="text-[11px] text-[var(--color-text-muted)]">
                                {v.year}
                              </div>
                            </div>
                            {isFav ? (
                              <span className="text-[11px] text-[var(--color-primary)] font-medium">
                                Ya favorito
                              </span>
                            ) : (
                              <span className="text-[11px] text-[var(--color-text-muted)]">
                                Agregar
                              </span>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-32 self-start">
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 space-y-4">
          <div>
            <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
              Rol
            </label>
            <select
              value={data.role}
              onChange={(e) => update("role", e.target.value as UserRole)}
              className={cn(inputCls, "mt-2 cursor-pointer")}
            >
              <option value="user">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div>
            <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
              Estado
            </label>
            <select
              value={data.status}
              onChange={(e) => update("status", e.target.value as UserStatus)}
              className={cn(inputCls, "mt-2 cursor-pointer")}
            >
              <option value="active">Activo</option>
              <option value="pending">Pendiente</option>
              <option value="suspended">Suspendido</option>
            </select>
          </div>

          {initial && (
            <div className="pt-2 border-t border-[var(--color-border)]">
              <div className="text-[11px] text-[var(--color-text-muted)] space-y-1">
                <div>
                  Registrado:{" "}
                  {new Date(initial.joinedAt).toLocaleDateString("es-CL", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                {initial.lastActiveAt && (
                  <div>
                    Último acceso:{" "}
                    {new Date(initial.lastActiveAt).toLocaleDateString("es-CL", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {hasErrors && (
          <div className="flex items-start gap-2 p-4 rounded-xl bg-rose-50 border border-rose-100 text-[12px] text-rose-700">
            <span>Completa los campos obligatorios.</span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={hasErrors || submitting}
            className="h-12 rounded-full bg-[var(--color-primary)] text-white font-medium text-[14px] hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-[0_8px_24px_-8px_rgba(1,68,119,0.5)]"
          >
            <Save className="w-4 h-4" />
            {submitLabel}
          </button>
          {initial && onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="h-11 rounded-full text-rose-600 font-medium text-[14px] hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar usuario
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push("/usuarios")}
            className="h-11 rounded-full text-[var(--color-text-secondary)] font-medium text-[14px] hover:text-[var(--color-text-primary)] transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}
