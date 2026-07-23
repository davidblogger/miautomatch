"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

type Option = { label: string; value: string };

export function FilterBar({
  search,
  onSearchChange,
  filters,
  className,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  filters: Array<{
    label: string;
    value: string;
    options: Option[];
    onChange: (v: string) => void;
  }>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass-strong rounded-2xl p-3 flex flex-wrap items-center gap-3",
        className
      )}
    >
      <div className="flex items-center gap-2 h-10 px-4 rounded-full bg-white border border-[var(--color-border)] focus-within:border-[var(--color-primary)] focus-within:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all flex-1 min-w-[220px]">
        <Search className="w-4 h-4 text-[var(--color-text-secondary)]" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por marca, modelo o versión…"
          className="flex-1 bg-transparent outline-none text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
        />
      </div>

      <div className="hidden md:flex items-center gap-1 flex-wrap">
        <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
        {filters.map((f) => (
          <select
            key={f.label}
            value={f.value}
            onChange={(e) => f.onChange(e.target.value)}
            className="h-10 px-3 rounded-full bg-white border border-[var(--color-border)] text-[13px] font-medium text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer transition-colors"
          >
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {f.label}: {o.label}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
}