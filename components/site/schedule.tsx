"use client";

/**
 * Sefer Saatleri: sitenin ana bölümü, koyu lacivert pano.
 * Üç kalkış noktası aynı anda görünür (sekme yok). Saatlerin tek
 * kaynağı lib/data.ts; canlı "sıradaki sefer" durumu mount sonrası
 * hesaplanır, ilk render'da tüm satırlar nötrdür (hydration güvenli).
 */

import { ArrowRight, Info } from "lucide-react";

import { CONTACT, SCHEDULE } from "@/lib/data";
import { SCHEDULE_COPY } from "@/lib/copy";
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
      className="relative overflow-hidden bg-navy py-16 sm:py-24"
    >
      {/* Zemin dokusu */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-glow/[0.05] blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          align="left"
          tone="dark"
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
                <article className="flex h-full flex-col rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 transition-colors hover:ring-white/20 sm:p-7">
                  <h3 className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-heading text-xl font-bold tracking-tight text-white sm:text-2xl">
                    <span>{point.name}</span>
                    <ArrowRight
                      aria-hidden
                      className="size-6 shrink-0 text-glow"
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
                          className="flex items-center justify-between gap-3 border-b border-white/[0.06] py-2.5 last:border-0"
                        >
                          <time
                            dateTime={time}
                            className={cn(
                              "font-digits text-2xl leading-relaxed tracking-tight sm:text-3xl",
                              state === "past" && "text-white/50",
                              (state === "neutral" || state === "future") &&
                                "font-medium text-white",
                              isNext && "font-bold text-glow"
                            )}
                          >
                            {time}
                          </time>

                          {isNext && departure?.minutesLeft != null ? (
                            <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-glow">
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
                    <p className="mt-4 text-sm text-mist">
                      {SCHEDULE_COPY.doneToday}
                    </p>
                  ) : null}
                </article>
              </FadeIn>
            );
          })}
        </div>

        {/* Notlar + tek küçük arama bağlantısı */}
        <FadeIn delay={0.1} className="mt-12">
          <ul className="max-w-3xl space-y-3">
            {SCHEDULE_COPY.notes.map((note) => (
              <li
                key={note}
                className="flex items-start gap-3 text-base leading-relaxed text-mist"
              >
                <Info aria-hidden className="mt-1 size-5 shrink-0 text-glow" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base text-mist">
            {SCHEDULE_COPY.callNote}{" "}
            <a
              href={CONTACT.phoneHref}
              className="font-digits font-semibold whitespace-nowrap text-glow underline decoration-glow/30 decoration-2 underline-offset-4 transition hover:decoration-glow focus-visible:ring-2 focus-visible:ring-glow focus-visible:outline-none rounded"
            >
              {CONTACT.phoneDisplay}
            </a>
          </p>
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
