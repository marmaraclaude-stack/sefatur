"use client";

/**
 * SSS: tek seferde bir sorunun açık olduğu akordeon.
 * Geniş ekranda iki sütuna yayılır (tam genişlik kullanımı);
 * bölüm sonunda iletişime yönlendiren küçük bir bağlantı vardır.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { FAQ } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

type Item = (typeof FAQ.items)[number];

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: Item;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const triggerId = `sss-soru-${index}`;
  const panelId = `sss-cevap-${index}`;
  return (
    <div
      className={cn(
        "mb-4 rounded-2xl border bg-white shadow-card transition-colors",
        isOpen ? "border-sky/40" : "border-ink/[0.06]"
      )}
    >
      <h3>
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left transition-colors hover:bg-sand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest sm:px-6"
        >
          <span className="text-lg font-semibold text-ink">{item.q}</span>
          <span
            aria-hidden="true"
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full transition",
              isOpen
                ? "bg-linear-to-br from-sky to-skylight text-ink"
                : "bg-sand text-forest group-hover:bg-ice"
            )}
          >
            <ChevronDown
              className={cn(
                "size-5 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </span>
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
            <p className="mb-5 ml-5 border-l-2 border-sky/40 pl-4 pr-5 text-base leading-relaxed text-ink/70 sm:ml-6 sm:pr-6">
              {item.a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const left = FAQ.items.map((item, i) => ({ item, i })).filter((x) => x.i % 2 === 0);
  const right = FAQ.items.map((item, i) => ({ item, i })).filter((x) => x.i % 2 === 1);

  return (
    <section
      id="sss"
      className="relative overflow-hidden bg-sand py-10 sm:py-14"
    >
      {/* Zemin: nokta deseni */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,rgb(56_87_55/0.06)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(32rem_at_10%_90%,black,transparent)]"
      />
      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading align="left" title={FAQ.title} subtitle={FAQ.subtitle} />

        <FadeIn delay={0.05} className="mt-8 grid items-start gap-x-5 lg:grid-cols-2">
          <div>
            {left.map(({ item, i }) => (
              <FaqItem
                key={item.q}
                item={item}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
          <div>
            {right.map(({ item, i }) => (
              <FaqItem
                key={item.q}
                item={item}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-6 flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/[0.06] bg-white px-6 py-5 shadow-card">
            <p className="text-base font-semibold text-ink">Sorunuz mu var?</p>
            <a
              href="#iletisim"
              className="group -my-2.5 inline-flex items-center gap-1.5 rounded py-2.5 text-base font-semibold text-forest transition-colors hover:text-sky focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none"
            >
              <span className="underline decoration-forest/30 decoration-2 underline-offset-4 group-hover:decoration-sky/50">
                Bize ulaşın
              </span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
