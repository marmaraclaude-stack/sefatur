/**
 * Hero altındaki akan güven şeridi: hizmet özellikleri sonsuz döngüde akar.
 * Hover ve klavye odağında durur; hareket azaltma tercihinde sabittir.
 * İçerik iki kez render edilir; animasyon -%50 kaydırarak kusursuz döngü kurar.
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
      className="group relative flex w-full overflow-hidden bg-forest py-3.5 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] focus-visible:ring-2 focus-visible:ring-skylight focus-visible:outline-none"
    >
      <div className="flex w-max shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
        <ItemRow />
        <ItemRow />
      </div>
    </div>
  );
}
