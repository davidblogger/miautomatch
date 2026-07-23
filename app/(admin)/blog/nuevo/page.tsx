"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostForm } from "@/components/admin/PostForm";
import { useBlogStore } from "@/lib/blog-store";

export default function NuevoPostPage() {
  const { create } = useBlogStore();

  return (
    <div className="space-y-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al blog
      </Link>

      <header>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
          Nuevo artículo
        </span>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] text-balance">
          Crear artículo
        </h1>
        <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] max-w-xl text-pretty">
          Escribe un artículo, asigna categoría y publica cuando esté listo.
        </p>
      </header>

      <PostForm onSubmit={create} />
    </div>
  );
}