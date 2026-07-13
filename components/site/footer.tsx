import Image from "next/image";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { BRAND, CONTACT_COPY, NAV_LINKS } from "@/lib/copy";
import { CONTACT } from "@/lib/data";

/**
 * Alt bilgi: koyu orman yeşili gradyan zemin (tarife panosuyla aynı dil),
 * ortalanmış tek sütun. Beyaz karo içinde logo, kısa tanıtım, bağlantılar,
 * telefon ve WhatsApp butonları, ince çizgili alt bar.
 * Mobilde alttaki arama çubuğu için ekstra alt boşluk bırakılır.
 * Sunucu bileşeni.
 */
export function Footer() {
  return (
    <footer
      id="iletisim"
      className="relative overflow-hidden bg-linear-to-b from-navy to-deep pt-12 pb-28 text-center sm:pt-14 lg:pb-12"
    >
      {/* Zemin: yumuşak parıltı */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-44 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-skylight/[0.07] blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center px-5 sm:px-8">
        {/* Logo: koyu zeminde beyaz karo içinde */}
        <a
          href="#top"
          aria-label={BRAND.name}
          className="rounded-2xl bg-white px-5 py-3 shadow-card-lg outline-none transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-skylight"
        >
          <Image
            src="/images/logo.png"
            alt={BRAND.name}
            width={452}
            height={120}
            className="h-9 w-auto"
          />
        </a>

        <p className="mt-5 max-w-md text-base leading-relaxed text-mist">
          {BRAND.subtitle}
        </p>

        <nav aria-label="Site içi bağlantılar" className="mt-5">
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

        <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto">
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
            <span className="whitespace-nowrap">{CONTACT_COPY.whatsappCta}</span>
          </a>
        </div>

        <p className="mt-3 text-sm text-mist">
          {CONTACT.name} · {CONTACT.title}
        </p>

        {/* Alt bar */}
        <div className="mt-10 flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-left">
          <p className="text-sm text-mist/90">
            © {BRAND.name} · {CONTACT.base}
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
