import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Refined "Powered by CloudReef" credit — links out to the product site.
 * Single source for the wording + link; reused in the footer, the homepage
 * Seamless section and the booking page.
 *
 * `tone` picks colours for the surface it sits on:
 *   "dark"  — black / ink backgrounds (footer, dark sections)
 *   "light" — cream / white backgrounds (homepage, booking page)
 */
export function PoweredByCloudReef({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-white/40" : "text-ink/45";
  const link = tone === "dark" ? "text-white/70" : "text-ink/70";

  return (
    <span className={`inline-flex items-center gap-1 text-xs ${muted} ${className}`}>
      Powered by
      <a
        href={site.cloudreef.productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-0.5 ${link} transition-colors hover:text-sand`}
      >
        CloudReef
        <ArrowUpRight
          className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.5}
          aria-hidden
        />
      </a>
    </span>
  );
}
