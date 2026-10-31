import { guideToc, TOC_MIN_SECTIONS } from "@/lib/toc";

// Contents list for a guide. Server component — plain anchors, no client JS,
// and the `scroll-mt-24` already on every H2 keeps the sticky header off the
// heading you land on. Renders nothing on a short article, where it would push
// the opening below the fold without earning anything.
export function GuideToc({ body, label }: { body: string; label: string }) {
  const entries = guideToc(body);
  if (entries.length < TOC_MIN_SECTIONS) return null;

  return (
    <nav aria-label={label} className="my-12 border-y border-sand/60 py-8">
      <h2 className="label text-[11px] text-brand">{label}</h2>
      <ol className="mt-5 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
        {entries.map((entry, i) => (
          <li key={entry.id} className="flex gap-3 text-[15px] leading-snug">
            <span className="shrink-0 tabular-nums text-ink/35">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${entry.id}`}
              className="text-ink/75 underline decoration-sand decoration-1 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
