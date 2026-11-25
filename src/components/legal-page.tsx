import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight, Globe, Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { localePath, localeTags, type Locale } from "@/lib/i18n";
import { getLegalDoc, splitNumbered } from "@/lib/legal";
import { guideToc, headingText, slugify } from "@/lib/toc";
import { legal, legalDocs, type LegalDoc } from "@/locales/legal";
import { PaperGrain } from "./brand-texture";
import { CookieSettingsButton } from "./cookie-consent";
import { PrintButton } from "./legal-actions";

// ============================================================================
// The frame shared by /privacy, /terms and /cookies: a dark photo banner (the
// navbar is white-on-transparent over every page top), a switcher between the
// three documents, a sticky contents rail, the document, and a contact card.
// Server component; the only client islands are Print and Cookie settings.
// ============================================================================

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

function formatDate(ymd: string, lang: Locale) {
  return new Intl.DateTimeFormat(localeTags[lang], { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${ymd}T00:00:00Z`)
  );
}

/** Plain text of an mdast node. */
function nodeText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { value?: unknown; children?: unknown[] };
  if (typeof n.value === "string") return n.value;
  return Array.isArray(n.children) ? n.children.map(nodeText).join("") : "";
}

type HastLike = { tagName?: string; children?: HastLike[] };

/** Number of header cells in a GFM table's first row. */
function columnCount(node: unknown): number {
  const kids = (n: HastLike | undefined) => (n?.children ?? []).filter((c) => c.tagName);
  const thead = kids(node as HastLike).find((c) => c.tagName === "thead");
  const row = kids(thead).find((c) => c.tagName === "tr");
  return kids(row).length;
}

function buildComponents(lang: Locale): Components {
  const seen = new Map<string, number>();
  const headingId = (node: unknown) => {
    const base = slugify(headingText(nodeText(node)));
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n}` : base;
  };

  const linkClass = `font-medium text-clay underline decoration-clay/30 underline-offset-[3px] transition-colors hover:decoration-clay ${focusRing}`;

  return {
    h2: ({ node }) => {
      const { n, text } = splitNumbered(headingText(nodeText(node)));
      return (
        <h2
          id={headingId(node)}
          className="font-display mt-16 scroll-mt-32 border-t border-ink/10 pt-10 text-[1.65rem] font-normal leading-tight text-ink first:mt-0 sm:text-[1.9rem] print:mt-8 print:pt-4 print:text-xl"
        >
          {n ? (
            <span className="mb-3 block font-sans text-[11px] font-bold tabular-nums tracking-[0.24em] text-clay">
              {n}
            </span>
          ) : null}
          {text}
        </h2>
      );
    },
    h3: ({ children }) => (
      <h3 className="font-display mt-10 text-[1.25rem] font-normal leading-snug text-ink">{children}</h3>
    ),
    p: ({ children }) => <p className="mt-5 text-[15.5px] leading-[1.8] text-ink/75">{children}</p>,
    strong: ({ children }) => <strong className="font-bold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    a: ({ href, children }) => {
      const h = href ?? "";
      if (h.startsWith("/")) {
        return (
          <Link href={localePath(lang, h)} className={linkClass}>
            {children}
          </Link>
        );
      }
      const external = h.startsWith("http");
      return (
        <a
          href={h}
          className={linkClass}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
    ul: ({ children }) => <ul className="mt-5 space-y-3">{children}</ul>,
    ol: ({ children }) => <ol className="mt-5 list-decimal space-y-3 pl-5 marker:text-clay">{children}</ol>,
    li: ({ children }) => (
      <li className="relative pl-6 text-[15.5px] leading-[1.75] text-ink/75 [ol_&]:pl-1">
        <span
          aria-hidden
          className="absolute left-0 top-[0.72em] hidden h-[5px] w-[5px] -translate-y-1/2 rotate-45 bg-clay [ul_&]:block"
        />
        {children}
      </li>
    ),
    // The one blockquote per document is its "At a glance" summary.
    blockquote: ({ children }) => (
      <aside className="relative mb-14 mt-10 overflow-hidden border border-clay/20 bg-coconut px-6 py-7 sm:px-9 sm:py-8 [&>p:first-of-type]:mt-0 [&>p:first-of-type]:text-[10.5px] [&>p:first-of-type]:uppercase [&>p:first-of-type]:tracking-[0.24em] [&>p:first-of-type_strong]:font-normal [&>p:first-of-type_strong]:text-clay [&_li]:text-[15px] [&_li]:text-ink/80 print:mb-8 print:border-ink/30">
        <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-clay via-mango to-sea" />
        {children}
      </aside>
    ),
    code: ({ children }) => (
      <code className="whitespace-nowrap rounded-[2px] bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.82em] text-ink">
        {children}
      </code>
    ),
    table: ({ node, children }) => {
      // Two-column tables wrap fine on a phone; wide ones scroll sideways,
      // with a fade on the right edge so the overflow reads as intentional.
      const wide = columnCount(node) >= 4;
      return (
        <div className="relative -mx-6 mt-8 sm:mx-0">
          <div className="overflow-x-auto px-6 sm:px-0">
            <table className={`w-full border-collapse text-left text-[13.5px] leading-relaxed ${wide ? "min-w-[640px]" : ""}`}>
              {children}
            </table>
          </div>
          {wide ? (
            <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent sm:hidden" />
          ) : null}
        </div>
      );
    },
    thead: ({ children }) => <thead className="border-b-2 border-ink text-ink">{children}</thead>,
    th: ({ children }) => (
      <th className="px-3 pb-3 pt-1 align-bottom text-[10.5px] font-bold uppercase tracking-[0.16em] first:pl-0">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-ink/10 px-3 py-4 align-top text-ink/75 first:pl-0">{children}</td>
    ),
    hr: () => <hr className="my-12 border-ink/10" />,
  };
}

/**
 * Metadata for a legal page. The body is English in every locale, so each
 * language version canonicals to the English URL rather than competing with
 * it as a near-duplicate.
 */
export function legalMetadata(lang: Locale, doc: LegalDoc): Metadata {
  const d = getLegalDoc(doc);
  return {
    title: legal[lang].docs[doc],
    description: d.description,
    alternates: { canonical: localePath("en", `/${doc}`) },
  };
}

const HERO: Record<LegalDoc, string> = {
  privacy: "/images/resort/garden_buddha.webp",
  terms: "/images/resort/terrace_view.webp",
  cookies: "/images/resort/night_view.webp",
};

export function LegalPage({ lang, doc }: { lang: Locale; doc: LegalDoc }) {
  const t = legal[lang];
  const d = getLegalDoc(doc);
  const toc = guideToc(d.body).map((e) => ({ ...e, ...splitNumbered(e.text) }));
  const updated = formatDate(d.updated, lang);
  const others = legalDocs.filter((x) => x !== doc);

  const railButton = `inline-flex items-center gap-2.5 text-[13px] text-ink/65 transition-colors hover:text-clay ${focusRing}`;

  return (
    <>
      {/* ── Banner ── */}
      <section className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden bg-ink print:hidden">
        <Image src={HERO[doc]} alt="" fill priority sizes="100vw" className="object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16211a]/90 via-[#16211a]/45 to-black/40" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 text-white">
          <p className="label flex items-center gap-3 text-[11px] text-mango">
            <span aria-hidden className="h-px w-8 bg-mango/70" />
            {t.page.kicker}
          </p>
          <h1 className="font-display mt-4 text-4xl font-light leading-[1.08] sm:text-6xl">{t.docs[doc]}</h1>
          <p className="mt-5 text-[13px] tracking-wide text-white/70">
            {t.page.updated} · <time dateTime={d.updated}>{updated}</time>
          </p>
        </div>
      </section>

      {/* Print-only title block — the banner is hidden on paper. */}
      <div className="hidden print:block">
        <p className="text-[11px] uppercase tracking-[0.2em]">{site.name}</p>
        {/* A <p>, not a second <h1>: the banner's h1 is the page's one heading. */}
        <p className="font-display mt-2 text-3xl">{t.docs[doc]}</p>
        <p className="mt-1 text-[12px]">
          {t.page.updated} · {updated} · {site.url.replace("https://", "")}
          {localePath(lang, `/${doc}`)}
        </p>
      </div>

      {/* ── Document switcher ── */}
      <nav aria-label={t.page.kicker} className="border-b border-ink/10 bg-coconut print:hidden">
        <div className="no-scrollbar mx-auto flex max-w-6xl gap-8 overflow-x-auto px-6">
          {legalDocs.map((x) => {
            const active = x === doc;
            return (
              <Link
                key={x}
                href={localePath(lang, `/${x}`)}
                aria-current={active ? "page" : undefined}
                className={`label relative shrink-0 py-5 text-[10.5px] tracking-[0.2em] transition-colors ${focusRing} ${
                  active ? "text-ink" : "text-ink/50 hover:text-ink"
                }`}
              >
                {t.docs[x]}
                {active ? <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-clay" /> : null}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Document ── */}
      <section className="relative overflow-clip bg-white py-14 sm:py-20 print:py-6">
        <PaperGrain className="opacity-[0.04] print:hidden" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-20">
          {/* Contents rail (desktop) */}
          <aside className="hidden lg:block print:hidden">
            <div className="sticky top-32">
              <p className="label text-[10px] text-clay">{t.page.onThisPage}</p>
              <ol className="mt-5 space-y-2.5 border-l border-ink/10">
                {toc.map((e) => (
                  <li key={e.id}>
                    <a
                      href={`#${e.id}`}
                      className={`-ml-px flex gap-3 border-l border-transparent py-0.5 pl-4 text-[13px] leading-snug text-ink/60 transition-colors hover:border-clay hover:text-ink ${focusRing}`}
                    >
                      {e.n ? <span className="shrink-0 tabular-nums text-ink/35">{e.n}</span> : null}
                      <span>{e.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-10 flex flex-col items-start gap-4 border-t border-ink/10 pt-8">
                {doc === "cookies" ? (
                  <CookieSettingsButton label={t.page.manageCookies} className={`label text-[10px] tracking-[0.18em] text-clay underline decoration-clay/30 underline-offset-4 hover:decoration-clay ${focusRing}`} />
                ) : null}
                <PrintButton label={t.page.print} className={railButton} />
              </div>
            </div>
          </aside>

          <article className="min-w-0 max-w-[720px]">
            {t.page.englishNotice ? (
              <p className="mb-10 flex items-start gap-3 border-l-2 border-sea bg-sea/[0.07] px-5 py-4 text-[13.5px] leading-relaxed text-ink/75 print:hidden">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-sea" strokeWidth={1.5} aria-hidden />
                {t.page.englishNotice}
              </p>
            ) : null}

            {/* Contents (mobile) */}
            <details className="group mb-12 border-y border-ink/10 lg:hidden print:hidden">
              <summary className={`label flex cursor-pointer list-none items-center justify-between py-4 text-[10.5px] text-clay [&::-webkit-details-marker]:hidden ${focusRing}`}>
                {t.page.onThisPage}
                <span aria-hidden className="text-base leading-none text-ink/40 transition-transform group-open:rotate-45">+</span>
              </summary>
              <ol className="space-y-2.5 pb-6">
                {toc.map((e) => (
                  <li key={e.id}>
                    <a href={`#${e.id}`} className="flex gap-3 text-[14px] leading-snug text-ink/70 hover:text-clay">
                      {e.n ? <span className="shrink-0 tabular-nums text-ink/35">{e.n}</span> : null}
                      <span>{e.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            {doc === "cookies" ? (
              <div className="mb-12 lg:hidden print:hidden">
                <CookieSettingsButton
                  label={t.page.manageCookies}
                  className={`label inline-flex min-h-12 items-center bg-ink px-6 py-3 text-[10.5px] tracking-[0.16em] text-white transition-colors hover:bg-clay ${focusRing}`}
                />
              </div>
            ) : null}

            <div className="legal-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={buildComponents(lang)}>
                {d.body}
              </ReactMarkdown>
            </div>

            {/* ── Contact + other documents ── */}
            <div className="mt-20 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-[1.4fr_1fr] print:hidden">
              <div className="bg-coconut p-7 sm:p-8">
                <p className="font-display text-[1.45rem] leading-snug text-ink">{t.page.questions}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/65">{t.page.questionsBody}</p>
                <div className="mt-6 space-y-3 text-[14px]">
                  <a href={`mailto:${site.contact.email}`} className={`flex items-center gap-3 text-ink transition-colors hover:text-clay ${focusRing}`}>
                    <Mail className="h-4 w-4 text-clay" strokeWidth={1.5} aria-hidden />
                    {site.contact.email}
                  </a>
                  <a href={`tel:${site.contact.phoneRaw}`} className={`flex items-center gap-3 text-ink transition-colors hover:text-clay ${focusRing}`}>
                    <Phone className="h-4 w-4 text-clay" strokeWidth={1.5} aria-hidden />
                    {site.contact.phone}
                  </a>
                </div>
              </div>
              <div className="bg-white p-7 sm:p-8">
                <p className="label text-[10px] text-clay">{t.page.alsoRead}</p>
                <ul className="mt-5 space-y-4">
                  {others.map((x) => (
                    <li key={x}>
                      <Link
                        href={localePath(lang, `/${x}`)}
                        className={`group flex items-center justify-between gap-4 font-display text-[1.15rem] text-ink transition-colors hover:text-clay ${focusRing}`}
                      >
                        {t.docs[x]}
                        <ArrowRight className="h-4 w-4 shrink-0 text-clay transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
