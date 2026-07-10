"use client";

/**
 * DepartureBoard — "Gece Denizi Panosu".
 * Kalkış noktasına göre canlı sefer saatleri: geçmiş seferler soluk,
 * sıradaki sefer amber fenerle işaretli. Saatlerin tek kaynağı lib/data.ts.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Info, Phone } from "lucide-react";

import { CONTACT, SCHEDULE } from "@/lib/data";
import { CONTACT_COPY, SCHEDULE_COPY } from "@/lib/copy";
import {
  timeToMinutes,
  useNextDepartures,
  formatMinutes,
} from "@/lib/use-next-departure";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { WaveDivider } from "@/components/ui/wave-divider";
import { FadeIn } from "@/components/ui/fade-in";

type ChipState = "neutral" | "past" | "next" | "future";

/** Başlığın son kelimesini turkuazla vurgula ("Sefer Saatleri" → "Saatleri"). */
const titleWords = SCHEDULE_COPY.title.split(" ");
const titleAccent = titleWords[titleWords.length - 1];
const titleHead = titleWords.slice(0, -1).join(" ");

/** Saraylar mermerine selam: %4 opaklıkta damar çizgileri. */
function MarbleVeins() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 800"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M-40 120 C 220 60 380 210 640 150 C 900 90 1050 230 1480 140"
        stroke="white"
        strokeOpacity="0.04"
        strokeWidth="1.5"
      />
      <path
        d="M-40 320 C 180 400 460 280 720 360 C 980 440 1220 320 1480 400"
        stroke="white"
        strokeOpacity="0.04"
        strokeWidth="2"
      />
      <path
        d="M-40 560 C 260 500 420 640 760 580 C 1100 520 1240 660 1480 590"
        stroke="white"
        strokeOpacity="0.04"
        strokeWidth="1.5"
      />
      <path
        d="M-40 700 C 300 760 620 680 920 740 C 1160 788 1330 700 1480 730"
        stroke="white"
        strokeOpacity="0.03"
        strokeWidth="2"
      />
    </svg>
  );
}

