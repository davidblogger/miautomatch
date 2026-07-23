"use client";

import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { PostForm } from "@/components/admin/PostForm";
import { useBlogStore } from "@/lib/blog-store";
import { useToast } from "@/lib/toast-store";

export default function EditarPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getById, update, remove } = useBlogStore();
  const router = useRouter();
  const { toast } = useToast();
  const post = getById(id);

  useEffect(() => {
    if (!post) router.replace("/blog");
  }, [post, router]);

  if (!post) return null;

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
          Editando
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] text-balance line-clamp-2">
          {post.title}
        </h1>
        <p className="mt-3 text-[15px] text-[var(--color-text-secondary)] max-w-xl text-pretty">
          Actualiza el contenido, los tags o el estado de publicación.
        </p>
      </header>

      <PostForm
        initial={post}
        onSubmit={(data) => update(id, data)}
        onRemove={() => {
          remove(id);
          toast("Artículo eliminado", { description: post.title, variant: "success" });
          router.push("/blog");
        }}
        submitLabel="Guardar cambios"
      />
    </div>
  );
}