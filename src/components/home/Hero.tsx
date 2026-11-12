"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const HEADLINE = ["Iced", "Spanish Latte"];
const COPY =
  "Racikan espresso pilihan berpadu dengan susu manis, menghasilkan rasa creamy yang lembut namun tetap ringan. Sekali teguk, langsung jatuh hati.";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax: the photo trails the text slightly while scrolling.
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-sand">
      {/* Desktop: exactly one screen tall below the 4rem navbar, so nothing needs scrolling. */}
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 pb-12 pt-8 md:h-[calc(100svh-4rem)] md:min-h-[32rem] md:max-h-[56rem] md:grid-cols-[1.1fr_1fr] md:gap-10 md:px-8 md:py-6">
        <div>
          <p className="anim-rise text-xs font-semibold uppercase tracking-[0.25em] text-brand/70">Signature Ryze</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] text-brand sm:text-6xl md:text-[clamp(3rem,min(9vh,5.6vw),5.25rem)]">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <span className="anim-line block" style={delay(0.1 + i * 0.12)}>
                  {line}
                  {i < HEADLINE.length - 1 ? " " : ""}
                </span>
              </span>
            ))}
          </h1>
          <p className="anim-rise mt-5 max-w-md text-base leading-relaxed text-ink/75 lg:text-lg" style={delay(0.35)}>
            {COPY}
          </p>
          <div className="anim-rise" style={delay(0.5)}>
            <Link
              href="/menu"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-brand/20 transition hover:bg-brand/90 motion-safe:hover:-translate-y-0.5"
            >
              Lihat Menu <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <motion.div style={{ y: imageY }} className="relative mx-auto h-full w-full max-w-sm md:max-w-none">
          <div className="anim-pop relative aspect-[4/5] w-full md:aspect-auto md:h-full" style={delay(0.2)}>
            <Image
              src="/hero/hero.webp"
              alt="Iced Aren Latte dan Iced Spanish Latte dari Ryze Coffee"
              fill
              priority
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
