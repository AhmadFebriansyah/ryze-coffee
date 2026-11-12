import Image from "next/image";

const STRIP = ["/menu/aren-latte.webp", "/menu/matcha-cloud.webp", "/menu/red-velvet-latte.webp", "/menu/lychee-tea.webp"];

/** Page header: a faded strip of product photos with an outlined "OUR MENU" behind a solid "MENU". */
export function MenuBanner() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-sand">
      <div aria-hidden className="grid grid-cols-2 opacity-35 sm:grid-cols-4">
        {STRIP.map((src, i) => (
          <div key={src} className={`relative aspect-[4/3] sm:aspect-square ${i > 1 ? "hidden sm:block" : ""}`}>
            <Image src={src} alt="" fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-sand/30 via-sand/50 to-sand/80 px-4 text-center">
        <div className="relative">
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(3.5rem,13vw,10rem)] font-extrabold leading-none text-transparent opacity-40 [-webkit-text-stroke:2px_var(--color-brand)]"
          >
            OUR MENU
          </span>
          <h1 className="relative font-display text-[clamp(3rem,9vw,6.5rem)] font-extrabold leading-none tracking-tight text-brand">
            MENU
          </h1>
        </div>
      </div>
    </div>
  );
}
