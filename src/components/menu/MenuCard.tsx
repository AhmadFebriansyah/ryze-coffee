import Image from "next/image";
import Link from "next/link";
import { formatRupiah } from "@/lib/format";
import { BADGE_LABEL, type MenuItem } from "@/lib/menu";

/** keepScroll: stay at the current scroll position (used inside the catalog, where the link only opens the detail). */
type MenuCardProps = { item: MenuItem; href: string; priority?: boolean; keepScroll?: boolean };

export function MenuCard({ item, href, priority = false, keepScroll = false }: MenuCardProps) {
  return (
    <Link
      href={href}
      scroll={!keepScroll}
      data-item={item.id}
      className="group block rounded-3xl bg-white p-3 shadow-[0_2px_12px_rgba(42,29,20,0.06)] transition hover:shadow-[0_12px_32px_rgba(42,29,20,0.12)] motion-safe:hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream">
        <Image
          src={item.image}
          alt={item.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
      </div>
      <div className="px-1 pb-1 pt-3">
        {item.badge && (
          <span className="mb-1 inline-block rounded-full bg-brand/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand">
            {BADGE_LABEL[item.badge]}
          </span>
        )}
        <h3 className="font-display text-lg font-semibold leading-tight text-ink">{item.name}</h3>
        <p className="mt-1 text-sm font-medium text-muted">{formatRupiah(item.price)}</p>
      </div>
    </Link>
  );
}
