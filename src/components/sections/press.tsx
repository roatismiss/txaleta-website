import Image from "next/image";
import { press } from "@/lib/press";
import { homeSections } from "@/locales/content/home-sections";
import { localeTags, type Locale } from "@/lib/i18n";

import { Reveal, Kicker } from "../reveal";

/**
 * "In the Press" — sits directly under the guest reviews on the same white
 * surface, so it reads as the second half of one idea: what guests said, then
 * what writers wrote. A hairline separates the two.
 *
 * Mastheads are monochrome ink so a publication's own brand colour never
 * fights the palette; a piece with no logo file gets its name set in type at
 * the same optical height. Quotes stay in English in every locale (marked
 * `lang="en"`), exactly as the guest quotes do.
 */
export function Press({ lang = "en" }: { lang?: Locale }) {
  if (press.length === 0) return null;
  const tt = homeSections[lang].press;
  const fmt = new Intl.DateTimeFormat(localeTags[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <section className="bg-white pb-24 sm:pb-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="border-t border-sand/40 pt-20 sm:pt-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker>{tt.kicker}</Kicker>
            <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
              {tt.title}
            </h2>
          </Reveal>

          <div
            className={`mt-16 grid gap-16 ${press.length > 1 ? "md:grid-cols-2 md:gap-14" : "mx-auto max-w-3xl"}`}
          >
            {press.map((p, i) => (
              <Reveal key={p.url} delay={i * 0.1}>
                <figure className="flex h-full flex-col items-center text-center">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${p.outlet}: ${p.headline}`}
                    className="flex h-10 items-center opacity-80 transition-opacity hover:opacity-100"
                  >
                    {p.logo ? (
                      <Image
                        src={p.logo.src}
                        alt={p.outlet}
                        width={p.logo.width}
                        height={p.logo.height}
                        sizes="160px"
                        style={{ height: 36, width: "auto" }}
                        className="select-none"
                      />
                    ) : (
                      <span className="font-display text-[30px] leading-none tracking-tight text-ink">
                        {p.outlet}
                      </span>
                    )}
                  </a>

                  <blockquote
                    lang="en"
                    className="font-display mt-8 text-xl font-light leading-relaxed text-ink/85"
                  >
                    <p>“{p.quote}”</p>
                  </blockquote>

                  <figcaption className="mt-auto flex flex-col items-center pt-7">
                    <cite lang="en" className="font-display text-base italic text-ink/75">
                      {p.headline}
                    </cite>
                    <span className="mt-1.5 text-xs text-ink/45">
                      {p.author} · {fmt.format(new Date(`${p.date}T00:00:00Z`))}
                    </span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener"
                      className="label mt-5 text-[11px] text-brand underline decoration-sand decoration-1 underline-offset-4 transition-colors hover:text-ink"
                    >
                      {tt.cta}
                    </a>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
