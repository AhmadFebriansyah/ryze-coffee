import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Hero } from "@/components/home/Hero";

const COPY =
  "Racikan espresso pilihan berpadu dengan susu manis, menghasilkan rasa creamy yang lembut namun tetap ringan. Sekali teguk, langsung jatuh hati.";

function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduce && query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("Hero", () => {
  beforeEach(() => mockReducedMotion(false));

  it("shows the headline, copy and CTA", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Iced Spanish Latte");
    expect(screen.getByText(COPY)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Lihat Menu/ })).toHaveAttribute("href", "/menu");
  });

  it("links the floating cards to their menu detail", () => {
    render(<Hero />);
    const spanish = screen.getByRole("link", { name: /Spanish Latte/ });
    expect(spanish).toHaveAttribute("href", "/menu?item=spanish-latte");
    expect(spanish).toHaveTextContent("Best Seller");
    expect(spanish).toHaveTextContent("Rp 30.000");

    const matcha = screen.getByRole("link", { name: /Matcha Cloud/ });
    expect(matcha).toHaveAttribute("href", "/menu?item=matcha-cloud");
    expect(matcha).toHaveTextContent("New");
    expect(matcha).toHaveTextContent("Rp 32.000");
  });

  it("plays a muted looping decorative video with a poster", () => {
    const { container } = render(<Hero />);
    const video = container.querySelector("video")!;
    expect(video).toBeTruthy();
    expect(video.autoplay).toBe(true);
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("poster", "/video/hero-poster.webp");
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect(video.querySelector("source")).toHaveAttribute("src", "/video/hero.mp4");
  });

  it("keeps the video frame a fixed aspect box so a failed video doesn't collapse it", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("video")!.parentElement).toHaveClass("aspect-[3/4]");
  });


  it("enables floating motion by default", () => {
    const { container } = render(<Hero />);
    container.querySelectorAll("[data-motion]").forEach((c) => expect(c).toHaveAttribute("data-motion", "on"));
  });
});
