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
 * Hizmetler bölümü: sade, eşit yükseklikte 4 kart.
 * "hat" kartı ana hizmet olarak ince bir teal kenarlıkla ayrılır,
 * "kiralama" kartında amber arama bağlantısı bulunur.
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

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.items.map((item, index) => {
            const Icon = SERVICE_ICONS[item.id];
            const isPrimary = item.id === "hat";
            return (
              <FadeIn key={item.id} delay={index * 0.06} className="h-full">
                <article
                  className={cn(
                    "flex h-full flex-col rounded-xl border bg-white p-6",
                    isPrimary
                      ? "border-teal/30"
                      : "border-ink/10 hover:border-ink/20"
                  )}
                >
                  {isPrimary ? (
                    <p className="mb-3 text-sm font-medium text-teal">
                      Ana hizmetimiz
                    </p>
                  ) : null}

                  <div
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-lg bg-sand text-teal"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-ink/70">
                    {item.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-[15px] text-ink/70"
                      >
                        <Check
                          aria-hidden
                          className="mt-0.5 w-4 shrink-0 text-teal"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {item.id === "kiralama" ? (
                    <div className="mt-auto pt-4">
                      <a
                        href={CONTACT.phoneHref}
                        className="inline-flex w-fit min-h-11 items-center gap-2 rounded-lg bg-amber px-4 py-2.5 font-semibold text-ink shadow-sm ring-1 ring-black/10 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                      >
                        <Phone aria-hidden className="h-4 w-4" />
                        Fiyat için arayın
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
