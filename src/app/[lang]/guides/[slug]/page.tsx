import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {
  getAllGuidePaths,
  getGuide,
  getGuideAlternates,
  getRelatedGuides,
  getAdjacentGuides,
} from "@/lib/guides";
import { site } from "@/lib/site";
import { localePath, localeTags, defaultLocale, type Locale } from "@/lib/i18n";
import { Kicker } from "@/components/reveal";
import { GuideArticle } from "@/components/guide-article";
import { PaperGrain, PalmCorner, RattanWeave } from "@/components/brand-texture";

export const dynamicParams = false;

// Page chrome around the translated article body. Kept here (rather than in
// locales/ui.ts) because it is specific to a guide page.
const CHROME: Record<
  Locale,
  { prev: string; next: string; back: string; kicker: string; byline: string; updated: string; minRead: string; readAlso: string; home: string; guides: string; ctaHeading: string; ctaBody: string; ctaButton: string; or: string }
> = {
  en: { prev: "Previous guide", next: "Next guide", back: "All guides", kicker: "Camiguin Travel Guide", byline: "By the family at", updated: "Updated", minRead: "min read", readAlso: "Read also", home: "Home", guides: "Guides", ctaHeading: "Come home to Camiguin", ctaBody: "Fourteen ocean-view rooms on a Mambajao clifftop, an infinity pool over the Bohol Sea, and hosts who arrange everything from your airport pickup to your banca to White Island.", ctaButton: "Book your stay direct", or: "Or message us on" },
  fr: { prev: "Guide précédent", next: "Guide suivant", back: "Tous les guides", kicker: "Guide de voyage Camiguin", byline: "Par la famille de", updated: "Mis à jour", minRead: "min de lecture", readAlso: "À lire aussi", home: "Accueil", guides: "Guides", ctaHeading: "Rentrez à la maison, à Camiguin", ctaBody: "Quatorze chambres avec vue sur l'océan sur une falaise de Mambajao, une piscine à débordement au-dessus de la mer de Bohol, et des hôtes qui organisent tout, de votre transfert depuis l'aéroport à votre banca vers White Island.", ctaButton: "Réservez en direct", or: "Ou écrivez-nous sur" },
  de: { prev: "Vorheriger Guide", next: "Nächster Guide", back: "Alle Reiseführer", kicker: "Camiguin Reiseführer", byline: "Von der Familie im", updated: "Aktualisiert", minRead: "Min. Lesezeit", readAlso: "Auch lesenswert", home: "Startseite", guides: "Reiseführer", ctaHeading: "Kommen Sie heim nach Camiguin", ctaBody: "Vierzehn Zimmer mit Meerblick auf einer Klippe in Mambajao, ein Infinity-Pool über der Bohol-See und Gastgeber, die alles arrangieren — vom Flughafentransfer bis zur Banca nach White Island.", ctaButton: "Direkt buchen", or: "Oder schreiben Sie uns auf" },
  ja: { prev: "前のガイド", next: "次のガイド", back: "ガイド一覧", kicker: "カミギン旅行ガイド", byline: "書き手：", updated: "更新", minRead: "分で読めます", readAlso: "あわせて読みたい", home: "ホーム", guides: "ガイド", ctaHeading: "カミギンへ、おかえりなさい", ctaBody: "マンバハオの崖の上に海を望む14室、ボホール海へ流れ込むようなインフィニティプール、そして空港送迎からホワイトアイランドへのバンカ船まで手配するホストがお待ちしています。", ctaButton: "公式サイトから予約する", or: "またはこちらからご連絡ください：" },
  ko: { prev: "이전 가이드", next: "다음 가이드", back: "가이드 전체보기", kicker: "카미긴 여행 가이드", byline: "글쓴이:", updated: "업데이트", minRead: "분 소요", readAlso: "함께 읽기", home: "홈", guides: "가이드", ctaHeading: "카미긴으로 돌아오세요", ctaBody: "맘바하오 절벽 위 바다 전망 객실 14개, 보홀해로 이어지는 인피니티 풀, 그리고 공항 픽업부터 화이트 아일랜드행 방카까지 모두 준비해 드리는 호스트가 있습니다.", ctaButton: "공식 홈페이지에서 예약하기", or: "또는 이곳으로 연락 주세요:" },
  zh: { prev: "上一篇攻略", next: "下一篇攻略", back: "全部攻略", kicker: "卡米金旅行攻略", byline: "作者：", updated: "更新于", minRead: "分钟阅读", readAlso: "延伸阅读", home: "首页", guides: "攻略", ctaHeading: "回家吧，回卡米金", ctaBody: "曼巴豪悬崖之上的十四间海景客房，一座仿佛流入保和海的无边泳池，以及从机场接送到前往白岛的螃蟹船都为你安排妥当的主人。", ctaButton: "官网直接预订", or: "或通过以下方式联系我们：" },
};

