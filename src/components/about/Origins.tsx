import { Reveal } from "@/components/ui/Reveal";

const ORIGINS = [
  {
    region: "Gayo",
    place: "Aceh Tengah",
    notes: "Body tebal, rempah, dan cokelat hitam — tulang punggung espresso kami.",
  },
  {
    region: "Toraja",
    place: "Sulawesi Selatan",
    notes: "Earthy dan halus dengan sentuhan karamel, membuat latte terasa bulat.",
  },
  {
    region: "Kintamani",
    place: "Bali",
    notes: "Asam segar ala jeruk yang ringan, memberi kecerahan di setiap racikan.",
  },
];

export function Origins() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-24">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand/70">Asal biji</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-tight text-brand md:text-5xl">
          Tiga daerah, satu racikan khas.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {ORIGINS.map((o, i) => (
          <Reveal key={o.region}>
            <article className="h-full rounded-3xl bg-white p-7 shadow-[0_2px_12px_rgba(42,29,20,0.06)]">
              <span className="font-display text-5xl font-extrabold text-cream">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-extrabold text-brand">{o.region}</h3>
              <p className="text-sm font-semibold text-muted">{o.place}</p>
              <p className="mt-4 leading-relaxed text-ink/75">{o.notes}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
