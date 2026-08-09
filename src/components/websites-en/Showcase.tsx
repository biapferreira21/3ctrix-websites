import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { FadeIn } from "./ui/motion";
import { ShowcaseStage } from "./showcase/ShowcaseStage";
import { ShowcaseFX } from "./showcase/ShowcaseFX";

export function Showcase() {
  return (
    <section
      id="showcase"
      className="relative overflow-hidden bg-[#e8e0fb] py-24 text-ink sm:py-28"
    >
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-emerald/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />

      <Container className="relative">
        <SectionHeading
          eyebrow="What we build"
          title="Websites adapted to each type of business."
        />
        <FadeIn className="mx-auto mt-3 max-w-md text-center">
          <p className="text-sm text-slate">
            Realistic prototypes for different types of business.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="relative mt-14">
          <div className="absolute -inset-2 translate-x-2 translate-y-2 rounded-[2.4rem] border-4 border-night bg-emerald" />
          <div className="relative overflow-hidden rounded-[2.4rem] border-4 border-night bg-night px-3 py-12 shadow-[10px_10px_0_#C69A44] sm:px-8 sm:py-16">
            <ShowcaseFX />
            <div className="relative">
              <ShowcaseStage />
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
