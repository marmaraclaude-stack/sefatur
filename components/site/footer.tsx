import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { BRAND, CONTACT_COPY, NAV_LINKS } from "@/lib/copy";
import { CONTACT } from "@/lib/data";

/**
 * Sade alt bilgi: açık zemin, ortalanmış tek sütun.
 * Logo, bağlantılar, telefon ve telif satırından ibarettir.
 * Mobilde alttaki arama çubuğu için ekstra alt boşluk bırakılır.
 * Sunucu bileşeni.
 */
export function Footer() {
  return (
    <footer
      id="iletisim"
      className="border-t border-ink/10 bg-marble pt-12 pb-28 text-center sm:pt-14 lg:pb-12"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-5 sm:px-8">
        <a
          href="#top"
          aria-label={BRAND.name}
          className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          <Image
            src="/images/logo.png"
            alt={BRAND.name}
            width={452}
            height={120}
            className="h-10 w-auto"
          />
        </a>

        <nav aria-label="Site içi bağlantılar" className="mt-5">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-0.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-10 items-center rounded-md text-base text-ink/70 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={CONTACT.phoneHref}
          className="mt-5 rounded-md text-[1.75rem] font-extrabold tracking-tight whitespace-nowrap text-ink transition-colors hover:text-forest focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none"
        >
          {CONTACT.phoneDisplay}
        </a>
        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex min-h-10 items-center gap-2 rounded-md text-base text-ink/70 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none"
        >
          <MessageCircle className="size-[18px] shrink-0" aria-hidden />
          {CONTACT_COPY.whatsappCta}
        </a>

        <p className="mt-8 w-full border-t border-ink/10 pt-5 text-sm text-ink/60">
          © {BRAND.name} · {CONTACT.base}
        </p>
      </div>
    </footer>
  );
}
