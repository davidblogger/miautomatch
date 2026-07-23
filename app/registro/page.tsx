"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Loader2, Sparkles, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RegistroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      console.log("Signup response:", { data, error });

      if (error) {
        setError(`Error ${error.status || ""}: ${error.message || JSON.stringify(error)}`);
        setLoading(false);
        return;
      }

      console.log("User created:", data);
      router.push("/dashboard");
    } catch (err) {
      const anyErr = err as { cause?: { message?: string }; message?: string; name?: string };
      console.error("Signup exception FULL:", err);
      console.error("Signup exception JSON:", JSON.stringify(err, Object.getOwnPropertyNames(err)));

      const causeMessage = anyErr?.cause?.message;
      const message =
        causeMessage ||
        anyErr?.message ||
        JSON.stringify(err) ||
        "Error desconocido";

      setError(`${anyErr?.name || "Error"}: ${message}`);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-ink)]" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(27,90,138,0.45), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(1,46,85,0.5), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="glass-strong !bg-white/95 rounded-3xl p-8 sm:p-10 shadow-[var(--shadow-xl)]">
          <div className="flex flex-col items-center text-center mb-8">
            <Image
              src="/img/LOGO-WP.png"
              alt="Mi Auto Match"
              width={180}
              height={48}
              className="h-12 w-auto object-contain"
            />
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary)] text-[11px] uppercase tracking-[0.2em] font-medium">
              <Sparkles className="w-3 h-3" />
              Crear cuenta
            </div>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
              Regístrate en Mi Auto Match
            </h1>
            <p className="mt-2 text-[14px] text-[var(--color-text-secondary)]">
              Crea tu cuenta para acceder al panel de administración.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                Nombre completo
              </label>
              <div className="relative flex items-center h-12 px-4 rounded-full bg-white border border-[var(--color-border)] focus-within:border-[var(--color-primary)] focus-within:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all">
                <User className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="flex-1 ml-2 bg-transparent outline-none text-[15px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                Email
              </label>
              <div className="relative flex items-center h-12 px-4 rounded-full bg-white border border-[var(--color-border)] focus-within:border-[var(--color-primary)] focus-within:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all">
                <Mail className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="flex-1 ml-2 bg-transparent outline-none text-[15px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative flex items-center h-12 px-4 rounded-full bg-white border border-[var(--color-border)] focus-within:border-[var(--color-primary)] focus-within:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all">
                <Lock className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  minLength={6}
                  className="flex-1 ml-2 mr-2 bg-transparent outline-none text-[15px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors shrink-0"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-100 text-[13px] text-rose-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="relative w-full h-12 rounded-full bg-[var(--color-primary)] text-white font-medium tracking-tight shadow-[0_8px_24px_-8px_rgba(1,68,119,0.5)] hover:bg-[var(--color-primary-dark)] hover:shadow-[0_12px_32px_-8px_rgba(1,68,119,0.7)] disabled:opacity-60 disabled:cursor-wait transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creando cuenta…
                </>
              ) : (
                <>
                  Crear cuenta
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex items-center justify-between text-[12px] text-[var(--color-text-muted)]">
            <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
              ← Volver al sitio
            </Link>
            <Link href="/login" className="hover:text-[var(--color-primary)] transition-colors">
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
