import type { Metadata } from "next";
import { MenuBanner } from "@/components/menu/MenuBanner";
import { MenuSections } from "@/components/menu/MenuSections";
import { getMenu } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Katalog minuman Ryze Coffee: Spanish Latte, Aren Latte, Matcha Cloud, dan menu signature, classic coffee, serta non-coffee lainnya.",
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <MenuBanner />
      <p className="mx-auto mt-8 max-w-xl text-center leading-relaxed text-ink/70 md:mt-10">
        Dari signature yang jadi andalan sampai klasik yang tak pernah salah. Semua diracik segar setiap kali kamu
        memesan.
      </p>
      <div className="mt-10 md:mt-14">
        <MenuSections items={getMenu()} />
      </div>
    </div>
  );
}
