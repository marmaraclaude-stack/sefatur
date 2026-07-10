import Image from "next/image";
import { FLEET } from "@/lib/copy";
import { IMAGES } from "@/lib/images";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

const VEHICLE_IMAGES = [IMAGES.fleet1, IMAGES.fleet2];

/** Araçlarımız: sade beyaz kartlarda iki araç, fotoğraf + kısa bilgi. */
export function Fleet() {
  return (
    <section id="araclar" className="bg-sand py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading title={FLEET.title} subtitle={FLEET.subtitle} />

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {FLEET.vehicles.map((vehicle, i) => {
            const image = VEHICLE_IMAGES[i] ?? VEHICLE_IMAGES[0];
            return (
              <FadeIn as="li" key={vehicle.id} delay={i * 0.08}>
                <article className="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 768px) 660px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold tracking-tight text-ink">
                      {vehicle.name}
                    </h3>
                    <p className="mt-1 text-base text-ink/70">{vehicle.role}</p>
                    <p className="mt-2 text-base text-ink/70">
                      {vehicle.specs.join(" · ")}
                    </p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
