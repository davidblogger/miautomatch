import { cn } from "@/lib/cn";

export function GradientBlob({
  className,
  color = "primary",
}: {
  className?: string;
  color?: "primary" | "accent";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl opacity-60",
        color === "primary" &&
          "bg-[radial-gradient(circle,rgba(27,90,138,0.45)_0%,transparent_70%)]",
        color === "accent" &&
          "bg-[radial-gradient(circle,rgba(214,234,251,0.7)_0%,transparent_70%)]",
        className
      )}
    />
  );
}
