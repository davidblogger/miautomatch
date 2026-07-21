"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Gauge, Fuel, Settings2, SlidersHorizontal, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { VEHICLES } from "@/lib/data";
import { formatPrice, formatMileage } from "@/lib/cn";
import { viewportConfig, fadeUp, stagger } from "@/lib/motion";
import { useState } from "react";

const FUEL_OPTIONS = ["Todos", "Gasolina", "Eléctrico", "Híbrido"];
const SORT_OPTIONS = ["Destacados", "Precio: menor a mayor", "Precio: mayor a menor", "Más nuevos"];

export function InventoryView() {
  const [fuel, setFuel] = useState("Todos");
  const [sort, setSort] = useState("Destacados");
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 gradient-soft" />
        <Container className="relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
          >
            <motion.div variants={fadeUp} className="lg:col-span-7">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
                Inventario
              </span>
              <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-[var(--color-text-primary)] text-balance">
                Tu próximo auto,
                <br />
                <span className="gradient-text">a un click.</span>
              </h1>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="lg:col-span-5 text-lg text-[var(--color-text-secondary)] text-pretty"
            >
              {VEHICLES.length} vehículos verificados, certificados y listos para entrega inmediata.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <section className="sticky top-24 z-30 py-4">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-strong rounded-2xl p-3 flex flex-wrap items-center gap-3"
          >
            <Input
              icon={<SlidersHorizontal className="w-4 h-4" />}
              placeholder="Buscar marca o modelo..."
              className="flex-1 min-w-[200px] !bg-transparent !border-none !shadow-none !h-11 !px-3"
            />

            <div className="hidden sm:flex items-center gap-1 flex-wrap">
              {FUEL_OPTIONS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFuel(f)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                    fuel === f
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-50)]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={() => setOpen((s) => !s)}
              className="lg:hidden px-4 py-2.5 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary)] text-[13px] font-medium"
            >
              Más filtros
            </button>

            <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[var(--color-border)]">
              <span className="text-[12px] text-[var(--color-text-muted)]">Ordenar:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent text-[13px] font-medium text-[var(--color-text-primary)] focus:outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 glass-strong rounded-2xl p-4 lg:hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] font-semibold">Más filtros</span>
                <button onClick={() => setOpen(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Año", "Precio", "Transmisión", "Kilometraje"].map((f) => (
                  <div
                    key={f}
                    className="h-11 rounded-xl bg-white border border-[var(--color-border)] flex items-center px-3 text-[13px] text-[var(--color-text-secondary)]"
                  >
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </Container>
      </section>

      <section className="py-12 pb-32">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {VEHICLES.map((vehicle) => (
              <motion.div key={vehicle.id} variants={fadeUp}>
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
                      {vehicle.featured && (
                        <Badge variant="glass" className="!bg-white/85">
                          Destacado
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
            className="mt-16 flex items-center justify-center gap-2"
          >
            <Button variant="secondary" size="sm">
              Anterior
            </Button>
            {[1, 2, 3, "...", 12].map((p, i) => (
              <button
                key={i}
                className={`min-w-10 h-10 px-3 rounded-full text-[13px] font-medium transition-all ${
                  p === 1
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-50)]"
                }`}
              >
                {p}
              </button>
            ))}
            <Button size="sm">Siguiente</Button>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

export default function InventarioPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <InventoryView />
      </main>
      <Footer />
    </>
  );
}
