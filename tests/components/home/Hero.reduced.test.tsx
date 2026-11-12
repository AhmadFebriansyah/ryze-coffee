import { render } from "@testing-library/react";
import { vi } from "vitest";

// Must be set before motion reads it (it caches the preference on first use).
window.matchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: query.includes("prefers-reduced-motion"),
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

import { Hero } from "@/components/home/Hero";

describe("Hero with prefers-reduced-motion", () => {
  it("turns floating motion off", () => {
    const { container } = render(<Hero />);
    const cards = container.querySelectorAll("[data-motion]");
    expect(cards.length).toBe(2);
    cards.forEach((c) => expect(c).toHaveAttribute("data-motion", "off"));
  });
});
