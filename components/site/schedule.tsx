"use client";

/**
 * Sefer Saatleri: sitenin ana bölümü, koyu orman yeşili pano.
 * Üç kalkış noktası aynı anda görünür (sekme yok). Her kartın üstünde
 * büyük rakamlı "sıradaki sefer" paneli, altında günün tüm seferleri
 * saat + varış noktasıyla satır satır durur. Geniş ekranlarda kartların
 * altında günün 11 kalkışını kronolojik gösteren "Günün akışı" şeridi
 * bulunur. Saatlerin tek kaynağı lib/data.ts; canlı durum mount sonrası
 * hesaplanır, ilk render'da her şey nötrdür (hydration güvenli).
 */

import { ArrowRight, Info, MessageCircle, Phone } from "lucide-react";

import {
  CONTACT,
  SCHEDULE,
  type Departure,
  type DeparturePoint,
} from "@/lib/data";
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

/** Kalkış noktasına göre akış şeridindeki nokta rengi */
const FLOW_DOT: Record<string, string> = {
  topagac: "bg-skylight",
  marmara: "bg-white",
  saraylar: "bg-sage",
};

function Beacon() {
  return (
    <span aria-hidden className="relative flex size-2.5">
      <span className="absolute inset-0 rounded-full bg-sky animate-beacon-ping motion-reduce:animate-none" />
      <span className="relative size-2.5 rounded-full bg-sky" />
    </span>
  );
}

type DestinationGroup = {
  to: string;
  via?: string;
  departures: Departure[];
};

/** Bir kalkış noktasının seferlerini varış noktasına göre gruplar. */
function groupByDestination(point: DeparturePoint): DestinationGroup[] {
  const groups: DestinationGroup[] = [];
  for (const departure of point.departures) {
    const group = groups.find((g) => g.to === departure.to);
    if (group) {
      group.departures.push(departure);
      group.via ??= departure.via;
    } else {
      groups.push({ to: departure.to, via: departure.via, departures: [departure] });
    }
  }
  return groups;
}

/**
 * Günün akışı: tüm kalkışlar tek çizgi üzerinde, saate orantılı
 * konumda. Etiketler çakışmayı önlemek için sırayla çizginin üstüne
 * ve altına yerleşir. Canlıyken geçmiş kalkışlar söner ve "Şimdi"
 * rozeti çizgi üzerinde ilerler. Yalnızca geniş ekranlarda görünür.
 */
