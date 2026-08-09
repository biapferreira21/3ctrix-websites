import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { FadeIn, Stagger, StaggerItem } from "./ui/motion";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { IconArrowUpRight, IconCheck } from "./ui/icons";
import { caseStudy } from "@/config/content";

export function CaseStudy() {
  return (
    <section id="projetos" className="relative overflow-hidden bg-[#f4f0e7] py-24 sm:py-28">
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-25" />
      <Container className="relative">
        <SectionHeading eyebrow="Caso de estudo" title={caseStudy.sectionTitle} />

        <div className="mx-auto mt-14 grid max-w-6xl items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          <FadeIn>
            <BeforeAfterSlider />
            <p className="mt-3 text-center text-xs text-slate/70">
              Arraste o cursor para comparar o antes e o depois.
            </p>
          </FadeIn>

          <FadeIn
            delay={0.1}
            y={24}
            className="rounded-[1.7rem] border-[3px] border-night bg-white p-6 shadow-[7px_7px_0_#C69A44]"
          >
            <h3 className="font-display text-2xl font-semibold text-forest">
              {caseStudy.name}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">
              {caseStudy.description}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3 rounded-2xl border border-sage/20 bg-white p-3 shadow-soft">
              <a
                href={caseStudy.before.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-night bg-lilac px-5 py-2.5 text-sm font-bold text-night shadow-[3px_3px_0_#123626] transition-all hover:-translate-y-0.5"
              >
                Website anterior
                <IconArrowUpRight size={15} />
              </a>
              <a
                href={caseStudy.after.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-night bg-emerald px-5 py-2.5 text-sm font-bold text-night shadow-[3px_3px_0_#9985DC] transition-all hover:-translate-y-0.5"
              >
                Website de raiz
                <IconArrowUpRight size={15} />
              </a>
            </div>

            <Stagger amount={0.1} className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {caseStudy.improvements.map((item) => (
                <StaggerItem key={item} className="flex items-center gap-2.5">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald/15 text-emerald-dark">
                    <IconCheck size={12} />
                  </span>
                  <span className="text-sm text-ink">{item}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
