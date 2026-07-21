"use client";

import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { viewportConfig, fadeUp, stagger } from "@/lib/motion";

const CONTACT = [
  {
    icon: Mail,
    label: "Email",
    value: "hola@miautomatch.cl",
    href: "mailto:hola@miautomatch.cl",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+56 2 2898 4000",
    href: "tel:+56228984000",
  },
  {
    icon: MapPin,
    label: "Oficina",
    value: "Av. Apoquindo 4711, Las Condes",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun–Vie 9:00–19:00",
  },
];

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-28">
        <section className="relative py-12 pb-20 overflow-hidden">
          <div className="absolute inset-0 gradient-soft" />
          <Container className="relative">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.span
                variants={fadeUp}
                className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] font-medium"
              >
                Contacto
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] text-[var(--color-text-primary)] text-balance"
              >
                Estamos aquí
                <br />
                para <span className="gradient-text">ayudarte.</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed text-pretty max-w-xl"
              >
                Escríbenos y un asesor dedicado te contactará en menos de 24 horas.
              </motion.p>
            </motion.div>
          </Container>
        </section>

        <section className="pb-32">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <motion.form
                id="contact"
                variants={fadeUp}
                onSubmit={(e) => e.preventDefault()}
                className="lg:col-span-7 glass-strong rounded-3xl p-8 lg:p-10"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">Envíanos un mensaje</h2>
                    <p className="text-[13px] text-[var(--color-text-secondary)]">
                      Te respondemos en menos de 24 horas.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                      Nombre
                    </label>
                    <Input placeholder="Tu nombre" className="!bg-white/60" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                      Email
                    </label>
                    <Input type="email" placeholder="tu@email.com" className="!bg-white/60" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                      Teléfono
                    </label>
                    <Input placeholder="+56 9 1234 5678" className="!bg-white/60" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                      Interés
                    </label>
                    <select className="h-12 px-4 rounded-full bg-white/60 border border-[var(--color-border)] text-[15px] focus:outline-none focus:border-[var(--color-primary)]">
                      <option>Comprar un vehículo</option>
                      <option>Vender mi vehículo</option>
                      <option>Financiamiento</option>
                      <option>Otro</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                    Mensaje
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Cuéntanos qué estás buscando..."
                    className="w-full p-4 rounded-2xl bg-white/60 border border-[var(--color-border)] text-[15px] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all resize-none"
                  />
                </div>

                <Button size="lg" className="mt-6 w-full sm:w-auto">
                  Enviar mensaje
                  <Send className="w-4 h-4" />
                </Button>
              </motion.form>

              <div className="lg:col-span-5 space-y-4">
                {CONTACT.map((item) => {
                  const Icon = item.icon;
                  const Wrapper = item.href ? "a" : "div";
                  return (
                    <motion.div key={item.label} variants={fadeUp}>
                      <Wrapper
                        {...(item.href ? { href: item.href } : {})}
                        className="block bg-white border border-[var(--color-border)] rounded-2xl p-6 transition-all hover:border-[var(--color-primary)]/20 hover:shadow-[var(--shadow-md)]"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-xl bg-[var(--color-primary-50)] flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-[var(--color-primary)]" />
                          </div>
                          <div>
                            <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                              {item.label}
                            </div>
                            <div className="mt-1 text-[15px] font-medium text-[var(--color-text-primary)]">
                              {item.value}
                            </div>
                          </div>
                        </div>
                      </Wrapper>
                    </motion.div>
                  );
                })}

                <motion.div
                  variants={fadeUp}
                  className="relative rounded-2xl overflow-hidden bg-[var(--color-primary)] text-white p-8"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 80% 20%, rgba(27,90,138,0.6) 0%, transparent 50%)",
                    }}
                  />
                  <div className="relative">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                      Respuesta rápida
                    </div>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-balance">
                      ¿Necesitas ayuda inmediata?
                    </h3>
                    <p className="mt-3 text-[14px] text-white/70 leading-relaxed">
                      Nuestro equipo está disponible para responder tus consultas al instante.
                    </p>
                    <Button
                      variant="glass"
                      size="md"
                      href="#"
                      className="mt-6 !bg-white/10 !border-white/20 !text-white hover:!bg-white/15"
                    >
                      Iniciar chat
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
