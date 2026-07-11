import Image from "next/image";
import { ISLAND } from "@/lib/copy";
import { IMAGES } from "@/lib/images";
import { FadeIn } from "@/components/ui/fade-in";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Marmara Adası: tam genişlikte tanıtım.
 * İki sütunlu paragraflar + bento fotoğraf düzeni (bir büyük, iki küçük)
 * + görünüme girince sayan istatistik şeridi.
 */
export function IslandStory() {
  return (
    <section id="ada" className="bg-marble py-14 sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            title={ISLAND.title}
            subtitle={ISLAND.subtitle}
            align="left"
          />
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {ISLAND.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-lg leading-relaxed text-ink/70"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>

        {/* Bento fotoğraf düzeni: solda büyük, sağda iki küçük */}
        <FadeIn delay={0.1}>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-2">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:h-full sm:min-h-[420px]">
              <Image
                src={IMAGES.islandSea.src}
                alt={IMAGES.islandSea.alt}
                fill
                sizes="(min-width: 640px) 66vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            {[IMAGES.islandHarbor, IMAGES.islandVillage].map((photo) => (
              <div
                key={photo.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card sm:aspect-auto sm:h-full sm:min-h-[200px]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* İstatistikler: sayaçlı, ince çizgilerle bölünmüş tek şerit */}
        <FadeIn delay={0.15}>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/[0.06] bg-ink/[0.06] shadow-card lg:grid-cols-4">
            {ISLAND.stats.map((stat) => (
              <div key={stat.label} className="bg-white p-6 sm:p-8">
                <dd className="text-3xl font-extrabold tracking-tight text-forest sm:text-4xl">
                  <NumberTicker value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-1.5 text-sm text-ink/60 sm:text-base">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
