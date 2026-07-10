"use client";

/**
 * RouteTimeline — "Güzergâh" bölümü.
 * Marmara'dan Saraylar'a beş durağı, masaüstünde kaydırmayla çizilen
 * dalgalı bir hat + yolculuk eden minibüs işaretiyle; mobilde dikey
 * bir zaman çizelgesiyle anlatır. Durak verisi lib/data.ts'ten gelir.
 */
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Anchor, BusFront } from "lucide-react";
import { ROUTE_COPY } from "@/lib/copy";
import { ROUTE_STOPS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { WaveDivider } from "@/components/ui/wave-divider";

/* ————— Dalga geometrisi (viewBox koordinatları) ————— */
const VB_W = 1000;
const VB_H = 160;
/** 5 durağın yatay konumları — 5 eşit sütunun merkezleri (%10, %30, ...) */
const NODE_X = [100, 300, 500, 700, 900] as const;
/** Nazik bir sinüs hissi için alçalıp yükselen düğüm yükseklikleri */
const NODE_Y = [55, 105, 55, 105, 55] as const;

/** Düğümlerde yatay teğetli, yumuşak kübik dalga yolu */
const WAVE_PATH =
  "M100 55 C200 55 200 105 300 105 C400 105 400 55 500 55 " +
  "C600 55 600 105 700 105 C800 105 800 55 900 55";

/**
 * Kaydırma ilerlemesini (0–1) dalga ÜZERİNDEKİ bir noktaya çevirir.
 * Bezier parametresi segment içinde doğrusal ilerletilir; nokta her
 * zaman tam olarak eğrinin üstünde kalır.
 */
function pointAt(p: number): { x: number; y: number } {
  const clamped = Math.min(Math.max(p, 0), 1);
  const s = clamped * (NODE_X.length - 1);
  const i = Math.min(Math.floor(s), NODE_X.length - 2);
  const t = s - i;
  // x(t) — kontrol noktaları segment ortasında olan kübik Bezier
  const xFrac = 1.5 * t - 1.5 * t * t + t * t * t;
  // y(t) — smoothstep
  const yFrac = t * t * (3 - 2 * t);
  return {
    x: NODE_X[i] + (NODE_X[i + 1] - NODE_X[i]) * xFrac,
    y: NODE_Y[i] + (NODE_Y[i + 1] - NODE_Y[i]) * yFrac,
  };
}

/** Topağaç düğümündeki rozet (tasarım gereği sabit etiket). */
const CENTER_TAG = "MERKEZ";
const CENTER_STOP_ID = "topagac";

/** Feribot bağlantı satırı — güncel, sabit bilgi (copy.ts kapsamı dışında). */
const FERRY_LABEL = "Marmara iskelesinden feribot bağlantıları:";
const FERRY_LINKS = ["İstanbul (İDO, sezonluk)", "Erdek", "Tekirdağ"] as const;

export function RouteTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001,
  });
  /** Hareket azaltma tercihinde hat baştan tamamlanmış görünür. */
  const progress = useTransform(smoothed, (v) => (reduceMotion ? 1 : v));

  const busLeft = useTransform(
    progress,
    (p) => `${(pointAt(p).x / VB_W) * 100}%`
  );
  const busTop = useTransform(
    progress,
    (p) => `${(pointAt(p).y / VB_H) * 100}%`
  );

  return (
    <section
      id="guzergah"
      ref={sectionRef}
      className="relative overflow-hidden bg-deep"
    >
      {/* Arka plan: ada panoraması + kenar karartma */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-ada.jpg"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-b from-deep via-transparent to-deep" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <SectionHeading
          tone="dark"
          eyebrow={ROUTE_COPY.eyebrow}
          title={ROUTE_COPY.title}
          subtitle={ROUTE_COPY.subtitle}
        />

        {/* ————— Masaüstü: yatay yolculuk ————— */}
        <div className="mt-16 hidden lg:block">
          <div aria-hidden className="relative h-44">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Duraklardan etiketlere inen kesikli bağlantılar */}
              {ROUTE_STOPS.map((stop, i) => (
                <line
                  key={stop.id}
                  x1={NODE_X[i]}
                  y1={NODE_Y[i] + 14}
                  x2={NODE_X[i]}
                  y2={VB_H - 6}
                  stroke="#2DD4BF"
                  strokeOpacity={0.16}
                  strokeDasharray="2 6"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {/* Soluk rota izi */}
              <path
                d={WAVE_PATH}
                stroke="#2DD4BF"
                strokeOpacity={0.18}
                strokeWidth={2}
                strokeDasharray="6 10"
                vectorEffect="non-scaling-stroke"
              />
              {/* Kaydırmayla kendini çizen parlak hat */}
              <motion.path
                d={WAVE_PATH}
                stroke="#2DD4BF"
                strokeWidth={2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{
                  pathLength: progress,
                  filter: "drop-shadow(0 0 6px rgba(45,212,191,0.55))",
                }}
              />
            </svg>

            {/* Durak noktaları */}
            {ROUTE_STOPS.map((stop, i) => {
              const isCenter = stop.id === CENTER_STOP_ID;
              return (
                <div
                  key={stop.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${(NODE_X[i] / VB_W) * 100}%`,
                    top: `${(NODE_Y[i] / VB_H) * 100}%`,
                  }}
                >
                  <span
                    className={cn(
                      "block rounded-full bg-glow shadow-[0_0_18px_rgba(45,212,191,0.65)]",
                      isCenter
                        ? "h-5 w-5 ring-4 ring-glow/25"
                        : "h-4 w-4 ring-2 ring-glow/15"
                    )}
                  />
                </div>
              );
            })}

            {/* Hat boyunca yolculuk eden minibüs */}
            <motion.div
              className="absolute z-10"
              style={{ left: busLeft, top: busTop }}
            >
              <div className="flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy shadow-[0_0_28px_rgba(45,212,191,0.45)] ring-2 ring-glow">
                <BusFront className="h-5 w-5 text-glow" strokeWidth={2} />
              </div>
            </motion.div>
          </div>

          {/* Durak adları ve kısa notlar — sütun merkezleri düğümlerle hizalı */}
          <ol className="mt-3 grid grid-cols-5">
            {ROUTE_STOPS.map((stop, i) => {
              const isCenter = stop.id === CENTER_STOP_ID;
              return (
                <FadeIn
                  as="li"
                  key={stop.id}
                  delay={i * 0.08}
                  className="relative px-3 text-center"
                >
                  {isCenter ? (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-full bg-sand px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-ink">
                      {CENTER_TAG}
                    </span>
                  ) : null}
                  <h3
                    className={cn(
                      "font-heading font-semibold text-white",
                      isCenter ? "text-xl" : "text-lg"
                    )}
                  >
                    {stop.name}
                  </h3>
                  <p className="mx-auto mt-1.5 max-w-[22ch] text-sm leading-relaxed text-mist">
                    {stop.blurb}
                  </p>
                </FadeIn>
              );
            })}
          </ol>
        </div>

        {/* ————— Mobil: dikey zaman çizelgesi ————— */}
        <div className="relative mt-12 lg:hidden">
          {/* Ray: soluk iz + kaydırmayla büyüyen parlak çizgi */}
          <div
            aria-hidden
            className="absolute bottom-2 left-[9px] top-1 w-0.5 rounded-full bg-glow/20"
          />
          <motion.div
            aria-hidden
            className="absolute bottom-2 left-[9px] top-1 w-0.5 origin-top rounded-full bg-glow shadow-[0_0_12px_rgba(45,212,191,0.5)]"
            style={{ scaleY: progress }}
          />
          <ol className="space-y-10">
            {ROUTE_STOPS.map((stop, i) => {
              const isCenter = stop.id === CENTER_STOP_ID;
              return (
                <FadeIn
                  as="li"
                  key={stop.id}
                  delay={i * 0.06}
                  className="relative pl-10"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute block rounded-full bg-glow shadow-[0_0_14px_rgba(45,212,191,0.6)]",
                      isCenter
                        ? "left-0 top-1 h-5 w-5 ring-4 ring-glow/25"
                        : "left-[2px] top-1.5 h-4 w-4 ring-2 ring-glow/15"
                    )}
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-lg font-semibold text-white">
                      {stop.name}
                    </h3>
                    {isCenter ? (
                      <span className="rounded-full bg-sand px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-ink">
                        {CENTER_TAG}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 max-w-[38ch] text-sm leading-relaxed text-mist">
                    {stop.blurb}
                  </p>
                </FadeIn>
              );
            })}
          </ol>
        </div>

        {/* ————— Feribot bağlantıları ————— */}
        <FadeIn
          delay={0.1}
          className="mt-16 flex flex-wrap items-center justify-center gap-2.5"
        >
          <span className="w-full text-center text-sm text-mist sm:w-auto">
            {FERRY_LABEL}
          </span>
          {FERRY_LINKS.map((link) => (
            <span
              key={link}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3.5 py-1.5 text-sm text-mist ring-1 ring-white/10"
            >
              <Anchor aria-hidden className="h-3.5 w-3.5 text-glow/80" />
              {link}
            </span>
          ))}
        </FadeIn>
      </div>

      {/* Sonraki (açık) bölüme yumuşak geçiş */}
      <WaveDivider fill="#F7F5F0" className="relative z-10" />
    </section>
  );
}

export default RouteTimeline;
