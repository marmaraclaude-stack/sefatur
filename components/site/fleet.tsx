import Image from "next/image";
import { Check, Luggage, Snowflake, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FLEET } from "@/lib/copy";
import { IMAGES } from "@/lib/images";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

const VEHICLE_IMAGES = [IMAGES.fleet1, IMAGES.fleet2];

/** Spec metnini uygun lucide ikonuna eşler (koltuk, klima, bagaj, şarj). */
function specIcon(spec: string): LucideIcon {
  const s = spec.toLocaleLowerCase("tr-TR");
  if (s.includes("koltuk")) return Users;
  if (s.includes("klima")) return Snowflake;
  if (s.includes("bagaj")) return Luggage;
  if (s.includes("usb") || s.includes("şarj")) return Zap;
  return Check;
}

/** Araçlarımız: iki araç kartı; görsel üstünde cam rozet, gövdede ikonlu spec satırı. */
export function Fleet() {
  return (
    <section id="araclar" className="bg-sand py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading title={FLEET.title} subtitle={FLEET.subtitle} />

        <ul className="mt-8 grid gap-6 md:grid-cols-2 sm:mt-10">
          {FLEET.vehicles.map((vehicle, i) => {
            const image = VEHICLE_IMAGES[i] ?? VEHICLE_IMAGES[0];
            return (
              <FadeIn as="li" key={vehicle.id} delay={i * 0.08}>
                <article className="group overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink/5 transition duration-300 hover:-translate-y-1 hover:shadow-card-lg">
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
                    <h3 className="text-xl font-bold tracking-tight text-ink">
                      {vehicle.name}
                    </h3>
                    <p className="mt-1 text-[15px] text-ink/60">
                      {vehicle.role}
                    </p>
                    <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink/10 pt-4">
                      {vehicle.specs.map((spec, j) => {
                        const Icon = specIcon(spec);
                        return (
                          <li
                            key={spec}
                            className="flex items-center gap-x-3"
                          >
                            {j > 0 ? (
                              <span aria-hidden="true" className="text-ink/30">
                                ·
                              </span>
                            ) : null}
                            <span className="flex items-center gap-1.5 text-sm font-medium text-ink/70">
                              <Icon
                                aria-hidden="true"
                                className="size-4 shrink-0 text-forest"
                              />
                              {spec}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
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
