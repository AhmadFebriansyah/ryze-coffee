import type { Store } from "@/lib/stores";

type StoreCardProps = { store: Store };

export function StoreCard({ store }: StoreCardProps) {
  const q = encodeURIComponent(store.mapQuery);
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-[0_2px_12px_rgba(42,29,20,0.06)]">
      <div className="aspect-[16/10] bg-cream">
        <iframe
          title={`Peta ${store.name}`}
          src={`https://maps.google.com/maps?q=${q}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 grayscale-[35%]"
        />
      </div>
      <div className="p-6 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand/70">{store.city}</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold text-brand">{store.name}</h2>
        <p className="mt-3 leading-relaxed text-ink/75">{store.address}</p>
        <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink">
          <span aria-hidden>🕒</span>
          <span className="sr-only">Jam buka:</span>
          <span>{store.hours}</span>
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${q}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          Buka di Google Maps <span aria-hidden>↗</span>
        </a>
      </div>
    </article>
  );
}
