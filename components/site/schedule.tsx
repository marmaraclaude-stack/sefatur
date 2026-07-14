"use client";

/**
 * Sefer Saatleri: sitenin ana bölümü, koyu orman yeşili pano.
 * En üstte "yolculuk seçici" durur: Nereden / Nereye düğmeleriyle
 * seçilen yolculuğa uyan seferler büyük, okunaklı satırlar halinde
 * listelenir (ara durak Asmalı dahil, güzergâh kapsama mantığıyla).
 * Altında üç kalkış noktası aynı anda görünür (sekme yok). Her kartın
 * üstünde büyük rakamlı "sıradaki sefer" paneli, altında günün tüm
 * seferleri saat + varış noktasıyla durur. Geniş ekranlarda kartların
 * altında "Günün seferleri" panosu bulunur: her kalkış noktasına bir
 * satır, ortak orantılı saat ekseni. Saatlerin tek kaynağı lib/data.ts;
 * canlı durum mount sonrası hesaplanır, ilk render'da her şey nötrdür
 * (hydration güvenli).
 */

import { useState, type ReactNode } from "react";
import { ArrowRight, Info, MessageCircle, Phone } from "lucide-react";

import {
  CONTACT,
  SCHEDULE,
  STOPS,
  type Departure,
  type DeparturePoint,
} from "@/lib/data";
import { CONTACT_COPY, SCHEDULE_COPY } from "@/lib/copy";
import {
  formatMinutes,
  nextTimeFor,
  timeToMinutes,
  useNextDepartures,
} from "@/lib/use-next-departure";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";

type RowState = "neutral" | "past" | "next" | "future";

/* ————————————————————————————————
   Güzergâh kapsama mantığı
   Hat sırası batıdan doğuya: Marmara → Topağaç → Asmalı → Saraylar.
   Bir sefer, kalkış ile varış arasındaki tüm ara durakları ve varışı
   kapsar. Böylece ör. Saraylar → Marmara seferi Topağaç'a da uğrar.
   ———————————————————————————————— */

const ORDER = ["marmara", "topagac", "asmali", "saraylar"] as const;
type StopId = (typeof ORDER)[number];

const STOP_NAME = new Map(STOPS.map((stop) => [stop.id, stop.name]));
const NAME_TO_ID = new Map<string, StopId>();
for (const stop of STOPS) {
  if ((ORDER as readonly string[]).includes(stop.id)) {
    NAME_TO_ID.set(stop.name, stop.id as StopId);
  }
}

function stopName(id: StopId): string {
  return STOP_NAME.get(id) ?? id;
}

/** Kalkıştan varışa giden aracın uğradığı duraklar (varış dahil, kalkış hariç). */
function coveredStops(originId: StopId, destId: StopId): StopId[] {
  const oi = ORDER.indexOf(originId);
  const di = ORDER.indexOf(destId);
  if (oi === -1 || di === -1 || oi === di) return [];
  const step = di > oi ? 1 : -1;
  const covered: StopId[] = [];
  for (let i = oi + step; step > 0 ? i <= di : i >= di; i += step) {
    covered.push(ORDER[i]);
  }
  return covered;
}

/** Verilen seferin (originId kalkışlı) uğradığı duraklar. */
function departureCovers(originId: StopId, departure: Departure): StopId[] {
  const destId = NAME_TO_ID.get(departure.to);
  if (destId === undefined) return [];
  return coveredStops(originId, destId);
}

/** from → to yolculuğuna uyan seferler (kalkış saatine göre sıralı). */
function journeyDepartures(fromId: StopId, toId: StopId): Departure[] {
  const point = SCHEDULE.find((p) => p.id === fromId);
  if (!point) return [];
  return point.departures.filter((departure) =>
    departureCovers(fromId, departure).includes(toId)
  );
}

/** Seçilen kalkıştan bugünkü tarifeyle gerçekten ulaşılabilen duraklar. */
function reachableFrom(fromId: StopId): StopId[] {
  const point = SCHEDULE.find((p) => p.id === fromId);
  if (!point) return [];
  const reachable = new Set<StopId>();
  for (const departure of point.departures) {
    for (const stop of departureCovers(fromId, departure)) {
      reachable.add(stop);
    }
  }
  return ORDER.filter((id) => reachable.has(id) && id !== fromId);
}

/** Kalkış olabilen duraklar: tarifede saati listelenen noktalar, hat sırasıyla. */
const ORIGINS = ORDER.filter((id) =>
  SCHEDULE.some((point) => point.id === id)
);

/** Kalkış noktasına göre "Günün seferleri" panosundaki nokta rengi */
const LANE_DOT: Record<string, string> = {
  topagac: "bg-skylight",
  marmara: "bg-white",
  asmali: "bg-sky",
  saraylar: "bg-sage",
};

