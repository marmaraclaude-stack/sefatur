import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { BRAND, CONTACT_COPY, NAV_LINKS, SCHEDULE_COPY } from "@/lib/copy";
import { CONTACT, STOPS } from "@/lib/data";

const MAPS_URL = "https://maps.google.com/?q=Topağaç,+Marmara,+Balıkesir";

/**
 * İletişim + site alt bilgisi. Tam genişlik iki sütunlu üst blok:
 * solda başlık ve cam düğmeler, sağda dev tıkla-ara kartı.
 * Sunucu bileşeni.
 */
export function Footer() {
  return (
    <footer
      id="iletisim"
      className="relative overflow-hidden bg-linear-to-b from-navy to-deep pt-14 pb-28 lg:pb-12"
    >
      {/* Zemin dokusu: parıltı lekeleri */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/3 size-[36rem] rounded-full bg-skylight/[0.07] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-56 size-[28rem] rounded-full bg-sage/[0.08] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        {/* Üst blok: tam genişlik iki sütun */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Sol: başlık + eylemler */}
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {CONTACT_COPY.title}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-mist">
              {CONTACT_COPY.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur transition-colors hover:border-white/30 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skylight"
              >
                <MessageCircle className="size-5" aria-hidden />
                {CONTACT_COPY.whatsappCta}
              </a>
              <a
                href="#seferler"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur transition-colors hover:border-white/30 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skylight"
              >
                <Clock className="size-5" aria-hidden />
                {SCHEDULE_COPY.title}
              </a>
            </div>
          </div>

          {/* Sağ: kompakt iletişim kartı */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur lg:justify-self-end lg:w-full lg:max-w-md">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent"
            />
            <p className="text-sm text-mist">
              {CONTACT.name} · {CONTACT.title}
            </p>
            <a
              href={CONTACT.phoneHref}
              className="mt-2.5 flex w-fit flex-wrap items-center gap-x-3 gap-y-2 rounded-xl text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold tracking-tight text-white transition-colors hover:text-skylight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skylight"
            >
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-sky to-skylight text-ink"
              >
                <Phone className="size-5" />
              </span>
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2.5 rounded-md text-mist transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skylight"
            >
              <MapPin className="size-5 shrink-0" aria-hidden />
              <span className="text-[15px] leading-relaxed">{CONTACT.base}</span>
            </a>
          </div>
        </div>

        {/* Bilgi ızgarası: marka · bağlantılar · duraklar */}
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
                    className="inline-flex min-h-11 items-center rounded-md text-base text-mist transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skylight"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="space-y-2.5">
            {STOPS.map((stop) => (
              <li
                key={stop.id}
                className="flex items-center gap-3 text-base text-mist"
              >
                <span
                  aria-hidden
                  className={
                    stop.kind === "main"
                      ? "size-2 shrink-0 rounded-full bg-sky shadow-[0_0_8px] shadow-sky/60"
                      : "size-2 shrink-0 rounded-full bg-sage"
                  }
                />
                {stop.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Alt bar */}
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-mist/90">
          <p>© {BRAND.name}, Marmara Adası</p>
        </div>
      </div>
    </footer>
  );
}
