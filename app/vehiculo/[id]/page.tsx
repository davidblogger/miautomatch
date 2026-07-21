"use client";

import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Gauge,
  Fuel,
  Settings2,
  Calendar,
  Palette,
  MapPin,
  ShieldCheck,
  Phone,
  CalendarCheck,
  Zap,
  GitCompare,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { VEHICLES } from "@/lib/data";
import { formatPrice, formatMileage } from "@/lib/cn";
import { viewportConfig, fadeUp, stagger } from "@/lib/motion";

const SPECS = [
  { icon: Calendar, label: "Año", key: "year" },
  { icon: Gauge, label: "Kilometraje", key: "mileage", format: formatMileage },
  { icon: Fuel, label: "Combustible", key: "fuel" },
  { icon: Settings2, label: "Transmisión", key: "transmission" },
  { icon: Zap, label: "Potencia", key: "power" },
  { icon: Palette, label: "Categoría", key: "category" },
];

export default function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const vehicle = VEHICLES.find((v) => v.id === id);

  if (!vehicle) notFound();

  const related = VEHICLES.filter((v) => v.id !== id && v.brand === vehicle.brand).slice(0, 3);
  const fallback = VEHICLES.filter((v) => v.id !== id && v.category === vehicle.category).slice(0, 3);
  const recommended = related.length > 0 ? related : fallback;

  return (
    <>
      <Header />
      <main className="flex-1 pt-28">
        <section className="relative py-8">
          <Container>
            <Link
              href="/inventario"
              className="inline-flex items-center gap-2 text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inventario
            </Link>
          </Container>
        </section>

        <section className="py-8">
          <Container>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            >
              <motion.div variants={fadeUp} className="lg:col-span-8">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-[var(--color-primary-50)] shadow-[var(--shadow-xl)]">
                  <Image
                    src={vehicle.gallery[0]}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <Badge variant="glass" className="!bg-white/85">
                      {vehicle.category}
                    </Badge>
                    {vehicle.featured && (
                      <Badge variant="primary">Destacado</Badge>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  {vehicle.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-primary-50)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors cursor-pointer"
                    >
                      <Image
                        src={img}
                        alt={`Vista ${i + 1}`}
                        fill
                        sizes="(max-width: 1024px) 33vw, 22vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="lg:col-span-4">
                <div className="lg:sticky lg:top-28 space-y-6">
                  <div>
                    <div className="text-[12px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                      {vehicle.brand}
                    </div>
                    <h1 className="mt-2 text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.05]">
                      {vehicle.model}
                    </h1>
                    <div className="mt-4 flex items-center gap-3 text-[13px] text-[var(--color-text-secondary)]">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        Santiago, Chile
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Certificado
                      </span>
                    </div>
                  </div>

                  <div className="glass-strong rounded-3xl p-6 space-y-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                        Precio
                      </div>
                      <div className="mt-1 font-mono text-4xl font-bold text-[var(--color-primary)] tracking-tight">
                        {formatPrice(vehicle.price)}
                      </div>
                      <div className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
                        o desde {formatPrice(Math.round(vehicle.price / 60))}/mes
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-[var(--color-border)]">
                      <Button className="w-full" size="lg" href="#contact">
                        Agendar visita
                        <CalendarCheck className="w-4 h-4" />
                      </Button>
                      <Button variant="secondary" className="w-full" size="lg">
                        <Phone className="w-4 h-4" />
                        Llamar a un asesor
                      </Button>
                      <Button variant="ghost" className="w-full" size="sm">
                        <GitCompare className="w-4 h-4" />
                        Agregar al comparador
                      </Button>
                    </div>
                  </div>

                  <div className="bg-[var(--color-primary-50)] rounded-2xl p-5 text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-4 h-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
                      <p>
                        Vehículo certificado con inspección de 150 puntos. Garantía mecánica de 12
                        meses incluida.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        <section className="py-16 lg:py-24 bg-[var(--color-surface)]">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="max-w-2xl mb-12">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
                  Especificaciones
                </span>
                <h2 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-[var(--color-text-primary)]">
                  Detalles técnicos.
                </h2>
              </motion.div>

              <motion.div
                variants={stagger}
                className="grid grid-cols-2 lg:grid-cols-3 gap-3"
              >
                {SPECS.map((spec) => {
                  const Icon = spec.icon;
                  const rawValue = (vehicle as unknown as Record<string, string | number>)[spec.key];
                  const display = spec.format && typeof rawValue === "number" ? spec.format(rawValue) : rawValue;
                  return (
                    <motion.div
                      key={spec.label}
                      variants={fadeUp}
                      className="bg-white border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-primary)]/20 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-[var(--color-primary)]" />
                      <div className="mt-4 text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                        {spec.label}
                      </div>
                      <div className="mt-1 text-xl font-semibold tracking-tight text-[var(--color-text-primary)] font-mono">
                        {display}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {recommended.length > 0 && (
          <section className="py-16 lg:py-24 bg-white">
            <Container>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                variants={stagger}
              >
                <div className="flex items-end justify-between gap-6 mb-12">
                  <motion.div variants={fadeUp}>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium">
                      También te puede interesar
                    </span>
                    <h2 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] text-[var(--color-text-primary)]">
                      Vehículos similares.
                    </h2>
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <Link
                      href="/inventario"
                      className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:gap-3 transition-all"
                    >
                      Ver todo
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>

                <motion.div
                  variants={stagger}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {recommended.map((v) => (
                    <motion.div key={v.id} variants={fadeUp}>
                      <Link
                        href={`/vehiculo/${v.id}`}
                        className="group block bg-white border border-[var(--color-border)] rounded-3xl overflow-hidden hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-500"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-primary-50)]">
                          <Image
                            src={v.image}
                            alt={`${v.brand} ${v.model}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <div className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                            {v.brand}
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <h3 className="text-lg font-semibold tracking-tight">
                              {v.model}
                            </h3>
                            <span className="font-mono text-[15px] font-semibold text-[var(--color-primary)]">
                              {formatPrice(v.price)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
