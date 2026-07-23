import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className
      )}
    >
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-50)] flex items-center justify-center">
          <Icon className="w-6 h-6 text-[var(--color-primary)]" />
        </div>
      )}
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-[14px] text-[var(--color-text-secondary)] max-w-sm text-pretty">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}