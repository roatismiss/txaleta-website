import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dining, site } from "@/lib/site";
import { Reveal, Kicker } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Dining",
  description:
    "Fresh Filipino cooking at the water's edge — breakfast with the tide, long lunches and dinners that last past dark at Txaleta de Camiguin.",
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
          <h1 className="font-display text-5xl font-light sm:text-7xl md:text-8xl">
            Dining
          </h1>
        </div>
      </section>

      {/* ── Opening quote ── */}
      <section className="bg-white py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-2xl font-light italic leading-snug text-ink/80 sm:text-3xl">
            &ldquo;The café sits at the edge of the water, where breakfast arrives with the morning
            light and the boats heading out for White Island.&rdquo;
          </p>
          <p className="mt-8 text-[15px] leading-relaxed text-ink/60">
            {dining.body}
          </p>
        </Reveal>
      </section>

      {/* ── Gallery strip — four images, uneven grid ── */}
      <section className="bg-cream py-4 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Mobile: 2-col square grid. Desktop: editorial asymmetric grid */}
          <div className="grid grid-cols-2 gap-3 sm:h-[70vh] sm:min-h-[420px] sm:grid-cols-12 sm:grid-rows-2">
            {/* Large left — full height on desktop, tall square on mobile */}
            <div className="group relative col-span-1 aspect-square overflow-hidden sm:col-span-7 sm:row-span-2 sm:aspect-auto">
              <Image
                src={dining.images[0]}
                alt="Food at Txaleta de Camiguin"
                fill
                sizes="(max-width: 640px) 50vw, 60vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
            </div>
            {/* Right top */}
            <div className="group relative col-span-1 aspect-square overflow-hidden sm:col-span-5 sm:row-span-1 sm:aspect-auto">
              <Image
                src={dining.images[1]}
                alt="Breakfast by the sea"
                fill
                sizes="(max-width: 640px) 50vw, 40vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
            </div>
            {/* Right bottom left */}
            <div className="group relative col-span-1 aspect-square overflow-hidden sm:col-span-3 sm:row-span-1 sm:aspect-auto">
              <Image
                src={dining.images[2]}
                alt="Nachos at Txaleta"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
            </div>
            {/* Right bottom right */}
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

      {/* ── Three story sections — alternating text + image ── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6">
          {dining.stories.map((story, i) => (
            <Reveal key={story.kicker}>
              <div
                id={i === 0 ? "morning" : i === 1 ? "all-day" : "evening"}
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
                  {/* Subtle warm scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* Text */}
                <div className="[direction:ltr]">
                  <h2 className="font-display text-4xl font-light leading-tight text-ink sm:text-5xl">
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

      {/* ── Atmosphere band — dark bg, 4 images ── */}
      <section className="bg-ink py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-light sm:text-5xl">
              A Table Worth Staying At
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-white/60">
              The café opens at dawn and the lights stay on past dark. Everything between
              is an easy hour — something to eat, somewhere to sit, the sea always in view.
            </p>
          </Reveal>

          {/* 4-image row — tall portrait cards */}
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

      {/* ── What's on the table — copy block ── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <h2 className="font-display text-4xl font-light leading-tight text-ink sm:text-5xl">
                What We Cook
              </h2>
            </Reveal>

            <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {[
                {
                  name: "Breakfast",
                  desc: "Barako coffee, fresh fruit, eggs, pan de sal, and the catch of the morning. Served from first light until mid-morning.",
                },
                {
                  name: "Filipino Classics",
                  desc: "Sinigang, kare-kare, adobo, kinilaw. Cooked the way the island has always cooked them — slowly, with whatever came in fresh.",
                },
                {
                  name: "Light Plates",
                  desc: "Nachos, salads, sandwiches, and easy bites for the long afternoon hours between a swim and sunset.",
                },
                {
                  name: "Seafood",
                  desc: "Grilled lapu-lapu, butter prawns, squid from the morning market. The Bohol Sea is very close to the kitchen.",
                },
                {
                  name: "Drinks & Bar",
                  desc: "Local beers, fresh buko juice, calamansi coolers, and a small cocktail list built around Philippine rum and tropical fruit.",
                },
                {
                  name: "Desserts",
                  desc: "Mango sticky rice, leche flan, camiguin pastel. Lanzones by the bowl when October turns them sweet.",
                },
              ].map((item, i) => (
                <Reveal key={item.name} delay={(i % 2) * 0.06}>
                  <div className="border-t border-ink/10 pt-6">
                    <h3 className="font-display text-xl font-light text-ink">{item.name}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink/60">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Room service — order from your phone, served to your terrace ── */}
      <section id="room-service" className="scroll-mt-28 bg-cream py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
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

          {/* Text */}
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
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
                aria-hidden
              />
            </a>
            <p className="mt-4 text-[13px] leading-relaxed text-ink/50">
              Day or night, in your language — your order brought to your terrace.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-ink py-20 text-white sm:py-28">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-light sm:text-4xl">
            Dining Is Part of the Stay
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/65">
            Breakfast is included with every room. For dinner or a group booking,
            let us know when you book your stay.
          </p>
          <Link
            href="/book"
            className="label mt-9 inline-flex items-center gap-3 bg-brand px-9 py-4 text-[11px] text-white transition-colors hover:bg-brand-dark"
          >
            Book Your Stay <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <p className="mt-8 text-[13px] text-white/45">
            Or reach us directly ·{" "}
            <a
              href={`tel:${site.contact.phoneRaw}`}
              className="text-white/70 transition-colors hover:text-white"
            >
              {site.contact.phone}
            </a>
          </p>
        </Reveal>
      </section>
    </>
  );
}
