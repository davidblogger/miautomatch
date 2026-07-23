"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UserForm } from "@/components/admin/UserForm";
import { useUserStore } from "@/lib/user-store";

export default function NuevoUsuarioPage() {
  const { create } = useUserStore();

  return (
    <div className="space-y-6">
      <Link
        href="/usuarios"
        className="inline-flex items-center gap-2 text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a usuarios
      </Link>

      <header>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
          Gestión · Usuarios
        </span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] text-balance">
          Nuevo usuario
        </h1>
      </header>

      <UserForm onSubmit={create} submitLabel="Crear usuario" />
    </div>
  );
}
