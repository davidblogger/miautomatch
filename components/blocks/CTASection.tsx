"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { viewportConfig, fadeUp, stagger } from "@/lib/motion";

export function CTASection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={stagger}
          className="relative rounded-[32px] overflow-hidden bg-[var(--color-primary)] text-white"
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 0%, rgba(27,90,138,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 100%, rgba(6,19,36,0.4) 0%, transparent 50%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 p-10 lg:p-16 min-h-[480px]">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] uppercase tracking-[0.2em]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Empieza hoy
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02] text-balance"
              >
                Encuentra el auto
                <br />
                que siempre{" "}
                <span className="italic font-light">quisiste.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed text-pretty"
              >
                Sin papeleo, sin sorpresas. Una experiencia diseñada para que te enfoques en lo
                importante: elegir bien.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  href="/inventario"
                  className="!bg-white !text-[var(--color-primary)] hover:!bg-white/95"
                >
                  Buscar mi auto
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  href="/contacto"
                  className="!bg-white/10 !border-white/20 !text-white hover:!bg-white/15"
                >
                  Hablar con un asesor
                </Button>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative w-full aspect-square"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"
                    alt="Vehículo premium"
                    fill
                    sizes="40vw"
                    className="object-cover rounded-2xl shadow-[var(--shadow-glow-blue)]"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
