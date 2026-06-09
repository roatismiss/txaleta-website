import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dining, site } from "@/lib/site";
import { Reveal, Kicker } from "@/components/reveal";
import { TilePattern, PaperGrain, PalmCorner, RattanWeave } from "@/components/brand-texture";

export const metadata: Metadata = {
  title: "Dining",
  description:
    "Filipino-Spanish cuisine on a Camiguin clifftop — breakfast with an ocean view, sunset dining over the sea, paella and tapas, and meals made for family and celebrations at Txaleta de Camiguin.",
  alternates: { canonical: "/dining" },
};

export default function DiningPage() {
  return (
    <>
      {/* ── Banner — aerial table shot, full bleed ── */}
      <section className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden">
        <Image
          src="/images/dining/aerial_view_table.webp"
          alt="Dining by the sea at Txaleta de Camiguin"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-white">
          <Kicker className="font-bold text-brand [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,1),0_2px_4px_rgba(0,0,0,0.95),0_4px_24px_rgba(0,0,0,0.8)]">
            {dining.subheading}
          </Kicker>
          <h1 className="font-display mt-4 text-5xl font-light sm:text-7xl md:text-8xl">
            {dining.heading}
          </h1>
        </div>
      </section>

      {/* ── Opening — intro ── */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <PaperGrain className="opacity-[0.06]" />
        <PalmCorner corner="tr" className="text-palm opacity-[0.12] lg:opacity-[0.18]" />
        <PalmCorner corner="bl" className="text-palm opacity-[0.11] lg:opacity-[0.16]" />
        <Reveal className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-2xl font-light italic leading-snug text-ink/80 sm:text-3xl">
            More than a restaurant, Txaleta is a place to gather, connect, and enjoy the
            simple pleasures of island life.
          </p>
          <p className="mt-8 text-[15px] leading-relaxed text-ink/65">{dining.body}</p>
        </Reveal>
      </section>

      {/* ── Gallery strip — four images, uneven grid ── */}
      <section className="bg-cream py-4 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:h-[70vh] sm:min-h-[420px] sm:grid-cols-12 sm:grid-rows-2">
            <div className="group relative col-span-1 aspect-square overflow-hidden sm:col-span-7 sm:row-span-2 sm:aspect-auto">
              <Image
                src={dining.images[0]}
                alt="Filipino-Spanish food at Txaleta de Camiguin"
                fill
                sizes="(max-width: 640px) 50vw, 60vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
            </div>
            <div className="group relative col-span-1 aspect-square overflow-hidden sm:col-span-5 sm:row-span-1 sm:aspect-auto">
              <Image
                src={dining.images[1]}
                alt="Breakfast by the sea"
                fill
                sizes="(max-width: 640px) 50vw, 40vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
            </div>
            <div className="group relative col-span-1 aspect-square overflow-hidden sm:col-span-3 sm:row-span-1 sm:aspect-auto">
              <Image
                src={dining.images[2]}
                alt="Island plates at Txaleta"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
            </div>
            <div className="group relative col-span-1 aspect-square overflow-hidden sm:col-span-2 sm:row-span-1 sm:aspect-auto">
              <Image
                src="/images/resort/rayligh_lounge.webp"
                alt="The lounge at Txaleta"
                fill
                sizes="(max-width: 640px) 50vw, 15vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Story sections — Cuisine · Breakfast · Sunset (alternating) ── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6">
          {dining.stories.map((story, i) => (
            <Reveal key={story.id}>
              <div
                id={story.id}
                className={`grid scroll-mt-28 items-center gap-12 border-t border-ink/10 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className="group relative aspect-[4/3] w-full overflow-hidden [direction:ltr]">
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Text */}
                <div className="[direction:ltr]">
                  <Kicker className="text-brand">{story.kicker}</Kicker>
                  <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
                    {story.heading}
                  </h2>
                  <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-ink/70">
                    {story.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Family dining, celebrations & special occasions ── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Kicker className="text-brand">{dining.family.kicker}</Kicker>
            <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
              {dining.family.heading}
            </h2>
            <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-ink/70">
              {dining.family.body}
            </p>
            <a
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent("Hi, I'd like to ask about private dining / a celebration at Txaleta.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex items-center gap-3 border-b border-sand pb-1 text-ink transition-colors hover:text-sand"
            >
              <span className="label text-[11px]">Enquire About Private Dining</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="group relative aspect-[4/3] w-full overflow-hidden lg:[direction:ltr]">
              <Image
                src={dining.family.image}
                alt={dining.family.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Local ingredients, island flavors ── */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="group relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={dining.local.image}
                alt={dining.local.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Kicker className="text-brand">{dining.local.kicker}</Kicker>
            <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
              {dining.local.heading}
            </h2>
            <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-ink/70">
              {dining.local.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Atmosphere band — dark bg, 4 images ── */}
      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        <TilePattern tone="cream" fade="center" className="opacity-[0.12]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-light sm:text-5xl">
              A Table Worth Staying At
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-white/60">
              Breakfast in Camiguin, a leisurely lunch with a view, sunset cocktails, or dinner
              under the stars — the café welcomes resort guests and walk-in visitors alike.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {dining.atmosphere.map((src, i) => (
              <Reveal key={src} delay={i * 0.07}>
                <div className="group relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={src}
                    alt="Atmosphere at Txaleta de Camiguin"
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Room service — order from your phone, served to your terrace ── */}
      <section id="room-service" className="scroll-mt-28 bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="group relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={dining.roomService.image}
                alt={dining.roomService.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Kicker className="text-brand">{dining.roomService.kicker}</Kicker>
            <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
              {dining.roomService.heading}
            </h2>
            <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-ink/70">
              {dining.roomService.body}
            </p>
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex items-center gap-3 border-b border-sand pb-1 text-ink transition-colors hover:text-sand"
            >
              <span className="label text-[11px]">Message Our Concierge</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
            </a>
            <p className="mt-4 text-[13px] leading-relaxed text-ink/50">
              Day or night, in your language — your order brought to your terrace.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Closing CTA — Come Hungry. Leave Nourished. ── */}
      <section className="relative overflow-hidden bg-cream py-24 sm:py-32">
        <RattanWeave className="opacity-[0.10]" />
        <PalmCorner corner="tl" className="text-palm opacity-[0.11] lg:opacity-[0.16]" />
        <PalmCorner corner="br" className="text-palm opacity-[0.10] lg:opacity-[0.14]" />
        <Reveal className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-4xl font-light text-ink sm:text-5xl">{dining.closing.heading}</h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink/65">
            {dining.closing.body}
          </p>
          <p className="font-display mt-8 text-2xl font-light italic leading-snug text-sand">
            {dining.closing.signoff.join(" ")}
          </p>
          <Link
            href="/book"
            className="label mt-10 inline-flex items-center gap-3 bg-brand px-9 py-4 text-[11px] text-white transition-colors hover:bg-brand-dark"
          >
            Book Your Stay <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <p className="mt-8 text-[13px] text-ink/45">
            Or reach us directly ·{" "}
            <a
              href={`tel:${site.contact.phoneRaw}`}
              className="text-ink/60 transition-colors hover:text-ink"
            >
              {site.contact.phone}
            </a>
          </p>
        </Reveal>
      </section>
    </>
  );
}
