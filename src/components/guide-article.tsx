import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Brand-styled Markdown renderer for /guides articles. Server component — no
// client JS shipped. Headings use the Playfair display face; internal links go
// through next/link; GFM tables are scrollable on mobile.
const components: Components = {
  h2: ({ children }) => (
    <h2 className="font-display mt-16 scroll-mt-24 text-3xl font-light leading-tight text-ink sm:text-4xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display mt-10 text-2xl font-light leading-snug text-ink">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-8 text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">{children}</h4>
  ),
  p: ({ children }) => <p className="mt-6 text-[16px] leading-[1.85] text-ink/80">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => {
    const h = href ?? "";
    if (h.startsWith("/")) {
      return (
        <Link href={h} className="font-medium text-brand underline decoration-brand/30 underline-offset-2 transition-colors hover:decoration-brand">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={h}
        target={h.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="font-medium text-brand underline decoration-brand/30 underline-offset-2 transition-colors hover:decoration-brand"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => <ul className="mt-6 space-y-2.5 pl-1">{children}</ul>,
  ol: ({ children }) => <ol className="mt-6 list-decimal space-y-2.5 pl-5 marker:text-brand">{children}</ol>,
  li: ({ children }) => (
    <li className="relative pl-6 text-[16px] leading-[1.8] text-ink/80 [ol_&]:pl-1">
      <span className="absolute left-0 top-[0.7em] hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand [ul_&]:block" aria-hidden />
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-brand bg-cream/60 px-6 py-5 text-[16px] leading-relaxed text-ink/85">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-ink/10" />,
  img: ({ src, alt }) => (
    <span className="my-10 block overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} loading="lazy" className="h-auto w-full object-cover" />
      {alt ? <span className="mt-2 block text-[13px] italic text-ink/45">{alt}</span> : null}
    </span>
  ),
  table: ({ children }) => (
    <div className="my-10 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[14px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-ink text-white">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-ink/15 px-4 py-3 font-semibold uppercase tracking-wide">{children}</th>
  ),
  td: ({ children }) => <td className="border border-ink/15 px-4 py-3 align-top text-ink/80">{children}</td>,
};

export function GuideArticle({ body }: { body: string }) {
  return (
    <div className="guide-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
