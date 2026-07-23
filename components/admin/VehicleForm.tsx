"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ChevronDown, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { ImageUploader } from "./ImageUploader";
import { useToast } from "@/lib/toast-store";
import type { AdminVehicle } from "@/lib/types";

const DEFAULT_VEHICLE: Omit<AdminVehicle, "id" | "createdAt" | "updatedAt"> = {
  brand: "",
  model: "",
  version: "",
  year: new Date().getFullYear(),
  price: 0,
  mileage: 0,
  fuel: "Gasolina",
  transmission: "Automática",
  power: "",
  color: "",
  category: "Sedán",
  description: "",
  images: [],
  status: "draft",
  featured: false,
  acceptsFinancing: true,
};

const FUEL_OPTIONS: AdminVehicle["fuel"][] = ["Gasolina", "Diésel", "Híbrido", "Eléctrico"];
const TRANSMISSION_OPTIONS: AdminVehicle["transmission"][] = ["Automática", "Manual"];
const CATEGORY_OPTIONS = [
  "Sedán", "SUV", "Deportivo", "Coupé", "Wagon", "Eléctrico", "Pickup",
];
function Field({
  label,
  children,
  required,
  error,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </span>
      <div
        className={cn(
          "mt-2 transition-all",
          error && "ring-2 ring-rose-200 rounded-xl"
        )}
      >
        {children}
      </div>
    </label>
  );
}

const STATUS_OPTIONS: { value: AdminVehicle["status"]; label: string; desc: string }[] = [
  { value: "draft", label: "Borrador", desc: "Solo visible para administradores." },
  { value: "published", label: "Publicado", desc: "Visible en el sitio público." },
  { value: "sold", label: "Vendido", desc: "Marcado como vendido, oculto del listado." },
];

type FormSection = "info" | "specs" | "price" | "description";

const SECTIONS: { id: FormSection; label: string }[] = [
  { id: "info", label: "Información general" },
  { id: "specs", label: "Especificaciones" },
  { id: "price", label: "Precio y financiamiento" },
  { id: "description", label: "Descripción" },
];

