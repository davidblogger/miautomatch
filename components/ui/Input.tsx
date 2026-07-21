"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  trailing?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, trailing, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex items-center gap-2 h-12 px-4 rounded-full",
          "glass",
          "transition-all duration-300",
          "focus-within:bg-white/95 focus-within:border-[var(--color-primary)] focus-within:shadow-[0_0_0_4px_rgba(1,68,119,0.08)]",
          className
        )}
      >
        {icon && <span className="text-[var(--color-text-secondary)] shrink-0">{icon}</span>}
        <input
          ref={ref}
          className="flex-1 bg-transparent outline-none border-none text-[15px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
          {...props}
        />
        {trailing && <span className="shrink-0">{trailing}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