function DayFlow({ nowMin }: { nowMin: number | null }) {
  const departures = SCHEDULE.flatMap((point) =>
    point.departures.map((departure) => ({
      time: departure.time,
      min: timeToMinutes(departure.time),
      name: point.name,
      id: point.id,
    }))
  ).sort((a, b) => a.min - b.min);

  const start = departures[0].min - 40;
  const end = departures[departures.length - 1].min + 40;
  const pos = (min: number) => ((min - start) / (end - start)) * 100;
  const showNow = nowMin !== null && nowMin >= start && nowMin <= end;

  return (
    <div className="mt-6 hidden rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-6 lg:block">
      <div className="flex items-center justify-between gap-6">
        <h3 className="text-base font-bold tracking-tight text-white">
          {SCHEDULE_COPY.dayFlowTitle}
        </h3>
        <ul className="flex items-center gap-5">
          {SCHEDULE.map((point) => (
            <li
              key={point.id}
              className="flex items-center gap-2 text-sm text-mist"
            >
              <span
                aria-hidden
                className={cn("size-2.5 rounded-full", FLOW_DOT[point.id])}
              />
              {point.name} kalkışlı
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden className="relative mt-4 h-28">
        {/* Çizgi */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        {departures.map((departure, index) => {
          const above = index % 2 === 0;
          const isPast = nowMin !== null && departure.min < nowMin;
          return (
            <div
              key={`${departure.id}-${departure.time}`}
              className={cn(
                "absolute top-1/2 -translate-x-1/2 transition-opacity duration-500",
                isPast && "opacity-35"
              )}
              style={{ left: `${pos(departure.min)}%` }}
            >
              <span
                className={cn(
                  "absolute top-0 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
                  FLOW_DOT[departure.id]
                )}
              />
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap",
                  above ? "bottom-3.5" : "top-3.5"
                )}
              >
                <span className="block text-base font-bold text-white tabular-nums">
                  {departure.time}
                </span>
                <span className="block text-xs text-mist">{departure.name}</span>
              </div>
            </div>
          );
        })}

        {/* Şimdi rozeti */}
        {showNow ? (
          <span
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-sky to-skylight px-2 py-0.5 text-[11px] font-bold text-ink shadow-card"
            style={{ left: `${pos(nowMin)}%` }}
          >
            {SCHEDULE_COPY.nowLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}

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
            const live_ = live?.departures.find(
              (d) => d.point.id === point.id
            );
            const isLiveNext = live_?.isToday === true;
            const doneToday = live_ !== undefined && !live_.isToday;
            const heroDeparture = isLiveNext
              ? point.departures.find((d) => d.time === live_.time)!
              : point.departures[0];
            const heroLabel =
              live === null
                ? SCHEDULE_COPY.firstLabel
                : isLiveNext
                  ? SCHEDULE_COPY.nextLabel
                  : SCHEDULE_COPY.firstTomorrow;

            const rowState = (time: string): RowState => {
              if (nowMin === null) return "neutral";
              if (isLiveNext && live_.time === time) return "next";
              if (timeToMinutes(time) < nowMin) return "past";
              return "future";
            };

            return (
              <FadeIn key={point.id} delay={index * 0.08}>
                <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-colors hover:border-skylight/30 sm:p-7">
                  <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {point.name}{" "}
                    <span className="font-normal text-mist">kalkışlı</span>
                  </h3>

                  {/* Sıradaki sefer paneli: kartın kahraman satırı */}
                  <div
                    className={cn(
                      "mt-4 rounded-xl border p-4 transition-colors",
                      isLiveNext
                        ? "border-skylight/40 bg-skylight/10"
                        : "border-white/10 bg-white/[0.04]"
                    )}
                  >
                    <p
                      className={cn(
                        "flex items-center gap-2 text-[13px] font-semibold tracking-[0.08em] uppercase",
                        isLiveNext ? "text-skylight" : "text-mist"
                      )}
                    >
                      {isLiveNext ? <Beacon /> : null}
                      {heroLabel}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                      <time
                        dateTime={heroDeparture.time}
                        className="text-4xl font-extrabold tracking-tight text-white tabular-nums"
                      >
                        {heroDeparture.time}
                      </time>
                      <ArrowRight
                        aria-hidden
                        className="size-5 shrink-0 text-skylight"
                      />
                      <span className="text-xl font-bold text-white">
                        {heroDeparture.to}
                      </span>
                    </div>
                    {heroDeparture.via ||
                    (isLiveNext && live_.minutesLeft != null) ? (
                      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                        <span className="text-sm text-mist">
                          {heroDeparture.via ?? ""}
                        </span>
                        {isLiveNext && live_.minutesLeft != null ? (
                          <span className="text-base font-semibold text-skylight">
                            {formatMinutes(live_.minutesLeft)} sonra
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                    {doneToday ? (
                      <p className="mt-1 text-sm text-mist">
                        {SCHEDULE_COPY.doneToday}
                      </p>
                    ) : null}
                  </div>

                  {/* Günün seferleri: varış noktasına göre gruplu saat çipleri */}
                  <div className="mt-5 flex flex-1 flex-col gap-5">
                    {groupByDestination(point).map((group) => (
                      <div key={group.to}>
                        <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                          <span className="flex items-center gap-1.5 text-base font-bold text-white">
                            <ArrowRight
                              aria-hidden
                              className="size-4 shrink-0 text-skylight"
                            />
                            {group.to}
                          </span>
                          {group.via ? (
                            <span className="text-sm text-mist">
                              {group.via}
                            </span>
                          ) : null}
                        </p>
                        <ul className="mt-2 grid grid-cols-3 gap-2">
                          {group.departures.map((departure) => {
                            const state = rowState(departure.time);
                            return (
                              <li key={departure.time}>
                                <time
                                  dateTime={departure.time}
                                  className={cn(
                                    "flex min-h-11 items-center justify-center rounded-lg border text-lg tabular-nums transition-colors",
                                    state === "next"
                                      ? "border-skylight/60 bg-skylight/15 font-bold text-skylight"
                                      : state === "past"
                                        ? "border-transparent bg-white/[0.03] font-medium text-white/40"
                                        : "border-white/10 bg-white/[0.04] font-medium text-white"
                                  )}
                                >
                                  {departure.time}
                                </time>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        {/* Günün akışı: kronolojik şerit (yalnızca geniş ekran) */}
        <FadeIn delay={0.08}>
          <DayFlow nowMin={nowMin} />
        </FadeIn>

        {/* Notlar: tam genişlikte üç sütun */}
        <FadeIn delay={0.1} className="mt-6">
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
                className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-linear-to-r from-sky to-skylight px-6 text-base font-bold text-ink shadow-card transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skylight focus-visible:ring-offset-2 focus-visible:ring-offset-deep sm:w-auto"
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
                className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-5 text-base font-semibold text-white transition hover:border-skylight/40 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skylight focus-visible:ring-offset-2 focus-visible:ring-offset-deep sm:w-auto"
              >
                <MessageCircle aria-hidden className="size-5" />
                <span className="whitespace-nowrap">
                  {CONTACT_COPY.whatsappCta}
                </span>
              </a>
            </div>
          </div>
        </FadeIn>

        {/* SEO / ekran okuyucu ikizi: tüm seferlerin tam listesi.
            Not: sr-only tabloya değil sarmalayıcıya verilir; tablolar
            width:1px kuralını uygulamaz ve mobilde yatay taşma yaratır. */}
        <div className="sr-only">
          <table>
            <caption>{SCHEDULE_COPY.title}</caption>
            <thead>
              <tr>
                <th scope="col">Kalkış Noktası</th>
                <th scope="col">Kalkış Saati</th>
                <th scope="col">Varış</th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.flatMap((point) =>
                point.departures.map((departure) => (
                  <tr key={`${point.id}-${departure.time}`}>
                    <th scope="row">{point.name}</th>
                    <td>{departure.time}</td>
                    <td>
                      {departure.to}
                      {departure.via ? ` (${departure.via})` : ""}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
