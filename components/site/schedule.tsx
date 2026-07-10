"use client";

/**
 * Sefer Saatleri: sade ve okunaklı tarife bölümü.
 * Üç kalkış noktası aynı anda görünür (sekme yok). Saatlerin tek
 * kaynağı lib/data.ts; canlı "sıradaki sefer" durumu mount sonrası
 * hesaplanır, ilk render'da tüm satırlar nötrdür (hydration güvenli).
 */

import { ArrowRight, Info, Phone } from "lucide-react";

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
      className="bg-sand py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          align="left"
          title={SCHEDULE_COPY.title}
          subtitle={SCHEDULE_COPY.subtitle}
        />

        {/* Üç kalkış noktası, tek bakışta */}
        <div className="mt-10 grid gap-5 md:grid-cols-3 sm:mt-12">
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
                <article className="flex h-full flex-col rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
                  <h3 className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    <span>{point.name}</span>
                    <ArrowRight
                      aria-hidden
                      className="size-6 shrink-0 text-teal"
                    />
                    <span>{point.to}</span>
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-ink/70">
                    {point.note}
                  </p>

                  <ul className="mt-5">
                    {point.times.map((time) => {
                      const state = rowState(time);
                      const isNext = state === "next";
                      return (
                        <li
                          key={time}
                          className="flex items-center justify-between gap-3 border-b border-ink/5 py-2.5 last:border-0"
                        >
                          <time
                            dateTime={time}
                            className={cn(
                              "font-digits text-2xl leading-relaxed sm:text-3xl",
                              state === "past" &&
                                "text-ink/65 line-through decoration-ink/30",
                              (state === "neutral" || state === "future") &&
                                "text-ink",
                              isNext && "font-semibold text-teal"
                            )}
                          >
                            {time}
                          </time>

                          {isNext && departure?.minutesLeft != null ? (
                            <span className="flex shrink-0 items-center gap-2 text-sm text-teal">
                              <span
                                aria-hidden
                                className="relative flex size-2.5"
                              >
                                <span className="absolute inset-0 rounded-full bg-amber animate-beacon-ping motion-reduce:animate-none" />
                                <span className="relative size-2.5 rounded-full bg-amber" />
                              </span>
                              sıradaki · {formatMinutes(departure.minutesLeft)}
                            </span>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>

                  {doneToday ? (
                    <p className="mt-4 text-sm text-ink/70">
                      {SCHEDULE_COPY.doneToday}
                    </p>
                  ) : null}
                </article>
              </FadeIn>
            );
          })}
        </div>

        {/* Notlar */}
        <FadeIn delay={0.1} className="mt-12">
          <ul className="max-w-3xl space-y-3">
            {SCHEDULE_COPY.notes.map((note) => (
              <li
                key={note}
                className="flex items-start gap-3 text-base leading-relaxed text-ink/70"
              >
                <Info aria-hidden className="mt-1 size-5 shrink-0 text-teal" />
                <span>{note}</span>
              </li>
            ))}
          </ul>

          {/* Arama satırı */}
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <p className="text-lg text-ink/70">{SCHEDULE_COPY.callNote}</p>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-amber px-6 text-base font-semibold text-ink shadow-sm ring-1 ring-black/10 outline-none hover:brightness-95 focus-visible:ring-2 focus-visible:ring-teal"
            >
              <Phone aria-hidden className="size-5 shrink-0" />
              <span>{CONTACT_COPY.callCta}</span>
              <span className="font-digits">{CONTACT.phoneDisplay}</span>
            </a>
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
