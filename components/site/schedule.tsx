"use client";

/**
 * Sefer Saatleri: sitenin ana bölümü, koyu orman yeşili pano.
 * Üç kalkış noktası aynı anda görünür (sekme yok). Saatlerin tek
 * kaynağı lib/data.ts; canlı "sıradaki sefer" durumu mount sonrası
 * hesaplanır, ilk render'da tüm satırlar nötrdür (hydration güvenli).
 */

import { ArrowRight, Info, MessageCircle, Phone } from "lucide-react";

import { CONTACT, SCHEDULE } from "@/lib/data";
import { CONTACT_COPY, SCHEDULE_COPY } from "@/lib/copy";
import {
  formatMinutes,
  timeToMinutes,
  useNextDepartures,
} from "@/lib/use-next-departure";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";

type RowState = "neutral" | "past" | "next" | "future";

export function Schedule() {
  const live = useNextDepartures();
  const nowMin = live?.nowMin ?? null;

  return (
    <section
      id="seferler"
      aria-label={SCHEDULE_COPY.title}
      className="relative overflow-hidden bg-linear-to-b from-navy to-deep py-10 sm:py-14"
    >
      {/* Zemin dokusu */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-skylight/[0.07] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,rgb(207_238_252/0.05)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(36rem_at_18%_88%,black,transparent)]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          align="left"
          tone="dark"
          title={SCHEDULE_COPY.title}
          subtitle={SCHEDULE_COPY.subtitle}
        />

        {/* Üç kalkış noktası, tek bakışta */}
        <div className="mt-8 grid gap-5 md:grid-cols-3 sm:mt-10">
          {SCHEDULE.map((point, index) => {
            const departure = live?.departures.find(
              (d) => d.point.id === point.id
            );
            const doneToday = departure !== undefined && !departure.isToday;

            const rowState = (time: string): RowState => {
              if (nowMin === null) return "neutral";
              if (departure?.isToday && departure.time === time) return "next";
              if (timeToMinutes(time) < nowMin) return "past";
              return "future";
            };

            return (
              <FadeIn key={point.id} delay={index * 0.08}>
                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-colors hover:border-skylight/30 sm:p-7">
                  <h3 className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
                    <span>{point.name}</span>
                    <ArrowRight
                      aria-hidden
                      className="size-6 shrink-0 text-skylight"
                    />
                    <span>{point.to}</span>
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-mist">
                    {point.note}
                  </p>

                  <ul className="mt-5">
                    {point.times.map((time) => {
                      const state = rowState(time);
                      const isNext = state === "next";
                      return (
                        <li
                          key={time}
                          className="flex items-center justify-between gap-3 border-b border-white/[0.07] py-2.5 last:border-0"
                        >
                          <time
                            dateTime={time}
                            className={cn(
                              "text-2xl leading-relaxed tracking-tight sm:text-3xl",
                              state === "past" && "text-white/50",
                              (state === "neutral" || state === "future") &&
                                "font-medium text-white",
                              isNext && "font-bold text-skylight"
                            )}
                          >
                            {time}
                          </time>

                          {isNext && departure?.minutesLeft != null ? (
                            <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-skylight">
                              <span
                                aria-hidden
                                className="relative flex size-2.5"
                              >
                                <span className="absolute inset-0 rounded-full bg-sky animate-beacon-ping motion-reduce:animate-none" />
                                <span className="relative size-2.5 rounded-full bg-sky" />
                              </span>
                              sıradaki · {formatMinutes(departure.minutesLeft)}
                            </span>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>

                  {doneToday ? (
                    <p className="mt-4 text-sm text-mist">
                      {SCHEDULE_COPY.doneToday}
                    </p>
                  ) : null}
                </article>
              </FadeIn>
            );
          })}
        </div>

        {/* Notlar: tam genişlikte üç sütun */}
        <FadeIn delay={0.1} className="mt-10">
          <ul className="grid gap-4 lg:grid-cols-3">
            {SCHEDULE_COPY.notes.map((note) => (
              <li
                key={note}
                className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-4"
              >
                <span
                  aria-hidden
                  className="mt-0.5 shrink-0 rounded-lg bg-white/[0.06] p-1.5"
                >
                  <Info className="size-5 text-skylight" />
                </span>
                <p className="pt-1 text-[15px] leading-snug text-mist">
                  {note}
                </p>
              </li>
            ))}
          </ul>
        </FadeIn>

        {/* Arama bandı: güncel saat için telefon ve WhatsApp */}
        <FadeIn delay={0.16} className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur">
            <div className="flex min-w-0 items-center gap-3.5">
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-lg bg-skylight/15 text-skylight"
              >
                <Phone className="size-5" />
              </span>
              <p className="text-base text-mist">{SCHEDULE_COPY.callNote}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={CONTACT.phoneHref}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-sky to-skylight px-6 text-base font-bold text-ink shadow-card transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skylight focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
              >
                <Phone aria-hidden className="size-5" />
                <span className="whitespace-nowrap">
                  {CONTACT.phoneDisplay}
                </span>
              </a>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-5 text-base font-semibold text-white transition hover:border-skylight/40 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skylight focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
              >
                <MessageCircle aria-hidden className="size-5" />
                <span className="whitespace-nowrap">
                  {CONTACT_COPY.whatsappCta}
                </span>
              </a>
            </div>
          </div>
        </FadeIn>

        {/* SEO / ekran okuyucu ikizi: tüm noktaların tam tarifesi.
            Not: sr-only tabloya değil sarmalayıcıya verilir; tablolar
            width:1px kuralını uygulamaz ve mobilde yatay taşma yaratır. */}
        <div className="sr-only">
          <table>
            <caption>{SCHEDULE_COPY.title}</caption>
            <thead>
              <tr>
                <th scope="col">Kalkış Noktası</th>
                <th scope="col">Yön</th>
                <th scope="col">Kalkış Saatleri</th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((point) => (
                <tr key={point.id}>
                  <th scope="row">{point.name}</th>
                  <td>{point.to}</td>
                  <td>{point.times.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
