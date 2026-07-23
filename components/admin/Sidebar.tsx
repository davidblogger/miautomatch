"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Car,
  FileText,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Vehículos", href: "/vehiculos", icon: Car },
  { label: "Blog", href: "#", icon: FileText, disabled: true },
  { label: "Usuarios", href: "#", icon: Users, disabled: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[280px] shrink-0 h-screen sticky top-0 border-r border-white/5">
      <div className="absolute inset-0 bg-[var(--color-ink)]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(27,90,138,0.4), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative flex flex-col h-full p-5">
        <Link href="/dashboard" className="flex items-center gap-2 px-2 py-2">
          <Image
            src="/img/LOGO-WP-WHITE.png"
            alt="Mi Auto Match"
            width={140}
            height={36}
            className="h-8 w-auto object-contain"
          />
        </Link>

        <div className="mt-2 px-3 text-[10px] uppercase tracking-[0.25em] text-white/30 font-medium">
          Administración
        </div>

        <nav className="mt-4 flex-1 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active =
              !item.disabled && (pathname === item.href || pathname.startsWith(item.href + "/"));

            return (
              <Link
                key={item.label}
                href={item.disabled ? "#" : item.href}
                aria-disabled={item.disabled}
                className={`group relative flex items-center gap-3 h-11 px-3 rounded-xl text-[14px] font-medium transition-colors ${
                  item.disabled
                    ? "text-white/25 cursor-not-allowed pointer-events-none"
                    : active
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/10"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <Icon
                  className={`relative w-4 h-4 transition-colors ${
                    active ? "text-[var(--color-primary-light)]" : ""
                  }`}
                />
                <span className="relative">{item.label}</span>
                {item.disabled && (
                  <span className="relative ml-auto text-[10px] uppercase tracking-wider text-white/25 bg-white/5 px-2 py-0.5 rounded-full">
                    Pronto
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/5 pt-4 space-y-1">
          <Link
            href="#"
            aria-disabled
            className="flex items-center gap-3 h-11 px-3 rounded-xl text-[14px] font-medium text-white/40 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
            Configuración
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 h-11 px-3 rounded-xl text-[14px] font-medium text-white/55 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </Link>
        </div>

        <div className="mt-4 p-3 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary)] flex items-center justify-center text-white font-semibold text-sm">
              DM
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-white truncate">
                David Méndez
              </div>
              <div className="text-[11px] text-white/45 truncate">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}