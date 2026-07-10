"use client";

/**
 * SSS: tek seferde bir sorunun açık olduğu sade akordeon.
 * Son satır akordeon değildir; telefon çağrı düğmesi içerir.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Phone } from "lucide-react";
import { FAQ } from "@/lib/copy";
import { CONTACT } from "@/lib/data";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="sss" className="bg-sand py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading align="left" title={FAQ.title} subtitle={FAQ.subtitle} />

        <div className="mt-10 max-w-3xl">
          {FAQ.items.map((item, i) => {
            const isOpen = open === i;
            const triggerId = `sss-soru-${i}`;
            const panelId = `sss-cevap-${i}`;
            return (
              <FadeIn key={item.q} delay={Math.min(i * 0.05, 0.25)}>
                <div className="mb-3 rounded-xl border border-ink/10 bg-white">
                  <h3>
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-14 w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                    >
                      <span className="text-lg font-semibold text-ink">
                        {item.q}
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "w-5 shrink-0 text-teal transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-base leading-relaxed text-ink/70">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}

          {/* Akordeon değil: düz satır + arama düğmesi */}
          <FadeIn delay={0.3}>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-lg font-semibold text-ink">Sorunuz mu var?</p>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-amber px-6 text-base font-semibold text-ink shadow-sm ring-1 ring-black/10 transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                <Phone aria-hidden="true" className="w-5" />
                <span className="font-digits">{CONTACT.phoneDisplay}</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
