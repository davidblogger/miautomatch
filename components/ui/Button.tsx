"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "glass" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 font-medium tracking-tight rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white shadow-[0_8px_24px_-8px_rgba(1,68,119,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(1,68,119,0.7)] hover:bg-[var(--color-primary-dark)] hover:-translate-y-0.5",
  secondary:
    "bg-white text-[var(--color-primary)] border border-[var(--color-border)] shadow-sm hover:border-[var(--color-primary)] hover:shadow-md hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary-50)]",
  glass:
    "glass text-[var(--color-primary)] hover:bg-white/90 hover:-translate-y-0.5",
  outline:
    "bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
};

type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  variant?: Variant;
  size?: Size;
  href?: string;
  children?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const classes = cn(base, sizes[size], variants[variant], className);

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {children as React.ReactNode}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
