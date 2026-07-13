import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { BRAND, CONTACT_COPY, NAV_LINKS } from "@/lib/copy";
import { CONTACT } from "@/lib/data";

/**
 * Minimalist alt bilgi: düz koyu yeşil zemin, iki kompakt satır.
 * Üstte logo, bağlantılar ve iletişim (telefon + WhatsApp), altta
 * ince çizgiyle ayrılmış telif satırı. Mobilde alttaki arama çubuğu
 * için ekstra alt boşluk bırakılır. Sunucu bileşeni.
 */
export function Footer() {
  return (
    <footer id="iletisim" className="bg-deep pt-10 pb-24 lg:pb-8">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-col items-center gap-7 lg:flex-row lg:justify-between lg:gap-8">
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

          <nav aria-label="Site içi bağlantılar">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-0.5">
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

          {/* İletişim: telefon + WhatsApp */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
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

        {/* Alt bar: mobilde ortalanmış, geniş ekranda iki yana yaslı */}
        <div className="mt-8 flex flex-col items-center gap-1 border-t border-white/10 pt-4 text-center lg:flex-row lg:justify-between lg:text-left">
          <p className="text-sm text-mist/90">
            © {BRAND.name} · {CONTACT.base}
          </p>
          <p className="text-sm text-mist/70">
            {CONTACT.name} · {CONTACT.title}
          </p>
        </div>
      </div>
    </footer>
  );
}
