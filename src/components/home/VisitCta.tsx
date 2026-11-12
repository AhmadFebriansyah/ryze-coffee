import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { getStores } from "@/lib/stores";

export function VisitCta() {
  const cities = getStores().map((s) => s.city.replace(/ Selatan$/, ""));
  return (
    <section className="mx-auto max-w-6xl px-4 pt-20 md:px-8 md:pt-28">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-14 text-center text-cream md:px-16 md:py-20">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cream/10" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-cream/5" />
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/60">Mampir yuk</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-extrabold leading-tight md:text-5xl">
          Satu gelas lebih nikmat diminum langsung di tempat.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-cream/75">Temukan Ryze di {cities.join(", ")}.</p>
        <Link
          href="/toko"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-brand transition hover:bg-white motion-safe:hover:-translate-y-0.5"
        >
          Cari toko terdekat <span aria-hidden>→</span>
        </Link>
      </Reveal>
    </section>
  );
}
