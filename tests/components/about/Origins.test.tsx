import { render, screen, within } from "@testing-library/react";
import { Origins } from "@/components/about/Origins";

describe("Origins", () => {
  it.each([
    ["Gayo", "gayo"],
    ["Toraja", "toraja"],
    ["Kintamani", "kintamani"],
  ])("gives the %s card a photo of its coffee as background, behind a readability overlay", (region, slug) => {
    render(<Origins />);
    const card = screen.getByRole("heading", { level: 3, name: region }).closest("article")!;
    const img = card.querySelector("img")!;
    expect(img.getAttribute("src")).toContain(`origins%2F${slug}.webp`);
    expect(img).toHaveClass("object-cover");
    expect(within(card).getByTestId("origin-overlay")).toHaveClass("bg-gradient-to-t");
    expect(within(card).getByRole("heading", { level: 3 })).toHaveClass("text-white");
  });
});
