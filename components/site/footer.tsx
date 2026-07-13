import { ArrowUp, MapPin, MessageCircle } from "lucide-react";
import { BRAND, CONTACT_COPY, NAV_LINKS } from "@/lib/copy";
import { CONTACT } from "@/lib/data";

const MAPS_URL = "https://maps.google.com/?q=Topağaç,+Marmara,+Balıkesir";

/**
 * Minimalist alt bilgi: düz koyu zemin, üç sütun (marka, bölümler,
 * iletişim) ve ince çizgiyle ayrılmış alt bar. Kart, cam ve gradyan yok.
 * Mobilde alttaki arama çubuğu için ekstra alt boşluk bırakılır.
 * Sunucu bileşeni.
 */
export function Footer() {
  return (
    <footer id="iletisim" className="bg-deep pt-12 pb-28 sm:pt-14 lg:pb-12">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Marka */}
          <div className="sm:col-span-2 lg:col-span-6">
            <p className="text-2xl font-extrabold tracking-tight text-white">
              {BRAND.name}
            </p>
            <p className="mt-3 max-w-sm text-base leading-relaxed text-mist">
              {BRAND.subtitle}
            </p>
          </div>

          {/* Bölümler */}
          <nav aria-label="Site içi bağlantılar" className="lg:col-span-3">
            <p className="text-[13px] font-semibold tracking-[0.08em] text-white/40 uppercase">
              Bölümler
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-10 items-center rounded-md text-base text-mist transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-skylight focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* İletişim */}
          <div className="lg:col-span-3">
            <p className="text-[13px] font-semibold tracking-[0.08em] text-white/40 uppercase">
              {CONTACT_COPY.title}
            </p>
            <a
              href={CONTACT.phoneHref}
              className="mt-3 inline-flex min-h-11 items-center rounded-md text-2xl font-extrabold tracking-tight whitespace-nowrap text-white transition-colors hover:text-skylight focus-visible:ring-2 focus-visible:ring-skylight focus-visible:outline-none"
            >
              {CONTACT.phoneDisplay}
            </a>
            <p className="text-sm text-mist">
              {CONTACT.name} · {CONTACT.title}
            </p>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2.5 rounded-md text-base text-mist transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-skylight focus-visible:outline-none"
                >
                  <MessageCircle className="size-[18px] shrink-0" aria-hidden />
                  {CONTACT_COPY.whatsappCta}
                </a>
              </li>
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2.5 rounded-md text-base text-mist transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-skylight focus-visible:outline-none"
                >
                  <MapPin className="size-[18px] shrink-0" aria-hidden />
                  {CONTACT.base}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-5">
          <p className="text-sm text-mist/90">
            © {BRAND.name}, Marmara Adası
          </p>
          <a
            href="#top"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-md text-sm text-mist transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-skylight focus-visible:outline-none"
          >
            Başa dön
            <ArrowUp className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
