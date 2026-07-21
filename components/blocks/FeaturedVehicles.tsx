"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Gauge, Fuel, Settings2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { VEHICLES } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, formatMileage } from "@/lib/cn";
import { viewportConfig, fadeUp, stagger } from "@/lib/motion";

export function FeaturedVehicles() {
  const featured = VEHICLES.filter((v) => v.featured).slice(0, 3);

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden bg-[var(--color-surface)]">
      <div
        aria-hidden
        className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(214,234,251,0.6)_0%,transparent_70%)] blur-3xl"
      />

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={stagger}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium"
            >
              Selección destacada
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-[var(--color-text-primary)] text-balance"
            >
              Vehículos que <br />
              <span className="gradient-text">merecen atención.</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="text-lg text-[var(--color-text-secondary)] max-w-md text-pretty"
          >
            Una selección curada de vehículos verificados, con historial completo y listos para
            entrega inmediata.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {featured.map((vehicle, idx) => (
            <motion.div
              key={vehicle.id}
              variants={fadeUp}
              className={idx === 1 ? "md:translate-y-8" : ""}
            >
              <Link
                href={`/vehiculo/${vehicle.id}`}
                className="group block relative bg-white border border-[var(--color-border)] rounded-3xl overflow-hidden transition-all duration-500 hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-xl)] hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-primary-50)]">
                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                    {vehicle.badge && (
                      <Badge variant="glass" className="!bg-white/85">
                        {vehicle.badge}
                      </Badge>
                    )}
                    <Badge variant="dark" className="font-mono">
                      {vehicle.year}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-full glass-strong flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[12px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                        {vehicle.brand}
                      </div>
                      <h3 className="mt-1 text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                        {vehicle.model}
                      </h3>
                    </div>
                    <div className="font-mono text-base font-semibold text-[var(--color-primary)] whitespace-nowrap">
                      {formatPrice(vehicle.price)}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[var(--color-border)] grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                      <span className="text-[12px] text-[var(--color-text-secondary)] font-mono">
                        {formatMileage(vehicle.mileage)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                      <span className="text-[12px] text-[var(--color-text-secondary)]">
                        {vehicle.fuel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings2 className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                      <span className="text-[12px] text-[var(--color-text-secondary)]">
                        {vehicle.power}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          className="mt-20 text-center"
        >
          <Link
            href="/inventario"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:gap-3 transition-all group"
          >
            Explorar inventario completo
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
