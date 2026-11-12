"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { formatRupiah } from "@/lib/format";
import { BADGE_LABEL, categoryLabel, type MenuItem } from "@/lib/menu";

type MenuDetailProps = { item: MenuItem; onClose: () => void };

export function MenuDetail({ item, onClose }: MenuDetailProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `menu-detail-${item.id}`;

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Only one focusable control inside: keep focus in the dialog.
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 md:items-center md:p-6">
      <motion.div
        data-testid="menu-detail-backdrop"
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative grid max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-bg shadow-2xl md:grid-cols-2 md:rounded-3xl"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative aspect-square bg-cream md:aspect-auto md:min-h-[420px]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 768px) 384px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col p-6 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand/70">
            {categoryLabel(item.category)}
            {item.badge && ` · ${BADGE_LABEL[item.badge]}`}
          </p>
          <h2 id={titleId} className="mt-3 font-display text-3xl font-extrabold leading-tight text-brand md:text-4xl">
            {item.name}
          </h2>
          <p className="mt-4 leading-relaxed text-ink/75">{item.description}</p>
          <p className="mt-6 font-display text-2xl font-semibold text-ink md:mt-auto md:pt-8">
            {formatRupiah(item.price)}
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          aria-label="Tutup"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-xl text-ink shadow transition hover:bg-white focus-visible:outline-2 focus-visible:outline-brand"
        >
          <span aria-hidden>✕</span>
        </button>
      </motion.div>
    </div>
  );
}
