import { cn } from "@/lib/utils";

/**
 * Bölümler arası tek-sinüs dalga ayracı.
 * `fill`: dalganın (ALTTAKİ bölümün) rengi — CSS renk değeri.
 * `flip`: dalgayı dikeyde aynalar (bölümün altına koymak için).
 */
export function WaveDivider({
  fill,
  flip = false,
  className,
}: {
  fill: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative -mb-px w-full overflow-hidden leading-none",
        flip && "rotate-180",
        className
      )}
    >
      <svg
        className="block h-[48px] w-full sm:h-[72px]"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 40 C 240 8 480 8 720 40 C 960 72 1200 72 1440 40 L 1440 72 L 0 72 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
