"use client";

/**
 * Sefer Saatleri: sitenin ana bölümü, koyu orman yeşili pano.
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
      className="relative overflow-hidden bg-linear-to-b from-navy to-deep py-14 sm:py-20"
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

        {/* Notlar: tam genişlikte üç sütun + tek küçük arama bağlantısı */}
        <FadeIn delay={0.1} className="mt-10">
          <ul className="grid gap-4 lg:grid-cols-3">
            {SCHEDULE_COPY.notes.map((note) => (
              <li
                key={note}
                className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 text-[15px] leading-relaxed text-mist"
              >
                <Info
                  aria-hidden
                  className="mt-0.5 size-5 shrink-0 text-skylight"
                />
                <span>{note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-base text-mist">
            {SCHEDULE_COPY.callNote}{" "}
            <a
              href={CONTACT.phoneHref}
              className="font-semibold whitespace-nowrap text-skylight underline decoration-skylight/30 decoration-2 underline-offset-4 transition hover:decoration-skylight focus-visible:ring-2 focus-visible:ring-skylight focus-visible:outline-none rounded"
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
