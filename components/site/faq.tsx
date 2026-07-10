"use client";

/**
 * SSS — tek seferde bir sorunun açık kaldığı akordeon.
 * Son satır: soruya gizlenmiş telefon CTA'sı.
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
    <section id="sss" className="bg-marble py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={FAQ.eyebrow}
          title={FAQ.title}
          subtitle={FAQ.subtitle}
        />

        <div className="mt-12">
          {FAQ.items.map((item, i) => {
            const isOpen = open === i;
            const triggerId = `sss-soru-${i}`;
            const panelId = `sss-cevap-${i}`;
            return (
              <FadeIn key={item.q} delay={Math.min(i * 0.06, 0.3)}>
                <div
                  className={cn(
                    "border-b border-ink/10 px-5 transition duration-300",
                    isOpen && "rounded-2xl border-transparent bg-white shadow-sm"
                  )}
                >
                  <h3 className="font-body">
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-14 w-full items-center justify-between gap-4 rounded-lg py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
                    >
                      <span className="font-semibold text-ink">{item.q}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "h-5 w-5 shrink-0 text-teal transition-transform duration-300",
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
                        transition={{
                          duration: 0.3,
                          ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 leading-relaxed text-ink/70">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}

          {/* Akordeon değil: soru kılığında telefon CTA'sı */}
          <FadeIn delay={0.35}>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4 px-5 py-6">
              <p className="font-semibold text-ink">
                {"Sorunuz mu var? Fuat Bey'i arayın"}
              </p>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-deep shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-marble motion-reduce:hover:translate-y-0"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                <span className="font-digits tracking-wide">
                  {CONTACT.phoneDisplay}
                </span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
