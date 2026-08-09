import { cn } from "@/lib/cn";
import { FadeIn } from "./motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  className,
  as: Tag = "h2",
  tone = "light",
}: SectionHeadingProps) {
  return (
    <FadeIn
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex -rotate-1 items-center gap-2 rounded-full border-2 border-night px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] shadow-[4px_4px_0_#C69A44]",
            tone === "dark"
              ? "bg-forest-deep text-emerald-glow"
              : "bg-white text-emerald-dark"
          )}
        >
          <span className="h-px w-6 bg-current opacity-50" />
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "font-display text-3xl font-semibold leading-[1.08] sm:text-[2.6rem]",
          tone === "dark" ? "text-white" : "text-ink"
        )}
      >
        {title}
      </Tag>
    </FadeIn>
  );
}
