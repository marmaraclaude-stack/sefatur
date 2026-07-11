/**
 * Bölümler arası dalga geçişi.
 * `from`: üstteki bölümün zemin rengi (sarmalayıcının arka planı),
 * `fill`: alttaki bölümün rengi (dalganın dolgusu). Salt dekoratiftir.
 */
export function WaveDivider({ from, fill }: { from: string; fill: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none w-full overflow-hidden leading-none"
      style={{ backgroundColor: from }}
    >
      <svg
        className="block h-[44px] w-full sm:h-[68px]"
        viewBox="0 0 1440 68"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 38 C 220 6 460 6 720 38 C 980 70 1220 70 1440 38 L 1440 68 L 0 68 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
