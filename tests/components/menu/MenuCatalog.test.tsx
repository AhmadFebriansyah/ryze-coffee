import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

const nav = vi.hoisted(() => ({ params: new URLSearchParams(), replace: vi.fn(), back: vi.fn() }));
vi.mock("next/navigation", () => ({
  useSearchParams: () => nav.params,
  useRouter: () => ({ replace: nav.replace, back: nav.back, push: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/menu",
}));

import { MenuCatalog } from "@/components/menu/MenuCatalog";
import { getMenu, getMenuItem } from "@/lib/menu";

function renderWith(query: string) {
  nav.params = new URLSearchParams(query);
  nav.replace.mockClear();
  nav.back.mockClear();
  return render(<MenuCatalog items={getMenu()} />);
}

const cardLinks = () => screen.getAllByRole("link").filter((a) => a.getAttribute("href")?.startsWith("/menu?item="));

describe("MenuCatalog", () => {
  it("shows all 12 drinks and no dialog without an item param", () => {
    renderWith("");
    expect(cardLinks()).toHaveLength(12);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("filters by category", async () => {
    renderWith("");
    await userEvent.click(screen.getByRole("tab", { name: "Signature" }));
    // exiting cards animate out before leaving the DOM
    await waitFor(() => expect(cardLinks()).toHaveLength(4), { timeout: 2000 });
    const links = cardLinks();
    expect(links.map((l) => l.getAttribute("href"))).toEqual([
      "/menu?item=spanish-latte",
      "/menu?item=aren-latte",
      "/menu?item=caramel-cloud-latte",
      "/menu?item=ryze-butterscotch",
    ]);
  });

  it("opens the detail for ?item=spanish-latte", () => {
    renderWith("item=spanish-latte");
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(within(dialog).getByRole("heading", { name: "Spanish Latte" })).toBeInTheDocument();
    expect(dialog).toHaveTextContent("Rp 30.000");
    expect(dialog).toHaveTextContent("Best Seller");
    expect(dialog).toHaveTextContent("Signature");
    expect(dialog).toHaveTextContent(getMenuItem("spanish-latte")!.description);
  });

  it.each(["does-not-exist", "<script>alert(1)</script>", ""])("ignores an unknown item param %j", (slug) => {
    renderWith(`item=${encodeURIComponent(slug)}`);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(cardLinks()).toHaveLength(12);
  });

  it("closes with the ✕ button", async () => {
    renderWith("item=matcha-cloud");
    await userEvent.click(screen.getByRole("button", { name: "Tutup" }));
    expect(nav.replace).toHaveBeenCalledWith("/menu", { scroll: false });
  });

  it("closes with Escape", async () => {
    renderWith("item=matcha-cloud");
    await userEvent.keyboard("{Escape}");
    expect(nav.replace).toHaveBeenCalledWith("/menu", { scroll: false });
  });

  it("closes when clicking the backdrop", async () => {
    renderWith("item=matcha-cloud");
    await userEvent.click(screen.getByTestId("menu-detail-backdrop"));
    expect(nav.replace).toHaveBeenCalledWith("/menu", { scroll: false });
  });

  it("does not close when clicking inside the panel", async () => {
    renderWith("item=matcha-cloud");
    await userEvent.click(within(screen.getByRole("dialog")).getByRole("heading", { name: "Matcha Cloud" }));
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it("locks page scroll while open and restores it after", () => {
    document.body.style.overflow = "";
    const { unmount } = renderWith("item=matcha-cloud");
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("moves focus to the close button when opened", () => {
    renderWith("item=matcha-cloud");
    expect(screen.getByRole("button", { name: "Tutup" })).toHaveFocus();
  });

  it("goes back in history when closing a detail opened from a card, so Back isn't trapped", async () => {
    const { rerender } = renderWith("");
    const card = cardLinks().find((a) => a.getAttribute("href") === "/menu?item=aren-latte")!;
    card.addEventListener("click", (e) => e.preventDefault()); // jsdom can't navigate
    await userEvent.click(card);
    nav.params = new URLSearchParams("item=aren-latte");
    rerender(<MenuCatalog items={getMenu()} />);
    await userEvent.click(screen.getByRole("button", { name: "Tutup" }));
    expect(nav.back).toHaveBeenCalledTimes(1);
    expect(nav.replace).not.toHaveBeenCalled();
  });

  it("replaces the URL when closing a deep-linked detail (no in-app history to go back to)", async () => {
    renderWith("item=aren-latte");
    await userEvent.click(screen.getByRole("button", { name: "Tutup" }));
    expect(nav.replace).toHaveBeenCalledWith("/menu", { scroll: false });
    expect(nav.back).not.toHaveBeenCalled();
  });
});
