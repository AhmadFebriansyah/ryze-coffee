import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuCard } from "@/components/menu/MenuCard";
import { MenuCatalog } from "@/components/menu/MenuCatalog";
import { getMenu } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Katalog minuman Ryze Coffee: Spanish Latte, Aren Latte, Matcha Cloud, dan menu signature, classic coffee, serta non-coffee lainnya.",
};

/** Prerendered grid shown until the interactive catalog (which reads ?item=) hydrates. */
function StaticGrid() {
  const items = getMenu();
  return (
    <>
      <div className="h-[42px]" aria-hidden />
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.id}>
            <MenuCard item={item} href={`/menu?item=${item.id}`} priority={i < 4} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default function MenuPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand/70">Menu Ryze</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold text-brand md:text-5xl">Temukan racikan favoritmu</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-ink/70">
        Dari signature yang jadi andalan sampai klasik yang tak pernah salah. Klik menu untuk melihat ceritanya.
      </p>
      <div className="mt-10">
        <Suspense fallback={<StaticGrid />}>
          <MenuCatalog items={getMenu()} />
        </Suspense>
      </div>
    </section>
  );
}
