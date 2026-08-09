import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-dark">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text && (
        <p className="mt-5 text-base leading-7 text-slate sm:text-lg">{text}</p>
      )}
    </div>
  );
}
