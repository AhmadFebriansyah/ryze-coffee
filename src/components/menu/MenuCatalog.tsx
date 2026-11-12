"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { filterByCategory, getMenuItem, type MenuItem } from "@/lib/menu";
import { CategoryTabs, type CategoryFilter } from "./CategoryTabs";
import { MenuCard } from "./MenuCard";
import { MenuDetail } from "./MenuDetail";

type MenuCatalogProps = { items: MenuItem[] };

export function MenuCatalog({ items }: MenuCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<CategoryFilter>("all");

  const selected = getMenuItem(searchParams.get("item"));
  const lastOpened = useRef<string | null>(null);

  // A detail opened from a card in this catalog added a history entry: closing goes back,
  // so the Back button isn't trapped on /menu. Deep links (fresh load, or from Home) replace.
  const openedInApp = useRef(false);
  const close = useCallback(() => {
    if (openedInApp.current) {
      openedInApp.current = false;
      router.back();
    } else {
      router.replace("/menu", { scroll: false });
    }
  }, [router]);
  const markInAppOpen = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a[data-item]")) openedInApp.current = true;
  };

  // Return focus to the card that opened the detail.
  useEffect(() => {
    if (selected) {
      lastOpened.current = selected.id;
    } else if (lastOpened.current) {
      document.querySelector<HTMLElement>(`[data-item="${lastOpened.current}"]`)?.focus();
      lastOpened.current = null;
    }
  }, [selected]);

  const visible = filterByCategory(items, category);

  return (
    <>
      <CategoryTabs value={category} onChange={setCategory} />
      <motion.ul layout onClickCapture={markInAppOpen} className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <MenuCard item={item} href={`/menu?item=${item.id}`} priority={i < 4} keepScroll />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>{selected && <MenuDetail key={selected.id} item={selected} onClose={close} />}</AnimatePresence>
    </>
  );
}
