import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getAllGuides, getGuide, getRelatedGuides } from "@/lib/guides";
import { site } from "@/lib/site";
import { Kicker } from "@/components/reveal";
import { GuideArticle } from "@/components/guide-article";
import { PaperGrain, PalmCorner, RattanWeave } from "@/components/brand-texture";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${site.url}/guides/${guide.slug}`,
      type: "article",
      images: [{ url: `${site.url}${guide.image}`, alt: guide.imageAlt }],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = getRelatedGuides(slug, 3);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/guides` },
      { "@type": "ListItem", position: 3, name: guide.title, item: `${site.url}/guides/${guide.slug}` },
    ],
  };

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[68vh] min-h-[460px] items-end overflow-hidden">
        <Image src={guide.image} alt={guide.imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-14 text-white">
          <Link
            href="/guides"
            className="label inline-flex items-center gap-2 text-[10px] text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> All guides
          </Link>
          <Kicker className="mt-5 font-bold text-brand [text-shadow:0_0_8px_rgba(0,0,0,1),0_2px_4px_rgba(0,0,0,0.95)]">
            Camiguin Travel Guide
          </Kicker>
          <h1 className="font-display mt-4 text-4xl font-light leading-[1.1] sm:text-5xl">{guide.title}</h1>
          <p className="mt-5 text-[13px] text-white/75">
            By the family at {guide.author} · Updated {guide.dateLabel} · {guide.readingTime} min read
          </p>
        </div>
      </section>

      {/* Article body */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <PaperGrain className="opacity-[0.05]" />
        <article className="relative z-10 mx-auto max-w-3xl px-6">
          <GuideArticle body={guide.body} />
        </article>
      </section>

      {/* Booking CTA */}
      <section className="relative overflow-hidden bg-brand py-20 text-white">
        <RattanWeave className="opacity-[0.10]" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-light sm:text-4xl">Come home to Camiguin</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/85">
            Fourteen ocean-view rooms on a Mambajao clifftop, an infinity pool over the Bohol Sea, and
            hosts who arrange everything from your airport pickup to your banca to White Island.
          </p>
          <Link
            href="/book"
            className="label mt-9 inline-flex items-center gap-3 bg-white px-9 py-4 text-[11px] text-ink transition-colors hover:bg-cream"
          >
            Book your stay direct <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <p className="mt-7 text-[13px] text-white/65">
            Or message us on{" "}
            <a href={`https://wa.me/${site.contact.whatsapp}`} className="underline hover:text-white">
              WhatsApp
            </a>{" "}
            ·{" "}
            <a href={`tel:${site.contact.phoneRaw}`} className="underline hover:text-white">
              {site.contact.phone}
            </a>
          </p>
        </div>
      </section>

      {/* Read also — related guides */}
      {related.length > 0 && (
        <section className="relative overflow-hidden bg-cream py-20 sm:py-24">
          <PalmCorner corner="tl" className="text-palm opacity-[0.10] lg:opacity-[0.16]" />
          <PalmCorner corner="br" className="text-palm opacity-[0.10] lg:opacity-[0.14]" />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">Read also</h2>
            <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/guides/${r.slug}`} className="group block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-brand">{r.readingTime} min read</p>
                  <h3 className="font-display mt-2 text-xl font-light leading-snug text-ink transition-colors group-hover:text-brand">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {guide.jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guide.jsonLd) }} />
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
