import { cn } from "@/lib/utils";

/**
 * Sade bölüm başlığı: büyük başlık + isteğe bağlı alt metin.
 * Rozet/pill kullanılmaz. Alt metin varsayılan olarak tam genişliktedir.
 */
export function SectionHeading({
  title,
  subtitle,
  tone = "light",
  align = "left",
  className,
}: {
  title: React.ReactNode;
  subtitle?: string;
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "text-left",
        className
      )}
    >
      <h2
        className={cn(
          "font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-3 text-lg leading-relaxed",
            dark ? "text-mist" : "text-ink/70"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
