"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Bell, Search, ChevronRight } from "lucide-react";
import { useCurrentUser } from "@/lib/use-current-user";

function buildCrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = seg.charAt(0).toUpperCase() + seg.slice(1);
    return { label, href, last: i === segments.length - 1 };
  });
}

export function Topbar() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);
  const searchRef = useRef<HTMLInputElement>(null);
  const { user } = useCurrentUser();

  function getInitials(name: string) {
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-30 -mx-6 mb-6 px-6 py-4">
      <div className="absolute inset-0 bg-[var(--color-surface)]/80 backdrop-blur-xl border-b border-[var(--color-border)]" />
      <div className="relative flex items-center justify-between gap-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px]">
          {crumbs.map((c, i) => (
            <span key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />}
              <span
                className={
                  c.last
                    ? "font-semibold text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)]"
                }
              >
                {c.label}
              </span>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <label className="hidden md:flex items-center gap-2 h-10 px-4 rounded-full bg-white border border-[var(--color-border)] text-[13px] text-[var(--color-text-muted)] w-64 focus-within:border-[var(--color-primary)] focus-within:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all">
            <Search className="w-4 h-4" />
            <input
              ref={searchRef}
              type="search"
              placeholder="Buscar en el panel…"
              className="flex-1 bg-transparent outline-none placeholder:text-[var(--color-text-muted)]"
            />
            <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono text-[var(--color-text-muted)] bg-[var(--color-surface)] border border-[var(--color-border)] px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </label>

          <button
            aria-label="Notificaciones"
            className="relative w-10 h-10 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--color-primary)] ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2.5 pl-3 border-l border-[var(--color-border)]">
            <div className="hidden sm:block text-right leading-none">
              <div className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                {user?.name ?? "Cargando…"}
              </div>
              <div className="text-[11px] text-[var(--color-text-muted)] mt-1 capitalize">
                {user?.role ?? "—"}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary)] flex items-center justify-center text-white font-semibold text-sm ring-2 ring-white">
              {user ? getInitials(user.name) : "?"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}