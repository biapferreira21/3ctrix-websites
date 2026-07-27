import { Container } from "./ui/Container";
import { FadeIn } from "./ui/motion";
import { ResponsiveMockup } from "./ResponsiveMockup";

export function MockupSection() {
  return (
    <section
      id="mockup"
      className="relative overflow-hidden bg-[#f6dfb6] py-24 text-ink sm:py-28"
    >
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-lilac/30 blur-3xl" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">
          <FadeIn>
            <p className="mb-3 inline-flex -rotate-1 items-center gap-2 rounded-full border-2 border-night bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-forest-deep shadow-[4px_4px_0_#9985DC]">
              <span className="h-px w-6 bg-current opacity-50" />
              O produto final
            </p>
            <h2 className="font-display text-3xl font-semibold leading-[1.08] text-ink sm:text-[2.6rem]">
              Impecável em{" "}
              <span className="text-gradient">qualquer ecrã.</span>
            </h2>
            <p className="mt-5 max-w-md text-slate">
              Cada website é desenhado para telemóvel, tablet e computador —
              rápido, acessível e pronto a converter.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="pt-6 lg:pt-0">
            <ResponsiveMockup />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
