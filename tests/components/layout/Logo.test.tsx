import { render, screen } from "@testing-library/react";
import { Logo } from "@/components/layout/Logo";

describe("Logo", () => {
  it("renders the brand name Ryze Coffee", () => {
    render(<Logo />);
    expect(screen.getByText("Ryze Coffee")).toBeInTheDocument();
  });
});
