import Link from "next/link";
import { ArrowDown, ArrowRight, FileText, GitBranch, Layers3 } from "lucide-react";
import { Container } from "@/components/ui/Container";

type HeroContent = {
  eyebrow: string;
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  note?: string;
};

export function PageHero({
  content,
  visual = "studio",
}: {
  content: HeroContent;
  visual?: "studio" | "research" | "automation";
}) {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-night bg-[#f5f1e8] pb-20 pt-32 sm:pb-24 sm:pt-36">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -right-24 top-8 h-80 w-80 rounded-full bg-lilac/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-emerald/20 blur-3xl" />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border-2 border-night bg-mint px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-forest-deep">
              {content.eyebrow}
            </p>
            <h1 className="max-w-4xl text-[2.55rem] font-semibold leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate sm:text-lg">
              {content.text}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={content.primary.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-[3px] border-night bg-emerald px-6 py-3 text-sm font-bold text-night shadow-[4px_4px_0_#16180F] transition-transform hover:-translate-y-1"
              >
                {content.primary.label}
                <ArrowRight size={17} aria-hidden />
              </Link>
              <Link
                href={content.secondary.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-[3px] border-night bg-white px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-mint"
              >
                {content.secondary.label}
                <ArrowDown size={17} aria-hidden />
              </Link>
            </div>
            {content.note && (
              <p className="mt-6 text-sm font-medium text-forest">{content.note}</p>
            )}
          </div>

          <HeroVisual variant={visual} />
        </div>
      </Container>
    </section>
  );
}

function HeroVisual({
  variant,
}: {
  variant: "studio" | "research" | "automation";
}) {
  const labels =
    variant === "automation"
      ? ["INPUT", "REVIEW", "WORKFLOW", "OUTPUT"]
      : variant === "research"
        ? ["QUESTION", "SOURCES", "STRUCTURE", "PUBLICATION"]
        : ["RESEARCH", "CONTENT", "SYSTEMS", "PRODUCTS"];

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[34rem] rounded-[2rem] border-[3px] border-night bg-white p-5 shadow-[10px_10px_0_#8FA38A] sm:p-7"
    >
      <div className="mb-6 flex items-center justify-between border-b-2 border-night pb-4">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald" />
          <span className="h-3 w-3 rounded-full bg-gold" />
          <span className="h-3 w-3 rounded-full bg-lilac-deep" />
        </div>
        <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-slate">
          3C TRIX / SYSTEM MAP
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {labels.map((label, index) => {
          const Icon = index === 0 ? FileText : index === 1 ? Layers3 : GitBranch;
          return (
            <div
              key={label}
              className={`min-h-28 rounded-2xl border-2 border-night p-4 ${
                index === 0
                  ? "bg-mint"
                  : index === 1
                    ? "bg-[#e8e0fb]"
                    : index === 2
                      ? "bg-[#f6dfb6]"
                      : "bg-[#dfece2]"
              }`}
            >
              <Icon size={20} className="text-forest" />
              <p className="mt-6 text-[10px] font-bold tracking-[0.16em] text-slate">
                {label}
              </p>
              <div className="mt-2 h-1.5 w-full rounded bg-night/15" />
              <div className="mt-1.5 h-1.5 w-2/3 rounded bg-night/15" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
