import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllGuides } from "@/lib/guides";
import { site } from "@/lib/site";
import { Reveal, Kicker } from "@/components/reveal";
import { PaperGrain, PalmCorner } from "@/components/brand-texture";

export const metadata: Metadata = {
  title: "Camiguin Travel Guides",
  description:
    "Honest, first-hand Camiguin travel guides from the family at Txaleta — how to get here from Cebu, a day-by-day itinerary, Camiguin vs Siquijor, and the best islands in the Philippines.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Camiguin Travel Guides",
    description: metadata.description,
    url: `${site.url}/guides`,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    hasPart: guides.map((g) => ({
      "@type": "Article",
      headline: g.title,
      url: `${site.url}/guides/${g.slug}`,
      image: `${site.url}${g.image}`,
    })),
  };

  return (
    <>
      {/* Banner */}
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden">
        <Image
          src="/images/guides/best-islands-philippines-white-island-sandbar.png"
          alt="Aerial view of a white-sand sandbar off Camiguin — Txaleta de Camiguin travel guides"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-white">
          <Kicker className="font-bold text-brand [text-shadow:0_0_8px_rgba(0,0,0,1),0_2px_4px_rgba(0,0,0,0.95)]">
            Travel Guides
          </Kicker>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-light leading-[1.08] sm:text-5xl md:text-6xl">
            Camiguin, by the people who live here
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85">
            Honest, first-hand guides to getting here, choosing your island, and spending your days
            well — written from our clifftop in Mambajao.
          </p>
        </div>
      </section>

      {/* Guide cards */}
      <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
        <PaperGrain className="opacity-[0.06]" />
        <PalmCorner corner="tl" className="text-palm opacity-[0.10] lg:opacity-[0.16]" />
        <PalmCorner corner="br" className="text-palm opacity-[0.10] lg:opacity-[0.14]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2">
            {guides.map((g, i) => (
              <Reveal key={g.slug} delay={(i % 2) * 0.06}>
                <Link href={`/guides/${g.slug}`} className="group block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={g.image}
                      alt={g.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-brand">
                    {g.readingTime} min read · Updated {g.dateLabel}
                  </p>
                  <h2 className="font-display mt-3 text-2xl font-light leading-snug text-ink transition-colors group-hover:text-brand sm:text-3xl">
                    {g.title}
                  </h2>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink/65">
                    {g.description}
                  </p>
                  <span className="btn mt-5 inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-ink transition-colors group-hover:text-brand">
                    Read guide
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
