import Link from "next/link";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/lib/nav";

const SOCIALS = ["Instagram", "TikTok", "X"];

export function Footer() {
  return (
    <footer className="mt-24 bg-brand text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
        <div>
          <Logo className="text-2xl !text-cream" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/75">
            Kopi racikan biji Nusantara pilihan, diseduh segar setiap hari.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
          <span className="mb-1 font-semibold uppercase tracking-widest text-cream/60">Jelajahi</span>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="w-fit hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-sm">
          <span className="mb-1 font-semibold uppercase tracking-widest text-cream/60">Ikuti kami</span>
          {SOCIALS.map((s) => (
            <span key={s}>@ryzecoffee · {s}</span>
          ))}
        </div>
      </div>
      <div className="border-t border-cream/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-cream/60 md:px-8">
          © 2026 Ryze Coffee — brand fiktif, proyek portofolio.
        </p>
      </div>
    </footer>
  );
}
