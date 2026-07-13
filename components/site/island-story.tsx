import Image from "next/image";
import { Landmark, MapPin, Ship } from "lucide-react";
import { ISLAND } from "@/lib/copy";
import { IMAGES, type PlaceSlot } from "@/lib/images";
import { FadeIn } from "@/components/ui/fade-in";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SectionHeading } from "@/components/ui/section-heading";

/** Fotoğraf üzerindeki konum kartı: MapPin + yer adı */
function PlaceChip({ label }: { label: string }) {
  return (
    <span className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/60 bg-white/85 px-3.5 py-1.5 shadow-card backdrop-blur-xl">
      <MapPin aria-hidden className="size-4 shrink-0 text-forest" />
      <span className="text-sm font-semibold text-ink">{label}</span>
    </span>
  );
}

/**
 * Marmara Adası: dergi kapağı düzeninde tam genişlik tanıtım.
 * Solda büyük Marmara fotoğrafı (konum kartı + istatistik bandı),
 * sağda biri açık biri koyu iki içerik kartı, altta Topağaç ve
 * Saraylar fotoğrafları (konum kartlı).
 */
export function IslandStory() {
  return (
    <section
      id="ada"
      className="relative overflow-clip bg-marble py-10 sm:py-14"
    >
      {/* Zemin: yumuşak parıltılar */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-8%] size-[30rem] rounded-full bg-ice/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 left-[-10%] size-[26rem] rounded-full bg-forest/[0.07] blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            title={ISLAND.title}
            subtitle={ISLAND.subtitle}
            align="left"
          />
        </FadeIn>

        {/* Ana serim: 7 sütun fotoğraf + 5 sütun kart yığını */}
        <div className="mt-8 grid gap-5 lg:grid-cols-12">
          <FadeIn delay={0.05} className="lg:col-span-7">
            <figure className="group relative min-h-[420px] overflow-hidden rounded-2xl shadow-card-lg lg:h-full">
              <Image
                src={IMAGES.placeMarmara.src}
                alt={IMAGES.placeMarmara.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <PlaceChip label={IMAGES.placeMarmara.label} />

              {/* Fotoğraf üzerinde cam dokulu istatistik bandı */}
              <dl className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-3 rounded-xl border border-white/50 bg-white/80 px-5 py-4 backdrop-blur-xl sm:grid-cols-4">
                {ISLAND.stats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="text-2xl font-extrabold tracking-tight text-forest">
                      <NumberTicker value={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dt className="mt-0.5 text-xs text-ink/70">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </figure>
          </FadeIn>

          <div className="flex flex-col gap-5 lg:col-span-5">
            {/* Kart 1: mermer ve müze (açık) */}
            <FadeIn delay={0.1} className="flex-1">
              <article className="flex h-full flex-col rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card sm:p-7">
                <div
                  aria-hidden
                  className="flex size-12 items-center justify-center rounded-xl bg-ice text-forest"
                >
                  <Landmark className="size-6" strokeWidth={1.75} />
                </div>
                <p className="mt-5 text-lg leading-relaxed text-ink/70">
                  {ISLAND.paragraphs[0]}
                </p>
              </article>
            </FadeIn>

            {/* Kart 2: adaya ulaşım (koyu) */}
            <FadeIn delay={0.15} className="flex-1">
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-linear-to-br from-navy to-deep p-6 text-white shadow-card-lg sm:p-7">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-skylight/15 blur-3xl"
                />
                <div
                  aria-hidden
                  className="relative flex size-12 items-center justify-center rounded-xl bg-skylight/15 text-skylight"
                >
                  <Ship className="size-6" strokeWidth={1.75} />
                </div>
                <p className="relative mt-5 text-lg leading-relaxed text-mist">
                  {ISLAND.paragraphs[1]}
                </p>
              </article>
            </FadeIn>
          </div>
        </div>

        {/* İkili fotoğraf sırası: Topağaç ve Saraylar (konum kartlı) */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {([IMAGES.placeTopagac, IMAGES.placeSaraylar] as PlaceSlot[]).map(
            (photo, index) => (
              <FadeIn key={photo.label} delay={0.1 + index * 0.06}>
                <figure className="group relative aspect-[16/9] overflow-hidden rounded-2xl shadow-card">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <PlaceChip label={photo.label} />
                </figure>
              </FadeIn>
            )
          )}
        </div>
      </div>
    </section>
  );
}
