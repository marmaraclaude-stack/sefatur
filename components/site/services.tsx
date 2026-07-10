import {
  BusFront,
  CheckCircle2,
  Clock,
  GraduationCap,
  KeyRound,
  Map as MapIcon,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/copy";
import { CONTACT, ROUTE_STOPS, SCHEDULE } from "@/lib/data";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Hizmetler — "IslandBento" bölümü.
 * SERVICES.items 4 kartı bento düzeninde gösterir; "hat" kartında
 * mini güzergâh pili + ilk/son sefer saati, "kiralama" kartında amber tel CTA.
 * Sunucu bileşeni — animasyonlar FadeIn (client) üzerinden.
 */

type ServiceId = (typeof SERVICES.items)[number]["id"];

const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  hat: BusFront,
  tur: MapIcon,
  servis: GraduationCap,
  kiralama: KeyRound,
};

/** lg 12 kolonda bento ritmi: 7-5 / 5-7 */
const SERVICE_SPANS: Record<ServiceId, string> = {
  hat: "lg:col-span-7",
  tur: "lg:col-span-5",
  servis: "lg:col-span-5",
  kiralama: "lg:col-span-7",
};

/** "HH:MM" sıfır dolgulu olduğundan sözlük sıralaması saat sıralamasıdır. */
const ALL_TIMES = SCHEDULE.flatMap((point) => point.times).sort();
const FIRST_DEPARTURE = ALL_TIMES[0];
const LAST_DEPARTURE = ALL_TIMES[ALL_TIMES.length - 1];

const ROUTE_LINE = ROUTE_STOPS.map((stop) => stop.name).join(" • ");

export function Services() {
  return (
    <section
      id="hizmetler"
      aria-label={SERVICES.title}
      className="relative overflow-hidden bg-marble py-20 sm:py-28"
    >
      {/* Zemin dokusu: köşelerde çok hafif turkuaz/amber ışıma */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-teal/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-amber/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={SERVICES.eyebrow}
          title={SERVICES.title}
          subtitle={SERVICES.subtitle}
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-12 lg:gap-6">
          {SERVICES.items.map((item, index) => {
            const Icon = SERVICE_ICONS[item.id];
            return (
              <FadeIn
                key={item.id}
                delay={index * 0.08}
                className={cn("min-w-0", SERVICE_SPANS[item.id])}
              >
                <article
                  className={cn(
                    "group relative h-full min-h-60 overflow-hidden rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5",
                    "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:hover:translate-y-0",
                    "sm:p-8 lg:min-h-72"
                  )}
                >
                  {/* Gradyan kenarlık: hover'da beliren teal→amber çerçeve */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-teal/40 via-transparent to-amber/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-[1.5px] rounded-[calc(1.5rem-1.5px)] bg-white"
                  />

                  <div className="relative flex h-full flex-col">
                    <div
                      aria-hidden
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105"
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>

                    <h3 className="mt-5 font-heading text-xl font-bold text-ink sm:text-2xl">
                      {item.name}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink/70 sm:text-base">
                      {item.description}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-sm text-ink/60"
                        >
                          <CheckCircle2
                            aria-hidden
                            className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {item.id === "hat" ? (
                      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-6">
                        <span className="max-w-full rounded-full bg-teal/5 px-3 py-1.5 font-digits text-xs leading-relaxed text-teal ring-1 ring-teal/10">
                          {ROUTE_LINE}
                        </span>
                        <span className="flex items-center gap-2 font-digits text-sm text-ink/70">
                          <Clock
                            aria-hidden
                            className="h-4 w-4 shrink-0 text-teal"
                          />
                          <span>
                            Her gün{" "}
                            <span className="font-semibold text-ink">
                              {FIRST_DEPARTURE} – {LAST_DEPARTURE}
                            </span>
                          </span>
                        </span>
                      </div>
                    ) : null}

                    {item.id === "kiralama" ? (
                      <div className="mt-auto pt-6">
                        <a
                          href={CONTACT.phoneHref}
                          aria-label={`Fiyat almak için arayın: ${CONTACT.phoneDisplay}`}
                          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-amber px-6 py-2.5 text-sm font-semibold text-deep shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105 focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                          <Phone aria-hidden className="h-4 w-4" />
                          Fiyat Al
                        </a>
                      </div>
                    ) : null}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
