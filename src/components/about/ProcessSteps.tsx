import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { title: "Dipetik", text: "Hanya ceri kopi merah matang yang dipetik tangan oleh petani mitra kami." },
  { title: "Disangrai", text: "Disangrai dalam batch kecil setiap minggu, pelan-pelan agar manis alaminya keluar." },
  { title: "Diseduh", text: "Diekstrak segar di setiap toko dengan takaran yang dicek barista kami setiap pagi." },
  { title: "Dituang", text: "Dipadukan dengan susu segar dan es, lalu dituang untukmu — tepat saat kamu memesan." },
];

export function ProcessSteps() {
  return (
    <section className="bg-brand py-20 text-cream md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/60">Proses kami</p>
          <h2 id="process-title" className="mt-3 font-display text-3xl font-extrabold md:text-5xl">
            Dari biji ke gelas
          </h2>
        </Reveal>
        <ol aria-label="Dari biji ke gelas" className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t border-cream/20 pt-6">
              <Reveal>
                <span className="text-sm font-semibold text-cream/50">Langkah {i + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-extrabold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-cream/75">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
