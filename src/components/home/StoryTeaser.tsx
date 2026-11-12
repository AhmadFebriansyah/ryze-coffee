import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function StoryTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <Reveal className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:gap-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand/70">Our Story</p>
        <div>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-brand md:text-5xl">
            Dari kebun Nusantara, sampai ke genggamanmu.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
            Ryze lahir dari satu keyakinan sederhana: kopi enak tidak perlu rumit. Kami memilih biji dari petani Gayo,
            Toraja, dan Kintamani, menyangrainya pelan-pelan, lalu meraciknya segar setiap kali kamu memesan.
          </p>
          <Link
            href="/tentang"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
          >
            Baca cerita kami <span aria-hidden>→</span>
          </Link>
        </div>
      </Reveal>
      <Reveal className="relative mt-14 aspect-[4/3] overflow-hidden rounded-[2rem] bg-cream shadow-xl shadow-coffee/10 md:mt-20 md:aspect-[21/9]">
        <Image
          src="/story/interior.webp"
          alt="Suasana interior toko Ryze Coffee yang modern dan hangat"
          fill
          sizes="(min-width: 1152px) 1088px, 100vw"
          className="object-cover"
        />
      </Reveal>
    </section>
  );
}
