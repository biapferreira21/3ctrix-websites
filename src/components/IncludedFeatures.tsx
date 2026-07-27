import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { FadeIn, Stagger, StaggerItem } from "./ui/motion";
import { IconCheck } from "./ui/icons";
import { included } from "@/config/content";

export function IncludedFeatures() {
  return (
    <section id="incluido" className="py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow="O que está incluído" title={included.title} />

        <Stagger
          amount={0.1}
          className="mx-auto mt-16 grid max-w-4xl gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {included.items.map((item) => (
            <StaggerItem
              key={item}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-mist/70"
            >
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald/15 text-emerald-dark">
                <IconCheck size={14} />
              </span>
              <span className="text-sm text-ink">{item}</span>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm text-slate">{included.note}</p>
        </FadeIn>
      </Container>
    </section>
  );
}
