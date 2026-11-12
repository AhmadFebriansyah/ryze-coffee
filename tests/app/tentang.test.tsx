import { render, screen, within } from "@testing-library/react";
import TentangPage from "@/app/tentang/page";
import { getStores } from "@/lib/stores";

describe("Tentang page", () => {
  it("has a page heading", () => {
    render(<TentangPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("opens over a photo of a Ryze store with light text on a dark overlay", () => {
    render(<TentangPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    const hero = h1.closest("section")!;
    const img = hero.querySelector("img")!;
    expect(img.getAttribute("src")).toContain("interior.webp");
    expect(img).toHaveClass("object-cover");
    expect(within(hero).getByTestId("about-hero-overlay")).toBeInTheDocument();
    expect(h1).toHaveClass("text-cream");
  });

  it("names the three origin regions", () => {
    render(<TentangPage />);
    for (const region of ["Gayo", "Toraja", "Kintamani"]) {
      expect(screen.getByRole("heading", { name: region })).toBeInTheDocument();
    }
  });

  it("lists the four process steps in order", () => {
    render(<TentangPage />);
    const list = screen.getByRole("list", { name: "Dari biji ke gelas" });
    const steps = within(list).getAllByRole("listitem");
    expect(list.tagName).toBe("OL");
    expect(steps).toHaveLength(4);
    expect(steps.map((s) => within(s).getByRole("heading").textContent)).toEqual([
      "Dipetik",
      "Disangrai",
      "Diseduh",
      "Dituang",
    ]);
  });

  it("shows three stats, with the store count taken from the data", () => {
    render(<TentangPage />);
    const stats = within(screen.getByRole("list", { name: "Ryze dalam angka" })).getAllByRole("listitem");
    expect(stats).toHaveLength(3);
    expect(stats[0]).toHaveTextContent(String(getStores().length));
    expect(stats[0]).toHaveTextContent(/cabang/i);
  });
});
