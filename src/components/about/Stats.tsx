import { Reveal } from "@/components/ui/Reveal";
import { getStores } from "@/lib/stores";

export function Stats() {
  const stats = [
    { value: String(getStores().length), label: `cabang di ${new Set(getStores().map((s) => s.city)).size} kota` },
    { value: "12", label: "petani mitra" },
    { value: "250rb+", label: "gelas tersaji" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-24">
      <ul aria-label="Ryze dalam angka" className="grid gap-10 text-center sm:grid-cols-3">
        {stats.map((s) => (
          <li key={s.label}>
            <Reveal>
              <span className="block font-display text-6xl font-extrabold text-brand md:text-7xl">{s.value}</span>
              <span className="mt-2 block text-sm font-semibold uppercase tracking-widest text-muted">{s.label}</span>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
