"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { defaultLocale, localePath, prefixedLocales, type Locale } from "@/lib/i18n";
import { ui } from "@/locales/ui";

// The branded 404. global-not-found passes the language the proxy resolved;
// [lang]/not-found receives no params, so there it comes from the URL the
// visitor typed (/ko/… → Korean, anything else → English).

const S: Record<Locale, { kicker: string; title: string; body: string; home: string; book: string; explore: string }> = {
  en: { kicker: "Error 404", title: "This path ends at the cliff’s edge", body: "The page you were looking for has moved, or never existed. Let us take you somewhere better.", home: "Back to the homepage", book: "Book your stay", explore: "Or explore" },
  fr: { kicker: "Erreur 404", title: "Ce chemin s’arrête au bord de la falaise", body: "La page que vous cherchez a été déplacée, ou n’a jamais existé. Laissez-nous vous emmener ailleurs.", home: "Retour à l’accueil", book: "Réserver votre séjour", explore: "Ou explorez" },
  de: { kicker: "Fehler 404", title: "Hier endet der Weg – an der Klippe", body: "Die gesuchte Seite wurde verschoben oder hat nie existiert. Wir bringen Sie gern an einen schöneren Ort.", home: "Zur Startseite", book: "Aufenthalt buchen", explore: "Oder entdecken Sie" },
  ja: { kicker: "エラー 404", title: "この道は崖の先で途切れています", body: "お探しのページは移動したか、存在しません。こちらからお進みください。", home: "ホームに戻る", book: "宿泊を予約する", explore: "こちらもどうぞ" },
  ko: { kicker: "오류 404", title: "이 길은 절벽 끝에서 끝납니다", body: "찾으시는 페이지가 이동되었거나 존재하지 않습니다. 더 좋은 곳으로 안내해 드릴게요.", home: "홈으로 돌아가기", book: "숙박 예약하기", explore: "둘러보기" },
  zh: { kicker: "错误 404", title: "此路止于悬崖边", body: "您要找的页面已移动或不存在。让我们带您去更好的地方。", home: "返回首页", book: "预订您的假期", explore: "或继续探索" },
};

const EXPLORE = ["/accommodation", "/dining", "/experiences", "/gallery", "/about"];

export function NotFoundView({ lang: given }: { lang?: Locale }) {
  const pathname = usePathname() ?? "/";
  const first = pathname.split("/")[1] ?? "";
  const lang: Locale =
    given ?? ((prefixedLocales as readonly string[]).includes(first) ? (first as Locale) : defaultLocale);
  const s = S[lang];
  const nav = ui[lang].nav;

  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-ink">
      <Image
        src="/images/resort/camiguin_coast_aerial.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#16211a]/95 via-[#16211a]/55 to-black/40" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-48 text-white sm:pb-24">
        <p className="label flex items-center gap-3 text-[11px] text-mango">
          <span aria-hidden className="h-px w-8 bg-mango/70" />
          {s.kicker}
        </p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl font-light leading-[1.08] sm:text-6xl">{s.title}</h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/75">{s.body}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href={localePath(lang, "/")}
            className="label inline-flex min-h-12 items-center justify-center bg-white px-8 py-4 text-[11px] text-ink transition-colors hover:bg-coconut"
          >
            {s.home}
          </Link>
          <Link
            href={localePath(lang, "/book")}
            className="label inline-flex min-h-12 items-center justify-center bg-clay px-8 py-4 text-[11px] text-white transition-colors hover:bg-brand-dark"
          >
            {s.book}
          </Link>
        </div>

        <div className="mt-14 border-t border-white/15 pt-8">
          <p className="label text-[10px] text-white/50">{s.explore}</p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {EXPLORE.map((href) => (
              <li key={href}>
                <Link
                  href={localePath(lang, href)}
                  className="group inline-flex items-center gap-2 font-display text-lg text-white/85 transition-colors hover:text-white"
                >
                  {nav[href]}
                  <ArrowRight className="h-4 w-4 text-mango transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
