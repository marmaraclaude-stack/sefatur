import { MapPin, MessageCircle, Phone } from "lucide-react";
import { BRAND, CONTACT_COPY, NAV_LINKS } from "@/lib/copy";
import { CONTACT, ROUTE_STOPS } from "@/lib/data";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { WaveDivider } from "@/components/ui/wave-divider";

const MAPS_URL = "https://maps.google.com/?q=Topağaç,+Marmara,+Balıkesir";

/**
 * İletişim + Footer — "Derin Deniz".
 * Dev tıkla-ara numarası, WhatsApp/arama butonları ve site alt bilgisi.
 */
export function Footer() {
  const routeRecap = ROUTE_STOPS.map((stop) => stop.name).join(" • ");

  return (
    <footer id="iletisim" aria-label={CONTACT_COPY.eyebrow}>
      {/* Üstteki mermer bölümden gece-laciverte dalga geçişi */}
      <WaveDivider fill="#0B2239" />

      <div className="relative overflow-hidden bg-linear-to-b from-navy to-deep pt-16 pb-28 lg:pb-12">
        {/* Deniz feneri ışık huzmesi — üst kenarda ince süpürme */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
        >
          <div className="h-px w-1/3 animate-beam bg-linear-to-r from-transparent via-glow/60 to-transparent motion-reduce:animate-none" />
        </div>
        {/* Numaranın arkasında çok hafif turkuaz parıltı */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 size-[26rem] -translate-x-1/2 rounded-full bg-glow/[0.07] blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={CONTACT_COPY.eyebrow}
            title={CONTACT_COPY.title}
            subtitle={CONTACT_COPY.subtitle}
            tone="dark"
          />

          {/* Footer'ın kahramanı: dev tıkla-ara numarası */}
          <FadeIn delay={0.1} className="mt-12 text-center">
            <p className="text-sm font-medium tracking-wide text-mist">
              {CONTACT.name} · {CONTACT.title}
            </p>
            <a
              href={CONTACT.phoneHref}
              className="group relative mt-3 inline-block rounded-xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            >
              <span className="font-digits text-[clamp(2.2rem,8vw,4.5rem)] font-bold tracking-tight text-white whitespace-nowrap">
                {CONTACT.phoneDisplay}
              </span>
              <span
                aria-hidden
                className="absolute inset-x-2 bottom-0 h-1 origin-left scale-x-0 rounded-full bg-glow transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
              />
            </a>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
              >
                <MessageCircle className="size-5 text-glow" aria-hidden />
                {CONTACT_COPY.whatsappCta}
              </a>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex min-h-12 animate-beacon items-center gap-2.5 rounded-full bg-amber px-6 py-3 text-sm font-bold text-deep transition-colors hover:bg-amber/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow motion-reduce:animate-none"
              >
                <Phone className="size-5" aria-hidden />
                {CONTACT_COPY.callCta}
              </a>
            </div>
          </FadeIn>

          {/* Bilgi ızgarası: marka · hızlı bağlantılar · adres & hat */}
          <FadeIn
            delay={0.15}
            className="mt-16 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-3"
          >
            <div>
              <p className="font-heading text-2xl font-bold tracking-tight text-white">
                {BRAND.name}
                <span aria-hidden className="text-glow">
                  .
                </span>
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist">
                {BRAND.subtitle}
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist/80 italic">
                {CONTACT_COPY.closingLine}
              </p>
            </div>

            <nav aria-label="Site içi bağlantılar">
              <ul className="grid max-w-xs grid-cols-2 gap-x-8">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-11 items-center rounded-md text-sm text-mist transition-colors hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-start gap-3 rounded-md py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
              >
                <MapPin
                  className="mt-0.5 size-5 shrink-0 text-glow"
                  aria-hidden
                />
                <span className="text-sm leading-relaxed text-mist transition-colors group-hover:text-glow">
                  {CONTACT.base}
                </span>
              </a>
              <p className="mt-4 font-digits text-xs leading-relaxed tracking-wide text-mist/70">
                {routeRecap}
              </p>
            </div>
          </FadeIn>

          {/* Alt bar */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-mist/85">
            <p>© {BRAND.name} — Marmara Adası</p>
            <p>Topağaç Köyü, Marmara / Balıkesir</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
