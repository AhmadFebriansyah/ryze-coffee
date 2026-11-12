import { render, screen, within } from "@testing-library/react";
import { MenuSections } from "@/components/menu/MenuSections";
import { CATEGORIES, getMenu } from "@/lib/menu";

describe("MenuSections", () => {
  it("lists every category in a side navigation that jumps to its section", () => {
    render(<MenuSections items={getMenu()} />);
    const nav = screen.getByRole("navigation", { name: "Kategori menu" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((a) => a.textContent)).toEqual(CATEGORIES.map((c) => c.label));
    expect(links.map((a) => a.getAttribute("href"))).toEqual(CATEGORIES.map((c) => `#${c.id}`));
  });

  it("renders one headed section per category containing only its drinks", () => {
    render(<MenuSections items={getMenu()} />);
    for (const cat of CATEGORIES) {
      const heading = screen.getByRole("heading", { level: 2, name: cat.label });
      const section = heading.closest("section")!;
      expect(section).toHaveAttribute("id", cat.id);
      const names = within(section)
        .getAllByRole("heading", { level: 3 })
        .map((h) => h.textContent);
      expect(names).toEqual(getMenu().filter((m) => m.category === cat.id).map((m) => m.name));
    }
  });

  it("shows each drink with its photo, price and description, anchored by its id", () => {
    render(<MenuSections items={getMenu()} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(12);
    const row = document.getElementById("spanish-latte")!;
    expect(row).toBeTruthy();
    const r = within(row);
    expect(r.getByRole("heading", { level: 3 })).toHaveTextContent("Spanish Latte");
    expect(r.getByText("Rp 30.000")).toBeInTheDocument();
    expect(r.getByText("Best Seller")).toBeInTheDocument();
    expect(r.getByText(/Sekali teguk, langsung jatuh hati/)).toBeInTheDocument();
    const img = r.getByRole("img", { name: "Spanish Latte" });
    expect(img).toHaveClass("object-cover");
    expect(img.parentElement).toHaveClass("aspect-square");
  });

  it("marks the first category as current before any scrolling", () => {
    render(<MenuSections items={getMenu()} />);
    const nav = screen.getByRole("navigation", { name: "Kategori menu" });
    expect(within(nav).getByRole("link", { name: "Signature" })).toHaveAttribute("aria-current", "true");
    expect(within(nav).getByRole("link", { name: "Classic Coffee" })).not.toHaveAttribute("aria-current");
  });
});
