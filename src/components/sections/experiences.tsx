import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { experiences } from "@/lib/site";
import { homeSections } from "@/locales/content/home-sections";
import { localePath, type Locale } from "@/lib/i18n";

import { Reveal, Kicker } from "../reveal";
import { ExperienceCardImage } from "../experience-card-image";
import { PalmCorner } from "../brand-texture";

export function Experiences({ lang = "en" }: { lang?: Locale }) {
  const t = homeSections[lang].experiences;
  return (
    <section id="experiences" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <PalmCorner corner="tr" className="text-palm opacity-[0.11] lg:opacity-[0.16]" />
      <PalmCorner corner="bl" className="text-palm opacity-[0.12] lg:opacity-[0.18]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker className="text-brand">{t.kicker}</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink/65">
            {t.intro}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((exp, i) => (
            <Reveal key={exp.title} delay={i * 0.08}>
              <div className="relative h-[26rem] overflow-hidden">
                <ExperienceCardImage
                  image={exp.image}
                  hoverImage={exp.hoverImage}
                  alt={exp.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-display text-2xl font-light">{exp.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/75">
                    {exp.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <Link
            href={localePath(lang, "/experiences")}
            className="group inline-flex items-center gap-3 border-b border-sand pb-1 text-ink transition-colors hover:text-sand"
          >
            <span className="label text-[11px]">{t.cta}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
