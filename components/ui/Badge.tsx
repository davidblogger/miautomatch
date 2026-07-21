import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Variant = "default" | "primary" | "outline" | "glass" | "dark";

const variants: Record<Variant, string> = {
  default: "bg-[var(--color-primary-50)] text-[var(--color-primary)] border border-transparent",
  primary: "bg-[var(--color-primary)] text-white",
  outline: "bg-transparent border border-[var(--color-border)] text-[var(--color-text-secondary)]",
  glass: "glass text-[var(--color-primary)]",
  dark: "bg-[var(--color-ink)] text-white",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
