"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDE_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=2400&q=80",
    alt: "BMW M4 Competition",
  },
  {
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=80",
    alt: "Porsche Taycan",
  },
  {
    src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=2400&q=80",
    alt: "Lexus LC 500",
  },
  {
    src: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=2400&q=80",
    alt: "Mercedes-Benz AMG",
  },
];

const DURATION = 15000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={SLIDE_IMAGES[index].src}
            alt={SLIDE_IMAGES[index].alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)]/85 via-[var(--color-ink)]/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDE_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group relative w-8 h-2 rounded-full overflow-hidden bg-white/30 hover:bg-white/50 transition-colors"
            aria-label={`Ir a imagen ${i + 1}`}
          >
            {i === index && (
              <motion.div
                layoutId="hero-slider-indicator"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
