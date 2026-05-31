import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChatbotEmbed } from "@/components/chatbot-embed";
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
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <MenuProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatbotEmbed />
        </MenuProvider>
      </body>
    </html>
  );
}
