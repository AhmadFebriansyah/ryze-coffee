import Link from "next/link";
import { MenuCard } from "@/components/menu/MenuCard";
import { Reveal } from "@/components/ui/Reveal";
import { getFeatured } from "@/lib/menu";

export function FeaturedMenu() {
  const featured = getFeatured();
  return (
    <section className="bg-cream/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand/70">Favorit pelanggan</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-brand md:text-5xl">Menu unggulan</h2>
          </div>
          <Link href="/menu" className="font-semibold text-brand underline-offset-4 hover:underline">
            Lihat semua menu <span aria-hidden>→</span>
          </Link>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featured.map((item) => (
            <li key={item.id}>
              <Reveal>
                <MenuCard item={item} href={`/menu#${item.id}`} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
