"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { TESTIMONIALS } from "@/lib/data";
import { Quote } from "lucide-react";
import { viewportConfig, fadeUp, stagger } from "@/lib/motion";

export function Testimonials() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden bg-[var(--color-surface)]">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-5">
            <motion.div variants={fadeUp}>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
                Testimonios
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-[var(--color-text-primary)] text-balance"
            >
              Lo que dicen
              <br />
              <span className="italic font-light">nuestros clientes.</span>
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUp}
            className="lg:col-span-7 lg:col-start-6 relative aspect-[5/4] rounded-3xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80"
              alt="Interior vehículo"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-6">
              <Quote className="w-5 h-5 text-[var(--color-primary)] mb-3" />
              <p className="text-[15px] leading-relaxed text-[var(--color-text-primary)] text-pretty">
                {TESTIMONIALS[0].quote}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center text-sm font-semibold text-[var(--color-primary)]">
                  CM
                </div>
                <div>
                  <div className="text-[13px] font-semibold">{TESTIMONIALS[0].name}</div>
                  <div className="text-[11px] text-[var(--color-text-muted)]">
                    {TESTIMONIALS[0].role}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={stagger}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {TESTIMONIALS.slice(1).map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="bg-white border border-[var(--color-border)] rounded-3xl p-8 lg:p-10 transition-all hover:border-[var(--color-primary)]/20 hover:shadow-[var(--shadow-md)]"
            >
              <Quote className="w-5 h-5 text-[var(--color-primary)] mb-4" />
              <p className="text-lg leading-relaxed text-[var(--color-text-primary)] text-pretty">
                {t.quote}
              </p>
              <div className="mt-6 flex items-center gap-3 pt-6 border-t border-[var(--color-border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center text-sm font-semibold text-[var(--color-primary)]">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-[14px] font-semibold">{t.name}</div>
                  <div className="text-[12px] text-[var(--color-text-muted)]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
