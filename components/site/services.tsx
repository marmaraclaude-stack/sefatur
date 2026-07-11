/**
 * Hizmetler: "hayalet numaralı" bento ızgara. Ana hizmet (hat seferleri)
 * tam genişlik koyu kartta yaşar; sağındaki mini pano SCHEDULE verisinden
 * her kalkış noktasının ilk ve son seferini türetir. Diğer üç hizmet,
 * hover'da renklenen büyük hayalet numaralı beyaz kartlardır; tur ve
 * kiralama kartları iletişime bağlanır. Fiyat yönlendirmesi bölüm sonunda
 * tek zarif satırdır.
 */
import {
  ArrowRight,
  ArrowUpRight,
  BusFront,
  Check,
  GraduationCap,
  KeyRound,
  Map,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/copy";
import { SCHEDULE } from "@/lib/data";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";

type ServiceId = (typeof SERVICES.items)[number]["id"];

const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  hat: BusFront,
  tur: Map,
  servis: GraduationCap,
  kiralama: KeyRound,
};

/** Mini pano satırları: her kalkış noktasının günün ilk ve son seferi. */
const BOARD_ROWS = SCHEDULE.map((point) => {
  const times = [...point.times].sort();
  return {
    id: point.id,
    name: point.name,
    to: point.to,
    first: times[0],
    last: times[times.length - 1],
  };
});

const [PRIMARY, ...SECONDARY] = SERVICES.items;
const PrimaryIcon = SERVICE_ICONS[PRIMARY.id];

export function Services() {
  return (
    <section id="hizmetler" className="bg-marble py-14 sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          align="left"
          title={SERVICES.title}
          subtitle={SERVICES.subtitle}
        />

        {/* Bento: [hat x2] / [tur][servis] / [kiralama x2] */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 lg:grid-cols-2">
          {/* 01 · Ana hizmet: koyu, tam genişlik, canlı mini panolu */}
          <FadeIn className="lg:col-span-2">
            <article className="relative overflow-hidden rounded-2xl bg-linear-to-br from-navy to-deep p-6 text-white shadow-card-lg sm:p-8 lg:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-28 -right-20 size-80 rounded-full bg-skylight/15 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-36 -left-24 size-80 rounded-full bg-sky/10 blur-3xl"
              />

              <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
                <div>
                  <div
                    aria-hidden
                    className="flex size-12 items-center justify-center rounded-xl bg-skylight/15 text-skylight"
                  >
                    <PrimaryIcon className="size-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                    {PRIMARY.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-mist sm:text-lg">
                    {PRIMARY.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
                    {PRIMARY.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-2 text-[15px] font-medium text-white/90"
                      >
                        <Check
                          aria-hidden
                          className="size-4 shrink-0 text-skylight"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mini pano: kalkış noktası başına ilk ve son sefer */}
                <div className="rounded-xl border border-white/10 bg-white/[0.05] p-5">
                  <ul className="divide-y divide-white/10">
                    {BOARD_ROWS.map((row) => (
                      <li
                        key={row.id}
                        className="flex items-center justify-between gap-4 py-3 text-sm first:pt-0"
                      >
                        <span className="flex min-w-0 items-center gap-1.5 font-semibold text-white">
                          {row.name}
                          <ArrowRight
                            aria-hidden
                            className="size-3.5 shrink-0 text-skylight"
                          />
                          <span className="truncate font-medium text-mist">
                            {row.to}
                          </span>
                        </span>
                        <span className="shrink-0 tabular-nums">
                          <span className="font-semibold text-white">
                            {row.first}
                          </span>
                          <span className="text-mist"> ... </span>
                          <span className="font-semibold text-white">
                            {row.last}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#seferler"
                    className="group/link mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg text-sm font-semibold text-skylight transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-skylight focus-visible:outline-none"
                  >
                    Tüm saatler
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform group-hover/link:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>
            </article>
          </FadeIn>

          {/* 02, 03, 04 · Hayalet numaralı beyaz kartlar */}
          {SECONDARY.map((item, index) => {
            const Icon = SERVICE_ICONS[item.id];
            const numeral = String(index + 2).padStart(2, "0");
            const wide = item.id === "kiralama";
            const linked = item.id !== "servis";
            return (
              <FadeIn
                key={item.id}
                delay={(index + 1) * 0.06}
                className={cn("h-full", wide && "lg:col-span-2")}
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-sky/40 hover:shadow-card-lg sm:p-8">
                  {/* Hayalet numara: üstten kırpılır, hover'da renklenir */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-5 -right-2 text-7xl leading-none font-extrabold tracking-tighter text-ice transition-colors duration-300 select-none group-hover:text-skylight/60"
                  >
                    {numeral}
                  </span>

                  {linked ? (
                    <ArrowUpRight
                      aria-hidden
                      className="absolute top-6 right-6 size-5 translate-x-1 -translate-y-1 text-forest opacity-0 transition duration-300 group-focus-within:translate-x-0 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  ) : null}

                  <div
                    aria-hidden
                    className="flex size-12 items-center justify-center rounded-xl bg-ice text-forest"
                  >
                    <Icon className="size-6" strokeWidth={1.75} />
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-ink">
                    {linked ? (
                      /* Uzatılmış bağlantı: tüm kart iletişime götürür */
                      <a
                        href="#iletisim"
                        aria-label={`${item.name}: ${SERVICES.pricingLink}`}
                        className="after:absolute after:inset-0 after:rounded-2xl after:ring-forest after:ring-inset focus-visible:outline-none focus-visible:after:ring-2"
                      >
                        {item.name}
                      </a>
                    ) : (
                      item.name
                    )}
                  </h3>

                  <p
                    className={cn(
                      "mt-2 text-base leading-relaxed text-ink/70",
                      wide && "max-w-2xl"
                    )}
                  >
                    {item.description}
                  </p>

                  <ul
                    className={cn(
                      "grid gap-x-8 gap-y-2.5",
                      wide ? "mt-5 sm:grid-cols-3" : "mt-auto pt-5"
                    )}
                  >
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-[15px] text-ink/70"
                      >
                        <Check
                          aria-hidden
                          className="mt-0.5 size-4 shrink-0 text-forest"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeIn>
            );
          })}
        </div>

        {/* Fiyat yönlendirmesi: tek zarif satır */}
        <FadeIn delay={0.15}>
          <p className="mt-8 text-base text-ink/60">
            {SERVICES.pricingNote}{" "}
            <a
              href="#iletisim"
              className="group/link -my-3 inline-flex items-center gap-1.5 rounded py-3 font-semibold text-forest transition-colors hover:text-sky focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none"
            >
              <span className="underline decoration-forest/30 decoration-2 underline-offset-4 group-hover/link:decoration-sky/50">
                {SERVICES.pricingLink}
              </span>
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover/link:translate-x-0.5"
              />
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
