import { cn } from "@/lib/cn";

export function StatCard({
  label,
  value,
  trend,
  icon: Icon,
  tone = "primary",
  className,
}: {
  label: string;
  value: string | number;
  trend?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "primary" | "accent" | "warn";
  className?: string;
}) {
  const toneClasses =
    tone === "primary"
      ? "bg-[var(--color-primary-50)] text-[var(--color-primary)]"
      : tone === "warn"
      ? "bg-amber-50 text-amber-700"
      : "bg-emerald-50 text-emerald-700";

  return (
    <div
      className={cn(
        "group bg-white border border-[var(--color-border)] rounded-2xl p-5 hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-md)] transition-all",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", toneClasses)}>
          <Icon className="w-4 h-4" />
        </div>
        {trend && (
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-5">
        <div className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] font-mono">
          {value}
        </div>
        <div className="mt-1 text-[13px] text-[var(--color-text-secondary)]">{label}</div>
      </div>
    </div>
  );
}