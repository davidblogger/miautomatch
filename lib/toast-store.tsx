"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info";

type Toast = {
  id: string;
  message: string;
  description?: string;
  variant: ToastVariant;
};

type ToastStore = {
  toast: (message: string, options?: { description?: string; variant?: ToastVariant }) => void;
};

const ToastContext = createContext<ToastStore | null>(null);

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const STYLES = {
  success: "bg-white border-emerald-100 text-emerald-900",
  error: "bg-white border-rose-100 text-rose-900",
  info: "bg-white border-[var(--color-border)] text-[var(--color-text-primary)]",
};

const ICON_STYLES = {
  success: "text-emerald-600",
  error: "text-rose-600",
  info: "text-[var(--color-primary)]",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback<ToastStore["toast"]>(
    (message, options) => {
      const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const variant = options?.variant ?? "success";
      setToasts((prev) => [
        ...prev,
        { id, message, description: options?.description, variant },
      ]);
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 z-[70] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = ICONS[t.variant];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className={`pointer-events-auto flex items-start gap-3 max-w-sm w-[360px] p-4 pr-10 rounded-2xl border shadow-[var(--shadow-lg)] backdrop-blur-xl relative ${STYLES[t.variant]}`}
              >
                <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${ICON_STYLES[t.variant]}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold leading-snug">{t.message}</div>
                  {t.description && (
                    <div className="text-[12px] text-[var(--color-text-secondary)] mt-0.5 leading-snug">
                      {t.description}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  aria-label="Cerrar"
                  className="absolute top-3 right-3 w-6 h-6 rounded-md hover:bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-text-muted)]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}