"use client";

/**
 * StickyCallDock — yalnızca mobilde görünen sabit alt çubuk.
 * Sol: Hemen Ara (amber) · Sağ: sıradaki sefer + #seferler bağlantısı.
 * Hero geçildikten sonra belirir, footer (#iletisim) görünürken gizlenir.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { CONTACT_COPY } from "@/lib/copy";
import {
  timeToMinutes,
  useNextDepartures,
  type NextDeparture,
} from "@/lib/use-next-departure";

const SCROLL_THRESHOLD = 600;

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
  const [pastHero, setPastHero] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > SCROLL_THRESHOLD);
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

  const visible = pastHero && !footerInView;
  const earliest = next ? pickEarliest(next.departures) : null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.15 }
              : { type: "spring", stiffness: 300, damping: 30 }
          }
          className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-3 pb-[max(env(safe-area-inset-bottom),12px)] lg:hidden"
        >
          <nav
            aria-label="Hızlı arama ve sefer bilgisi"
            className="pointer-events-auto mx-auto grid max-w-md grid-cols-2 overflow-hidden rounded-2xl shadow-2xl shadow-deep/40 ring-1 ring-white/20 backdrop-blur-xl"
          >
            <a
              href={CONTACT.phoneHref}
              className="flex min-h-[52px] items-center justify-center gap-2 bg-amber py-3.5 font-heading font-bold text-navy transition-colors hover:bg-amber/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy"
            >
              <motion.span
                aria-hidden="true"
                className="inline-flex"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { rotate: [0, -14, 11, -8, 5, 0] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : {
                        duration: 0.8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 8,
                      }
                }
              >
                <Phone className="size-5" strokeWidth={2.5} aria-hidden="true" />
              </motion.span>
              {CONTACT_COPY.callCta}
            </a>
            <a
              href="#seferler"
              className="flex min-h-[52px] flex-col items-center justify-center bg-navy/90 py-2 text-white transition-colors hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-glow"
            >
              <span className="text-[11px] uppercase tracking-widest text-glow">
                {"Sıradaki sefer"}
              </span>
              <span className="font-digits text-base font-semibold">
                {earliest
                  ? earliest.isToday
                    ? `${earliest.time} · ${earliest.pointName}`
                    : `Yarın ${earliest.time} · ${earliest.pointName}`
                  : "—"}
              </span>
            </a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CallDock;
