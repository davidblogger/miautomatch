"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
  destructive = true,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Cerrar"
            onClick={onClose}
            className="absolute inset-0 bg-[var(--color-ink)]/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-[var(--shadow-xl)]"
          >
            <button
              aria-label="Cerrar"
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-[var(--color-primary-50)] flex items-center justify-center text-[var(--color-text-secondary)]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
              {title}
            </h3>
            <p className="mt-2 text-[14px] text-[var(--color-text-secondary)] text-pretty">
              {message}
            </p>

            <div className="mt-8 flex gap-3 justify-end">
              <button
                onClick={onClose}
                className="h-11 px-5 rounded-full text-[14px] font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] transition-colors"
              >
                {cancelLabel}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`h-11 px-5 rounded-full text-[14px] font-medium text-white transition-colors ${
                  destructive
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}