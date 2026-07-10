"use client";

/**
 * CallDock: yalnızca mobilde görünen sabit alt çubuk.
 * Sol: Hemen Ara (amber) · Sağ: sıradaki sefer + #seferler bağlantısı.
 * Sayfa ~500px kaydırılınca belirir, footer (#iletisim) görünürken gizlenir.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { CONTACT_COPY, SCHEDULE_COPY } from "@/lib/copy";
import {
  timeToMinutes,
  useNextDepartures,
  type NextDeparture,
} from "@/lib/use-next-departure";

const SCROLL_THRESHOLD = 500;

/** Tüm kalkış noktaları arasından en yakın (veya yarınki en erken) seferi seçer. */
function pickEarliest(departures: NextDeparture[]): {
  time: string;
  pointName: string;
  isToday: boolean;
} | null {
  if (departures.length === 0) return null;
  const today = departures.filter((d) => d.isToday && d.minutesLeft !== null);
  if (today.length > 0) {
    const best = today.reduce((a, b) =>
      (a.minutesLeft as number) <= (b.minutesLeft as number) ? a : b
    );
    return { time: best.time, pointName: best.point.name, isToday: true };
  }
  const tomorrow = departures.reduce((a, b) =>
    timeToMinutes(a.time) <= timeToMinutes(b.time) ? a : b
  );
  return { time: tomorrow.time, pointName: tomorrow.point.name, isToday: false };
}

export function CallDock() {
  const prefersReducedMotion = useReducedMotion();
  const next = useNextDepartures();
  const [scrolled, setScrolled] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.getElementById("iletisim");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = scrolled && !footerInView;
  const earliest = next ? pickEarliest(next.departures) : null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { y: 96, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: 96, opacity: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.15 }
              : { type: "spring", stiffness: 300, damping: 30 }
          }
          className="pointer-events-none fixed inset-x-0 bottom-0 z-50 lg:hidden"
        >
          <nav
            aria-label="Hızlı arama ve sıradaki sefer"
            className="pointer-events-auto mx-3 mb-[max(env(safe-area-inset-bottom),12px)] grid grid-cols-2 overflow-hidden rounded-xl border border-ink/15 bg-white shadow-lg"
          >
            <a
              href={CONTACT.phoneHref}
              className="flex min-h-[52px] items-center justify-center gap-2 bg-amber font-semibold text-ink transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal"
            >
              <Phone className="size-5" aria-hidden />
              {CONTACT_COPY.callCta}
            </a>
            <a
              href="#seferler"
              className="flex min-h-[52px] flex-col items-center justify-center bg-white text-ink transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal"
            >
              <span className="text-[11px] font-medium uppercase tracking-wide text-teal">
                {SCHEDULE_COPY.nextLabel}
              </span>
              <span className="max-w-full truncate px-2 font-digits text-sm font-semibold whitespace-nowrap">
                {earliest
                  ? earliest.isToday
                    ? `${earliest.time} · ${earliest.pointName}`
                    : `Yarın ${earliest.time}`
                  : "..."}
              </span>
            </a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
