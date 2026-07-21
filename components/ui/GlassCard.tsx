import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  strong?: boolean;
};

export function GlassCard({
  className,
  children,
  strong = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(strong ? "glass-strong" : "glass", "rounded-2xl", className)}
      {...props}
    >
      {children}
    </div>
  );
}
