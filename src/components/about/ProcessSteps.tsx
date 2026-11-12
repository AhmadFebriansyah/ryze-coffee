"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

/** Each step's clip plays this long (4 steps ≈ 28 s), then the next step takes over. */
export const CLIP_SECONDS = 7;

const STEPS = [
  { title: "Dipetik", text: "Hanya ceri kopi merah matang yang dipetik tangan oleh petani mitra kami.", clip: "/video/process-1.mp4" },
  { title: "Disangrai", text: "Disangrai dalam batch kecil setiap minggu, pelan-pelan agar manis alaminya keluar.", clip: "/video/process-2.mp4" },
  { title: "Diseduh", text: "Diekstrak segar di setiap toko dengan takaran yang dicek barista kami setiap pagi.", clip: "/video/process-3.mp4" },
  { title: "Dituang", text: "Dipadukan dengan susu segar dan es, lalu dituang untukmu — tepat saat kamu memesan.", clip: "/video/process-4.mp4" },
];

export function ProcessSteps() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  // null = the visitor hasn't chosen; reduced-motion visitors then get a still background.
  const [userPaused, setPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? !!reduce;
  const [inView, setInView] = useState(false);

  // Only fetch and play the clips while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "200px 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !paused) void video.play()?.catch(() => {});
    else video.pause();
  }, [active, inView, paused]);

  const next = () => setActive((i) => (i + 1) % STEPS.length);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (paused) {
      void video?.play()?.catch(() => {});
      setPaused(false);
    } else {
      video?.pause();
      setPaused(true);
    }
  };

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-brand py-20 text-cream md:py-28">
      <video
        ref={videoRef}
        key={STEPS[active].clip}
        src={STEPS[active].clip}
        muted
        playsInline
        preload={inView ? "auto" : "none"}
        aria-hidden="true"
        onTimeUpdate={(e) => {
          if (e.currentTarget.currentTime >= CLIP_SECONDS) next();
        }}
        onEnded={next}
        className="anim-fade absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {/* Brand-green wash: keeps the cream text readable over any frame of the footage. */}
      <div
        data-testid="process-overlay"
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/90 via-brand/60 to-brand/90"
      />

      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/70">Proses kami</p>
            <h2 id="process-title" className="mt-3 font-display text-3xl font-extrabold md:text-5xl">
              Dari biji ke gelas
            </h2>
          </div>
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={paused ? "Putar video" : "Jeda video"}
            className="grid h-11 w-11 place-items-center rounded-full border border-cream/40 bg-cream/10 text-sm backdrop-blur transition hover:bg-cream/20 focus-visible:outline-2 focus-visible:outline-cream"
          >
            <span aria-hidden>{paused ? "▶" : "❚❚"}</span>
          </button>
        </Reveal>

        <ol aria-label="Dari biji ke gelas" className="mt-14 grid gap-8 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <li
                key={s.title}
                aria-current={isActive ? "step" : undefined}
                className={`relative pt-6 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-60"}`}
              >
                {/* Track + progress bar showing how long this step's clip still runs. */}
                <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-cream/25" />
                {isActive && (
                  <span
                    key={`${active}`}
                    aria-hidden
                    className="anim-progress absolute left-0 top-0 h-0.5 bg-cream"
                    style={{ "--dur": `${CLIP_SECONDS}s`, animationPlayState: paused ? "paused" : "running" } as CSSProperties}
                  />
                )}
                <span className="text-sm font-semibold text-cream/70">Langkah {i + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-extrabold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-cream/85">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
