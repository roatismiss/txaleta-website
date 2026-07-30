import type { Metadata } from "next";
import { pageAlternates, type Locale } from "@/lib/i18n";
import { getPageSeo } from "@/locales/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal, Kicker } from "@/components/reveal";
import { MenuBook } from "@/components/menu-book";
import { PaperGrain, PalmCorner, RattanWeave } from "@/components/brand-texture";
import { menuPage } from "@/locales/content/menu-page";
import { localePath } from "@/lib/i18n";

const meta: Metadata = {
  title: "Menu",
  description:
    "The à la carte menu at Txaleta de Camiguin — Filipino-Spanish tapas, paella, Filipino classics, rice bowls, pasta, breakfast by the infinity pool, signature cocktails and happy hour. Prices in Philippine Peso.",};

export default async function MenuPage({ params }: PageProps<"/[lang]">) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const t = menuPage[lang];
  return (
    <>
      {/* ── Banner ── */}
      <section className="relative flex h-[56vh] min-h-[380px] items-end overflow-hidden">
        <Image
          src="/images/dining/food_txaleta.webp"
          alt="Filipino-Spanish dishes at Txaleta de Camiguin"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 text-white">
          <Kicker className="font-bold text-brand [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,1),0_2px_4px_rgba(0,0,0,0.95)]">
            {t.eyebrow}
          </Kicker>
          <h1 className="font-display mt-4 text-5xl font-light sm:text-7xl">{t.title}</h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/80">
            {t.subtitle} — {t.servedOn}
          </p>
        </div>
      </section>

      {/* ── The flip-book menu ── */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <PaperGrain className="opacity-[0.05]" />
        <PalmCorner corner="tr" className="hidden text-palm opacity-[0.10] lg:block" />
        <PalmCorner corner="bl" className="hidden text-palm opacity-[0.09] lg:block" />

        <Reveal className="relative z-10 mx-auto mb-10 max-w-2xl px-6 text-center">
          <Link
            href={localePath(lang, "/dining")}
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-ink/50 transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
            {t.backToDining}
          </Link>
        </Reveal>

        <div className="relative z-10 px-5 sm:px-6">
          <MenuBook
            cover={{
              eyebrow: t.eyebrow,
              title: t.title,
              subtitle: t.subtitle,
              intro: t.coverIntro,
              openMenu: t.openMenu,
              swipeHint: t.swipeHint,
            }}
          />
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
        <RattanWeave className="opacity-[0.10]" />
        <PalmCorner corner="tl" className="text-palm opacity-[0.11]" />
        <PalmCorner corner="br" className="text-palm opacity-[0.10]" />
        <Reveal className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <Kicker className="text-brand">{t.ctaKicker}</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light text-ink sm:text-5xl">
            {t.ctaHeading}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink/65">
            {t.ctaBody}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent("Hi! I'd like to reserve a table at Txaleta's café.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex items-center gap-3 bg-brand px-9 py-4 text-[11px] text-white transition-colors hover:bg-brand-dark"
            >
              {t.reserveTable} <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <Link
              href={`${localePath(lang, "/dining")}#room-service`}
              className="label inline-flex items-center gap-3 border-b border-sand pb-1 text-[11px] text-ink transition-colors hover:text-sand"
            >
              {t.roomService}
            </Link>
          </div>
          <p className="mt-8 text-[13px] text-ink/45">
            {t.orReach} ·{" "}
            <a href={`tel:${site.contact.phoneRaw}`} className="text-ink/60 transition-colors hover:text-ink">
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
  const seo = getPageSeo(lang as Locale, "/dining/menu");
  return {
    ...meta,
    ...(seo ? { title: seo.title, description: seo.description } : {}),
    ...(seo?.keywords ? { keywords: seo.keywords } : {}),
    alternates: pageAlternates(lang as Locale, "/dining/menu"),
  };
}