/** Pano satır yüksekliği: üstte saat, ortada nokta, altta varış yönü */
const LANE_HEIGHT = "h-[4.75rem]";

function Beacon() {
  return (
    <span aria-hidden className="relative flex size-2.5">
      <span className="absolute inset-0 rounded-full bg-sky animate-beacon-ping motion-reduce:animate-none" />
      <span className="relative size-2.5 rounded-full bg-sky" />
    </span>
  );
}

/** Yolculuk seçicideki hap biçimli büyük düğme. */
function ToggleButton({
  selected,
  disabled = false,
  onClick,
  children,
}: {
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full border px-1 text-[15px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skylight focus-visible:ring-offset-2 focus-visible:ring-offset-deep sm:w-auto sm:px-6 sm:text-base",
        selected
          ? "border-transparent bg-linear-to-r from-sky to-skylight font-bold text-ink shadow-card"
          : "border-white/15 bg-white/[0.06] font-semibold text-white hover:border-skylight/40 hover:bg-white/[0.1]",
        disabled &&
          "cursor-not-allowed opacity-35 hover:border-white/15 hover:bg-white/[0.06]"
      )}
    >
      {children}
    </button>
  );
}

/**
 * Yolculuk seçici: "Buradan oraya kaçta araç var?" sorusunu tek bakışta
 * yanıtlar. Nereden / Nereye seçilir, uyan seferler büyük satırlarla
 * listelenir. Canlıyken geçen seferler söner, sıradaki vurgulanır.
 */
