import {
  BusFront,
  Check,
  GraduationCap,
  KeyRound,
  Map,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/copy";
import { CONTACT } from "@/lib/data";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Hizmetler bölümü: eşit yükseklikte 4 kart.
 * "hat" kartı ana hizmet olarak koyu lacivert kartla öne çıkar;
 * diğerleri katmanlı gölgeli beyaz kartlardır. "kiralama" kartında
 * küçük bir arama bağlantısı bulunur (buton değil, tekrar azaltıldı).
 * Sunucu bileşeni; animasyon yalnızca FadeIn (client) ile.
 */

type ServiceId = (typeof SERVICES.items)[number]["id"];

const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  hat: BusFront,
  tur: Map,
  servis: GraduationCap,
  kiralama: KeyRound,
};

export function Services() {
  return (
    <section id="hizmetler" className="bg-marble py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          align="left"
          title={SERVICES.title}
          subtitle={SERVICES.subtitle}
        />

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:mt-12 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.items.map((item, index) => {
            const Icon = SERVICE_ICONS[item.id];
            const isPrimary = item.id === "hat";
            return (
              <FadeIn key={item.id} delay={index * 0.06} className="h-full">
                <article
                  className={cn(
                    "flex h-full flex-col rounded-2xl p-6 transition duration-300 sm:p-7",
                    isPrimary
                      ? "bg-navy text-white shadow-card-lg"
                      : "border border-ink/[0.06] bg-white shadow-card hover:-translate-y-1 hover:shadow-card-lg"
                  )}
                >
                  <div
                    aria-hidden
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl",
                      isPrimary ? "bg-glow/15 text-glow" : "bg-teal/10 text-teal"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  <h3
                    className={cn(
                      "font-heading mt-4 text-lg font-bold tracking-tight",
                      isPrimary ? "text-white" : "text-ink"
                    )}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-base leading-relaxed",
                      isPrimary ? "text-mist" : "text-ink/70"
                    )}
                  >
                    {item.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className={cn(
                          "flex items-start gap-2 text-[15px]",
                          isPrimary ? "text-white/85" : "text-ink/70"
                        )}
                      >
                        <Check
                          aria-hidden
                          className={cn(
                            "mt-0.5 w-4 shrink-0",
                            isPrimary ? "text-glow" : "text-teal"
                          )}
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {item.id === "kiralama" ? (
                    <div className="mt-auto pt-5">
                      <a
                        href={CONTACT.phoneHref}
                        className="group inline-flex items-center gap-2 rounded text-[15px] font-semibold text-teal transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none"
                      >
                        <Phone aria-hidden className="h-4 w-4 shrink-0" />
                        <span className="underline decoration-teal/30 decoration-2 underline-offset-4 group-hover:decoration-ink/30">
                          Fiyat için arayın
                        </span>
                      </a>
                    </div>
                  ) : null}
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
