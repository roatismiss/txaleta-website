import { Hero } from "@/components/hero";
import { BookingBar } from "@/components/booking-bar";
import { Intro } from "@/components/sections/intro";
import { Accommodation } from "@/components/sections/accommodation";
import { Dining } from "@/components/sections/dining";
import { Experiences } from "@/components/sections/experiences";
import { Watersports } from "@/components/sections/watersports";
import { Seamless } from "@/components/sections/seamless";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { BrandMoment } from "@/components/sections/brand-moment";
import { site } from "@/lib/site";
import { pageAlternates, type Locale } from "@/lib/i18n";
import { getPageSeo } from "@/locales/seo";

// Refresh the homepage hourly (ISR) so the Accommodation section picks up live
// Cloudbeds rooms/photos without a Cloudbeds call on every visit.
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const seo = getPageSeo(lang as Locale, "/");
  return {
    ...(seo ? { title: seo.title, description: seo.description } : {}),
    ...(seo?.keywords ? { keywords: seo.keywords } : {}),
    alternates: pageAlternates(lang as Locale, "/"),
  };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const locale = lang as Locale;
  return (
    <>
      <Hero />
      {/* Mobile-only booking bar — straddles the hero/Intro seam (~half over the video,
          half into the next section) for the premium floating-card feel. */}
      <section className="relative z-30 -mt-28 px-4 pb-2 lg:hidden">
        <BookingBar />
      </section>
      <Intro lang={locale} />
      <Accommodation lang={locale} />
      <Dining lang={locale} />
      <Experiences lang={locale} />
      <Watersports lang={locale} />
      <Seamless lang={locale} />
      <Gallery lang={locale} />
      <Testimonials lang={locale} />
      <BrandMoment />
      <JsonLd />
    </>
  );
}

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Resort",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    image: [`${site.url}${site.hero.poster}`],
    priceRange: "₱₱",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Purok 6, Puting Balas",
      addressLocality: "Mambajao",
      addressRegion: "Camiguin",
      postalCode: "9100",
      addressCountry: "PH",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Infinity Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sea View", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
    ],
    sameAs: [site.social.facebook, site.social.instagram, site.social.tiktok],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
