import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gallery } from "@/lib/site";
import { Reveal, Kicker } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Txaleta de Camiguin in pictures — the infinity pool over the Bohol Sea, White Island sandbars, clifftop sunsets, endemic birds and life around the resort.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      {/* ── Banner — aerial coastline, full bleed ── */}
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden">
        <Image
          src="/images/resort/camiguin_coast_aerial.webp"
          alt="Aerial view of the Camiguin coastline and its reefs"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-white">
          <Kicker className="font-bold text-brand [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,1),0_2px_4px_rgba(0,0,0,0.95),0_4px_24px_rgba(0,0,0,0.8)]">
            Between Volcano and Sea
          </Kicker>
          <h1 className="font-display mt-4 text-5xl font-light sm:text-6xl md:text-7xl">
            The Gallery
          </h1>
        </div>
      </section>

      {/* ── The full photo library ── */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-[15px] leading-relaxed text-cream/65">
              The island as we live it — mornings over the Bohol Sea, the sandbar a banca
              ride away, the resort turning gold at dusk. Take the long look.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((src, i) => (
                <div
                  key={src}
                  className={`group relative overflow-hidden ${
                    i % 10 === 0 || i % 10 === 5
                      ? "col-span-2 row-span-2 aspect-square sm:aspect-auto"
                      : "aspect-square"
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

          <Reveal delay={0.1} className="mt-16 text-center">
            <p className="font-display text-2xl font-light italic text-cream/80">
              Some islands you visit. Camiguin, you remember.
            </p>
            <Link
              href="/book"
              className="label mt-8 inline-flex items-center gap-3 bg-brand px-9 py-4 text-[11px] text-white transition-colors hover:bg-brand-dark"
            >
              Book Your Stay <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
