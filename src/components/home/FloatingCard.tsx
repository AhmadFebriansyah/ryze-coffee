"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { formatRupiah } from "@/lib/format";
import { BADGE_LABEL, type MenuItem } from "@/lib/menu";

type FloatingCardProps = { item: MenuItem; className?: string; delay?: number };

export function FloatingCard({ item, className = "", delay = 0 }: FloatingCardProps) {
  // The float itself is CSS (.anim-float), disabled by the prefers-reduced-motion media query.
  // data-motion reports the state; it can differ from the server render, hence suppressHydrationWarning.
  const reduce = useReducedMotion();

  return (
    <div
      data-motion={reduce ? "off" : "on"}
      suppressHydrationWarning
      className={`anim-float absolute z-10 ${reduce ? "!animate-none" : ""} ${className}`}
      style={{ "--d": `${0.8 + delay}s` } as CSSProperties}
    >
      <Link
        href={`/menu?item=${item.id}`}
        className="block rounded-2xl bg-white/95 px-4 py-3 shadow-[0_10px_30px_rgba(42,29,20,0.18)] backdrop-blur transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-brand"
      >
        <span className="block text-sm font-bold text-ink">{item.name}</span>
        <span className="mt-0.5 block text-xs text-muted">
          {item.badge && <span className="font-semibold text-brand">{BADGE_LABEL[item.badge]}</span>}
          {item.badge && " · "}
          {formatRupiah(item.price)}
        </span>
      </Link>
    </div>
  );
}
