"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, FileText, Star, Eye as EyeIcon } from "lucide-react";
import { FilterBar } from "@/components/admin/FilterBar";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { EmptyState } from "@/components/admin/EmptyState";
import { useBlogStore } from "@/lib/blog-store";
import { useToast } from "@/lib/toast-store";
import { cn } from "@/lib/cn";
import type { BlogPost } from "@/lib/types";

const STATUS_STYLES = {
  published: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  draft: "bg-amber-50 text-amber-700 border border-amber-100",
  archived: "bg-slate-100 text-slate-600 border border-slate-200",
};

const STATUS_LABELS = {
  published: "Publicado",
  draft: "Borrador",
  archived: "Archivado",
};

const SORT_OPTIONS = [
  { label: "Más recientes", value: "recent" },
  { label: "Más vistos", value: "views" },
  { label: "A → Z", value: "alpha" },
];

function formatDate(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatViews(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export function BlogView() {
  const { posts, remove } = useBlogStore();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("recent");
  const [toDelete, setToDelete] = useState<BlogPost | null>(null);

  const filtered = useMemo(() => {
    let list = [...posts];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (statusFilter !== "all") list = list.filter((p) => p.status === statusFilter);

    switch (sort) {
      case "views":
        list.sort((a, b) => b.views - a.views);
        break;
      case "alpha":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
    return list;
  }, [posts, search, statusFilter, sort]);

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
            Contenido
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] text-balance">
            Blog
          </h1>
          <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] max-w-xl text-pretty">
            {posts.length} artículos · {filtered.length} coinciden con tu búsqueda.
          </p>
        </div>
        <Link
          href="/blog/nuevo"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[var(--color-primary)] text-white font-medium text-[14px] hover:bg-[var(--color-primary-dark)] transition-colors shadow-[0_8px_24px_-8px_rgba(1,68,119,0.5)]"
        >
          <Plus className="w-4 h-4" />
          Nuevo artículo
        </Link>
      </header>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        filters={[
          {
            label: "Estado",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: "Todos", value: "all" },
              { label: "Publicado", value: "published" },
              { label: "Borrador", value: "draft" },
              { label: "Archivado", value: "archived" },
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

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-[var(--color-border)] rounded-2xl"
          >
            <EmptyState
              icon={FileText}
              title="Sin artículos"
              description="No encontramos artículos con los filtros actuales."
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
          <motion.div
            key="grid"
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
                className="group bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-lg)] transition-all flex flex-col"
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="relative aspect-[16/9] block overflow-hidden bg-[var(--color-primary-50)]"
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider",
                        STATUS_STYLES[post.status]
                      )}
                    >
                      {STATUS_LABELS[post.status]}
                    </span>
                    {post.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-[10px] font-medium uppercase tracking-wider">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        Top
                      </span>
                    )}
                  </div>
                </Link>

                <div className="flex-1 p-5 flex flex-col">
                  <div className="flex items-center gap-2 text-[11px] text-[var(--color-text-muted)] mb-2">
                    <span className="font-medium text-[var(--color-primary)]">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{post.readingTime} min</span>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-[13px] text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px] text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1">
                        <EyeIcon className="w-3 h-3" />
                        {formatViews(post.views)}
                      </span>
                      <span>·</span>
                      <span>{formatDate(post.publishedAt ?? post.updatedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/blog/${post.id}`}
                        aria-label="Editar"
                        className="w-7 h-7 rounded-md hover:bg-[var(--color-primary-50)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] flex items-center justify-center transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setToDelete(post)}
                        aria-label="Eliminar"
                        className="w-7 h-7 rounded-md hover:bg-rose-50 text-[var(--color-text-secondary)] hover:text-rose-600 flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) {
            remove(toDelete.id);
            toast("Artículo eliminado", {
              description: toDelete.title,
              variant: "success",
            });
          }
        }}
        title="¿Eliminar este artículo?"
        message={
          toDelete
            ? `Vas a eliminar "${toDelete.title}". Esta acción no se puede deshacer.`
            : ""
        }
      />
    </div>
  );
}