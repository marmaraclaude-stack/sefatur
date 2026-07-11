"use client";

/**
 * Header: sabit, sade üst menü.
 * Her zaman opak açık zemin (marble) ve ince alt çizgi kullanır.
 * Mobilde tam ekran, tamamen opak ve açık renkli bir menü paneli açılır.
 * Panel z-[70] katmanındadır; alttaki arama çubuğunu (z-50) tamamen örter.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { BRAND, CONTACT_COPY, NAV_LINKS } from "@/lib/copy";
import { CONTACT } from "@/lib/data";

const MOBILE_MENU_ID = "sefatur-mobil-menu";

export function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /* Çapa tıklamalarında kaydırma kilidini hemen bırak */
  const closeMenu = useCallback(() => {
    document.body.style.overflow = "";
    setOpen(false);
  }, []);

  /* Masaüstü eşiğine (64rem) geçildiğinde menüyü kapat */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) closeMenu();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMenu]);

  /* Menü açıkken: gövde kaydırma kilidi + Escape ile kapatma + Tab odak tuzağı */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>("a[href], button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !panel.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  /* Odak yönetimi: açılınca kapat düğmesine, kapanınca hamburgere dön */
  useEffect(() => {
    if (!open) return;
    const trigger = menuButtonRef.current;
    const raf = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });
    return () => {
      cancelAnimationFrame(raf);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-marble/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-3 px-5 sm:px-8 md:h-[72px]">
          {/* Sol: marka */}
          <a
            href="#top"
            className="rounded-lg py-2 font-heading text-xl font-extrabold tracking-tight text-ink outline-none focus-visible:ring-2 focus-visible:ring-teal"
          >
            {BRAND.name}
          </a>

          {/* Orta: bağlantılar (lg ve üzeri) */}
          <nav aria-label={BRAND.name} className="hidden items-center lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-[15px] font-medium text-ink/70 outline-none transition-colors hover:text-forest focus-visible:ring-2 focus-visible:ring-forest"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Sağ: arama düğmesi + mobil menü düğmesi */}
          <div className="flex items-center gap-2">
            <a
              href={CONTACT.phoneHref}
              aria-label={`${CONTACT_COPY.callCta}: ${CONTACT.phoneDisplay}`}
              className="flex h-11 w-11 items-center justify-center gap-2 rounded-full bg-amber text-ink shadow-sm ring-1 ring-black/10 outline-none transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-teal sm:w-auto sm:rounded-xl sm:px-5"
            >
              <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="hidden font-digits text-base font-semibold tracking-tight sm:inline">
                {CONTACT.phoneDisplay}
              </span>
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Menüyü aç"
              aria-expanded={open}
              aria-controls={MOBILE_MENU_ID}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-ink outline-none transition-colors hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-teal lg:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobil tam ekran menü: tamamen opak açık zemin, z-[70] */}
      {open ? (
        <div
          ref={panelRef}
          id={MOBILE_MENU_ID}
          role="dialog"
          aria-modal="true"
          aria-label={BRAND.name}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-marble lg:hidden"
        >
          {/* Üst şerit: marka + kapat düğmesi */}
          <div className="mx-auto flex h-16 w-full max-w-[1400px] shrink-0 items-center justify-between px-5 sm:px-8 md:h-[72px]">
            <span className="font-heading text-xl font-extrabold tracking-tight text-ink">
              {BRAND.name}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              aria-label="Menüyü kapat"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-ink outline-none transition-colors hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-teal"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Bağlantı listesi */}
          <nav
            aria-label={BRAND.name}
            className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-5 pt-4 sm:px-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="border-b border-ink/10 py-4 text-2xl font-semibold tracking-tight text-ink outline-none transition-colors hover:text-teal focus-visible:ring-2 focus-visible:ring-teal"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Alt: arama ve WhatsApp düğmeleri */}
          <div className="mx-auto flex w-full max-w-[1400px] shrink-0 flex-col gap-3 px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
            <a
              href={CONTACT.phoneHref}
              onClick={closeMenu}
              className="flex min-h-12 items-center justify-center gap-3 rounded-xl bg-amber px-6 py-3 text-base font-semibold text-ink shadow-sm ring-1 ring-black/10 outline-none transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-teal"
            >
              <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-xs font-medium uppercase tracking-wide">
                  {CONTACT_COPY.callCta}
                </span>
                <span className="font-digits text-lg tracking-tight whitespace-nowrap">
                  {CONTACT.phoneDisplay}
                </span>
              </span>
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-ink/15 bg-white px-6 py-3 text-base font-semibold text-ink outline-none transition-colors hover:border-ink/30 focus-visible:ring-2 focus-visible:ring-teal"
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              {CONTACT_COPY.whatsappCta}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
