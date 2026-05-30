import Image from "next/image";
import { gallery } from "@/lib/site";
import { Reveal, Kicker } from "../reveal";

export function Gallery() {
  return (
    <section id="gallery" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker>Gallery</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
            Moments at Txaleta
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
