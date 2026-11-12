import { getStores } from "@/lib/stores";

describe("getStores", () => {
  const stores = getStores();

  it("has 4 stores with unique ids", () => {
    expect(stores).toHaveLength(4);
    expect(new Set(stores.map((s) => s.id)).size).toBe(4);
  });

  it("fills every field", () => {
    stores.forEach((s) => {
      for (const key of ["id", "name", "city", "address", "hours", "mapQuery"] as const) {
        expect(s[key].trim().length).toBeGreaterThan(0);
      }
    });
  });
});
