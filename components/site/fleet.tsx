import Image from "next/image";
import {
  Luggage,
  Snowflake,
  Usb,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { FLEET } from "@/lib/copy";
import { FadeIn } from "@/components/ui/fade-in";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { WaveDivider } from "@/components/ui/wave-divider";

/** Spec metnine göre uygun mini ikon seçer. */
function specIcon(spec: string): LucideIcon {
  const s = spec.toLocaleLowerCase("tr");
  if (s.includes("klima")) return Snowflake;
  if (s.includes("koltuk")) return Users;
  if (s.includes("bagaj")) return Luggage;
  if (s.includes("usb")) return Usb;
  return Waves;
}

const PHOTO_NOTE =
  "Fotoğraflar temsilidir; araç görsellerini yakında kendi çekimlerimizle güncelleyeceğiz.";

/** Filo bölümü: güven şeridi (marquee) + duotone araç kartları. */
export function Fleet() {
  return (
    <section id="filo" aria-label={FLEET.title} className="relative">
      {/* Güven şeridi — mermer bölümden koyu gövdeye geçişi turkuaz bant yapar */}
      <div className="bg-teal py-3.5">
        <p className="sr-only">{FLEET.marquee.join(" — ")}</p>
        <div aria-hidden>
          <Marquee>
            {FLEET.marquee.map((item) => (
              <span key={item} className="flex items-center">
                <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-white">
                  {item}
                </span>
                <Waves className="mx-6 h-4 w-4 shrink-0 text-white/60" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Koyu gövde */}
      <div className="relative overflow-hidden bg-navy">
        {/* Dekoratif turkuaz parıltı */}
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-glow/10 blur-3xl animate-aurora-a motion-reduce:animate-none"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <SectionHeading
            tone="dark"
            eyebrow={FLEET.eyebrow}
            title={FLEET.title}
            subtitle={FLEET.subtitle}
          />

          <FadeIn delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-mist">
              {FLEET.vehicleBlurb}
            </p>
          </FadeIn>

          <ul className="mt-12 grid gap-8 sm:mt-14 lg:grid-cols-2">
            {FLEET.vehicles.map((vehicle, i) => (
              <FadeIn as="li" key={vehicle.id} delay={0.1 + i * 0.12}>
                <article className="group overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={vehicle.image}
                      alt={`SEFATUR beyaz Citroën Jumper minibüs — ${vehicle.name}, ${vehicle.role}`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    {/* Duotone katmanı */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-navy/30 mix-blend-multiply"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-navy to-transparent"
                    />
                  </div>

                  <div className="p-6 sm:p-7">
                    <h3 className="font-heading text-xl font-bold text-white">
                      {vehicle.name}
                    </h3>
                    <p className="mt-1 text-sm text-mist">{vehicle.role}</p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {vehicle.specs.map((spec) => {
                        const Icon = specIcon(spec);
                        return (
                          <li
                            key={spec}
                            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/90 ring-1 ring-white/15"
                          >
                            <Icon
                              aria-hidden
                              className="h-3.5 w-3.5 shrink-0 text-glow"
                            />
                            {spec}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </article>
              </FadeIn>
            ))}
          </ul>

          <FadeIn delay={0.3}>
            <p className="mt-10 text-center text-sm text-mist/70">
              {PHOTO_NOTE}
            </p>
          </FadeIn>
        </div>

        {/* Alttaki kum-bej bölüme dalga geçişi */}
        <WaveDivider fill="#EDE6D8" />
      </div>
    </section>
  );
}
