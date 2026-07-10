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
                <article className="group overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:shadow-card-lg">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 768px) 660px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-heading text-xl font-bold tracking-tight text-ink">
                        {vehicle.name}
                      </h3>
                      <p className="text-sm font-semibold text-teal">
                        {vehicle.role}
                      </p>
                    </div>
                    <p className="mt-2 text-base text-ink/70">
                      {vehicle.specs.join("  ·  ")}
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
