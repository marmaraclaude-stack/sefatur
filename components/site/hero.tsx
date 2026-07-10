"use client";

/**
 * Hero: açılış bölümü.
 * Solda başlık ve ana eylem; sağda katmanlı çerçeveli araç fotoğrafı ve
 * fotoğrafın üzerine oturan canlı "sıradaki sefer" kartı. Giriş animasyonu
 * CSS ile yapılır (animate-fade-up), içerik SSR HTML'inde görünür kalır.
 */
import Image from "next/image";
import { ArrowRight, Clock, Phone } from "lucide-react";
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
          to: d.point.to,
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
      className="relative overflow-hidden bg-marble pt-28 pb-16 md:pt-36 sm:pb-24"
    >
      {/* Zemin dokusu: iki yumuşak renk lekesi */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-[-8%] size-[36rem] rounded-full bg-teal/[0.07] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-[-10%] size-[28rem] rounded-full bg-amber/[0.06] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Sol sütun */}
          <div>
            <p
              className="animate-fade-up text-sm font-semibold tracking-[0.16em] text-teal uppercase"
              style={{ animationDelay: "0s" }}
            >
              Marmara Adası tarifeli minibüs seferleri
            </p>

            <h1
              className="animate-fade-up font-heading mt-4 text-4xl font-extrabold tracking-tight text-balance text-ink sm:text-5xl lg:text-[3.6rem] lg:leading-[1.08]"
              style={{ animationDelay: "0.06s" }}
            >
              {headBefore}
              <span className="text-teal">{HERO.highlight}</span>
              {headAfter}
            </h1>

            <p
              className="animate-fade-up mt-5 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl"
              style={{ animationDelay: "0.12s" }}
            >
              {HERO.subheadline}
            </p>

            <div
              className="animate-fade-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
              style={{ animationDelay: "0.18s" }}
            >
              <a
                href="#seferler"
                className="inline-flex min-h-13 items-center gap-2.5 rounded-xl bg-ink px-7 text-base font-semibold text-white shadow-card transition hover:bg-navy focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Clock aria-hidden="true" className="size-5 shrink-0" />
                {HERO.ctaPrimary}
              </a>
              <a
                href={CONTACT.phoneHref}
                className="group inline-flex min-h-13 items-center gap-2 text-base font-semibold text-ink transition-colors hover:text-teal focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:outline-none rounded-lg"
              >
                <Phone aria-hidden="true" className="size-5 shrink-0 text-teal" />
                <span className="font-digits whitespace-nowrap underline decoration-teal/30 decoration-2 underline-offset-4 group-hover:decoration-teal">
                  {CONTACT.phoneDisplay}
                </span>
              </a>
            </div>

            <p
              className="animate-fade-up mt-7 text-base text-ink/60"
              style={{ animationDelay: "0.24s" }}
            >
              {HERO.facts.join("  ·  ")}
            </p>
          </div>

          {/* Sağ sütun: katmanlı fotoğraf + yüzen canlı sefer kartı */}
          <div
            className="animate-fade-up relative mb-8 lg:mb-4"
            style={{ animationDelay: "0.12s" }}
          >
            {/* Arka çerçeve katmanı */}
            <div
              aria-hidden
              className="absolute -top-4 -right-4 hidden h-full w-full rounded-2xl bg-teal/10 sm:block"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card-lg">
              <Image
                src={IMAGES.heroVehicle.src}
                alt={IMAGES.heroVehicle.alt}
                fill
                preload
                sizes="(min-width:1024px) 640px, 100vw"
                className="object-cover"
              />
            </div>

            {/* Yüzen canlı sefer kartı */}
            <a
              href="#seferler"
              className="group absolute -bottom-6 left-4 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-xl border border-ink/5 bg-white px-4 py-3 shadow-card-lg transition hover:border-teal/30 focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none sm:left-6 sm:px-5"
            >
              <span aria-hidden="true" className="relative flex size-2.5 shrink-0">
                <span className="animate-beacon-ping absolute inline-flex h-full w-full rounded-full bg-amber" />
                <span className="relative inline-flex size-2.5 rounded-full bg-amber" />
              </span>
              {next === null ? (
                <>
                  <span className="sr-only">{SCHEDULE_COPY.nextLabel}</span>
                  <span
                    aria-hidden="true"
                    className="h-10 w-44 max-w-full animate-pulse rounded bg-sand"
                  />
                </>
              ) : (
                <span className="min-w-0">
                  <span className="block text-xs font-semibold tracking-wide text-ink/50 uppercase">
                    {SCHEDULE_COPY.nextLabel}
                  </span>
                  {soonest ? (
                    <span className="block truncate text-base font-semibold text-ink">
                      <span className="font-digits">{soonest.time}</span>
                      {" · "}
                      {soonest.name} → {soonest.to}
                    </span>
                  ) : (
                    <span className="block truncate text-base font-semibold text-ink">
                      {SCHEDULE_COPY.firstTomorrow}{" "}
                      <span className="font-digits">{firstTomorrow}</span>
                    </span>
                  )}
                </span>
              )}
              <ArrowRight
                aria-hidden="true"
                className="ml-1 size-4 shrink-0 text-teal transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
