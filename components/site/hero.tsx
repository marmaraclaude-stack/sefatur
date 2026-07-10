"use client";

/**
 * AuroraMeshHero — "Mermer Sabahı" açık hero bölümü.
 * Aurora blob'lar, kendini çizen kıyı çizgisi + rota SVG'si ve
 * yukarı doğru sıralı (staggered) giriş animasyonu.
 */
import { motion, useReducedMotion, type Variants } from "motion/react";
import { CalendarClock, CheckCircle2, MoveRight, Phone } from "lucide-react";
import { BRAND, HERO } from "@/lib/copy";
import { CONTACT, ROUTE_STOPS } from "@/lib/data";
import { cn } from "@/lib/utils";

/* Sıralı giriş animasyonu (above-the-fold olduğu için animate, whileInView değil) */
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

/* Rota SVG'si — batıdan doğuya 5 durak (dekoratif, soyut) */
const STOP_POINTS = [
  { x: 60, y: 322 },
  { x: 192, y: 274 },
  { x: 322, y: 236 },
  { x: 452, y: 186 },
  { x: 584, y: 128 },
] as const;

const ROUTE_PATH =
  "M60 322 C 112 302, 142 284, 192 274 S 272 252, 322 236 S 402 206, 452 186 S 534 148, 584 128";

const COAST_PATH_A =
  "M0 118 C 82 88, 152 130, 232 110 C 322 86, 382 132, 472 108 C 542 92, 602 112, 640 96";

const COAST_PATH_B =
  "M20 388 C 110 356, 196 392, 300 364 C 396 338, 470 372, 560 344 C 600 332, 624 328, 640 326";

const NOISE_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function RouteArt({ reduceMotion }: { reduceMotion: boolean }) {
  const draw = (delay: number) => ({
    initial: reduceMotion ? false : { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 2.4, ease: "easeInOut" as const, delay },
  });

  return (
    <svg
      viewBox="0 0 640 420"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-0 -z-10 hidden w-[44rem] -translate-y-1/2 translate-x-[14%] lg:block"
    >
      {/* Kıyı çizgileri — kendini çizen ince hatlar */}
      <motion.path
        d={COAST_PATH_A}
        className="stroke-teal/15"
        strokeWidth={1.5}
        strokeLinecap="round"
        {...draw(0.2)}
      />
      <motion.path
        d={COAST_PATH_B}
        className="stroke-teal/10"
        strokeWidth={1.5}
        strokeLinecap="round"
        {...draw(0.5)}
      />

      {/* Kesikli rota, maske ile soldan sağa kendini çizer */}
      <mask id="hero-rota-maskesi">
        <motion.path
          d={ROUTE_PATH}
          stroke="#fff"
          strokeWidth={32}
          strokeLinecap="round"
          {...draw(0.7)}
        />
      </mask>
      <g mask="url(#hero-rota-maskesi)">
        <path
          d={ROUTE_PATH}
          className="stroke-teal/25"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="2 9"
        />
        {ROUTE_STOPS.map((stop, i) => {
          const p = STOP_POINTS[Math.min(i, STOP_POINTS.length - 1)];
          return (
            <g key={stop.id}>
              <circle cx={p.x} cy={p.y} r={7} className="fill-teal/15" />
              <circle cx={p.x} cy={p.y} r={2.75} className="fill-teal/60" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false;

  const [headBefore = "", headAfter = ""] = HERO.headline.split(HERO.highlight);

  return (
    <section
      id="hero"
      aria-labelledby="hero-baslik"
      className="relative isolate flex min-h-[92svh] overflow-hidden bg-marble pt-32 pb-36 sm:pt-36"
    >
      {/* Aurora mesh blob'ları */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[40rem] rounded-full bg-glow/25 blur-3xl animate-aurora-a motion-reduce:animate-none"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 -z-10 size-[30rem] rounded-full bg-amber/20 blur-3xl animate-aurora-b motion-reduce:animate-none"
      />
      {/* İnce tanecik dokusu */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{ backgroundImage: NOISE_URI }}
      />

      {/* Yazının arkasında: kıyı + rota çizimi */}
      <RouteArt reduceMotion={reduceMotion} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center sm:px-6"
      >
        {/* Kicker rozeti */}
        <motion.p
          variants={item}
          className="inline-flex items-center gap-2 rounded-full bg-sand px-4 py-1.5 text-sm font-medium text-ink/80 ring-1 ring-ink/10"
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />
          {BRAND.tagline}
        </motion.p>

        {/* Başlık */}
        <motion.h1
          variants={item}
          id="hero-baslik"
          className="mt-6 font-heading text-5xl font-extrabold tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl"
        >
          {headBefore}
          <span className="text-teal">{HERO.highlight}</span>
          {headAfter}
        </motion.h1>

        {/* Alt başlık */}
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/70"
        >
          {HERO.subheadline}
        </motion.p>

        {/* Güzergâh şeridi */}
        <motion.p
          variants={item}
          className="mt-7 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 rounded-full bg-white/60 px-5 py-2 ring-1 ring-ink/10"
        >
          {ROUTE_STOPS.map((stop, i) => (
            <span
              key={stop.id}
              className="inline-flex items-center gap-x-2.5 font-digits text-[11px] font-medium tracking-[0.18em] text-teal uppercase sm:text-xs"
            >
              {i > 0 ? (
                <MoveRight aria-hidden="true" className="size-3.5 text-teal/50" />
              ) : null}
              {stop.name}
            </span>
          ))}
        </motion.p>

        {/* Çift CTA */}
        <motion.div
          variants={item}
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <a
            href="#seferler"
            className={cn(
              "inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-amber px-7 py-3.5 font-semibold text-navy shadow-lg shadow-amber/25 transition sm:w-auto",
              "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber/30 motion-reduce:hover:translate-y-0",
              "focus-visible:ring-2 focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-marble focus-visible:outline-none"
            )}
          >
            <CalendarClock aria-hidden="true" className="size-5" />
            {HERO.ctaPrimary}
          </a>
          <a
            href={CONTACT.phoneHref}
            className={cn(
              "inline-flex min-h-[52px] w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 rounded-full px-7 py-3.5 font-semibold text-teal ring-2 ring-teal transition ring-inset sm:w-auto",
              "hover:-translate-y-0.5 hover:bg-teal/5 motion-reduce:hover:translate-y-0",
              "focus-visible:ring-glow focus-visible:ring-offset-2 focus-visible:ring-offset-marble focus-visible:outline-none"
            )}
          >
            <Phone aria-hidden="true" className="size-5" />
            <span>{HERO.ctaSecondary}</span>
            <span aria-hidden="true" className="text-teal/40">
              •
            </span>
            <span className="font-digits text-[15px] tracking-wide whitespace-nowrap">
              {CONTACT.phoneDisplay}
            </span>
          </a>
        </motion.div>

        {/* Güven rozetleri */}
        <motion.ul
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
        >
          {HERO.badges.map((badge) => (
            <li
              key={badge}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3.5 py-1.5 text-sm text-ink/70 ring-1 ring-ink/10"
            >
              <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-teal" />
              {badge}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}

export default Hero;
