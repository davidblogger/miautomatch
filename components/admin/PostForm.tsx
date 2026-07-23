"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, Trash2, Plus, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { useToast } from "@/lib/toast-store";
import { BLOG_CATEGORIES } from "@/lib/admin-data";
import type { BlogPost } from "@/lib/types";

const DEFAULT_POST: Omit<BlogPost, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "Tecnología",
  tags: [],
  status: "draft",
  author: "David Méndez",
  readingTime: 2,
  featured: false,
  views: 0,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function estimateReading(text: string) {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
}

export function PostForm({
  initial,
  onSubmit,
  onRemove,
  submitLabel = "Publicar artículo",
}: {
  initial?: BlogPost;
  onSubmit: (data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) => void;
  onRemove?: () => void;
  submitLabel?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useState<Omit<BlogPost, "id" | "createdAt" | "updatedAt">>(
    initial ? { ...initial } : DEFAULT_POST
  );
  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const errors = {
    title: data.title.trim().length < 8,
    excerpt: data.excerpt.trim().length < 20,
    content: data.content.trim().length < 80,
    coverImage: !data.coverImage.trim(),
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const autoSlug = useMemo(() => slugify(data.title), [data.title]);
  const readingTime = useMemo(() => estimateReading(data.content), [data.content]);

  function update<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function addTag() {
    const tag = tagInput.trim();
    if (!tag || data.tags.includes(tag)) return;
    update("tags", [...data.tags, tag]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    update("tags", data.tags.filter((t) => t !== tag));
  }

  function handleSave(status: BlogPost["status"]) {
    setSubmitting(true);
    const final = { ...data, status, readingTime };
    onSubmit(final);
    const isDraft = status === "draft";
    toast(
      isDraft ? "Borrador guardado" : initial ? "Artículo actualizado" : "Artículo publicado",
      { description: data.title, variant: "success" }
    );
    setTimeout(() => router.push("/blog"), 350);
  }

  const inputCls =
    "w-full h-11 px-4 rounded-xl bg-white border border-[var(--color-border)] text-[14px] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all";

  return (
    <form className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 space-y-4">
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 space-y-5">
          <div>
            <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1">
              Título<span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Un titular claro y atractivo…"
              className={cn(inputCls, "mt-2 h-12 text-base font-medium", errors.title && "ring-2 ring-rose-200")}
            />
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
              <span>URL: /blog/{autoSlug || "tu-titulo-aqui"}</span>
              <span>{data.title.length} caracteres</span>
            </div>
          </div>

          <div>
            <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
              Slug personalizado
            </label>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => update("slug", slugify(e.target.value))}
              placeholder="se-genera-desde-el-titulo"
              className={cn(inputCls, "mt-2 font-mono")}
            />
          </div>

          <div>
            <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1">
              Extracto<span className="text-rose-500">*</span>
            </label>
            <textarea
              value={data.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              rows={3}
              placeholder="Resumen breve que se muestra en listados y previews (1-2 líneas)…"
              className={cn(
                "mt-2 w-full p-4 rounded-xl bg-white border border-[var(--color-border)] text-[14px] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all resize-none",
                errors.excerpt && "ring-2 ring-rose-200"
              )}
            />
            <div className="mt-1.5 text-[11px] text-[var(--color-text-muted)]">
              {data.excerpt.length} caracteres
            </div>
          </div>

          <div>
            <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1">
              Contenido<span className="text-rose-500">*</span>
            </label>
            <textarea
              value={data.content}
              onChange={(e) => update("content", e.target.value)}
              rows={16}
              placeholder="Escribe el artículo completo. Puedes usar Markdown…"
              className={cn(
                "mt-2 w-full p-4 rounded-xl bg-white border border-[var(--color-border)] text-[14px] leading-relaxed focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all resize-y font-mono",
                errors.content && "ring-2 ring-rose-200"
              )}
            />
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
              <span>{data.content.trim().split(/\s+/).filter(Boolean).length} palabras</span>
              <span>~{readingTime} min de lectura</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-32 self-start">
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            Portada
          </h3>
          {data.coverImage ? (
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[var(--color-primary-50)] border border-[var(--color-border)] group">
              <Image
                src={data.coverImage}
                alt="Portada"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => update("coverImage", "")}
                aria-label="Eliminar portada"
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <label className="block aspect-[16/9] rounded-xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40 transition-colors cursor-pointer text-center p-6">
              <input
                type="url"
                placeholder="https://…"
                onChange={(e) => update("coverImage", e.target.value)}
                className="w-full bg-transparent text-center text-[13px] outline-none placeholder:text-[var(--color-text-muted)]"
              />
              <p className="text-[11px] text-[var(--color-text-muted)] mt-2">Pega URL de imagen</p>
            </label>
          )}
        </div>

        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5 space-y-4">
          <div>
            <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
              Categoría
            </label>
            <select
              value={data.category}
              onChange={(e) => update("category", e.target.value)}
              className={cn(inputCls, "mt-2 cursor-pointer")}
            >
              {BLOG_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
              Tags
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Presiona Enter…"
                className={inputCls}
              />
              <button
                type="button"
                onClick={addTag}
                className="w-11 h-11 rounded-xl bg-[var(--color-primary-50)] text-[var(--color-primary)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {data.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                <AnimatePresence initial={false}>
                  {data.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary)] text-[12px] font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        aria-label={`Eliminar tag ${tag}`}
                        className="hover:text-[var(--color-primary-dark)]"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div>
            <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
              Autor
            </label>
            <input
              type="text"
              value={data.author}
              onChange={(e) => update("author", e.target.value)}
              className={cn(inputCls, "mt-2")}
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-[var(--color-border)]">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="w-4 h-4 accent-[var(--color-primary)]"
              />
              <span className="text-[13px] font-medium">Destacar en home</span>
            </label>
          </div>
        </div>

        {hasErrors && (
          <div className="flex items-start gap-2 p-4 rounded-xl bg-rose-50 border border-rose-100 text-[12px] text-rose-700">
            <span>Completa los campos obligatorios antes de publicar.</span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={hasErrors || submitting}
            className="h-12 rounded-full bg-[var(--color-primary)] text-white font-medium text-[14px] hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-[0_8px_24px_-8px_rgba(1,68,119,0.5)]"
          >
            <Save className="w-4 h-4" />
            {submitLabel}
          </button>
          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={submitting}
            className="h-11 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-[14px] hover:border-[var(--color-primary)] transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Guardar borrador
          </button>
          {initial && onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="h-11 rounded-full text-rose-600 font-medium text-[14px] hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar artículo
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push("/blog")}
            className="h-11 rounded-full text-[var(--color-text-secondary)] font-medium text-[14px] hover:text-[var(--color-text-primary)] transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}