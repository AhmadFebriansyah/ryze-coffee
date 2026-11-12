"use client";

import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { getMenuItem } from "@/lib/menu";
import { FloatingCard } from "./FloatingCard";

const HEADLINE = ["Iced", "Spanish Latte"];
const COPY =
  "Racikan espresso pilihan berpadu dengan susu manis, menghasilkan rasa creamy yang lembut namun tetap ringan. Sekali teguk, langsung jatuh hati.";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax: the video frame trails the text slightly while scrolling.
  const frameY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);

  const spanish = getMenuItem("spanish-latte")!;
  const matcha = getMenuItem("matcha-cloud")!;

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 md:min-h-[calc(100svh-4rem)] md:grid-cols-[1.1fr_1fr] md:gap-16 md:px-8 md:py-16">
        <div>
          <p className="anim-rise text-xs font-semibold uppercase tracking-[0.25em] text-brand/70">Signature Ryze</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] text-brand sm:text-6xl lg:text-7xl">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <span className="anim-line block" style={delay(0.1 + i * 0.12)}>
                  {line}
                  {i < HEADLINE.length - 1 ? " " : ""}
                </span>
              </span>
            ))}
          </h1>
          <p className="anim-rise mt-6 max-w-md text-base leading-relaxed text-ink/75 md:text-lg" style={delay(0.35)}>
            {COPY}
          </p>
          <div className="anim-rise" style={delay(0.5)}>
            <Link
              href="/menu"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand/90"
            >
              Lihat Menu <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <motion.div style={{ y: frameY }} className="relative mx-auto w-full max-w-sm md:max-w-md">
          <div className="anim-pop" style={delay(0.2)}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-coffee shadow-2xl shadow-coffee/30 md:rounded-[50%_50%_1.5rem_1.5rem/37.5%_37.5%_1.5rem_1.5rem]">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/video/hero-poster.webp"
                aria-hidden="true"
              >
                <source src="/video/hero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <FloatingCard item={spanish} className="-left-2 top-[38%] md:-left-12" />
          <FloatingCard item={matcha} delay={0.4} className="-right-2 bottom-10 md:-right-10" />
        </motion.div>
      </div>
    </section>
  );
}
