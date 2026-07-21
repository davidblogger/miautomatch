"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { BRANDS } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { viewportConfig, stagger, fadeUp } from "@/lib/motion";

export function Brands() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden bg-white">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end"
        >
          <div className="lg:col-span-5">
            <motion.div variants={fadeUp}>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
                Marcas
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.05] text-balance"
            >
              Curamos las marcas
              <br />
              que importan.
            </motion.h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <motion.p
              variants={fadeUp}
              className="text-lg text-[var(--color-text-secondary)] leading-relaxed text-pretty"
            >
              Trabajamos con las marcas más reconocidas del mercado. Cada vehículo pasa por un
              proceso de certificación de 150 puntos antes de ser publicado.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="#"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:gap-3 transition-all"
            >
              Ver todas las marcas
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={stagger}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {BRANDS.map((brand) => (
            <motion.a
              key={brand.name}
              variants={fadeUp}
              href="#"
              whileHover={{ y: -4 }}
              className="group relative bg-white border border-[var(--color-border)] rounded-2xl p-6 flex flex-col items-start justify-between h-32 transition-all hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-lg)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-50)]/0 to-[var(--color-primary-50)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
                {brand.name}
              </div>
              <div className="relative flex items-center justify-between w-full">
                <span className="text-[12px] text-[var(--color-text-muted)] font-mono">
                  {brand.vehicles} autos
                </span>
                <ArrowUpRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
