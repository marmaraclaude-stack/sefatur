"use client";

/**
 * Hero: gradyan zemin + nokta deseni üzerinde başlık ve ana eylemler;
 * sağda gradyan çerçeveli araç fotoğrafı ile iki yüzen cam kart
 * (canlı sıradaki sefer + konum çipi). Giriş animasyonu CSS ile yapılır
 * (animate-fade-up), içerik SSR HTML'inde görünür kalır.
 */
import Image from "next/image";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { HERO, SCHEDULE_COPY } from "@/lib/copy";
import { CONTACT } from "@/lib/data";
import { IMAGES } from "@/lib/images";
import { timeToMinutes, useNextDepartures } from "@/lib/use-next-departure";

type Soonest = {
  time: string;
  name: string;
  to: string;
  minutesLeft: number;
};

export function Hero() {
  const next = useNextDepartures();

  const [headBefore = "", headAfter = ""] = HERO.headline.split(HERO.highlight);

  /* Tüm kalkış noktaları arasındaki en yakın sefer */
  let soonest: Soonest | null = null;
  if (next) {
    for (const d of next.departures) {
      if (
        d.isToday &&
        d.minutesLeft !== null &&
        (soonest === null || d.minutesLeft < soonest.minutesLeft)
      ) {
        soonest = {
          time: d.time,
          name: d.point.name,
          to: d.to,
          minutesLeft: d.minutesLeft,
        };
      }
    }
  }

  /* Yarınki ilk sefer, veriden türetilir (lib/data.ts) */
  const firstTomorrow = next
    ? next.departures.reduce((a, b) =>
        timeToMinutes(a.time) <= timeToMinutes(b.time) ? a : b
      ).time
    : null;

  return (
    <section
      id="hero"
      className="relative overflow-clip bg-linear-to-b from-sand via-marble to-marble pt-24 pb-10 md:pt-28 sm:pb-16 xl:pt-32 xl:pb-14 2xl:pt-40 2xl:pb-20"
    >
      {/* Zemin: nokta deseni + renk lekeleri */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,rgb(56_87_55/0.09)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(42rem_at_78%_10%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-56 right-[-10%] size-[42rem] rounded-full bg-skylight/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 left-[-12%] size-[32rem] rounded-full bg-forest/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-[1.05fr_1fr] lg:gap-14 xl:gap-16">
          {/* Sol sütun */}
          <div>
            <h1
              className="animate-fade-up text-[2.75rem] leading-[1.06] font-extrabold tracking-tight text-balance text-ink sm:text-6xl sm:leading-[1.05] lg:text-[4.25rem] lg:leading-[1.03] xl:text-[4.75rem] 2xl:text-[5.25rem]"
              style={{ animationDelay: "0s" }}
            >
              {headBefore}
              <span className="relative inline-block">
                <span
                  aria-hidden
                  className="absolute inset-x-[-0.15em] inset-y-[0.08em] -skew-x-6 rounded-lg bg-ice"
                />
                <span className="relative text-forest">{HERO.highlight}</span>
              </span>
              {headAfter}
            </h1>

            <p
              className="animate-fade-up mt-5 max-w-xl text-lg leading-relaxed text-ink/70 sm:mt-6 sm:text-xl xl:max-w-2xl xl:text-[1.35rem] 2xl:text-2xl"
              style={{ animationDelay: "0.08s" }}
            >
              {HERO.subheadline}
            </p>

            <div
              className="animate-fade-up mt-7 flex flex-wrap items-center gap-3 sm:mt-9"
              style={{ animationDelay: "0.16s" }}
            >
              <a
                href="#seferler"
                className="inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-sky to-skylight px-7 text-base font-bold text-ink shadow-lg shadow-sky/30 inset-ring-1 inset-ring-white/45 transition hover:shadow-xl hover:shadow-sky/35 hover:brightness-105 focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto xl:h-14 xl:px-8 xl:text-lg"
              >
                <Clock aria-hidden="true" className="size-5 shrink-0" />
                {HERO.ctaPrimary}
              </a>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full border border-white/80 bg-white/70 px-6 text-base font-semibold text-ink shadow-card ring-1 ring-ink/5 backdrop-blur-md transition hover:bg-white hover:text-forest hover:ring-forest/25 focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto xl:h-14 xl:px-7 xl:text-lg"
              >
                <Phone aria-hidden="true" className="size-5 shrink-0 text-forest" />
                <span className="whitespace-nowrap">{CONTACT.phoneDisplay}</span>
              </a>
            </div>

          </div>

          {/* Sağ sütun: iki fotoğraflı kolaj + yüzen kartlar */}
          <div
            className="animate-fade-up grid gap-4 sm:gap-5"
            style={{ animationDelay: "0.12s" }}
          >
            {/* Ana fotoğraf: gradyan çerçeve, üstünde konum çipi */}
            <div className="relative rounded-[1.35rem] bg-linear-to-br from-sky/70 via-ice to-forest/40 p-[2px] shadow-card-lg">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] lg:aspect-[16/9] 2xl:aspect-[16/10]">
                <Image
                  src={IMAGES.heroVehicle.src}
                  alt={IMAGES.heroVehicle.alt}
                  fill
                  preload
                  sizes="(min-width:1024px) 700px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 right-4 rounded-full bg-linear-to-br from-white/90 to-white/40 p-px shadow-card">
                <div className="flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 backdrop-blur-2xl">
                  <MapPin aria-hidden className="size-4 shrink-0 text-forest" />
                  <span className="text-sm font-semibold whitespace-nowrap text-ink">
                    Topağaç merkezli
                  </span>
                </div>
              </div>
            </div>

            {/* Alt satır: ikinci fotoğraf + canlı sefer kartı, bindirme yok */}
            <div className="grid gap-4 sm:grid-cols-[1.15fr_1fr] sm:gap-5">
              <div className="relative hidden aspect-[16/10] overflow-hidden rounded-2xl shadow-card-lg ring-1 ring-ink/5 sm:block lg:aspect-[16/9] 2xl:aspect-[16/10]">
                <Image
                  src={IMAGES.heroVehicle2.src}
                  alt={IMAGES.heroVehicle2.alt}
                  fill
                  sizes="(min-width:1024px) 430px, 55vw"
                  className="object-cover"
                />
              </div>

              {/* Canlı sefer kartı: fotoğrafla eşit yükseklikte karo */}
              <a
                href="#seferler"
                className="group block rounded-2xl bg-linear-to-br from-white/90 to-white/40 p-px shadow-card-lg transition hover:from-sky/60 hover:to-skylight/40 focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span className="flex h-full flex-col justify-center gap-1 rounded-[calc(1rem-1px)] bg-white/85 px-5 py-4 backdrop-blur-2xl">
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="relative flex size-2.5 shrink-0"
                    >
                      <span className="animate-beacon-ping absolute inline-flex h-full w-full rounded-full bg-sky" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-sky" />
                    </span>
                    <span className="text-xs font-semibold tracking-wide text-forest uppercase">
                      {SCHEDULE_COPY.nextLabel}
                    </span>
                  </span>

                  {next === null ? (
                    <span
                      aria-hidden="true"
                      className="h-14 w-44 max-w-full animate-pulse rounded bg-ice"
                    />
                  ) : soonest ? (
                    <>
                      <span className="text-3xl font-extrabold tracking-tight text-ink tabular-nums sm:text-4xl">
                        {soonest.time}
                      </span>
                      <span className="text-base font-semibold text-ink/80">
                        {soonest.name} → {soonest.to}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-ink">
                      {SCHEDULE_COPY.firstTomorrow} {firstTomorrow}
                    </span>
                  )}

                  <span className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-forest">
                    Tüm saatler
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
