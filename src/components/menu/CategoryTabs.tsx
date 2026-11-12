"use client";

import { CATEGORIES, type Category } from "@/lib/menu";

export type CategoryFilter = Category | "all";

type CategoryTabsProps = { value: CategoryFilter; onChange: (value: CategoryFilter) => void };

const TABS: { id: CategoryFilter; label: string }[] = [{ id: "all", label: "Semua" }, ...CATEGORIES];

export function CategoryTabs({ value, onChange }: CategoryTabsProps) {
  return (
    <div role="tablist" aria-label="Kategori menu" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
      {TABS.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              active ? "bg-brand text-cream" : "bg-white text-ink/70 hover:bg-cream hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
