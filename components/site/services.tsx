/**
 * Hizmetler: bento ızgara. Ana hizmet (hat seferleri) iki sütunluk koyu
 * kartta, canlı ilk/son sefer bilgisiyle öne çıkar; diğerleri hover'da
 * gradyan kenarlık kazanan beyaz kartlardır. Kart içi arama düğmesi yok;
 * fiyat yönlendirmesi bölüm sonunda tek zarif satırdır.
 */
import {
  ArrowRight,
  BusFront,
  Check,
  Clock,
  GraduationCap,
  KeyRound,
  Map,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/copy";
import { SCHEDULE } from "@/lib/data";
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

/** Günün ilk ve son kalkışı (tüm noktalar arasında) */
const ALL_TIMES = SCHEDULE.flatMap((p) => p.times).sort();
const FIRST_TIME = ALL_TIMES[0];
const LAST_TIME = ALL_TIMES[ALL_TIMES.length - 1];

export function Services() {
  return (
    <section id="hizmetler" className="bg-marble py-14 sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          align="left"
          title={SERVICES.title}
          subtitle={SERVICES.subtitle}
        />

        {/* Bento: [hat x2][tur] / [servis][kiralama x2] */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 lg:grid-cols-3">
          {SERVICES.items.map((item, index) => {
            const Icon = SERVICE_ICONS[item.id];
            const isPrimary = item.id === "hat";
            const wide = item.id === "hat" || item.id === "kiralama";
            return (
              <FadeIn
                key={item.id}
                delay={index * 0.06}
                className={cn("h-full", wide && "lg:col-span-2")}
              >
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition duration-300 sm:p-8",
                    isPrimary
                      ? "bg-linear-to-br from-navy to-deep text-white shadow-card-lg"
                      : "border border-ink/[0.06] bg-white shadow-card hover:-translate-y-1 hover:border-sky/40 hover:shadow-card-lg"
                  )}
                >
                  {isPrimary ? (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-skylight/15 blur-3xl"
                    />
                  ) : null}

                  <div className="relative flex flex-wrap items-start justify-between gap-4">
                    <div
                      aria-hidden
                      className={cn(
                        "flex size-12 items-center justify-center rounded-xl",
                        isPrimary
                          ? "bg-skylight/15 text-skylight"
                          : "bg-ice text-forest"
                      )}
                    >
                      <Icon className="size-6" strokeWidth={1.75} />
                    </div>

                    {isPrimary ? (
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-skylight">
                        <Clock aria-hidden className="size-4" />
                        Her gün {FIRST_TIME} ile {LAST_TIME} arasında
                      </span>
                    ) : null}
                  </div>

                  <h3
                    className={cn(
                      "relative mt-4 text-xl font-bold tracking-tight",
                      isPrimary ? "text-white" : "text-ink"
                    )}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={cn(
                      "relative mt-2 max-w-2xl text-base leading-relaxed",
                      isPrimary ? "text-mist" : "text-ink/70"
                    )}
                  >
                    {item.description}
                  </p>

                  <ul
                    className={cn(
                      "relative mt-5 grid gap-x-8 gap-y-2.5",
                      wide && "sm:grid-cols-3"
                    )}
                  >
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
                </article>
              </FadeIn>
            );
          })}
        </div>

        {/* Fiyat yönlendirmesi: tek zarif satır */}
        <FadeIn delay={0.15}>
          <p className="mt-8 text-base text-ink/60">
            {SERVICES.pricingNote}{" "}
            <a
              href="#iletisim"
              className="group inline-flex items-center gap-1.5 rounded font-semibold text-forest transition-colors hover:text-sky focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none"
            >
              <span className="underline decoration-forest/30 decoration-2 underline-offset-4 group-hover:decoration-sky/50">
                {SERVICES.pricingLink}
              </span>
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
