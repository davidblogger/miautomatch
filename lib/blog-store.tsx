"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { BlogPost } from "@/lib/types";
import { BLOG_POSTS } from "@/lib/admin-data";

type BlogStore = {
  posts: BlogPost[];
  getById: (id: string) => BlogPost | undefined;
  getBySlug: (slug: string) => BlogPost | undefined;
  create: (data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) => BlogPost;
  update: (id: string, data: Partial<Omit<BlogPost, "id">>) => void;
  remove: (id: string) => void;
};

const BlogContext = createContext<BlogStore | null>(null);

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);

  const getById = useCallback((id: string) => posts.find((p) => p.id === id), [posts]);
  const getBySlug = useCallback(
    (slug: string) => posts.find((p) => p.slug === slug),
    [posts]
  );

  const create = useCallback(
    (data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): BlogPost => {
      const now = new Date().toISOString();
      const post: BlogPost = {
        ...data,
        id: `post-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
        publishedAt: data.status === "published" ? now : undefined,
      };
      setPosts((prev) => [post, ...prev]);
      return post;
    },
    []
  );

  const update = useCallback((id: string, data: Partial<Omit<BlogPost, "id">>) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const merged = { ...p, ...data, updatedAt: new Date().toISOString() };
        if (data.status === "published" && !merged.publishedAt) {
          merged.publishedAt = new Date().toISOString();
        }
        return merged;
      })
    );
  }, []);

  const remove = useCallback((id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value = useMemo<BlogStore>(
    () => ({ posts, getById, getBySlug, create, update, remove }),
    [posts, getById, getBySlug, create, update, remove]
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export function useBlogStore() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error("useBlogStore must be used inside BlogProvider");
  return ctx;
}