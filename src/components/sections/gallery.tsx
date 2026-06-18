import Image from "next/image";
import { gallery } from "@/lib/site";
import { Reveal, Kicker } from "../reveal";

export function Gallery() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      {/* Jungle-leaf backdrop (Vila Cali) — portrait crop on mobile, landscape on
          larger screens. A dark wash keeps the heading legible and lets the gallery
          photos pop, with the green reading through behind them. */}
      <Image
        src="/images/textures/tropical-leaves-mobile.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover sm:hidden"
        aria-hidden
      />
      <Image
        src="/images/textures/tropical-leaves.jpg"
        alt=""
        fill
        sizes="100vw"
        className="hidden object-cover sm:block"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/48 to-black/66" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center [text-shadow:0_2px_18px_rgba(0,0,0,0.6)]">
          <Kicker className="text-sand">Between Volcano and Sea</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light leading-tight text-cream sm:text-5xl">
            The Long Look
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.map((src, i) => (
              <div
                key={src}
                className={`group relative overflow-hidden ${
                  i === 0 || i === 5 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt={`Txaleta de Camiguin ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
