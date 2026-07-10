import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/ui/fade-in";

/**
 * Tutarlı bölüm başlığı: küçük etiket (eyebrow) + büyük başlık + alt metin.
 * `tone`: açık zeminde "light", koyu zeminde "dark".
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "center",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <FadeIn
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
          dark
            ? "bg-glow/10 text-glow ring-1 ring-glow/25"
            : "bg-teal/10 text-teal ring-1 ring-teal/20"
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            dark ? "text-mist" : "text-ink/70"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </FadeIn>
  );
}
