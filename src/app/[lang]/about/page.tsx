import type { Metadata } from "next";
import { pageAlternates, type Locale } from "@/lib/i18n";
import { getPageSeo } from "@/locales/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { about, site } from "@/lib/site";
import { aboutContent } from "@/locales/content/about";
import { localePath } from "@/lib/i18n";

// Small page-chrome strings not part of the content dictionaries.
const pageStrings: Record<Locale, { quote: string; believeKicker: string; believeHeading: string; bookCta: string; orReach: string }> = {
  en: { quote: "A heartfelt retreat where heritage meets healing.", believeKicker: "What We Believe", believeHeading: "{P.believeHeading}", bookCta: "Book Your Stay", orReach: "Or reach us directly" },
  fr: { quote: "Un refuge sincère, où l’héritage rencontre l’apaisement.", believeKicker: "Ce en quoi nous croyons", believeHeading: "Cinq idées au cœur de Txaleta", bookCta: "Réserver votre séjour", orReach: "Ou contactez-nous directement" },
  de: { quote: "Ein herzlicher Rückzugsort, wo Erbe auf Erholung trifft.", believeKicker: "Woran wir glauben", believeHeading: "Fünf Ideen im Herzen von Txaleta", bookCta: "Aufenthalt buchen", orReach: "Oder erreichen Sie uns direkt" },
  ja: { quote: "伝統と癒しが出会う、心のこもった隠れ家。", believeKicker: "私たちの信条", believeHeading: "Txaletaの中心にある5つの想い", bookCta: "宿泊を予約する", orReach: "または直接ご連絡ください" },
  ko: { quote: "헤리티지와 치유가 만나는, 진심 어린 안식처.", believeKicker: "우리가 믿는 것", believeHeading: "Txaleta의 중심에 있는 다섯 가지 생각", bookCta: "숙박 예약하기", orReach: "또는 직접 연락 주세요" },
  zh: { quote: "一处用心的居所，让传承与疗愈相遇。", believeKicker: "我们的信念", believeHeading: "Txaleta核心的五个理念", bookCta: "预订您的假期", orReach: "或直接联系我们" },
};
import { Reveal, Kicker } from "@/components/reveal";
import { TilePattern, PaperGrain, PalmCorner, RattanWeave } from "@/components/brand-texture";

const meta: Metadata = {
  title: "About",
  description:
    "Txaleta de Camiguin is a family-owned boutique resort on a Mambajao clifftop — Filipino-Spanish heritage, heartfelt hospitality, and slow island living. A heartfelt retreat where heritage meets healing.",};

