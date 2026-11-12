import { render, screen, within } from "@testing-library/react";
import TentangPage from "@/app/tentang/page";
import { getStores } from "@/lib/stores";

describe("Tentang page", () => {
  it("has a page heading", () => {
    render(<TentangPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
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
