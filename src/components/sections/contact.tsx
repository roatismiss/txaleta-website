import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal, Kicker } from "../reveal";

const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  "Txaleta de Camiguin, Mambajao, Camiguin",
)}&z=13&output=embed`;

export function Contact() {
  return (
    <section id="contact" className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        <Reveal className="px-6 py-24 sm:px-12 sm:py-32">
          <Kicker>On the Mambajao Shore</Kicker>
          <h2 className="font-display mt-5 text-4xl font-light leading-tight sm:text-5xl">
            Come the Long Way
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/65">
            Five minutes from Camiguin Airport, the road gives way to the sound of the
            Bohol Sea and the volcano standing watch behind you. Tell us when you arrive
            and we&apos;ll have the transfer waiting, the island boat ready, and the right
            room held against the tide.
          </p>

          <div className="mt-10 space-y-5">
            <a href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 text-white/80 transition-colors hover:text-sand">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-sand" strokeWidth={1.5} />
              <span className="text-sm">{site.location.address}</span>
            </a>
            <a href={`tel:${site.contact.phoneRaw}`} className="flex items-center gap-4 text-white/80 transition-colors hover:text-sand">
              <Phone className="h-5 w-5 shrink-0 text-sand" strokeWidth={1.5} />
              <span className="text-sm">{site.contact.phone}</span>
            </a>
            <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/80 transition-colors hover:text-sand">
              <MessageCircle className="h-5 w-5 shrink-0 text-sand" strokeWidth={1.5} />
              <span className="text-sm">WhatsApp / Viber · +63 917 818 2277</span>
            </a>
            <a href={`mailto:${site.contact.email}`} className="flex items-center gap-4 text-white/80 transition-colors hover:text-sand">
              <Mail className="h-5 w-5 shrink-0 text-sand" strokeWidth={1.5} />
              <span className="text-sm">{site.contact.email}</span>
            </a>
          </div>

          <Link
            href="/book"
            className="label mt-10 inline-block bg-sand px-9 py-4 text-[11px] text-white transition-colors hover:bg-sand-dark"
          >
            Book Your Stay
          </Link>
        </Reveal>

        <div className="relative min-h-[360px] w-full lg:min-h-full">
          <iframe
            title="Map — Txaleta de Camiguin"
            src={mapsEmbed}
            className="absolute inset-0 h-full w-full grayscale-[0.3]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
