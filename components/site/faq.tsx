"use client";

/**
 * SSS: tek seferde bir sorunun açık olduğu sade akordeon.
 * Sorular tek kart içinde ince çizgilerle ayrılır; bölüm sonunda
 * iletişime yönlendiren küçük bir bağlantı vardır (buton tekrarı yok).
 */
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { FAQ } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="sss" className="bg-sand py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading align="left" title={FAQ.title} subtitle={FAQ.subtitle} />

        <FadeIn
          delay={0.05}
          className="mt-10 max-w-3xl divide-y divide-ink/[0.06] rounded-2xl border border-ink/[0.06] bg-white shadow-card"
        >
          {FAQ.items.map((item, i) => {
            const isOpen = open === i;
            const triggerId = `sss-soru-${i}`;
            const panelId = `sss-cevap-${i}`;
            return (
              <div key={item.q}>
                  <h3>
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-marble/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal sm:px-7 sm:py-5"
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
                        <p className="px-5 pb-5 text-base leading-relaxed text-ink/70 sm:px-7 sm:pb-6">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
            );
          })}
        </FadeIn>

        {/* Buton tekrarı yerine iletişime küçük yönlendirme */}
        <FadeIn delay={0.15}>
          <p className="mt-8 text-base text-ink/70">
            Sorunuz mu var?{" "}
            <a
              href="#iletisim"
              className="group inline-flex items-center gap-1.5 rounded font-semibold text-teal transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none"
            >
              <span className="underline decoration-teal/30 decoration-2 underline-offset-4 group-hover:decoration-ink/30">
                Bize ulaşın
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
