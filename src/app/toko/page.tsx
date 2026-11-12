import type { Metadata } from "next";
import { StoreCard } from "@/components/stores/StoreCard";
import { Reveal } from "@/components/ui/Reveal";
import { getStores } from "@/lib/stores";

export const metadata: Metadata = {
  title: "Toko",
  description: "Lokasi dan jam buka Ryze Coffee di Jakarta, Bekasi, Bogor, dan Sukabumi.",
};

export default function TokoPage() {
  const stores = getStores();
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
      <p className="anim-rise text-xs font-semibold uppercase tracking-[0.25em] text-brand/70">Toko Ryze</p>
      <h1 className="anim-rise mt-3 font-display text-4xl font-extrabold text-brand md:text-5xl">Mampir ke Ryze terdekat</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {stores.map((store) => (
          <Reveal key={store.id}>
            <StoreCard store={store} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
