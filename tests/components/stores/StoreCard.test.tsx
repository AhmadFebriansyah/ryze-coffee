import { render, screen } from "@testing-library/react";
import { StoreCard } from "@/components/stores/StoreCard";
import { getStores } from "@/lib/stores";

const store = getStores()[0];
const nature = getStores().find((s) => s.tag)!;

describe("StoreCard", () => {
  it("shows name, city, address and hours", () => {
    render(<StoreCard store={store} />);
    expect(screen.getByRole("heading", { name: store.name })).toBeInTheDocument();
    expect(screen.getByText(store.city)).toBeInTheDocument();
    expect(screen.getByText(store.address)).toBeInTheDocument();
    expect(screen.getByText(store.hours)).toBeInTheDocument();
  });

  it("shows a photo of the store instead of a map", () => {
    const { container } = render(<StoreCard store={store} />);
    const img = screen.getByRole("img", { name: `Suasana ${store.name}` });
    expect(img.getAttribute("src")).toContain(encodeURIComponent(store.image));
    expect(img).toHaveClass("object-cover");
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("labels stores with a special atmosphere", () => {
    render(<StoreCard store={nature} />);
    expect(screen.getByText(nature.tag!)).toBeInTheDocument();
  });

  it("links to Google Maps in a new tab", () => {
    render(<StoreCard store={store} />);
    const link = screen.getByRole("link", { name: /Buka di Google Maps/ });
    expect(link).toHaveAttribute(
      "href",
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.mapQuery)}`,
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
