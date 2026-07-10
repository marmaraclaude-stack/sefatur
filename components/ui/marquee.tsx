import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Sonsuz kayan şerit. İçerik iki kez render edilir; CSS animasyonu
 * -%50 kaydırarak kusursuz döngü sağlar. Hover'da durur.
 */
export function Marquee({
  children,
  className,
  innerClassName,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none",
          innerClassName
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
