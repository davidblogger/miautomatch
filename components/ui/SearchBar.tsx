"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "./Input";
import { Button } from "./Button";

export function SearchBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong rounded-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full max-w-3xl"
    >
      <Input
        icon={<Search className="w-4 h-4" />}
        placeholder="¿Qué auto estás buscando?"
        className="flex-[2] !bg-transparent !border-none !shadow-none !backdrop-blur-0 !h-14 !px-4"
      />
      <div className="hidden sm:block w-px h-8 bg-[var(--color-border)]" />
      <Input
        icon={<SlidersHorizontal className="w-4 h-4" />}
        placeholder="Marca o modelo"
        className="flex-1 !bg-transparent !border-none !shadow-none !backdrop-blur-0 !h-14 !px-4"
      />
      <Button size="lg" className="h-14 px-6 sm:px-8">
        Buscar
      </Button>
    </motion.div>
  );
}
