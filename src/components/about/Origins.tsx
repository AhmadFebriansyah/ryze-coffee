import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const ORIGINS = [
  {
    slug: "gayo",
    region: "Gayo",
    place: "Aceh Tengah",
    notes: "Body tebal, rempah, dan cokelat hitam — tulang punggung espresso kami.",
    tags: ["Full body", "Rempah", "Dark chocolate"],
  },
  {
    slug: "toraja",
    region: "Toraja",
    place: "Sulawesi Selatan",
    notes: "Earthy dan halus dengan sentuhan karamel, membuat latte terasa bulat.",
    tags: ["Earthy", "Karamel", "Halus"],
  },
  {
    slug: "kintamani",
    region: "Kintamani",
    place: "Bali",
    notes: "Asam segar ala jeruk yang ringan, memberi kecerahan di setiap racikan.",
    tags: ["Citrus", "Segar", "Ringan"],
  },
];

export function Origins() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-24">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand/70">Asal biji</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-brand md:text-5xl">
          Tiga daerah, satu racikan khas.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {ORIGINS.map((o, i) => (
          <Reveal key={o.region}>
            <article className="group relative isolate flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-3xl bg-coffee p-7 shadow-xl shadow-coffee/15 md:min-h-[30rem]">
              <Image
                src={`/origins/${o.slug}.webp`}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="-z-20 object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
              />
              {/* Dark from the bottom so the white text always reads, whatever the photo. */}
              <div
                data-testid="origin-overlay"
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/10"
              />
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl font-extrabold text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.85)]">
                  0{i + 1}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  {o.place}
                </span>
              </div>
              <div>
                <h3 className="font-display text-4xl font-extrabold text-white">{o.region}</h3>
                <p className="mt-3 leading-relaxed text-white/85">{o.notes}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Karakter rasa ${o.region}`}>
                  {o.tags.map((t) => (
                    <li key={t} className="rounded-full border border-white/30 px-3 py-1 text-xs font-medium text-white/90">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
