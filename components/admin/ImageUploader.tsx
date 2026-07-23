"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, GripVertical, ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export function ImageUploader({
  value,
  onChange,
  max = 8,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addUrl(url: string) {
    if (!url.trim()) return;
    if (value.includes(url)) {
      setError("Esta imagen ya está en la galería");
      return;
    }
    if (value.length >= max) {
      setError(`Máximo ${max} imágenes`);
      return;
    }
    onChange([...value, url]);
    setError(null);
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files).slice(0, max - value.length).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") addUrl(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  function move(idx: number, dir: -1 | 1) {
    const next = [...value];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "w-full rounded-2xl border-2 border-dashed transition-all p-8 text-center",
          dragging
            ? "border-[var(--color-primary)] bg-[var(--color-primary-50)] shadow-[0_0_0_4px_rgba(1,68,119,0.08)]"
            : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/40"
        )}
      >
        <div className="w-12 h-12 rounded-xl bg-white border border-[var(--color-border)] mx-auto flex items-center justify-center">
          <Upload className="w-5 h-5 text-[var(--color-primary)]" />
        </div>
        <p className="mt-4 text-[14px] font-medium text-[var(--color-text-primary)]">
          Arrastra imágenes o haz click para subir
        </p>
        <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">
          PNG, JPG o WebP hasta {max} imágenes
        </p>
      </button>

      <div className="mt-4">
        <UrlInput onAdd={addUrl} />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-[12px] text-rose-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {value.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          {value.map((url, i) => (
            <motion.div
              key={url + i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative group aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-primary-50)] border border-[var(--color-border)]"
            >
              <Image
                src={url}
                alt={`Imagen ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 200px"
                className="object-cover"
                unoptimized={url.startsWith("data:")}
              />
              {i === 0 && (
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-medium uppercase tracking-wider">
                  Portada
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Mover arriba"
                  className="w-7 h-7 rounded-full bg-white/95 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] disabled:opacity-40"
                >
                  <GripVertical className="w-3.5 h-3.5 -rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  aria-label="Eliminar"
                  className="w-7 h-7 rounded-full bg-white/95 flex items-center justify-center text-rose-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {value.length === 0 && (
        <p className="mt-3 text-[12px] text-[var(--color-text-muted)] flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5" />
          Sin imágenes. La primera será la portada.
        </p>
      )}
    </div>
  );
}

function UrlInput({ onAdd }: { onAdd: (url: string) => void }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (url.trim()) {
      onAdd(url.trim());
      setUrl("");
      setOpen(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[12px] text-[var(--color-primary)] hover:underline"
      >
        + Agregar por URL
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://images.unsplash.com/..."
        className="flex-1 h-10 px-4 rounded-full bg-white border border-[var(--color-border)] text-[13px] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all"
      />
      <button
        type="submit"
        className="h-10 px-4 rounded-full bg-[var(--color-primary)] text-white text-[13px] font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
      >
        Agregar
      </button>
    </form>
  );
}