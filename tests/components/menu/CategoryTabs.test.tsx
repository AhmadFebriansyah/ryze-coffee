import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { CategoryTabs } from "@/components/menu/CategoryTabs";

describe("CategoryTabs", () => {
  it("renders the four tabs in order", () => {
    render(<CategoryTabs value="all" onChange={() => {}} />);
    expect(screen.getAllByRole("tab").map((t) => t.textContent)).toEqual([
      "Semua",
      "Signature",
      "Classic Coffee",
      "Non-Coffee",
    ]);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("calls onChange with the category id", async () => {
    const onChange = vi.fn();
    render(<CategoryTabs value="all" onChange={onChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Non-Coffee" }));
    expect(onChange).toHaveBeenCalledWith("non-coffee");
  });

  it("marks the active tab as selected", () => {
    render(<CategoryTabs value="classic" onChange={() => {}} />);
    expect(screen.getByRole("tab", { name: "Classic Coffee" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Semua" })).toHaveAttribute("aria-selected", "false");
  });
});
