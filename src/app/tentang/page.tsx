import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tentang" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <h1 className="font-display text-4xl text-brand">Tentang</h1>
    </section>
  );
}
