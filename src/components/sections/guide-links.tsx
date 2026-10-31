// ============================================================================
// Guide links for the money pages.
//
// SEO_PLAN §5 rule 6: `/accommodation` and `/dining` are the strongest pages
// on the site and carried no links into the guides at all, which wasted them.
// This is that link block.
//
// Locale-aware on purpose. Guides exist only where they have actually been
// translated (see lib/guides.ts), so the keys below are ENGLISH slugs and each
// one resolves to that locale's own slug — or drops out if it does not exist
// there. On a locale with no guides at all the whole section renders nothing
// rather than linking somewhere that 404s.
// ============================================================================
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getGuides } from "@/lib/guides";
import { localePath, type Locale } from "@/lib/i18n";

import { Reveal, Kicker } from "../reveal";

export function GuideLinks({
  lang,
  keys,
  kicker,
  heading,
  intro,
}: {
  lang: Locale;
  /** English slugs, in the order they should appear. */
  keys: string[];
  kicker: string;
  heading: string;
  intro: string;
}) {
  const available = getGuides(lang);
  const picked = keys
    .map((key) => available.find((g) => g.key === key))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  if (picked.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker className="text-brand">{kicker}</Kicker>
          <h2 className="font-display mt-5 text-3xl font-light leading-tight text-ink sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-ink/65">{intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {picked.map((guide, i) => (
            <Reveal key={guide.key} delay={i * 0.1}>
              <Link
                href={localePath(lang, `/guides/${guide.slug}`)}
                className="group flex h-full flex-col border-t border-sand/60 pt-6 transition-colors hover:border-brand"
              >
                <h3 className="font-display text-xl font-light leading-snug text-ink transition-colors group-hover:text-brand">
                  {guide.title}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink/60">
                  {guide.description}
                </p>
                <span className="label mt-5 inline-flex items-center gap-1.5 text-[11px] text-brand">
                  {guide.readingTime} min
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
