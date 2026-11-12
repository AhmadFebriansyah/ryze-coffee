"use client";

import { useEffect, useState } from "react";
import { CATEGORIES, type Category, type MenuItem } from "@/lib/menu";
import { MenuItemRow } from "./MenuItemRow";

type MenuSectionsProps = { items: MenuItem[] };

/** Fore-style catalog: sticky category list on the left, one headed section per category on the right. */
export function MenuSections({ items }: MenuSectionsProps) {
  const [active, setActive] = useState<Category>(CATEGORIES[0].id);

  // Highlight the category whose section is crossing the upper part of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id as Category);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    CATEGORIES.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-[13rem_1fr] lg:gap-14">
      <nav
        aria-label="Kategori menu"
        className="sticky top-16 z-30 -mx-4 border-b border-ink/5 bg-bg/90 px-4 py-3 backdrop-blur-md lg:top-24 lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
      >
        <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:items-end lg:gap-1 lg:overflow-visible">
          {CATEGORIES.map((c) => {
            const isActive = active === c.id;
            return (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#${c.id}`}
                  onClick={() => setActive(c.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`block rounded-full px-4 py-2 text-sm font-semibold transition-colors lg:rounded-none lg:px-0 lg:py-2.5 lg:text-right lg:font-display lg:text-xl ${
                    isActive
                      ? "bg-brand text-cream lg:bg-transparent lg:text-brand"
                      : "bg-white text-ink/70 hover:text-brand lg:bg-transparent"
                  }`}
                >
                  {c.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-8 space-y-16 lg:mt-0">
        {CATEGORIES.map((c, ci) => {
          const list = items.filter((m) => m.category === c.id);
          return (
            <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-32 lg:scroll-mt-24">
              <h2
                id={`${c.id}-title`}
                className="font-display text-3xl font-extrabold uppercase tracking-wide text-brand md:text-4xl"
              >
                {c.label}
              </h2>
              <ul className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2">
                {list.map((item, i) => (
                  <MenuItemRow key={item.id} item={item} priority={ci === 0 && i < 2} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