// Bottom-up: this page generates BOTH dynamic segments, so each locale only
// prerenders the articles that actually exist in that language.
export function generateStaticParams() {
  return getAllGuidePaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const guide = getGuide(locale, slug);
  if (!guide) return {};

  // hreflang over the translated slugs — every language version of THIS
  // article, each at its own localized URL. Untranslated locales are omitted.
  const alternates = getGuideAlternates(guide.key);
  const languages: Record<string, string> = {};
  for (const [loc, locSlug] of Object.entries(alternates)) {
    languages[localeTags[loc as Locale]] = localePath(loc as Locale, `/guides/${locSlug}`);
  }
  if (alternates[defaultLocale]) {
    languages["x-default"] = localePath(defaultLocale, `/guides/${alternates[defaultLocale]}`);
  }

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: {
      canonical: localePath(locale, `/guides/${guide.slug}`),
      languages,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${site.url}${localePath(locale, `/guides/${guide.slug}`)}`,
      type: "article",
      publishedTime: guide.dateISO || undefined,
      modifiedTime: guide.dateISO || undefined,
      authors: [guide.author],
      images: [{ url: `${site.url}${guide.image}`, alt: guide.imageAlt }],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const guide = getGuide(locale, slug);
  if (!guide) notFound();

  const t = CHROME[locale];
  const related = getRelatedGuides(locale, guide.key, 3);
  const { prev, next } = getAdjacentGuides(locale, guide.key);
  const guidesHref = localePath(locale, "/guides");

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: `${site.url}${localePath(locale, "/")}` },
      { "@type": "ListItem", position: 2, name: t.guides, item: `${site.url}${guidesHref}` },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `${site.url}${localePath(locale, `/guides/${guide.slug}`)}`,
      },
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
            href={guidesHref}
            className="label inline-flex items-center gap-2 text-[10px] text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> {t.back}
          </Link>
          <Kicker className="mt-5 font-bold text-brand [text-shadow:0_0_8px_rgba(0,0,0,1),0_2px_4px_rgba(0,0,0,0.95)]">
            {t.kicker}
          </Kicker>
          <h1 className="font-display mt-4 text-4xl font-light leading-[1.1] sm:text-5xl">{guide.title}</h1>
          <p className="mt-5 text-[13px] text-white/75">
            {t.byline} {guide.author} · {t.updated} {guide.dateLabel} · {guide.readingTime} {t.minRead}
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
          <h2 className="font-display text-3xl font-light sm:text-4xl">{t.ctaHeading}</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/85">{t.ctaBody}</p>
          <Link
            href={localePath(locale, "/book")}
            className="label mt-9 inline-flex items-center gap-3 bg-white px-9 py-4 text-[11px] text-ink transition-colors hover:bg-cream"
          >
            {t.ctaButton} <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <p className="mt-7 text-[13px] text-white/65">
            {t.or}{" "}
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

      {/* Prev / next — keeps readers moving through the cluster */}
      {(prev || next) && (
        <nav className="relative border-t border-ink/10 bg-white" aria-label={t.readAlso}>
          <div className="mx-auto grid max-w-5xl gap-px px-6 sm:grid-cols-2">
            {prev ? (
              <Link
                href={localePath(locale, `/guides/${prev.slug}`)}
                className="group flex flex-col justify-center gap-2 py-10 pr-6 sm:border-r sm:border-ink/10"
              >
                <span className="label inline-flex items-center gap-2 text-[10px] text-ink/45">
                  <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> {t.prev}
                </span>
                <span className="font-display text-xl font-light leading-snug text-ink transition-colors group-hover:text-brand">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <Link
                href={localePath(locale, `/guides/${next.slug}`)}
                className="group flex flex-col justify-center gap-2 py-10 sm:items-end sm:pl-6 sm:text-right"
              >
                <span className="label inline-flex items-center gap-2 text-[10px] text-ink/45">
                  {t.next} <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
                <span className="font-display text-xl font-light leading-snug text-ink transition-colors group-hover:text-brand">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* Read also — related guides */}
      {related.length > 0 && (
        <section className="relative overflow-hidden bg-cream py-20 sm:py-24">
          <PalmCorner corner="tl" className="text-palm opacity-[0.10] lg:opacity-[0.16]" />
          <PalmCorner corner="br" className="text-palm opacity-[0.10] lg:opacity-[0.14]" />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">{t.readAlso}</h2>
            <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={localePath(locale, `/guides/${r.slug}`)} className="group block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-brand">
                    {r.readingTime} {t.minRead}
                  </p>
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
