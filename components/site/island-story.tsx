import Image from "next/image";
import { ISLAND } from "@/lib/copy";
import { IMAGES } from "@/lib/images";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

const PHOTOS = [IMAGES.islandSea, IMAGES.islandHarbor, IMAGES.islandVillage];

/**
 * Marmara Adası bölümü: tam genişlikte sade tanıtım.
 * Başlık + iki sütunlu paragraflar + üçlü fotoğraf sırası + eşit yükseklikte istatistik kartları.
 */
export function IslandStory() {
  return (
    <section id="ada" className="bg-marble py-16 sm:py-24">
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

        <FadeIn delay={0.1}>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {PHOTOS.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-ink/10"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-10 grid auto-rows-fr grid-cols-2 gap-5 lg:grid-cols-4">
            {ISLAND.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-h-[120px] flex-col justify-between rounded-xl border border-ink/10 bg-white p-6"
              >
                <div className="font-digits text-4xl font-semibold text-ink">
                  {stat.value}
                </div>
                <div className="mt-2 text-base text-ink/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
