import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem, FadeIn } from "./ui/motion";
import { Button } from "./ui/Button";
import { pricing, pricingNote } from "@/config/pricing";
import { cn } from "@/lib/cn";

export function Pricing() {
  return (
    <section id="precos" className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Preços"
          title="Soluções adaptadas a cada negócio."
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pricing.map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <div
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1.5",
                  item.featured
                    ? "border-transparent bg-forest-deep text-white shadow-lift"
                    : "border-sage/25 bg-white hover:border-emerald/40 hover:shadow-soft"
                )}
              >
                {item.featured && (
                  <span className="mb-4 inline-flex w-fit items-center rounded-full bg-gold px-3 py-1 text-xs font-semibold text-night">
                    Mais procurado
                  </span>
                )}
                <h3
                  className={cn(
                    "font-display text-base font-semibold",
                    item.featured ? "text-white" : "text-ink"
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-4 font-display text-2xl font-semibold",
                    item.featured ? "text-gold-light" : "text-forest"
                  )}
                >
                  {item.price}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="mt-12 flex flex-col items-center gap-6 text-center">
          <p className="max-w-xl text-sm text-slate">{pricingNote}</p>
          <Button href="#contacto" size="lg">
            Pedir orçamento
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
