import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function StoryTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <Reveal className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <p className="font-display text-4xl font-extrabold tracking-tight text-brand md:text-5xl">Our Story</p>
          {/* Store photo: big rounded corners on the left, fading out into the page on the right. */}
          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-l-[2.5rem] rounded-r-2xl [mask-image:linear-gradient(to_right,black_45%,transparent_98%)]">
            <Image
              src="/story/interior.webp"
              alt="Suasana interior toko Ryze Coffee yang modern dan hangat"
              fill
              sizes="(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-[30%_50%]"
            />
          </div>
        </div>
        <div className="md:pt-16">
          <h2 className="font-display text-2xl font-extrabold leading-snug text-brand md:text-3xl">
            Dari kebun Nusantara, sampai ke genggamanmu.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/75">
            Ryze lahir dari satu keyakinan sederhana: kopi enak tidak perlu rumit. Kami memilih biji dari petani Gayo,
            Toraja, dan Kintamani, menyangrainya pelan-pelan, lalu meraciknya segar setiap kali kamu memesan.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/75">
            Setiap cabang Ryze dirancang sebagai tempat singgah yang hangat: terang, hijau, dan nyaman untuk bekerja,
            bertemu teman, atau sekadar menikmati segelas kopi dengan tenang.
          </p>
          <Link
            href="/tentang"
            className="mt-7 inline-flex items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
          >
            Baca cerita kami <span aria-hidden>→</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