function JourneyPicker({ nowMin }: { nowMin: number | null }) {
  const [from, setFrom] = useState<StopId>("marmara");
  const [to, setTo] = useState<StopId>("topagac");

  const targets = reachableFrom(from);
  const matches = journeyDepartures(from, to);
  const toName = stopName(to);

  const nextTime =
    nowMin === null
      ? null
      : (matches.find((d) => timeToMinutes(d.time) >= nowMin)?.time ?? null);
  const doneToday = nowMin !== null && nextTime === null && matches.length > 0;

  const selectFrom = (id: StopId) => {
    if (id === from) return;
    const nextTargets = reachableFrom(id);
    setFrom(id);
    if (id === to || !nextTargets.includes(to)) {
      // Varış geçersiz kaldıysa: yön değiştirme hissi için eski kalkışı
      // varış yap, o da olmuyorsa ilk ulaşılabilir durağı seç.
      setTo(nextTargets.includes(from) ? from : nextTargets[0]);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm sm:p-7">
      <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
        {SCHEDULE_COPY.pickerTitle}
      </h3>
      <p className="mt-1.5 text-base leading-relaxed text-mist">
        {SCHEDULE_COPY.pickerHint}
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div role="group" aria-label={SCHEDULE_COPY.pickerFromLabel}>
          <p aria-hidden className="text-base font-bold text-white">
            {SCHEDULE_COPY.pickerFromLabel}
          </p>
          <div className="mt-2.5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
            {ORIGINS.map((id) => (
              <ToggleButton
                key={id}
                selected={id === from}
                onClick={() => selectFrom(id)}
              >
                {stopName(id)}
              </ToggleButton>
            ))}
          </div>
        </div>

        <div role="group" aria-label={SCHEDULE_COPY.pickerToLabel}>
          <p aria-hidden className="text-base font-bold text-white">
            {SCHEDULE_COPY.pickerToLabel}
          </p>
          {/* Kalkışla aynı dört durak görünür, seçili kalkış ve o kalkıştan
              ulaşılamayan duraklar devre dışı kalır */}
          <div className="mt-2.5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
            {ORDER.map((id) => (
              <ToggleButton
                key={id}
                selected={id === to}
                disabled={id === from || !targets.includes(id)}
                onClick={() => setTo(id)}
              >
                {stopName(id)}
              </ToggleButton>
            ))}
          </div>
        </div>
      </div>

      {/* Seçilen yolculuğun özeti + sefer sayısı */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-white/10 pt-5">
        <p className="flex items-center gap-2 text-lg font-bold text-white">
          {stopName(from)}
          <ArrowRight aria-hidden className="size-5 shrink-0 text-skylight" />
          {toName}
        </p>
        <p className="text-base text-mist">
          {matches.length} {SCHEDULE_COPY.pickerCountSuffix}
        </p>
      </div>

      {doneToday ? (
        <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 sm:px-5">
          <p className="text-lg font-bold text-white">
            {SCHEDULE_COPY.doneToday}
          </p>
          <p className="mt-0.5 text-base font-semibold text-skylight">
            {SCHEDULE_COPY.firstTomorrow}{" "}
            <time dateTime={matches[0].time} className="font-bold tabular-nums">
              {matches[0].time}
            </time>
          </p>
        </div>
      ) : null}

      <ul className="mt-3 grid gap-2.5">
        {matches.map((departure) => {
          const state: RowState =
            nowMin === null
              ? "neutral"
              : departure.time === nextTime
                ? "next"
                : timeToMinutes(departure.time) < nowMin
                  ? "past"
                  : "future";
          const isNext = state === "next";
          const isPast = state === "past";
          // Aracın tabelası seçilen varıştan farklıysa bunu küçük notla
          // belirt (ör. "Saraylar seferi"), aynıysa varsa ara durak notunu göster.
          const note =
            departure.to !== toName
              ? departure.via
                ? `${departure.to} ${SCHEDULE_COPY.pickerServiceSuffix}, ${departure.via}`
                : `${departure.to} ${SCHEDULE_COPY.pickerServiceSuffix}`
              : departure.via;
          return (
            <li key={departure.time}>
              <div
                className={cn(
                  "rounded-xl border px-4 py-3 transition-colors sm:px-5",
                  isNext
                    ? "border-skylight/50 bg-skylight/10"
                    : isPast
                      ? "border-transparent bg-white/[0.03]"
                      : "border-white/10 bg-white/[0.04]"
                )}
              >
                <div className="flex items-start justify-between gap-3 sm:items-center">
                  <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-0.5">
                    <time
                      dateTime={departure.time}
                      className={cn(
                        "text-3xl font-extrabold tracking-tight tabular-nums",
                        isPast ? "text-white/40" : "text-white"
                      )}
                    >
                      {departure.time}
                    </time>
                    <ArrowRight
                      aria-hidden
                      className={cn(
                        "size-5 shrink-0",
                        isPast ? "text-white/30" : "text-skylight"
                      )}
                    />
                    <p
                      className={cn(
                        "text-lg font-bold",
                        isPast ? "text-white/40" : "text-white"
                      )}
                    >
                      {toName}
                    </p>
                  </div>
                  {isNext && nowMin !== null ? (
                    <p className="flex shrink-0 items-center gap-2 pt-2 text-sm font-semibold text-skylight sm:pt-0 sm:text-base">
                      <Beacon />
                      <span className="sr-only">
                        {SCHEDULE_COPY.nextLabel},{" "}
                      </span>
                      {formatMinutes(timeToMinutes(departure.time) - nowMin)}
                      <span className="hidden sm:inline">
                        {SCHEDULE_COPY.inMinutesSuffix}
                      </span>
                    </p>
                  ) : null}
                </div>
                {note ? (
                  <p
                    className={cn(
                      "mt-0.5 text-sm",
                      isPast ? "text-white/30" : "text-mist"
                    )}
                  >
                    {note}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
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
 * Günün seferleri panosu: her kalkış noktasına bir satır (hat sırasıyla,
 * batıdan doğuya) ve tüm satırların paylaştığı orantılı saat ekseni.
 * Her sefer kendi satırında bir noktayla işaretlenir; üstünde kalkış
 * saati, altında varış yönü yazar. Satırlar kendi adıyla etiketli olduğu
 * için ayrıca lejant gerekmez. Canlıyken geçmiş kalkışlar söner, her
 * satırın sıradaki seferi vurgulanır ve "Şimdi" çizgisi eksende ilerler.
 * Yalnızca geniş ekranlarda görünür.
 */
function DayFlow({ nowMin }: { nowMin: number | null }) {
  // Satırlar hat sırasıyla dizilir; güzergâh bölümündeki durak listesiyle aynı düzen
  const lanes = ORDER.map((id) =>
    SCHEDULE.find((point) => point.id === id)
  ).filter((point): point is DeparturePoint => point !== undefined);

  const mins = lanes.flatMap((point) =>
    point.departures.map((departure) => timeToMinutes(departure.time))
  );
  // Eksen tam saatlere oturur, uçlarda en az yarım saat nefes payı kalır
  const start = Math.floor((Math.min(...mins) - 30) / 60) * 60;
  const end = Math.ceil((Math.max(...mins) + 30) / 60) * 60;
  const pos = (min: number) => ((min - start) / (end - start)) * 100;

  const hours: number[] = [];
  for (let h = start / 60; h <= end / 60; h += 1) hours.push(h);

  const showNow = nowMin !== null && nowMin >= start && nowMin <= end;
  const nowClock =
    nowMin === null
      ? ""
      : `${String(Math.floor(nowMin / 60)).padStart(2, "0")}:${String(
          nowMin % 60
        ).padStart(2, "0")}`;

  return (
    <div className="mt-6 hidden rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-6 lg:block">
      <h3 className="text-base font-bold tracking-tight text-white">
        {SCHEDULE_COPY.dayFlowTitle}
      </h3>

      <div aria-hidden className="mt-1 flex">
        {/* Sol sütun: satır etiketleri */}
        <div className="flex w-28 shrink-0 flex-col pt-8">
          {lanes.map((point) => (
            <p
              key={point.id}
              className={cn(
                "flex items-center gap-2.5 text-[15px] font-bold text-white",
                LANE_HEIGHT
              )}
            >
              <span
                className={cn(
                  "size-2.5 shrink-0 rounded-full",
                  LANE_DOT[point.id]
                )}
              />
              {point.name}
            </p>
          ))}
        </div>

        {/* Saat ekseni alanı */}
        <div className="relative flex-1">
          {/* Saat kılavuz çizgileri */}
          {hours.map((h) => (
            <span
              key={h}
              className="absolute top-8 bottom-6 w-px bg-white/[0.07]"
              style={{ left: `${pos(h * 60)}%` }}
            />
          ))}

          {/* Satırlar */}
          <div className="pt-8">
            {lanes.map((point) => {
              const nextTime =
                nowMin === null
                  ? null
                  : (nextTimeFor(point, nowMin)?.departure.time ?? null);
              return (
                <div key={point.id} className={cn("relative", LANE_HEIGHT)}>
                  <span className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
                  {point.departures.map((departure) => {
                    const min = timeToMinutes(departure.time);
                    const isPast = nowMin !== null && min < nowMin;
                    const isNext = departure.time === nextTime;
                    return (
                      <span
                        key={departure.time}
                        className={cn(
                          "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500",
                          isPast && "opacity-35"
                        )}
                        style={{ left: `${pos(min)}%` }}
                      >
                        <span
                          className={cn(
                            "block size-3 rounded-full",
                            LANE_DOT[point.id],
                            isNext &&
                              "ring-2 ring-skylight/80 ring-offset-2 ring-offset-deep"
                          )}
                        />
                        <span
                          className={cn(
                            "absolute bottom-full left-1/2 mb-2 -translate-x-1/2 text-[15px] font-bold whitespace-nowrap tabular-nums",
                            isNext ? "text-skylight" : "text-white"
                          )}
                        >
                          {departure.time}
                        </span>
                        <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 text-[11px] whitespace-nowrap text-mist">
                          → {departure.to}
                        </span>
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Saat etiketleri (iki saatte bir) */}
          <div className="relative h-6">
            {hours
              .filter((h) => h % 2 === 0)
              .map((h) => (
                <span
                  key={h}
                  className="absolute top-1.5 -translate-x-1/2 text-xs text-mist/80 tabular-nums"
                  style={{ left: `${pos(h * 60)}%` }}
                >
                  {String(h).padStart(2, "0")}:00
                </span>
              ))}
          </div>

          {/* Şimdi çizgisi: tüm satırları keser, üstte saatli rozet */}
          {showNow ? (
            <div
              className="pointer-events-none absolute inset-y-0 z-10"
              style={{ left: `${pos(nowMin)}%` }}
            >
              <span className="absolute top-7 bottom-6 w-px -translate-x-1/2 bg-linear-to-b from-skylight via-skylight/50 to-transparent" />
              <span className="absolute top-0 -translate-x-1/2 rounded-full bg-linear-to-r from-sky to-skylight px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-ink shadow-card">
                {SCHEDULE_COPY.nowLabel} {nowClock}
              </span>
            </div>
          ) : null}
        </div>
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
      className="relative overflow-clip bg-linear-to-b from-navy to-deep py-10 sm:py-14"
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

        {/* Kalkış noktaları, tek bakışta */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:mt-10 xl:grid-cols-4">
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
                    {heroDeparture.via ? (
                      <p className="mt-0.5 text-sm text-mist">
                        {heroDeparture.via}
                      </p>
                    ) : null}
                    {isLiveNext && live_.minutesLeft != null ? (
                      <p className="mt-1.5 text-base font-semibold text-skylight">
                        {formatMinutes(live_.minutesLeft)}{" "}
                        {SCHEDULE_COPY.inMinutesSuffix}
                      </p>
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
                        <p className="flex items-center gap-1.5 text-base font-bold text-white">
                          <ArrowRight
                            aria-hidden
                            className="size-4 shrink-0 text-skylight"
                          />
                          {group.to}
                        </p>
                        {group.via ? (
                          <p className="mt-0.5 pl-[22px] text-sm text-mist">
                            {group.via}
                          </p>
                        ) : null}
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

        {/* Yolculuk seçici: nereden nereye, uyan seferler */}
        <FadeIn delay={0.1} className="mt-6">
          <JourneyPicker nowMin={nowMin} />
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
