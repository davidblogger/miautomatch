"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Inventario", href: "/inventario" },
  { label: "Comparador", href: "#" },
  { label: "Financiamiento", href: "#" },
  { label: "Nosotros", href: "#" },
  { label: "Contacto", href: "/contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 pt-4"
    >
      <Container className="!px-0">
        <div
          className={cn(
            "flex items-center justify-between h-16 px-4 sm:px-6 rounded-2xl transition-all duration-500",
            scrolled
              ? "glass-strong shadow-[var(--shadow-lg)]"
              : "bg-white/40 backdrop-blur-md border border-white/40"
          )}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/img/LOGO-WP.png"
              alt="Mi Auto Match"
              width={140}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors group"
              >
                {item.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="sm" href="/login">
              Ingresar
            </Button>
            <Button size="sm" href="/inventario">
              Buscar auto
            </Button>
          </div>

          <button
            aria-label="Menu"
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-primary-50)] text-[var(--color-primary)]"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-2"
            >
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-primary-50)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2 border-t border-[var(--color-border)]">
                <Button variant="ghost" size="sm" className="flex-1" href="/login">
                  Ingresar
                </Button>
                <Button size="sm" className="flex-1" href="/inventario">
                  Buscar
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
}
