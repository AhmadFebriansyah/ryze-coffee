import { CATEGORIES, filterByCategory, getFeatured, getMenu, getMenuItem } from "@/lib/menu";

describe("getMenu", () => {
  const menu = getMenu();

  it("has 12 drinks, 4 per category", () => {
    expect(menu).toHaveLength(12);
    for (const c of CATEGORIES) {
      expect(menu.filter((m) => m.category === c.id)).toHaveLength(4);
    }
  });

  it("has unique slug ids", () => {
    const ids = menu.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(/^[a-z0-9-]+$/));
  });

  it("points every image at /menu/<id>.webp and has a description", () => {
    menu.forEach((m) => {
      expect(m.image).toBe(`/menu/${m.id}.webp`);
      expect(m.description.trim().length).toBeGreaterThan(0);
    });
  });
});

describe("CATEGORIES", () => {
  it("labels the three categories", () => {
    expect(CATEGORIES.map((c) => c.label)).toEqual(["Signature", "Classic Coffee", "Non-Coffee"]);
  });
});

describe("getFeatured", () => {
  it("returns 4 items including spanish-latte", () => {
    const f = getFeatured();
    expect(f).toHaveLength(4);
    expect(f.map((m) => m.id)).toContain("spanish-latte");
  });
});

describe("getMenuItem", () => {
  it("finds spanish-latte", () => {
    const item = getMenuItem("spanish-latte");
    expect(item).toMatchObject({ name: "Spanish Latte", price: 30000, badge: "best-seller", category: "signature" });
  });

  it("finds matcha-cloud", () => {
    expect(getMenuItem("matcha-cloud")).toMatchObject({ price: 32000, badge: "new" });
  });

  it("returns undefined for unknown, empty or null slugs", () => {
    expect(getMenuItem("nope")).toBeUndefined();
    expect(getMenuItem("")).toBeUndefined();
    expect(getMenuItem(null)).toBeUndefined();
    expect(getMenuItem(undefined)).toBeUndefined();
  });
});

describe("filterByCategory", () => {
  it("returns everything for all", () => {
    expect(filterByCategory(getMenu(), "all")).toHaveLength(12);
  });

  it("returns only the requested category", () => {
    const classic = filterByCategory(getMenu(), "classic");
    expect(classic.length).toBeGreaterThan(0);
    classic.forEach((m) => expect(m.category).toBe("classic"));
  });
});
