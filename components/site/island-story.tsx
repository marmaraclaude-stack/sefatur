import Image from "next/image";
import { ISLAND } from "@/lib/copy";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import { NumberTicker } from "@/components/ui/number-ticker";
import { WaveDivider } from "@/components/ui/wave-divider";

/**
 * Ada hikâyesi — sıcak kum-bej editoryal bant.
 * Sol: alıntı + fotoğraf kolajı · Sağ: hikâye paragrafları + sayılarla ada.
 */
export function IslandStory() {
  return (
    <section id="ada" className="relative overflow-hidden bg-sand">
      {/* Yumuşak dekoratif ışık lekeleri */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-teal/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-24 -left-28 h-72 w-72 rounded-full bg-amber/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow={ISLAND.eyebrow}
            title={ISLAND.title}
            subtitle={ISLAND.subtitle}
            align="left"
            className="lg:col-span-2"
          />

          {/* Sol sütun: alıntı + fotoğraf kolajı */}
          <div>
            <FadeIn delay={0.05}>
              <figure className="relative pl-7 sm:pl-9">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-3 left-0 font-heading text-7xl font-bold leading-none text-teal/30 select-none sm:text-8xl"
                >
                  &ldquo;
                </span>
                <blockquote className="font-heading text-2xl leading-snug font-bold text-ink sm:text-3xl">
                  <p>{ISLAND.pullQuote}</p>
                </blockquote>
                <figcaption className="mt-4 text-sm text-ink/60">
                  <span className="font-semibold text-ink/80">
                    {ISLAND.pullQuoteAuthor}
                  </span>
                  <span aria-hidden> · </span>
                  {ISLAND.pullQuoteRole}
                </figcaption>
              </figure>
            </FadeIn>

            {/* Fotoğraf kolajı */}
            <div className="relative mt-10 sm:mt-12">
              <FadeIn delay={0.15}>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-lg">
                  <Image
                    src={ISLAND.images.harbor}
                    alt="Marmara Adası limanı — gün batımında iskeleye yanaşmış tekneler"
                    fill
                    sizes="(min-width: 1024px) 34rem, 100vw"
                    className="object-cover"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.25} className="relative z-10 -mt-10 ml-auto w-2/3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-4 ring-sand">
                  <Image
                    src={ISLAND.images.cove}
                    alt="Marmara Adası'nda berrak sulu, sakin bir koy"
                    fill
                    sizes="(min-width: 1024px) 22rem, 66vw"
                    className="object-cover"
                  />
                </div>
              </FadeIn>
              <FadeIn
                delay={0.35}
                className="absolute bottom-4 left-2 z-20 sm:bottom-6 sm:left-4"
              >
                <div className="relative h-28 w-28 rotate-3 overflow-hidden rounded-2xl shadow-lg ring-4 ring-sand">
                  <Image
                    src={ISLAND.images.marble}
                    alt="Saraylar'ın dünyaca ünlü Prokonnesos mermerinin dokusu"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Sağ sütun: paragraflar + istatistikler */}
          <div>
            <FadeIn delay={0.1}>
              <div className="space-y-5 text-ink/75 leading-[1.8]">
                {ISLAND.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </FadeIn>

            <dl className="mt-10 grid grid-cols-2 gap-6">
              {ISLAND.stats.map((stat, i) => (
                <FadeIn
                  key={stat.label}
                  delay={0.15 + i * 0.08}
                  className="flex flex-col-reverse gap-1 rounded-2xl bg-marble/60 p-4 ring-1 ring-ink/5"
                >
                  <dt className="text-sm font-medium text-teal">{stat.label}</dt>
                  <dd className="font-digits text-4xl font-bold text-ink">
                    <NumberTicker value={stat.value} suffix={stat.suffix} />
                  </dd>
                </FadeIn>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Alttaki SSS bölümü mermer-beyaz — dalga ile geçiş */}
      <WaveDivider fill="#F7F5F0" />
    </section>
  );
}
