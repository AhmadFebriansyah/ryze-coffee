import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/home/Hero";

const COPY =
  "Racikan espresso pilihan berpadu dengan susu manis, menghasilkan rasa creamy yang lembut namun tetap ringan. Sekali teguk, langsung jatuh hati.";

describe("Hero", () => {
  it("shows the headline, copy and CTA", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Iced Spanish Latte");
    expect(screen.getByText(COPY)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Lihat Menu/ })).toHaveAttribute("href", "/menu");
  });

  it("shows the hero product photo instead of a video", () => {
    const { container } = render(<Hero />);
    const img = screen.getByRole("img", { name: /Ryze/ });
    expect(img.getAttribute("src")).toContain("hero.webp");
    expect(img).toHaveClass("object-contain");
    expect(container.querySelector("video")).toBeNull();
  });

  it("has no floating menu cards", () => {
    render(<Hero />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("fits within one screen below the navbar on desktop", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("section > div")).toHaveClass("md:h-[calc(100svh-4rem)]");
  });
});
