import type { Metadata } from "next";
import { Origins } from "@/components/about/Origins";
import { ProcessSteps } from "@/components/about/ProcessSteps";
import { Stats } from "@/components/about/Stats";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Cerita Ryze Coffee: biji pilihan dari Gayo, Toraja, dan Kintamani, disangrai pelan dan diracik segar setiap hari.",
};

export default function TentangPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
          <p className="anim-rise text-xs font-semibold uppercase tracking-[0.25em] text-brand/70">Tentang Ryze</p>
          <h1 className="anim-rise mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-brand md:text-6xl">
            Kopi yang jujur, untuk hari-hari yang sibuk.
          </h1>
          <div className="anim-rise mt-8 grid max-w-4xl gap-6 text-lg leading-relaxed text-ink/75 md:grid-cols-2">
            <p>
              Ryze dimulai dari meja kecil di Jakarta, dengan satu mesin espresso dan rasa penasaran: bisakah kopi
              susu sehari-hari terasa istimewa tanpa jadi mahal?
            </p>
            <p>
              Jawabannya ada pada biji yang baik dan tangan yang teliti. Kami bekerja langsung dengan petani lokal,
              menyangrai sendiri, dan meracik setiap gelas seolah itu gelas pertama kami.
            </p>
          </div>
        </div>
      </section>
      <Origins />
      <ProcessSteps />
      <Stats />
    </>
  );
}