export function Schedule() {
  const [activeId, setActiveId] = useState<string>(SCHEDULE[0].id);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const live = useNextDepartures();

  const activePoint =
    SCHEDULE.find((p) => p.id === activeId) ?? SCHEDULE[0];

  const activeNext = live?.departures.find(
    (d) => d.point.id === activePoint.id
  );
  const nowMin = live?.nowMin ?? null;

  function chipState(time: string): ChipState {
    if (nowMin === null) return "neutral";
    if (activeNext?.isToday && activeNext.time === time) return "next";
    if (timeToMinutes(time) < nowMin) return "past";
    return "future";
  }

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(CONTACT.phoneDisplay);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Pano erişilemezse sessizce geç — numara zaten görünür durumda.
    }
  }

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    []
  );

  return (
    <section id="seferler" aria-label={SCHEDULE_COPY.title}>
      <WaveDivider fill="#0B2239" />

      <div className="relative overflow-hidden bg-linear-to-b from-navy to-deep py-20 sm:py-28">
        <MarbleVeins />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tone="dark"
            eyebrow={SCHEDULE_COPY.eyebrow}
            title={
              <>
                {titleHead} <span className="text-glow">{titleAccent}</span>
              </>
            }
            subtitle={SCHEDULE_COPY.subtitle}
          />

          {/* Kalkış noktası sekmeleri */}
          <FadeIn delay={0.1} className="mt-10 sm:mt-12">
            <div
              role="group"
              aria-label={SCHEDULE_COPY.eyebrow}
              className="mx-auto flex w-fit max-w-full items-center rounded-full bg-white/5 p-1 ring-1 ring-white/10"
            >
              {SCHEDULE.map((point) => {
                const active = point.id === activePoint.id;
                return (
                  <button
                    key={point.id}
                    type="button"
                    onClick={() => setActiveId(point.id)}
                    aria-pressed={active}
                    className={cn(
                      "relative min-h-11 rounded-full px-4 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-glow sm:px-7 sm:text-base",
                      active
                        ? "font-semibold text-deep"
                        : "font-medium text-mist hover:text-white"
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="board-tab"
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-glow"
                        transition={{
                          type: "spring",
                          bounce: 0.18,
                          duration: 0.5,
                        }}
                      />
                    ) : null}
                    <span className="relative z-10">{point.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Yön bilgisi */}
            <div className="mt-4 flex min-h-6 items-center justify-center gap-2 px-2 text-center text-sm text-mist">
              <ArrowRight aria-hidden className="size-4 shrink-0 text-glow" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activePoint.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  {activePoint.note}
                </motion.span>
              </AnimatePresence>
            </div>
          </FadeIn>

          {/* Saat çipleri — sekme değişiminde kaskatlı flip */}
          <FadeIn delay={0.15}>
            <ul
              key={activePoint.id}
              style={{ perspective: 900 }}
              className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
            >
              {activePoint.times.map((time, i) => {
                const state = chipState(time);
                const isNext = state === "next";
                return (
                  <motion.li
                    key={time}
                    initial={{ opacity: 0, rotateX: 90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.04,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    className={cn(
                      "relative rounded-2xl px-4 py-5 text-center ring-1",
                      state === "past" &&
                        "bg-white/[0.03] ring-white/5",
                      (state === "neutral" || state === "future") &&
                        "bg-white/5 ring-white/10",
                      isNext && "bg-amber/10 ring-amber/40"
                    )}
                  >
                    {isNext ? (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-2xl bg-amber/20 animate-beacon-ping motion-reduce:animate-none"
                      />
                    ) : null}
                    {isNext ? (
                      <span className="absolute inset-x-0 top-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber/80">
                        sıradaki
                      </span>
                    ) : null}
                    <time
                      dateTime={time}
                      className={cn(
                        "font-digits text-2xl font-semibold sm:text-3xl",
                        state === "past" &&
                          "text-mist/60 line-through decoration-mist/30 decoration-1",
                        (state === "neutral" || state === "future") &&
                          "text-white",
                        isNext && "text-amber"
                      )}
                    >
                      {time}
                    </time>
                    {isNext && activeNext?.minutesLeft != null ? (
                      <span className="mt-1 block font-digits text-xs text-amber/80">
                        {formatMinutes(activeNext.minutesLeft)}
                      </span>
                    ) : null}
                  </motion.li>
                );
              })}
            </ul>
          </FadeIn>

          {/* Notlar */}
          <FadeIn delay={0.2}>
            <ul className="mx-auto mt-12 max-w-2xl space-y-3">
              {SCHEDULE_COPY.notes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-3 text-sm leading-relaxed text-mist"
                >
                  <Info
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-glow/70"
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Arama satırı */}
          <FadeIn delay={0.25} className="mt-10 sm:mt-12">
            <p className="text-center text-sm text-mist sm:text-base">
              {SCHEDULE_COPY.callNote}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => void copyPhone()}
                aria-label={
                  copied
                    ? "Telefon numarası kopyalandı"
                    : "Telefon numarasını panoya kopyala"
                }
                className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white/10 px-5 font-digits text-sm font-semibold text-white ring-1 ring-white/15 transition-colors outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-glow"
              >
                {copied ? (
                  <Check aria-hidden className="size-4 text-glow" />
                ) : (
                  <Phone aria-hidden className="size-4 text-glow" />
                )}
                <span aria-live="polite">
                  {copied ? "Kopyalandı" : CONTACT.phoneDisplay}
                </span>
              </button>

              <a
                href={CONTACT.phoneHref}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-amber px-6 text-sm font-semibold text-deep shadow-lg shadow-amber/25 transition-colors outline-none hover:bg-amber/90 focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                <Phone aria-hidden className="size-4" />
                {CONTACT_COPY.callCta}
              </a>
            </div>
          </FadeIn>

          {/* SEO / erişilebilirlik ikizi: tüm noktaların tam tarifesi */}
          <table className="sr-only">
            <caption>{SCHEDULE_COPY.title}</caption>
            <thead>
              <tr>
                <th scope="col">Kalkış Noktası</th>
                <th scope="col">Kalkış Saatleri</th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((point) => (
                <tr key={point.id}>
                  <th scope="row">
                    {point.name} — {point.note}
                  </th>
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
