import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChatbotEmbed } from "@/components/chatbot-embed";
import { SplashScreen } from "@/components/splash-screen";
import { MenuProvider } from "@/contexts/menu-context";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Luxury Coastal Resort in Camiguin`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Camiguin resort",
    "Mambajao hotel",
    "Camiguin accommodation",
    "seaview rooms Camiguin",
    "glamping Philippines",
    "Txaleta de Camiguin",
    "infinity pool Camiguin",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Luxury Coastal Resort in Camiguin`,
    description: site.description,
    images: [{ url: site.hero.poster, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Luxury Coastal Resort in Camiguin`,
    description: site.description,
    images: [site.hero.poster],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // The pre-paint splash script sets `data-splash-seen` on <html> before
      // hydration; suppress the (expected) attribute mismatch on this element only.
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        {/* Pre-paint: hide the splash for visitors who already saw it this
            session, before the React effect can run (avoids any flicker). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('txaleta:splash-seen'))document.documentElement.dataset.splashSeen='1'}catch(e){}",
          }}
        />
        <SplashScreen />
        <MenuProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* Concierge chatbot stays on in every phase — it only answers
              questions and captures leads into the CRM (it never creates
              bookings), so it's safe alongside the Cloudbeds engine. */}
          <ChatbotEmbed />
          {/* NOTE: the CloudReef promo popup (PromoPopup / promo-popup.tsx) is part
              of the not-yet-committed promotions feature and is intentionally left
              out of this Cloudbeds commit. Re-add it with that feature when
              CloudReef becomes the booking provider. */}
          {/* Floating WhatsApp button */}
          <a
            href={`https://wa.me/${site.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-transform hover:scale-110 active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </MenuProvider>
      </body>
    </html>
  );
}
