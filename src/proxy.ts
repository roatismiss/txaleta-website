import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, prefixedLocales, LOCALE_HEADER } from "@/lib/i18n";

// ============================================================================
// Locale routing proxy.
//
//   /about        → rewrite → /en/about   (URL unchanged — keeps the indexed
//                                          English URLs exactly as they are)
//   /ko/about     → passes through        (served by app/[lang]/about)
//   /en/about     → 308 redirect → /about (English must have ONE canonical URL)
//
// Every request it lets through also carries the resolved locale in
// LOCALE_HEADER. Pages read `lang` from params and never need it; it exists
// for app/global-not-found.tsx, which renders outside the [lang] layout and
// receives no params, so it can still answer a /ko/… typo in Korean.
//
// Anything with a file extension, Next internals, and metadata routes are
// excluded via the matcher below.
// ============================================================================


function withLocale(request: NextRequest, locale: string) {
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale);
  return { request: { headers } };
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /en or /en/* → permanent redirect to the unprefixed English URL.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Prefixed locales (/ko, /de, …) are real routes — pass through.
  const prefix = prefixedLocales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (prefix) return NextResponse.next(withLocale(request, prefix));

  // Everything else is English — rewrite internally to /en/* (URL unchanged).
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, withLocale(request, defaultLocale));
}

export const config = {
  matcher: [
    // Skip Next internals, API routes, metadata files and anything with a file
    // extension (images, fonts, videos…).
    "/((?!_next|api|sitemap\\.xml|robots\\.txt|favicon\\.ico|.*\\..*).*)",
  ],
};
