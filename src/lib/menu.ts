import menuData from "../../data/menu.json";

export type Category = "signature" | "classic" | "non-coffee";
export type Badge = "best-seller" | "new";

export type MenuItem = {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  badge?: Badge;
  featured: boolean;
};

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "signature", label: "Signature" },
  { id: "classic", label: "Classic Coffee" },
  { id: "non-coffee", label: "Non-Coffee" },
];

export const BADGE_LABEL: Record<Badge, string> = {
  "best-seller": "Best Seller",
  new: "New",
};

const MENU = menuData as MenuItem[];

export function getMenu(): MenuItem[] {
  return MENU;
}

export function getMenuItem(slug: string | null | undefined): MenuItem | undefined {
  if (!slug) return undefined;
  return MENU.find((m) => m.id === slug);
}

export function getFeatured(): MenuItem[] {
  return MENU.filter((m) => m.featured);
}

export function filterByCategory(items: MenuItem[], category: Category | "all"): MenuItem[] {
  return category === "all" ? items : items.filter((m) => m.category === category);
}

export function categoryLabel(category: Category): string {
  return CATEGORIES.find((c) => c.id === category)?.label ?? category;
}
