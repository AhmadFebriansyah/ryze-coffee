import { render, screen } from "@testing-library/react";
import { StoreCard } from "@/components/stores/StoreCard";
import { getStores } from "@/lib/stores";

const store = getStores()[0];

describe("StoreCard", () => {
  it("shows name, city, address and hours", () => {
    render(<StoreCard store={store} />);
    expect(screen.getByRole("heading", { name: store.name })).toBeInTheDocument();
    expect(screen.getByText(store.city)).toBeInTheDocument();
    expect(screen.getByText(store.address)).toBeInTheDocument();
    expect(screen.getByText(store.hours)).toBeInTheDocument();
  });

  it("embeds a lazy-loaded map for the store", () => {
    render(<StoreCard store={store} />);
    const map = screen.getByTitle(`Peta ${store.name}`);
    expect(map.tagName).toBe("IFRAME");
    expect(map).toHaveAttribute("loading", "lazy");
    expect(map).toHaveAttribute(
      "src",
      `https://maps.google.com/maps?q=${encodeURIComponent(store.mapQuery)}&output=embed`,
    );
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
