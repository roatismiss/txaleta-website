"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe } from "lucide-react";
import {
  locales,
  localeLabels,
  localePath,
  prefixedLocales,
  type Locale,
} from "@/lib/i18n";

/** Strip a locale prefix from the current pathname → the unprefixed route. */
function unprefixedPath(pathname: string): string {
  for (const l of prefixedLocales) {
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

/**
 * Language dropdown. Renders REAL <a> links to every language version of the
 * current page (not a JS-only select), so crawlers discover every locale URL
 * from every page.
 */
export function LanguageSwitcher({
  lang,
  align = "right",
  className = "",
  onOpenChange,
}: {
  lang: Locale;
  align?: "left" | "right";
  className?: string;
  /** Lets a clipping parent (the animated utility row) un-clip while open. */
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname() || "/";
  const path = unprefixedPath(pathname);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="label flex items-center gap-1.5 text-[10px] transition-colors hover:text-brand"
      >
        <Globe className="h-3.5 w-3.5" strokeWidth={1.5} />
        {localeLabels[lang]}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
        />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute top-full z-50 mt-2 min-w-[10rem] border border-ink/10 bg-white py-1.5 shadow-[0_12px_40px_rgba(12,28,34,0.14)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {locales.map((l) => (
            <Link
              key={l}
              role="menuitem"
              href={localePath(l, path)}
              hrefLang={l}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 text-[13px] transition-colors hover:bg-cream hover:text-brand ${
                l === lang ? "font-bold text-brand" : "text-ink"
              }`}
            >
              {localeLabels[l]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/** Inline row of language links — used in the mobile drawer + footer. */
export function LanguageLinks({
  lang,
  className = "",
}: {
  lang: Locale;
  className?: string;
}) {
  const pathname = usePathname() || "/";
  const path = unprefixedPath(pathname);

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      {locales.map((l) => (
        <Link
          key={l}
          href={localePath(l, path)}
          hrefLang={l}
          className={`text-[12px] transition-colors hover:text-brand ${
            l === lang ? "font-bold text-brand" : "text-ink/60"
          }`}
        >
          {localeLabels[l]}
        </Link>
      ))}
    </div>
  );
}
