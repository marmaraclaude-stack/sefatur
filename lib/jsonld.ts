/**
 * schema.org yapılandırılmış verisi — Google'da zengin sonuçlar için.
 * LocalBusiness (yerel işletme) + FAQPage (SSS) şemaları.
 */
import { CONTACT, SCHEDULE, STOPS } from "@/lib/data";
import { FAQ, BRAND } from "@/lib/copy";
import { SITE_URL } from "@/lib/site";
import { STOP_COORDS } from "@/lib/map-data";

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: BRAND.name,
  description: `${BRAND.subtitle}. Kalkış saatleri: ${SCHEDULE.map(
    (p) => `${p.name} ${p.times.join(", ")}`
  ).join(" • ")}`,
  url: SITE_URL,
  telephone: "+905336555118",
  image: `${SITE_URL}/images/og-image.jpg`,
  logo: `${SITE_URL}/images/logo.png`,
  priceRange: "₺",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Topağaç Köyü, Marmara",
    addressRegion: "Balıkesir",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: STOP_COORDS.topagac[0],
    longitude: STOP_COORDS.topagac[1],
  },
  areaServed: STOPS.map((s) => ({
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
    { "@type": "Offer", name: "Şehirler arası turlar ve geziler" },
    { "@type": "Offer", name: "Öğrenci servisi" },
    { "@type": "Offer", name: "Şoförlü araç kiralama / özel taşımacılık" },
  ],
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
