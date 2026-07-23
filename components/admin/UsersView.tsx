"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, UserCheck, UserX, MoreHorizontal, Shield, Users as UsersIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import { useUserStore } from "@/lib/user-store";
import { useToast } from "@/lib/toast-store";
import type { AdminUser, UserRole, UserStatus } from "@/lib/types";
import { cn } from "@/lib/cn";

const TABS: { label: string; value: UserRole }[] = [
  { label: "Clientes", value: "user" },
  { label: "Administradores", value: "admin" },
];

const STATUS_LABELS: Record<UserStatus, string> = {
  active: "Activo",
  pending: "Pendiente",
  suspended: "Suspendido",
};

function StatusBadge({ status }: { status: UserStatus }) {
  const styles: Record<UserStatus, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-100",
    pending: "bg-amber-50 text-amber-700 border-amber-100",
    suspended: "bg-rose-50 text-rose-700 border-rose-100",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border",
        styles[status]
      )}
    >
      {status === "active" && <UserCheck className="w-3 h-3" />}
      {status === "suspended" && <UserX className="w-3 h-3" />}
      {STATUS_LABELS[status]}
    </span>
  );
}

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const colors = [
    "from-rose-400 to-rose-600",
    "from-violet-400 to-violet-600",
    "from-cyan-400 to-cyan-600",
    "from-amber-400 to-amber-600",
    "from-emerald-400 to-emerald-600",
    "from-blue-400 to-blue-600",
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const sizeClass = size === "sm" ? "w-8 h-8 text-[11px]" : "w-10 h-10 text-[13px]";
  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br flex items-center justify-center text-white font-semibold shrink-0",
        colors[colorIndex],
        sizeClass
      )}
    >
      {initials}
    </div>
  );
}

export function UsersView() {
  const { users, remove } = useUserStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<UserRole>("user");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toDelete, setToDelete] = useState<AdminUser | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = users.filter((u) => u.role === activeTab);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.city?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      list = list.filter((u) => u.status === statusFilter);
    }
    return list;
  }, [users, activeTab, search, statusFilter]);

  const tabCount = (role: UserRole) => users.filter((u) => u.role === role).length;

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
            Gestión
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] text-balance">
            Usuarios
          </h1>
          <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] max-w-xl text-pretty">
            {users.length} usuarios en total · {filtered.length} coinciden con tu búsqueda.
          </p>
        </div>
        <Link
          href="/usuarios/nuevo"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[var(--color-primary)] text-white font-medium text-[14px] hover:bg-[var(--color-primary-dark)] transition-colors shadow-[0_8px_24px_-8px_rgba(1,68,119,0.5)]"
        >
          <Plus className="w-4 h-4" />
          Nuevo usuario
        </Link>
      </header>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 h-11 px-4 rounded-full bg-white border border-[var(--color-border)] focus-within:border-[var(--color-primary)] focus-within:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all flex-1 max-w-md">
          <Search className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, email o ciudad…"
            className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[var(--color-text-muted)]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-11 px-3 rounded-full bg-white border border-[var(--color-border)] text-[13px] font-medium focus:outline-none focus:border-[var(--color-primary)] cursor-pointer transition-colors"
        >
          <option value="all">Todos los estados</option>
          <option value="active">Activo</option>
          <option value="pending">Pendiente</option>
          <option value="suspended">Suspendido</option>
        </select>
      </div>

      <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden">
        <div className="flex border-b border-[var(--color-border)]">
          {TABS.map((tab) => {
            const count = tabCount(tab.value);
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className="relative flex items-center gap-2 px-6 py-3.5 text-[14px] font-medium transition-colors"
              >
                {tab.value === "admin" ? (
                  <Shield className="w-4 h-4" />
                ) : (
                  <UsersIcon className="w-4 h-4" />
                )}
                <span>{tab.label}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--color-surface)] text-[var(--color-text-muted)]">
                  {count}
                </span>
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="users-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState
                icon={UsersIcon}
                title="Sin resultados"
                description="No encontramos usuarios con los filtros actuales."
                action={
                  <button
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("all");
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
                      Usuario
                    </th>
                    {activeTab === "user" && (
                      <th className="py-3 px-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                        Teléfono
                      </th>
                    )}
                    <th className="py-3 px-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                      Email
                    </th>
                    {activeTab === "user" && (
                      <th className="py-3 px-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                        Ciudad
                      </th>
                    )}
                    <th className="py-3 px-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                      Estado
                    </th>
                    <th className="py-3 px-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">
                      Registro
                    </th>
                    <th className="py-3 pr-4 pl-3 text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium text-right">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => (
                    <motion.tr
                      key={u.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.25 }}
                      className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface)]/50 transition-colors"
                    >
                      <td className="py-3 pl-4 pr-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={u.name} />
                          <span className="text-[14px] font-medium text-[var(--color-text-primary)]">
                            {u.name}
                          </span>
                        </div>
                      </td>
                      {activeTab === "user" && (
                        <td className="py-3 px-3">
                          <span className="text-[13px] text-[var(--color-text-secondary)]">
                            {u.phone ?? "—"}
                          </span>
                        </td>
                      )}
                      <td className="py-3 px-3">
                        <span className="text-[13px] text-[var(--color-text-secondary)]">
                          {u.email}
                        </span>
                      </td>
                      {activeTab === "user" && (
                        <td className="py-3 px-3">
                          <span className="text-[13px] text-[var(--color-text-secondary)]">
                            {u.city ?? "—"}
                          </span>
                        </td>
                      )}
                      <td className="py-3 px-3">
                        <StatusBadge status={u.status} />
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[13px] text-[var(--color-text-muted)]">
                          {new Date(u.joinedAt).toLocaleDateString("es-CL", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="py-3 pr-4 pl-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/usuarios/${u.id}`}
                            className="h-8 px-3 rounded-lg text-[13px] font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary-50)] transition-colors flex items-center"
                          >
                            Editar
                          </Link>
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenu(openMenu === u.id ? null : u.id)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] transition-colors"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                            {openMenu === u.id && (
                              <>
                                <div
                                  className="fixed inset-0 z-10"
                                  onClick={() => setOpenMenu(null)}
                                />
                                <div className="absolute right-0 top-full mt-1 z-20 w-40 rounded-xl bg-white border border-[var(--color-border)] shadow-lg py-1">
                                  <Link
                                    href={`/usuarios/${u.id}`}
                                    className="flex items-center gap-2 px-3 py-2 text-[13px] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
                                    onClick={() => setOpenMenu(null)}
                                  >
                                    Ver perfil
                                  </Link>
                                  <button
                                    onClick={() => {
                                      setToDelete(u);
                                      setOpenMenu(null);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-rose-600 hover:bg-rose-50 transition-colors"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) {
            remove(toDelete.id);
            toast("Usuario eliminado", {
              description: `${toDelete.name} fue removido.`,
              variant: "success",
            });
          }
        }}
        title="¿Eliminar este usuario?"
        message={
          toDelete
            ? `Vas a eliminar a "${toDelete.name}" (${toDelete.email}). Esta acción no se puede deshacer.`
            : ""
        }
      />
    </div>
  );
}
