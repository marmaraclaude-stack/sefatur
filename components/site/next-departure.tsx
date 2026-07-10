"use client";

/**
 * NextBusTicker — hero'nun hemen altına bindirilen cam kart.
 * Seçilen kalkış noktası için sıradaki seferi ve canlı geri sayımı gösterir.
 * Saat mantığı tamamen lib/use-next-departure.ts'ten gelir.
 */
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Moon } from "lucide-react";
import { SCHEDULE } from "@/lib/data";
import { formatMinutes, useNextDepartures } from "@/lib/use-next-departure";
import { cn } from "@/lib/utils";

/** Bu bileşene özgü arayüz metinleri (lib/copy.ts'te karşılığı yok). */
const TICKER = {
  sectionLabel: "Sıradaki sefer",
  tabsLabel: "Kalkış noktası seçin",
  nextLabel: "Sıradaki sefer",
  doneToday: "Bugünkü seferler tamamlandı",
  firstTomorrow: "İlk sefer yarın",
  departingNow: "Şimdi kalkıyor",
  after: "sonra",
  allTimes: "Tüm sefer saatleri",
} as const;

function BodySkeleton() {
  return (
    <div
      aria-hidden
      className="mt-5 flex min-h-[104px] flex-wrap items-center justify-between gap-x-6 gap-y-4 sm:mt-6"
    >
      <div className="flex items-start gap-3">
        <span className="mt-1.5 h-3 w-3 animate-pulse rounded-full bg-ink/10" />
        <div className="space-y-2">
          <span className="block h-4 w-24 animate-pulse rounded-full bg-ink/10" />
          <span className="block h-3 w-44 animate-pulse rounded-full bg-ink/10" />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 sm:items-end">
        <span className="block h-12 w-36 animate-pulse rounded-2xl bg-ink/10 sm:h-[60px] sm:w-44" />
        <span className="block h-7 w-24 animate-pulse rounded-full bg-ink/10" />
      </div>
    </div>
  );
}

export function NextDeparture() {
  const [selectedId, setSelectedId] = useState<string>(SCHEDULE[0].id);
  const data = useNextDepartures();
  const departure = data?.departures.find((d) => d.point.id === selectedId);

  return (
    <section
      aria-label={TICKER.sectionLabel}
      className="relative z-20 -mt-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.15 }}
          className="rounded-3xl bg-white/70 p-5 shadow-xl shadow-navy/10 ring-1 ring-white/60 backdrop-blur-xl sm:p-7"
        >
          {/* Kalkış noktası seçici */}
          <div
            role="group"
            aria-label={TICKER.tabsLabel}
            className="flex rounded-full bg-ink/5 p-1"
          >
            {SCHEDULE.map((point) => {
              const active = point.id === selectedId;
              return (
                <button
                  key={point.id}
                  type="button"
                  onClick={() => setSelectedId(point.id)}
                  aria-pressed={active}
                  className={cn(
                    "relative min-h-11 flex-1 rounded-full px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow",
                    active ? "text-white" : "text-ink/60 hover:text-ink"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nd-tab"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-navy"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{point.name}</span>
                </button>
              );
            })}
          </div>

          {/* Gövde: sıradaki sefer / bugün bitti / iskelet */}
          {!departure ? (
            <BodySkeleton />
          ) : departure.isToday ? (
            <motion.div
              key={departure.point.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-5 flex min-h-[104px] flex-wrap items-center justify-between gap-x-6 gap-y-4 sm:mt-6"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span aria-hidden className="relative mt-1 inline-flex h-3 w-3 shrink-0">
                  <span className="h-3 w-3 rounded-full bg-amber" />
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-amber/50 animate-beacon-ping motion-reduce:animate-none"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink/60">{TICKER.nextLabel}</p>
                  <p className="mt-1 max-w-[28ch] text-xs leading-relaxed text-ink/60">
                    {departure.point.note}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <p className="font-digits text-5xl font-bold leading-none tracking-tight text-ink sm:text-6xl">
                  {departure.time}
                </p>
                {departure.minutesLeft !== null && (
                  <span className="rounded-full bg-teal/10 px-3 py-1 text-sm font-semibold text-teal">
                    {departure.minutesLeft === 0
                      ? TICKER.departingNow
                      : `${formatMinutes(departure.minutesLeft)} ${TICKER.after}`}
                  </span>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={departure.point.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-5 flex min-h-[104px] flex-wrap items-center gap-x-4 gap-y-3 sm:mt-6"
            >
              <Moon aria-hidden className="h-7 w-7 shrink-0 text-mist" strokeWidth={1.75} />
              <div className="min-w-0">
                <p className="text-base font-semibold text-ink">{TICKER.doneToday}</p>
                <p className="mt-1 text-sm text-ink/60">
                  {TICKER.firstTomorrow}{" "}
                  <span className="font-digits font-semibold text-ink/80">
                    {departure.point.times[0]}
                  </span>
                </p>
              </div>
            </motion.div>
          )}

          {/* Alt satır: tarifeye köprü */}
          <div className="mt-4 border-t border-ink/10 pt-3 sm:mt-5">
            <a
              href="#seferler"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full text-sm font-medium text-teal transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            >
              {TICKER.allTimes}
              <ArrowDown aria-hidden className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default NextDeparture;
