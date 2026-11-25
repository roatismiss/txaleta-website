import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { serif, sans } from "./fonts";
import { site } from "@/lib/site";
import { defaultLocale, hasLocale, localeTags, LOCALE_HEADER, type Locale } from "@/lib/i18n";
import { hasGuides } from "@/lib/guides";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { NotFoundView } from "@/components/not-found-view";
import { CookieConsent } from "@/components/cookie-consent";
import { MenuProvider } from "@/contexts/menu-context";

// ============================================================================
// The 404 for every URL that matches no route — and, because /[lang] and
// /[lang]/guides/[slug] set `dynamicParams = false`, for unknown guide slugs
// too: those are rejected at routing level, before any segment not-found.tsx
// could render. This is the case the Next docs give global-not-found for: a
// root layout under a dynamic segment (app/[lang]/layout.tsx).
//
// It renders outside every layout, so it brings its own <html>, fonts and
// styles, and takes the visitor's language from the header the proxy sets.
// Next adds `noindex` and the 404 status itself.
// ============================================================================

export const metadata: Metadata = {
  title: `Page not found · ${site.name}`,
  description: site.description,
};

export default async function GlobalNotFound() {
  const raw = (await headers()).get(LOCALE_HEADER) ?? "";
  const lang: Locale = hasLocale(raw) ? raw : defaultLocale;

  return (
    <html lang={localeTags[lang]} className={`${serif.variable} ${sans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-ink">
        <MenuProvider>
          <Navbar lang={lang} showGuides={hasGuides(lang)} />
          <main className="flex-1">
            <NotFoundView lang={lang} />
          </main>
          <Footer lang={lang} />
          <CookieConsent lang={lang} />
        </MenuProvider>
      </body>
    </html>
  );
}
