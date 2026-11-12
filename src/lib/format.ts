/** "Rp 30.000" — plain space, dot as thousands separator. */
export function formatRupiah(value: number): string {
  const digits = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp ${digits}`;
}
