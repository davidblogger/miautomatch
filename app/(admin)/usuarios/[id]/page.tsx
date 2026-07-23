"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { UserForm } from "@/components/admin/UserForm";
import { useUserStore } from "@/lib/user-store";
import { useToast } from "@/lib/toast-store";

export default function EditarUsuarioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getById, update, remove } = useUserStore();
  const router = useRouter();
  const { toast } = useToast();
  const user = getById(id);

  useEffect(() => {
    if (!user) router.replace("/usuarios");
  }, [user, router]);

  if (!user) return null;

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
          Editando
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] text-balance line-clamp-2">
          {user.name}
        </h1>
        <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] max-w-xl text-pretty">
          Actualiza la información, el rol o el estado del usuario.
        </p>
      </header>

      <UserForm
        initial={user}
        onSubmit={(data) => update(id, data)}
        onRemove={() => {
          remove(id);
          toast("Usuario eliminado", { description: user.name, variant: "success" });
          router.push("/usuarios");
        }}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}
