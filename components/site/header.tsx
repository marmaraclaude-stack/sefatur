"use client";

/**
 * GlassNav — sabit üst menü.
 * Hero üzerinde şeffaf başlar, ~24px kaydırma sonrası buzlu cama dönüşür.
 * Mobilde tam ekran lacivert menü açılır (gövde kaydırması kilitlenir,
 * Escape ve bağlantı tıklamasıyla kapanır).
 */

import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { BRAND, CONTACT_COPY, NAV_LINKS } from "@/lib/copy";
import { CONTACT } from "@/lib/data";
import { cn } from "@/lib/utils";

/** "SEFA" + "TUR" — dalga çizgisi ilk parçanın altına gelir. */
const BRAND_HEAD = BRAND.name.slice(0, 4);
const BRAND_TAIL = BRAND.name.slice(4);

const MOBILE_MENU_ID = "sefatur-mobil-menu";

/** Üç tepeli turkuaz dalga — markanın deniz imzası. */
function WaveUnderline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 37 10"
      preserveAspectRatio="none"
      fill="none"
      className={cn(
        "pointer-events-none absolute -bottom-0.5 left-0 h-[5px] w-full transition-colors duration-300",
        className
      )}
    >
      <path
        d="M1 5 Q 4 1.5 7 5 T 13 5 T 19 5 T 25 5 T 31 5 T 36 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Wordmark({ scrolled, light }: { scrolled: boolean; light?: boolean }) {
  const onDark = light || !scrolled;
  return (
    <span
      className={cn(
        "font-heading text-xl font-extrabold tracking-tight transition-colors duration-300",
        onDark ? "text-white" : "text-ink"
      )}
    >
      <span className="relative">
        {BRAND_HEAD}
        <WaveUnderline className={onDark ? "text-glow" : "text-teal"} />
      </span>
      {BRAND_TAIL}
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  /* ~24px kaydırma sonrası cam görünüme geç */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Menü açıkken gövde kaydırmasını kilitle + Escape ile kapat */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Çapa tıklamasında kilidi hemen bırak ki sayfa kaydırılabilsin */
  const closeMenu = useCallback(() => {
    document.body.style.overflow = "";
    setOpen(false);
  }, []);

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: reduceMotion ? 0 : 0.25 } },
    exit: { opacity: 0, transition: { duration: reduceMotion ? 0 : 0.2 } },
  };
  const listVariants: Variants = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? {}
        : { staggerChildren: 0.07, delayChildren: 0.12 },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.45,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-white/40 bg-marble/70 shadow-[0_8px_30px_rgb(6_21_39/0.08)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 md:h-[72px]">
          {/* Sol: marka */}
          <a
            href="#top"
            className="rounded-md py-2 outline-none focus-visible:ring-2 focus-visible:ring-glow"
            aria-label={BRAND.name}
          >
            <Wordmark scrolled={scrolled} />
          </a>

          {/* Orta: çapa bağlantıları (lg ve üzeri) */}
          <nav
            aria-label={BRAND.name}
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-2.5 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-glow",
                  scrolled
                    ? "text-ink/80 hover:text-teal"
                    : "text-white/85 hover:text-glow"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Sağ: amber telefon hapı + mobil menü düğmesi */}
          <div className="flex items-center gap-2">
            <a
              href={CONTACT.phoneHref}
              aria-label={`${CONTACT_COPY.callCta}: ${CONTACT.phoneDisplay}`}
              className="flex h-11 w-11 items-center justify-center gap-2 rounded-full bg-amber font-semibold text-navy outline-none transition hover:brightness-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-glow sm:w-auto sm:px-5"
            >
              <Phone className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
              <span className="hidden font-digits text-sm tracking-tight sm:inline">
                {CONTACT.phoneDisplay}
              </span>
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Menüyü aç"
              aria-expanded={open}
              aria-controls={MOBILE_MENU_ID}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-glow lg:hidden",
                scrolled
                  ? "text-ink hover:bg-ink/5"
                  : "text-white hover:bg-white/10"
              )}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobil tam ekran menü */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={MOBILE_MENU_ID}
            role="dialog"
            aria-modal="true"
            aria-label={BRAND.name}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto overflow-x-hidden bg-navy/95 backdrop-blur-2xl lg:hidden"
          >
            {/* Üst şerit: marka + kapat */}
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 md:h-[72px]">
              <Wordmark scrolled={false} light />
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Menüyü kapat"
                className="flex h-11 w-11 items-center justify-center rounded-full text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-glow"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Bağlantılar */}
            <motion.nav
              aria-label={BRAND.name}
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-1 flex-col justify-center gap-1 px-6 py-6 sm:px-10"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  variants={itemVariants}
                  className="group flex min-h-11 items-baseline gap-4 rounded-lg py-2 outline-none focus-visible:ring-2 focus-visible:ring-glow"
                >
                  <span
                    aria-hidden="true"
                    className="font-digits text-sm text-glow/70"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-4xl font-extrabold tracking-tight text-white transition-colors duration-200 group-hover:text-glow sm:text-5xl">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </motion.nav>

            {/* Alt: büyük amber telefon bloğu + WhatsApp */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: reduceMotion ? 0 : 0.5 }}
              className="space-y-3 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-10"
            >
              <a
                href={CONTACT.phoneHref}
                className="flex items-center justify-center gap-3 rounded-2xl bg-amber px-6 py-4 text-navy outline-none transition hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-glow"
              >
                <Phone className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    {CONTACT_COPY.callCta}
                  </span>
                  <span className="font-digits text-xl font-bold tracking-tight">
                    {CONTACT.phoneDisplay}
                  </span>
                </span>
              </a>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white outline-none transition-colors hover:border-glow/50 hover:text-glow focus-visible:ring-2 focus-visible:ring-glow"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                {CONTACT_COPY.whatsappCta}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