export function VehicleForm({
  initial,
  onSubmit,
  submitLabel = "Guardar",
}: {
  initial?: AdminVehicle;
  onSubmit: (data: Omit<AdminVehicle, "id" | "createdAt" | "updatedAt">) => void;
  submitLabel?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [data, setData] = useState<Omit<AdminVehicle, "id" | "createdAt" | "updatedAt">>(
    initial ? { ...initial } : DEFAULT_VEHICLE
  );
  const [openSection, setOpenSection] = useState<FormSection | "all">("all");
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave(status: AdminVehicle["status"]) {
    setSubmitting(true);
    onSubmit({ ...data, status });
    const label = `${data.brand} ${data.model}`.trim();
    const isDraft = status === "draft";
    toast(
      isDraft ? "Borrador guardado" : initial ? "Vehículo actualizado" : "Vehículo publicado",
      {
        description: label || "Nuevo vehículo en el inventario",
        variant: "success",
      }
    );
    setTimeout(() => router.push("/vehiculos"), 350);
  }

  const errors = {
    brand: !data.brand.trim(),
    model: !data.model.trim(),
    price: data.price <= 0,
    year: data.year < 1900 || data.year > new Date().getFullYear() + 1,
  };
  const hasErrors = Object.values(errors).some(Boolean);

  function renderSection(id: FormSection, content: React.ReactNode) {
    const isOpen = openSection === "all" || openSection === id;
    return (
      <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setOpenSection(isOpen && openSection !== "all" ? "all" : id)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--color-surface)] transition-colors"
        >
          <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)]">
            {SECTIONS.find((s) => s.id === id)?.label}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-[var(--color-text-muted)] transition-transform",
              isOpen ? "rotate-180" : ""
            )}
          />
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-2 border-t border-[var(--color-border)]">
                {content}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const inputCls =
    "w-full h-11 px-4 rounded-xl bg-white border border-[var(--color-border)] text-[14px] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all";

  return (
    <form className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 space-y-3">
        {renderSection(
          "info",
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            <Field label="Marca" required error={errors.brand}>
              <input
                type="text"
                value={data.brand}
                onChange={(e) => update("brand", e.target.value)}
                placeholder="BMW, Mercedes-Benz…"
                className={inputCls}
              />
            </Field>
            <Field label="Modelo" required error={errors.model}>
              <input
                type="text"
                value={data.model}
                onChange={(e) => update("model", e.target.value)}
                placeholder="M4 Competition"
                className={inputCls}
              />
            </Field>
            <Field label="Versión">
              <input
                type="text"
                value={data.version || ""}
                onChange={(e) => update("version", e.target.value)}
                placeholder="M xDrive, AMG Line…"
                className={inputCls}
              />
            </Field>
            <Field label="Año" required error={errors.year}>
              <input
                type="number"
                value={data.year}
                onChange={(e) => update("year", parseInt(e.target.value) || 0)}
                className={inputCls + " font-mono"}
              />
            </Field>
          </div>
        )}

        {renderSection(
          "specs",
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            <Field label="Combustible">
              <select
                value={data.fuel}
                onChange={(e) => update("fuel", e.target.value as AdminVehicle["fuel"])}
                className={inputCls + " cursor-pointer"}
              >
                {FUEL_OPTIONS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </Field>
            <Field label="Transmisión">
              <select
                value={data.transmission}
                onChange={(e) => update("transmission", e.target.value as AdminVehicle["transmission"])}
                className={inputCls + " cursor-pointer"}
              >
                {TRANSMISSION_OPTIONS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Potencia">
              <input
                type="text"
                value={data.power}
                onChange={(e) => update("power", e.target.value)}
                placeholder="510 HP"
                className={inputCls + " font-mono"}
              />
            </Field>
            <Field label="Kilometraje">
              <input
                type="number"
                value={data.mileage}
                onChange={(e) => update("mileage", parseInt(e.target.value) || 0)}
                className={inputCls + " font-mono"}
              />
            </Field>
            <Field label="Color">
              <input
                type="text"
                value={data.color}
                onChange={(e) => update("color", e.target.value)}
                placeholder="Negro Zafiro"
                className={inputCls}
              />
            </Field>
            <Field label="Categoría">
              <select
                value={data.category}
                onChange={(e) => update("category", e.target.value)}
                className={inputCls + " cursor-pointer"}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {renderSection(
          "price",
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            <Field label="Precio (CLP)" required error={errors.price}>
              <input
                type="number"
                value={data.price}
                onChange={(e) => update("price", parseInt(e.target.value) || 0)}
                className={inputCls + " font-mono"}
              />
            </Field>
            <Field label="Descuento (%)">
              <input
                type="number"
                value={data.discount || 0}
                onChange={(e) => update("discount", parseInt(e.target.value) || 0)}
                className={inputCls + " font-mono"}
              />
            </Field>
            <div className="sm:col-span-2 space-y-3 pt-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.acceptsFinancing}
                  onChange={(e) => update("acceptsFinancing", e.target.checked)}
                  className="w-4 h-4 accent-[var(--color-primary)]"
                />
                <span className="text-[14px] font-medium text-[var(--color-text-primary)]">
                  Acepta financiamiento
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.featured}
                  onChange={(e) => update("featured", e.target.checked)}
                  className="w-4 h-4 accent-[var(--color-primary)]"
                />
                <span className="text-[14px] font-medium text-[var(--color-text-primary)]">
                  Mostrar en destacados del home
                </span>
              </label>
            </div>
          </div>
        )}

        {renderSection(
          "description",
          <div className="pt-3">
            <textarea
              value={data.description || ""}
              onChange={(e) => update("description", e.target.value)}
              rows={6}
              placeholder="Describe el vehículo, sus características únicas y estado…"
              className="w-full p-4 rounded-xl bg-white border border-[var(--color-border)] text-[14px] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_rgba(1,68,119,0.08)] transition-all resize-none"
            />
          </div>
        )}
      </div>

      <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-32 self-start">
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            Galería
          </h3>
          <ImageUploader
            value={data.images}
            onChange={(urls) => update("images", urls)}
          />
        </div>

        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-5">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-secondary)] mb-4">
            Estado
          </h3>
          <div className="space-y-2">
            {STATUS_OPTIONS.map((s) => (
              <label
                key={s.value}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                  data.status === s.value
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-50)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-primary)]/40"
                )}
              >
                <input
                  type="radio"
                  checked={data.status === s.value}
                  onChange={() => update("status", s.value)}
                  className="mt-0.5 accent-[var(--color-primary)]"
                />
                <div>
                  <div className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                    {s.desc}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {hasErrors && (
          <div className="flex items-start gap-2 p-4 rounded-xl bg-rose-50 border border-rose-100 text-[12px] text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>Completa los campos requeridos antes de guardar.</div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={hasErrors || submitting}
            className="h-12 rounded-full bg-[var(--color-primary)] text-white font-medium text-[14px] hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-[0_8px_24px_-8px_rgba(1,68,119,0.5)]"
          >
            <Save className="w-4 h-4" />
            {submitLabel}
          </button>
          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={submitting}
            className="h-11 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-[14px] hover:border-[var(--color-primary)] transition-colors"
          >
            Guardar borrador
          </button>
          <button
            type="button"
            onClick={() => router.push("/vehiculos")}
            className="h-11 rounded-full text-[var(--color-text-secondary)] font-medium text-[14px] hover:text-[var(--color-text-primary)] transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}