import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem, FadeIn } from "./ui/motion";
import { processIcons } from "./ui/icons";
import { process } from "@/config/content";

// Alterna o gradiente dos ícones entre verde→roxo e verde→dourado.
const gradients = [
  "from-emerald to-lilac-deep",
  "from-emerald to-gold",
];
const stepTones = [
  "bg-[#dfece2] shadow-[6px_6px_0_#3E855A]",
  "bg-[#e8e0fb] shadow-[6px_6px_0_#9985DC]",
  "bg-[#f6dfb6] shadow-[6px_6px_0_#C69A44]",
  "bg-[#f6d5c8] shadow-[6px_6px_0_#d47d58]",
];

export function Process() {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-[#f4f0e7] py-24 sm:py-28">
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-30" />
      <Container className="relative">
        <SectionHeading eyebrow="Como funciona" title={process.title} />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {process.steps.map((step, i) => {
            const Icon = processIcons[step.icon as keyof typeof processIcons];
            return (
              <StaggerItem key={step.number} className="h-full">
                <div className={`group relative h-full rounded-2xl border-[3px] border-night p-6 transition-all duration-300 hover:-translate-y-1.5 ${stepTones[i % 4]}`}>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-night bg-gradient-to-br ${gradients[i % 2]} text-white`}
                    >
                      {Icon && <Icon size={22} />}
                    </span>
                    <span className="font-display text-3xl font-semibold tabular-nums text-forest-deep/25">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {step.text}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <FadeIn className="mx-auto mt-10 w-fit rounded-full border-[3px] border-night bg-gold px-5 py-2.5 text-center shadow-[4px_4px_0_#9985DC]">
          <p className="text-sm font-medium text-forest-deep">{process.note}</p>
        </FadeIn>
      </Container>
    </section>
  );
}
