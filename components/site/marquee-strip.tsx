/**
 * Hero altındaki akan güven şeridi: hizmet özellikleri sonsuz döngüde akar.
 * Hover ve klavye odağında durur, hareket azaltma tercihinde sabittir.
 * Kenar solması şeridin kendi zeminine yapılır (arka plan görünmez),
 * içerik iki kez render edilir ve animasyon -%50 kaydırarak döngü kurar.
 */
import { MARQUEE_ITEMS } from "@/lib/copy";

function ItemRow() {
  return (
    <>
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap text-sm font-semibold tracking-[0.14em] text-ice uppercase">
            {item}
          </span>
          <span
            aria-hidden
            className="mx-7 size-1.5 shrink-0 rotate-45 bg-skylight/60"
          />
        </span>
      ))}
    </>
  );
}

export function MarqueeStrip() {
  return (
    <div
      aria-label="Hizmet özellikleri"
      tabIndex={0}
      className="group relative flex w-full overflow-hidden border-y border-white/10 bg-forest py-3.5 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-skylight focus-visible:outline-none"
    >
      <div className="flex w-max shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
        <ItemRow />
        <ItemRow />
      </div>

      {/* Kenar solması: şeridin kendi zeminine (beyaza değil) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-forest to-transparent sm:w-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-forest to-transparent sm:w-32"
      />
    </div>
  );
}
