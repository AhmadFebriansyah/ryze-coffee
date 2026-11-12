import { getStores } from "@/lib/stores";

describe("getStores", () => {
  const stores = getStores();

  it("has 4 stores with unique ids, one each in Jakarta, Bekasi, Bogor and Sukabumi", () => {
    expect(stores).toHaveLength(4);
    expect(new Set(stores.map((s) => s.id)).size).toBe(4);
    expect(stores.map((s) => s.city)).toEqual(["Jakarta Selatan", "Bekasi", "Bogor", "Sukabumi"]);
  });

  it("fills every field and points each store at its own photo", () => {
    stores.forEach((s) => {
      for (const key of ["id", "name", "city", "address", "hours", "mapQuery", "image"] as const) {
        expect(s[key].trim().length).toBeGreaterThan(0);
      }
      expect(s.image).toBe(`/stores/${s.id}.webp`);
    });
  });

  it("marks the Bogor and Sukabumi stores as nature-themed", () => {
    expect(stores.filter((s) => s.tag === "Nuansa alam").map((s) => s.city)).toEqual(["Bogor", "Sukabumi"]);
  });
});
