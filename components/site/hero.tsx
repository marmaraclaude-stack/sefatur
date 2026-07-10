"use client";

/**
 * Hero: sade açılış bölümü.
 * Solda başlık, iki net düğme ve canlı "sıradaki sefer" şeridi;
 * sağda araç fotoğrafı. Giriş animasyonu CSS ile yapılır
 * (animate-fade-up), böylece içerik SSR HTML'inde görünür kalır.
 */
import Image from "next/image";
import { Clock, Phone } from "lucide-react";
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

  return (
    <section id="hero" className="bg-marble pt-28 pb-16 md:pt-36 sm:pb-24">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Sol sütun: başlık, düğmeler, canlı sefer şeridi */}
          <div>
            <h1
              className="animate-fade-up text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "0s" }}
            >
              {headBefore}
              <span className="text-teal">{HERO.highlight}</span>
              {headAfter}
            </h1>

            <p
              className="animate-fade-up mt-5 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl"
              style={{ animationDelay: "0.06s" }}
            >
              {HERO.subheadline}
            </p>

            <div
              className="animate-fade-up mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "0.12s" }}
            >
              <a
                href={CONTACT.phoneHref}
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-amber px-6 text-base font-semibold text-ink shadow-sm ring-1 ring-black/10 hover:brightness-95 focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Phone aria-hidden="true" className="size-5 shrink-0" />
                <span className="whitespace-nowrap">{HERO.ctaSecondary}</span>
                <span className="hidden font-digits whitespace-nowrap min-[440px]:inline">
                  {CONTACT.phoneDisplay}
                </span>
              </a>
              <a
                href="#seferler"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-ink/15 bg-white px-6 text-base font-semibold text-ink hover:border-ink/30 focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Clock aria-hidden="true" className="size-5 shrink-0" />
                {HERO.ctaPrimary}
              </a>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "0.18s" }}>
              <p className="mt-6 text-base text-ink/70">
                {HERO.facts.join(" · ")}
              </p>

              {/* Canlı sıradaki sefer şeridi (tamamı #seferler'e gider) */}
              <a
                href="#seferler"
                className="mt-4 inline-flex max-w-full items-center gap-3 rounded-xl border border-ink/10 bg-white px-4 py-3 shadow-sm hover:border-ink/30 focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span aria-hidden="true" className="relative flex size-2.5 shrink-0">
                  <span className="animate-beacon-ping absolute inline-flex h-full w-full rounded-full bg-amber" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-amber" />
                </span>
                {next === null ? (
                  /* İskelet: sabit yükseklik, yerleşim kayması yok.
                     sr-only metin, hidrasyon öncesinde de erişilebilir ad sağlar. */
                  <>
                    <span className="sr-only">{SCHEDULE_COPY.nextLabel}</span>
                    <span
                      aria-hidden="true"
                      className="h-6 w-64 max-w-full animate-pulse rounded bg-sand"
                    />
                  </>
                ) : soonest ? (
                  <span className="text-base leading-6 text-ink">
                    <span className="text-ink/70">{SCHEDULE_COPY.nextLabel}: </span>
                    <span className="font-digits font-semibold">{soonest.time}</span>
                    {" · "}
                    {soonest.name} → {soonest.to}
                  </span>
                ) : (
                  <span className="text-base leading-6 text-ink">
                    <span className="text-ink/70">{SCHEDULE_COPY.doneToday}, </span>
                    {SCHEDULE_COPY.firstTomorrow}{" "}
                    <span className="font-digits font-semibold">
                      {/* Yarınki ilk sefer veriden türetilir (lib/data.ts) */}
                      {next.departures.reduce((a, b) =>
                        timeToMinutes(a.time) <= timeToMinutes(b.time) ? a : b
                      ).time}
                    </span>
                  </span>
                )}
              </a>
            </div>
          </div>

          {/* Sağ sütun: araç fotoğrafı (mobilde metnin altında) */}
          <div
            className="animate-fade-up relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10"
            style={{ animationDelay: "0.1s" }}
          >
            <Image
              src={IMAGES.heroVehicle.src}
              alt={IMAGES.heroVehicle.alt}
              fill
              preload
              sizes="(min-width:1024px) 640px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
