import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--color-surface)] rounded-xl",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:animate-[shimmer_1.6s_infinite]",
        className
      )}
    />
  );
}

export function VehicleRowSkeleton() {
  return (
    <tr className="border-b border-[var(--color-border)]">
      <td className="py-3 pl-4 pr-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-16 h-12 rounded-lg" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </td>
      <td className="py-3 px-3">
        <Skeleton className="h-4 w-12" />
      </td>
      <td className="py-3 px-3">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="py-3 px-3">
        <Skeleton className="h-4 w-16" />
      </td>
      <td className="py-3 px-3">
        <Skeleton className="h-6 w-20 rounded-full" />
      </td>
      <td className="py-3 px-3">
        <Skeleton className="h-4 w-16" />
      </td>
      <td className="py-3 pr-4 pl-3">
        <div className="flex gap-1 justify-end">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="w-8 h-8 rounded-lg" />
        </div>
      </td>
    </tr>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] h-10" />
      <table className="w-full text-left">
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <VehicleRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}