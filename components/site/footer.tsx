import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { BRAND, CONTACT_COPY, NAV_LINKS } from "@/lib/copy";
import { CONTACT } from "@/lib/data";

/**
 * Minimalist alt bilgi: düz koyu yeşil zemin.
 * Mobilde ortalanmış dikey akış: logo, düzenli üç sütunlu bağlantılar
 * ve tam genişlik arama/WhatsApp butonları. Geniş ekranda tek satır:
 * logo | bağlantılar | telefon + WhatsApp. Altta telif satırı.
 * Mobilde alttaki arama çubuğu için ekstra alt boşluk bırakılır.
 * Sunucu bileşeni.
 */
export function Footer() {
  return (
    <footer id="iletisim" className="bg-deep pt-10 pb-8">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:gap-8">
          {/* Logo: koyu zeminde beyaz karo içinde */}
          <a
            href="#top"
            aria-label={BRAND.name}
            className="shrink-0 rounded-xl bg-white px-3.5 py-2 shadow-card outline-none transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-skylight"
          >
            <Image
              src="/images/logo.png"
              alt={BRAND.name}
              width={452}
              height={120}
              className="h-8 w-auto"
            />
          </a>

          {/* Bağlantılar: mobilde düzenli üç sütun, geniş ekranda tek satır */}
          <nav aria-label="Site içi bağlantılar" className="w-full lg:w-auto">
            <ul className="grid grid-cols-3 justify-items-center gap-x-2 lg:flex lg:gap-x-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-md px-2 text-base text-mist transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-skylight focus-visible:outline-none lg:min-h-10 lg:px-0"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* İletişim, mobil: tam genişlik butonlar */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center lg:hidden">
            <a
              href={CONTACT.phoneHref}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-sky to-skylight px-6 text-base font-bold text-ink shadow-card transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skylight focus-visible:ring-offset-2 focus-visible:ring-offset-deep sm:w-auto"
            >
              <Phone aria-hidden className="size-5" />
              <span className="whitespace-nowrap">{CONTACT.phoneDisplay}</span>
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-5 text-base font-semibold text-white transition hover:border-skylight/40 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skylight focus-visible:ring-offset-2 focus-visible:ring-offset-deep sm:w-auto"
            >
              <MessageCircle aria-hidden className="size-5" />
              <span className="whitespace-nowrap">
                {CONTACT_COPY.whatsappCta}
              </span>
            </a>
          </div>

          {/* İletişim, geniş ekran: telefon yazısı + yuvarlak WhatsApp */}
          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={CONTACT.phoneHref}
              className="inline-flex min-h-11 items-center gap-2.5 rounded-md text-xl font-extrabold tracking-tight whitespace-nowrap text-white transition-colors hover:text-skylight focus-visible:ring-2 focus-visible:ring-skylight focus-visible:outline-none"
            >
              <Phone aria-hidden className="size-5 shrink-0 text-skylight" />
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={CONTACT_COPY.whatsappCta}
              title={CONTACT_COPY.whatsappCta}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition hover:border-skylight/40 hover:bg-white/[0.1] focus-visible:ring-2 focus-visible:ring-skylight focus-visible:outline-none"
            >
              <MessageCircle aria-hidden className="size-5" />
            </a>
          </div>
        </div>

        {/* Alt bar: mobilde ortalanmış kısa satırlar, geniş ekranda yayılı */}
        <div className="mt-7 flex flex-col items-center gap-0.5 border-t border-white/10 pt-4 text-center lg:flex-row lg:justify-between lg:gap-6 lg:text-left">
          <p className="text-sm text-mist/90">{CONTACT.base}</p>
          <p className="text-sm text-mist/70">
            {CONTACT.name} · {CONTACT.title}
          </p>
          <p className="mt-1.5 text-sm text-mist/60 lg:mt-0">
            © {BRAND.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
