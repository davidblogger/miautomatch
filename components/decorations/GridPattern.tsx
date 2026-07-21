export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)] ${className}`}
    />
  );
}
