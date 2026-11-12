import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("shows the brand, page links and the portfolio note", () => {
    render(<Footer />);
    expect(screen.getAllByText("Ryze Coffee").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Tentang" })).toHaveAttribute("href", "/tentang");
    expect(screen.getByRole("link", { name: "Menu" })).toHaveAttribute("href", "/menu");
    expect(screen.getByRole("link", { name: "Toko" })).toHaveAttribute("href", "/toko");
    expect(screen.getByText(/proyek portofolio/i)).toBeInTheDocument();
  });
});
