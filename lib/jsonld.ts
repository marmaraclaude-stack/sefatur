/**
 * schema.org yapılandırılmış verisi — Google'da zengin sonuçlar için.
 * LocalBusiness (yerel işletme) + FAQPage (SSS) şemaları.
 */
import { CONTACT, SCHEDULE, ROUTE_STOPS } from "@/lib/data";
import { FAQ, BRAND } from "@/lib/copy";

const SITE_URL = "https://sefatur.vercel.app";

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: BRAND.name,
  description: BRAND.subtitle,
  url: SITE_URL,
  telephone: "+905336555118",
  image: `${SITE_URL}/images/og-image.jpg`,
  priceRange: "₺",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Topağaç Köyü, Marmara",
    addressRegion: "Balıkesir",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.5758,
    longitude: 27.6205,
  },
  areaServed: ROUTE_STOPS.map((s) => ({
    "@type": "Place",
    name: `${s.name}, Marmara Adası`,
  })),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+905336555118",
    contactType: "customer service",
    name: CONTACT.name,
    availableLanguage: "Turkish",
  },
  makesOffer: [
    { "@type": "Offer", name: "Ada içi tarifeli minibüs seferleri" },
    { "@type": "Offer", name: "Şehirlerarası turlar ve geziler" },
    { "@type": "Offer", name: "Öğrenci servisi" },
    { "@type": "Offer", name: "Şoförlü araç kiralama / özel taşımacılık" },
  ],
  openingHoursSpecification: SCHEDULE.map((point) => ({
    "@type": "OpeningHoursSpecification",
    name: `${point.name} kalkış saatleri`,
    description: point.times.join(", "),
  })),
} as const;

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
} as const;