export default async function AboutPage({ params }: PageProps<"/[lang]">) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const t = aboutContent[lang];
  const P = pageStrings[lang];
  return (
    <>
      {/* ── Banner ── */}
      <section className="relative flex h-[75vh] min-h-[500px] items-end overflow-hidden">
        <Image
          src={about.hero.image}
          alt="Txaleta de Camiguin on the clifftop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-white">
          <Kicker className="font-bold text-brand [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,1),0_2px_4px_rgba(0,0,0,0.95),0_4px_24px_rgba(0,0,0,0.8)]">
            {t.about.hero.kicker}
          </Kicker>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-light leading-[1.08] sm:text-5xl md:text-6xl">
            {t.about.hero.heading}
          </h1>
        </div>
      </section>

      {/* ── Opening + brand essence ── */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <PaperGrain className="opacity-[0.06]" />
        <PalmCorner corner="tl" className="text-palm opacity-[0.12] lg:opacity-[0.18]" />
        <PalmCorner corner="br" className="text-palm opacity-[0.11] lg:opacity-[0.16]" />
        <Reveal className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="font-display text-2xl font-light italic leading-snug text-ink/80 sm:text-3xl">
            &ldquo;{P.quote}&rdquo;
          </p>
          <p className="mt-8 text-[15px] leading-relaxed text-ink/65">{t.about.intro}</p>
        </Reveal>
      </section>

      {/* ── Story rows — alternating text + image ── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6">
          {t.about.sections.map((s, i) => (
            <Reveal key={s.kicker}>
              <div
                className={`grid items-center gap-12 border-t border-ink/10 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Image */}
                <div className="group relative aspect-[4/3] w-full overflow-hidden [direction:ltr]">
                  <Image
                    src={about.sections[i].image}
                    alt={s.heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="[direction:ltr]">
                  <Kicker className="text-brand">{s.kicker}</Kicker>
                  <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
                    {s.heading}
                  </h2>
                  {s.body.map((p) => (
                    <p key={p.slice(0, 24)} className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/70">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── A Unique Location — copy + attractions list ── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <Kicker className="text-brand">{t.about.location.kicker}</Kicker>
              <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
                {t.about.location.heading}
              </h2>
              <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-ink/70">
                {t.about.location.body}
              </p>
              <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={about.location.image}
                  alt="Aerial view of Camiguin from Txaleta"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="grid gap-y-1 sm:grid-cols-2 sm:gap-x-10">
                {t.about.location.attractions.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-3 border-b border-ink/10 py-4 text-[15px] text-ink/75"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.5} aria-hidden />
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Brand pillars — what we believe ── */}
      <section className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
        <TilePattern tone="cream" fade="center" className="opacity-[0.12]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker className="text-sand">{P.believeKicker}</Kicker>
            <h2 className="font-display mt-5 text-4xl font-light sm:text-5xl">
              Five Ideas at the Heart of Txaleta
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {t.pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.06}>
                <div className="border-t border-white/15 pt-7">
                  <span className="font-display text-2xl font-light text-sand">{`0${i + 1}`}</span>
                  <h3 className="font-display mt-4 text-2xl font-light">{p.title}</h3>
                  <p className="mt-2 text-[13px] uppercase tracking-[0.18em] text-white/45">
                    {p.idea}
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-white/65">{p.quote}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What makes us special — checklist ── */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal>
              <Kicker className="text-brand">{t.about.whyChoose.kicker}</Kicker>
              <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
                {t.about.whyChoose.heading}
              </h2>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ink/70">
                {t.about.whyChoose.body}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
                {t.about.whyChoose.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 border-t border-ink/10 py-4 text-[15px] leading-snug text-ink/75"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Ideal guests ── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker className="text-brand">{t.idealGuests.kicker}</Kicker>
            <h2 className="font-display mt-5 text-4xl font-light leading-tight text-ink sm:text-5xl">
              {t.idealGuests.heading}
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink/65">{t.idealGuests.body}</p>
          </Reveal>

          <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {t.idealGuests.items.map((g, i) => (
              <Reveal key={g.title} delay={(i % 2) * 0.06}>
                <div className="flex gap-5 border-t border-ink/10 pt-6">
                  <span className="font-display text-2xl font-light text-brand">{`0${i + 1}`}</span>
                  <div>
                    <h3 className="font-display text-2xl font-light text-ink">{g.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink/65">{g.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Come home — CTA ── */}
      <section className="relative overflow-hidden bg-cream py-24 sm:py-32">
        <RattanWeave className="opacity-[0.10]" />
        <PalmCorner corner="tl" className="text-palm opacity-[0.11] lg:opacity-[0.16]" />
        <PalmCorner corner="br" className="text-palm opacity-[0.10] lg:opacity-[0.14]" />
        <Reveal className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-4xl font-light text-ink sm:text-5xl">{t.about.comeHome.heading}</h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink/65">
            {t.about.comeHome.body}
          </p>
          <p className="font-display mt-8 text-2xl font-light italic leading-snug text-sand">
            {t.about.comeHome.closing.join(" ")}
          </p>
          <Link
            href={localePath(lang, "/book")}
            className="label mt-10 inline-flex items-center gap-3 bg-brand px-9 py-4 text-[11px] text-white transition-colors hover:bg-brand-dark"
          >
            {P.bookCta} <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <p className="mt-8 text-[13px] text-ink/45">
            {P.orReach} ·{" "}
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

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const seo = getPageSeo(lang as Locale, "/about");
  return {
    ...meta,
    ...(seo ? { title: seo.title, description: seo.description } : {}),
    ...(seo?.keywords ? { keywords: seo.keywords } : {}),
    alternates: pageAlternates(lang as Locale, "/about"),
  };
}
