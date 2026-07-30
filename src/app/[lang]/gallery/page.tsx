import type { Metadata } from "next";
import { pageAlternates, type Locale } from "@/lib/i18n";
import { getPageSeo } from "@/locales/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gallery } from "@/lib/site";
import { localePath } from "@/lib/i18n";

const P: Record<Locale, { kicker: string; title: string; intro: string; quote: string; cta: string }> = {
  en: { kicker: "Between Volcano and Sea", title: "The Gallery", intro: "The island as we live it — mornings over the Bohol Sea, the sandbar a banca ride away, the resort turning gold at dusk. Take the long look.", quote: "Some islands you visit. Camiguin, you remember.", cta: "Book Your Stay" },
  fr: { kicker: "Entre volcan et mer", title: "La galerie", intro: "L’île telle que nous la vivons — les matins sur la mer de Bohol, le banc de sable à quelques minutes de banca, le resort qui se dore au crépuscule. Prenez le temps de regarder.", quote: "Certaines îles se visitent. Camiguin, elle, se grave dans la mémoire.", cta: "Réserver votre séjour" },
  de: { kicker: "Zwischen Vulkan und Meer", title: "Die Galerie", intro: "Die Insel, wie wir sie leben — Morgen über der Bohol-See, die Sandbank eine Bootsfahrt entfernt, das Resort golden in der Dämmerung. Nehmen Sie sich Zeit für den langen Blick.", quote: "Manche Inseln besucht man. An Camiguin erinnert man sich.", cta: "Aufenthalt buchen" },
  ja: { kicker: "火山と海のあいだ", title: "ギャラリー", intro: "私たちが暮らす島の姿 — ボホール海の朝、バンカ船でひとっ走りの砂州、夕暮れに金色へ染まるリゾート。ゆっくり、眺めてください。", quote: "訪れるだけの島もある。カミギンは、心に残る島。", cta: "宿泊を予約する" },
  ko: { kicker: "화산과 바다 사이", title: "갤러리", intro: "우리가 살아가는 섬의 모습 — 보홀 바다 위의 아침, 방카 배로 금방인 모래톱, 해질녘 금빛으로 물드는 리조트. 천천히, 오래 바라보세요.", quote: "어떤 섬은 다녀가는 곳. 카미긴은 기억에 남는 곳.", cta: "숙박 예약하기" },
  zh: { kicker: "火山与海之间", title: "图库", intro: "我们生活中的海岛——保和海上的清晨、乘船片刻可达的沙洲、暮色中染成金色的度假村。慢慢看，久久看。", quote: "有些岛，去过便罢。卡米金，会留在记忆里。", cta: "预订您的假期" },
};
import { Reveal, Kicker } from "@/components/reveal";

const meta: Metadata = {
  title: "Gallery",
  description:
    "Txaleta de Camiguin in pictures — the infinity pool over the Bohol Sea, White Island sandbars, clifftop sunsets, endemic birds and life around the resort.",
};

export default async function GalleryPage({ params }: PageProps<"/[lang]">) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const p = P[lang];
  return (
    <>
      {/* ── Banner — aerial coastline, full bleed ── */}
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden">
        <Image
          src="/images/resort/camiguin_coast_aerial.webp"
          alt="Aerial view of the Camiguin coastline and its reefs"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-white">
          <Kicker className="font-bold text-brand [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,1),0_2px_4px_rgba(0,0,0,0.95),0_4px_24px_rgba(0,0,0,0.8)]">
            {p.kicker}
          </Kicker>
          <h1 className="font-display mt-4 text-5xl font-light sm:text-6xl md:text-7xl">
            {p.title}
          </h1>
        </div>
      </section>

      {/* ── The full photo library ── */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-[15px] leading-relaxed text-cream/65">
              {p.intro}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((src, i) => (
                <div
                  key={src}
                  className={`group relative overflow-hidden ${
                    i % 10 === 0 || i % 10 === 5
                      ? "col-span-2 row-span-2 aspect-square sm:aspect-auto"
                      : "aspect-square"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Txaleta de Camiguin ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-16 text-center">
            <p className="font-display text-2xl font-light italic text-cream/80">
              {p.quote}
            </p>
            <Link
              href={localePath(lang, "/book")}
              className="label mt-8 inline-flex items-center gap-3 bg-brand px-9 py-4 text-[11px] text-white transition-colors hover:bg-brand-dark"
            >
              {p.cta} <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const seo = getPageSeo(lang as Locale, "/gallery");
  return {
    ...meta,
    ...(seo ? { title: seo.title, description: seo.description } : {}),
    ...(seo?.keywords ? { keywords: seo.keywords } : {}),
    alternates: pageAlternates(lang as Locale, "/gallery"),
  };
}
