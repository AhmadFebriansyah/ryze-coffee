import Image from "next/image";
import { formatRupiah } from "@/lib/format";
import { BADGE_LABEL, type MenuItem } from "@/lib/menu";

/**
 * One drink in the catalog: photo on the left, name, price and description on the right.
 * The id makes it a link target (/menu#spanish-latte); :target highlights it on arrival.
 */
export function MenuItemRow({ item, priority = false }: { item: MenuItem; priority?: boolean }) {
  return (
    <li
      id={item.id}
      className="grid scroll-mt-36 grid-cols-[7rem_1fr] items-start gap-4 rounded-3xl p-2 transition-colors target:bg-white target:shadow-[0_8px_30px_rgba(42,29,20,0.10)] sm:grid-cols-[10rem_1fr] sm:gap-6 lg:scroll-mt-24"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-sand shadow-[0_2px_12px_rgba(42,29,20,0.06)]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          priority={priority}
          sizes="(min-width: 640px) 160px, 112px"
          className="object-cover"
        />
      </div>
      <div className="pt-1">
        {item.badge && (
          <span className="mb-1.5 inline-block rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand">
            {BADGE_LABEL[item.badge]}
          </span>
        )}
        <h3 className="font-display text-lg font-semibold leading-tight text-ink sm:text-xl">{item.name}</h3>
        <p className="mt-1.5 font-semibold text-price">{formatRupiah(item.price)}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
      </div>
    </li>
  );
}
