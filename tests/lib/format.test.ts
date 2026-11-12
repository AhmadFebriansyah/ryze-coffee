import { formatRupiah } from "@/lib/format";

describe("formatRupiah", () => {
  it("formats thousands with a dot and a plain space after Rp", () => {
    expect(formatRupiah(30000)).toBe("Rp 30.000");
    expect(formatRupiah(18000)).toBe("Rp 18.000");
  });

  it("formats millions", () => {
    expect(formatRupiah(1250000)).toBe("Rp 1.250.000");
  });
});
