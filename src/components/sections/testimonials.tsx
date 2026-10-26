import { Quote, Star } from "lucide-react";
import { site, testimonials, verifiedTestimonials } from "@/lib/site";
import { homeSections } from "@/locales/content/home-sections";
import type { Locale } from "@/lib/i18n";

import { Reveal, Kicker } from "../reveal";

export function Testimonials({ lang = "en" }: { lang?: Locale }) {
  const tt = homeSections[lang].testimonials;

  // Real reviews win outright. The placeholder copy only shows while there
  // are none, and never alongside the Google link.
  const hasVerified = verifiedTestimonials.length > 0;
  const shown = hasVerified ? verifiedTestimonials : testimonials;

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker className="text-brand">{tt.kicker}</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
            {tt.title}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {shown.map((t, i) => (
            <Reveal key={`${t.name}-${t.date}`} delay={i * 0.1}>
              <figure className="flex h-full flex-col items-center text-center">
                {t.rating ? (
                  <div
                    className="flex gap-0.5"
                    aria-label={`${t.rating} out of 5`}
                  >
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star
                        key={s}
                        aria-hidden
                        className={
                          s < t.rating!
                            ? "h-4 w-4 fill-brand text-brand"
                            : "h-4 w-4 text-sand"
                        }
                        strokeWidth={1.2}
                      />
                    ))}
                  </div>
                ) : (
                  <Quote className="h-7 w-7 text-sand" strokeWidth={1.2} />
                )}

                <blockquote className="font-display mt-6 text-xl font-light leading-relaxed text-ink/85">
                  “{t.quote}”
                </blockquote>

                <figcaption className="mt-6">
                  <span className="label text-[11px] text-ink">{t.name}</span>
                  <span className="mt-1 block text-xs text-ink/45">
                    {t.source ? `${t.source} · ${t.date}` : t.date}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {hasVerified && (
          <Reveal className="mt-14 text-center">
            <a
              href={site.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-[11px] text-brand underline decoration-sand decoration-1 underline-offset-4 transition-colors hover:text-ink"
            >
              {tt.cta}
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
