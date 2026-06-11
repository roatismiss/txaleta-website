import { Hero } from "@/components/hero";
import { BookingBar } from "@/components/booking-bar";
import { Intro } from "@/components/sections/intro";
import { Accommodation } from "@/components/sections/accommodation";
import { Dining } from "@/components/sections/dining";
import { Experiences } from "@/components/sections/experiences";
import { Seamless } from "@/components/sections/seamless";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { BrandMoment } from "@/components/sections/brand-moment";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Mobile-only booking bar — straddles the hero/Intro seam (~half over the video,
          half into the next section) for the premium floating-card feel. */}
      <section className="relative z-30 -mt-28 px-4 pb-2 lg:hidden">
        <BookingBar />
      </section>
      <Intro />
      <Accommodation />
      <Dining />
      <Experiences />
      <Seamless />
      <Gallery />
      <Testimonials />
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
