"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Shield, Zap } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeroSlider } from "@/components/ui/HeroSlider";
import { easeOut } from "@/lib/motion";

const STATS = [
  { value: "2.500+", label: "Vehículos verificados" },
  { value: "38", label: "Marcas premium" },
  { value: "24h", label: "Financiamiento" },
  { value: "98%", label: "Satisfacción" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroSlider />

      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        aria-hidden
        className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(27,90,138,0.3)_0%,transparent_70%)] blur-3xl pointer-events-none z-[2]"
      />

      <Container className="relative z-10 pt-40 sm:pt-44 lg:pt-52 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[calc(100vh-12rem)]">
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <Badge
                variant="glass"
                className="!bg-white/10 !border-white/20 !text-white backdrop-blur-md"
              >
                <Sparkles className="w-3 h-3" />
                Plataforma tecnológica
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
              className="mt-8 text-balance text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-white"
            >
              Tecnología que te{" "}
              <span className="relative inline-block">
                conecta
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-white/60 via-white to-white/60" />
              </span>
              <br />
              con el auto ideal.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: easeOut }}
              className="mt-8 text-lg text-white/70 leading-relaxed max-w-xl text-pretty"
            >
              Encuentra, compara y financia tu próximo vehículo en una experiencia diseñada para
              quienes valoran el tiempo y la transparencia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: easeOut }}
              className="mt-10"
            >
              <SearchBar />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-12 flex flex-wrap items-center gap-6 text-[13px] text-white/55"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-white/70" />
                Vehículos verificados
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-white/70" />
                Financiamiento 24h
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white/70" />
                Atención humana
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="lg:col-span-12 mt-8 lg:mt-0"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="glass !bg-white/[0.06] !border-white/10 rounded-2xl p-5"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[12px] text-white/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6"
        >
          <span className="text-[12px] uppercase tracking-[0.2em] text-white/40">
            Disponible en alianza con
          </span>
          <div className="flex flex-wrap items-center gap-8 text-white/40">
            {["Banco Estado", "Scotiabank", "BCI", "Santander", "Itaú"].map((b) => (
              <span key={b} className="text-sm font-medium tracking-tight">
                {b}
              </span>
            ))}
          </div>
          <Button
            variant="glass"
            size="sm"
            href="/inventario"
            className="!bg-white/10 !border-white/20 !text-white hover:!bg-white/15"
          >
            Ver inventario
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
