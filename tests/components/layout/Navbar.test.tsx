import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

const pathname = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.value }));

import { Navbar } from "@/components/layout/Navbar";

describe("Navbar", () => {
  it("links the logo home and lists the three pages", () => {
    pathname.value = "/";
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "Ryze Coffee" })).toHaveAttribute("href", "/");
    const desktop = screen.getByRole("navigation", { name: "Utama" });
    expect(within(desktop).getByRole("link", { name: "Tentang" })).toHaveAttribute("href", "/tentang");
    expect(within(desktop).getByRole("link", { name: "Menu" })).toHaveAttribute("href", "/menu");
    expect(within(desktop).getByRole("link", { name: "Toko" })).toHaveAttribute("href", "/toko");
  });

  it("marks the current page with aria-current", () => {
    pathname.value = "/menu";
    render(<Navbar />);
    const desktop = screen.getByRole("navigation", { name: "Utama" });
    expect(within(desktop).getByRole("link", { name: "Menu" })).toHaveAttribute("aria-current", "page");
    expect(within(desktop).getByRole("link", { name: "Tentang" })).not.toHaveAttribute("aria-current");
  });

  it("toggles the mobile menu", async () => {
    pathname.value = "/";
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: "Buka menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("navigation", { name: "Menu seluler" })).not.toBeInTheDocument();
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const mobile = screen.getByRole("navigation", { name: "Menu seluler" });
    expect(within(mobile).getByRole("link", { name: "Toko" })).toHaveAttribute("href", "/toko");
  });
});
