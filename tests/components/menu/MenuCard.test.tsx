import { render, screen } from "@testing-library/react";
import { MenuCard } from "@/components/menu/MenuCard";
import { getMenuItem } from "@/lib/menu";

describe("MenuCard", () => {
  it("links to the given href and shows name, price and badge", () => {
    render(<MenuCard item={getMenuItem("spanish-latte")!} href="/menu?item=spanish-latte" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/menu?item=spanish-latte");
    expect(link).toHaveTextContent("Spanish Latte");
    expect(link).toHaveTextContent("Rp 30.000");
    expect(link).toHaveTextContent("Best Seller");
  });

  it("crops the photo into a square box so any replacement photo fits", () => {
    render(<MenuCard item={getMenuItem("spanish-latte")!} href="/x" />);
    const img = screen.getByRole("img", { name: "Spanish Latte" });
    expect(img).toHaveClass("object-cover");
    expect(img.parentElement).toHaveClass("aspect-square");
  });

  it("shows no badge when the item has none", () => {
    render(<MenuCard item={getMenuItem("americano")!} href="/x" />);
    expect(screen.queryByText("Best Seller")).not.toBeInTheDocument();
    expect(screen.queryByText("New")).not.toBeInTheDocument();
  });
});
