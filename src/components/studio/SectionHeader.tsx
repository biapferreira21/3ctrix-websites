import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("mb-3 text-xs font-bold uppercase tracking-[0.18em]", tone === "dark" ? "text-emerald-glow" : "text-emerald-dark")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl", tone === "dark" ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {text && (
        <p className={cn("mt-5 text-base leading-7 sm:text-lg", tone === "dark" ? "text-white/70" : "text-slate")}>{text}</p>
      )}
    </div>
  );
}
