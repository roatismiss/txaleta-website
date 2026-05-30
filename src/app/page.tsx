import { Hero } from "@/components/hero";
import { Intro } from "@/components/sections/intro";
import { Accommodation } from "@/components/sections/accommodation";
import { Dining } from "@/components/sections/dining";
import { Experiences } from "@/components/sections/experiences";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Accommodation />
      <Dining />
      <Experiences />
      <Gallery />
      <Testimonials />
      <Contact />
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
