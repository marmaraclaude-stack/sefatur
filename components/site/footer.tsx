import { MapPin, MessageCircle, Phone } from "lucide-react";
import { BRAND, CONTACT_COPY, NAV_LINKS } from "@/lib/copy";
import { CONTACT, STOPS } from "@/lib/data";

const MAPS_URL = "https://maps.google.com/?q=Topağaç,+Marmara,+Balıkesir";

/**
 * İletişim + site alt bilgisi. Sade lacivert zemin, dev tıkla-ara numarası.
 * Sunucu bileşeni.
 */
export function Footer() {
  const stopLine = [
    ...STOPS.filter((stop) => stop.kind === "main").map((stop) => stop.name),
    ...STOPS.filter((stop) => stop.kind === "via").map((stop) => stop.name),
  ].join(" · ");

  return (
    <footer id="iletisim" className="bg-navy pt-16 pb-28 lg:pb-12">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        {/* Başlık */}
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {CONTACT_COPY.title}
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-mist">
          {CONTACT_COPY.subtitle}
        </p>

        {/* Telefon bloğu */}
        <div className="mt-10">
          <p className="text-base text-mist">
            {CONTACT.name} · {CONTACT.title}
          </p>
          <a
            href={CONTACT.phoneHref}
            className="mt-2 block w-fit rounded-md font-digits text-[clamp(2rem,6vw,3.5rem)] font-semibold text-white transition-colors hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
          >
            {CONTACT.phoneDisplay}
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={CONTACT.phoneHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-amber px-6 text-base font-semibold text-ink shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            >
              <Phone className="size-5" aria-hidden />
              {CONTACT_COPY.callCta}
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-base font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            >
              <MessageCircle className="size-5" aria-hidden />
              {CONTACT_COPY.whatsappCta}
            </a>
          </div>
        </div>

        {/* Bilgi ızgarası: marka · bağlantılar · adres ve duraklar */}
        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-3">
          <div>
            <p className="text-xl font-bold tracking-tight text-white">
              {BRAND.name}
            </p>
            <p className="mt-3 max-w-sm text-base leading-relaxed text-mist">
              {BRAND.subtitle}
            </p>
          </div>

          <nav aria-label="Site içi bağlantılar">
            <ul className="grid max-w-xs grid-cols-2 gap-x-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-md text-base text-mist transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
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
              className="inline-flex min-h-11 items-start gap-2.5 rounded-md py-2 text-mist transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            >
              <MapPin className="mt-0.5 size-5 shrink-0" aria-hidden />
              <span className="text-base leading-relaxed">{CONTACT.base}</span>
            </a>
            <p className="mt-3 font-digits text-sm text-mist/80">{stopLine}</p>
          </div>
        </div>

        {/* Alt bar */}
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-mist/90">
          <p>© {BRAND.name}, Marmara Adası</p>
        </div>
      </div>
    </footer>
  );
}
