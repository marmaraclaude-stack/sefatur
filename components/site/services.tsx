/**
 * Hizmetler: 4 eşit kart. Her kartın köşesinde büyük hayalet ikon,
 * üstte ikon karosu, başlık, açıklama ve kontrol listesi bulunur.
 * Ana hizmet (hat) koyu gradyan zeminle ayrışır ama boyutu eşittir.
 * Fiyat yönlendirmesi, tarifedeki arama bandıyla aynı dilde bir karttır.
 */
import {
  ArrowRight,
  BusFront,
  Check,
  GraduationCap,
  KeyRound,
  Map,
  MessageCircle,
  Phone,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { CONTACT_COPY, SERVICES } from "@/lib/copy";
import { CONTACT } from "@/lib/data";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

type ServiceId = (typeof SERVICES.items)[number]["id"];

const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  hat: BusFront,
  tur: Map,
  servis: GraduationCap,
  kiralama: KeyRound,
};

export function Services() {
  return (
    <section
      id="hizmetler"
      className="relative overflow-hidden bg-marble py-10 sm:py-14"
    >
      {/* Zemin: yumuşak buz mavisi parıltı */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[34rem] rounded-full bg-ice/50 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          align="left"
          title={SERVICES.title}
          subtitle={SERVICES.subtitle}
        />

        {/* 4 eşit kart */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:mt-10 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.items.map((item, index) => {
            const Icon = SERVICE_ICONS[item.id];
            const isPrimary = item.id === "hat";
            return (
              <FadeIn key={item.id} delay={index * 0.06} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition duration-300 sm:p-7",
                    isPrimary
                      ? "bg-linear-to-br from-navy to-deep text-white shadow-card-lg"
                      : "border border-ink/[0.06] bg-white shadow-card hover:-translate-y-1 hover:border-sky/40 hover:shadow-card-lg"
                  )}
                >
                  {/* Köşede büyük hayalet ikon */}
                  <Icon
                    aria-hidden
                    strokeWidth={1.25}
                    className={cn(
                      "pointer-events-none absolute -right-7 -bottom-7 size-36 -rotate-12 transition-colors duration-300",
                      isPrimary
                        ? "text-skylight/15"
                        : "text-ice group-hover:text-skylight/50"
                    )}
                  />

                  <div
                    aria-hidden
                    className={cn(
                      "relative flex size-12 items-center justify-center rounded-xl",
                      isPrimary
                        ? "bg-skylight/15 text-skylight"
                        : "bg-ice text-forest"
                    )}
                  >
                    <Icon className="size-6" strokeWidth={1.75} />
                  </div>

                  <h3
                    className={cn(
                      "relative mt-4 text-lg font-bold tracking-tight",
                      isPrimary ? "text-white" : "text-ink"
                    )}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={cn(
                      "relative mt-2 text-[15px] leading-relaxed",
                      isPrimary ? "text-mist" : "text-ink/70"
                    )}
                  >
                    {item.description}
                  </p>

                  <ul className="relative mt-4 space-y-2">
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
                            isPrimary ? "text-skylight" : "text-forest"
                          )}
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {isPrimary ? (
                    <a
                      href="#seferler"
                      className="group/link relative mt-auto inline-flex min-h-11 w-fit items-center gap-1.5 pt-4 text-[15px] font-semibold text-skylight transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-skylight focus-visible:outline-none rounded"
                    >
                      Tüm saatler
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform group-hover/link:translate-x-0.5"
                      />
                    </a>
                  ) : null}
                </article>
              </FadeIn>
            );
          })}
        </div>

        {/* Fiyat bandı: tarifedeki arama bandıyla aynı dil, açık zemin */}
        <FadeIn delay={0.15} className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/[0.06] bg-white px-6 py-5 shadow-card">
            <div className="flex min-w-0 items-center gap-3.5">
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-lg bg-ice text-forest"
              >
                <Wallet className="size-5" />
              </span>
              <p className="text-base text-ink/70">
                {SERVICES.pricingNote} {SERVICES.pricingLink}.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={CONTACT.phoneHref}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-sky to-skylight px-6 text-base font-bold text-ink shadow-card transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Phone aria-hidden className="size-5" />
                <span className="whitespace-nowrap">{CONTACT.phoneDisplay}</span>
              </a>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white px-5 text-base font-semibold text-ink transition-colors hover:border-forest/40 hover:text-forest focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <MessageCircle aria-hidden className="size-5" />
                {CONTACT_COPY.whatsappCta}
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
