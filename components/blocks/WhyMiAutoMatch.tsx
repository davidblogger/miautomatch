"use client";

import { motion } from "framer-motion";
import { Search, GitCompare, Zap, Shield } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FEATURES } from "@/lib/data";
import { viewportConfig, fadeUp, stagger } from "@/lib/motion";

const ICONS = {
  Search,
  GitCompare,
  Zap,
  Shield,
};

export function WhyMiAutoMatch() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden bg-white">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.span
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium"
          >
            Por qué Mi Auto Match
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-[var(--color-text-primary)] text-balance"
          >
            No somos un
            <br />
            <span className="gradient-text">concesionario.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed text-pretty"
          >
            Somos una plataforma tecnológica que aplica ingeniería de software a una de las
            decisiones financieras más importantes de tu vida.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={stagger}
          className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          <motion.div
            variants={fadeUp}
            className="lg:col-span-7 lg:row-span-2 group relative overflow-hidden rounded-3xl bg-[var(--color-primary)] text-white p-10 lg:p-12 min-h-[520px] flex flex-col justify-between"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 20%, rgba(27,90,138,0.6) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(1,46,85,0.4) 0%, transparent 50%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Diferenciador
              </div>
              <h3 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] text-balance">
                Una experiencia
                <br />
                diseñada como un
                <br />
                <span className="italic font-light">producto digital.</span>
              </h3>
            </div>

            <div className="relative mt-12 grid grid-cols-2 gap-4">
              <div className="glass-dark rounded-2xl p-5">
                <div className="text-3xl font-bold font-mono">98%</div>
                <div className="text-[13px] text-white/60 mt-1">Satisfacción</div>
              </div>
              <div className="glass-dark rounded-2xl p-5">
                <div className="text-3xl font-bold font-mono">24h</div>
                <div className="text-[13px] text-white/60 mt-1">Respuesta</div>
              </div>
            </div>

            <motion.div
              aria-hidden
              className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl"
            />
          </motion.div>

          {FEATURES.map((feature, idx) => {
            const Icon = ICONS[feature.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className={`lg:col-span-5 group relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 lg:p-10 transition-all hover:bg-white hover:border-[var(--color-primary)]/20 hover:shadow-[var(--shadow-lg)] ${
                  idx === 1 ? "lg:col-start-8" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[var(--color-border)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] group-hover:text-white transition-all">
                    <Icon className="w-5 h-5 text-[var(--color-primary)] group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] font-mono">
                      0{idx + 1}
                    </div>
                    <h4 className="mt-2 text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                      {feature.title}
                    </h4>
                  </div>
                </div>
                <p className="mt-6 text-[15px] text-[var(--color-text-secondary)] leading-relaxed text-pretty">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
