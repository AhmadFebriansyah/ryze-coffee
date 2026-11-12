import { render, screen } from "@testing-library/react";
import { FeaturedMenu } from "@/components/home/FeaturedMenu";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { VisitCta } from "@/components/home/VisitCta";
import { getFeatured } from "@/lib/menu";

describe("StoryTeaser", () => {
  it("links to the about page", () => {
    render(<StoryTeaser />);
    expect(screen.getByRole("link", { name: /cerita/i })).toHaveAttribute("href", "/tentang");
  });
});

describe("FeaturedMenu", () => {
  it("renders the 4 featured drinks linking to their detail, plus a link to the full menu", () => {
    render(<FeaturedMenu />);
    const hrefs = screen
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"))
      .filter((h) => h?.startsWith("/menu?item="));
    expect(hrefs).toEqual(getFeatured().map((m) => `/menu?item=${m.id}`));
    expect(hrefs).toHaveLength(4);
    expect(screen.getByRole("link", { name: /Lihat semua menu/ })).toHaveAttribute("href", "/menu");
  });
});

describe("VisitCta", () => {
  it("links to the stores page", () => {
    render(<VisitCta />);
    expect(screen.getByRole("link", { name: /toko/i })).toHaveAttribute("href", "/toko");
  });
});
