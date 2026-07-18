import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, prefixedLocales } from "@/lib/i18n";

// ============================================================================
// Locale routing proxy.
//
//   /about        → rewrite → /en/about   (URL unchanged — keeps the indexed
//                                          English URLs exactly as they are)
//   /ko/about     → passes through        (served by app/[lang]/about)
//   /en/about     → 308 redirect → /about (English must have ONE canonical URL)
//
// Anything with a file extension, Next internals, and metadata routes are
// excluded via the matcher below.
// ============================================================================

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /en or /en/* → permanent redirect to the unprefixed English URL.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  // Prefixed locales (/ko, /de, …) are real routes — pass through.
  const hasPrefix = prefixedLocales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasPrefix) return;

  // Everything else is English — rewrite internally to /en/* (URL unchanged).
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Skip Next internals, API routes, metadata files and anything with a file
    // extension (images, fonts, videos…).
    "/((?!_next|api|sitemap\\.xml|robots\\.txt|favicon\\.ico|.*\\..*).*)",
  ],
};
