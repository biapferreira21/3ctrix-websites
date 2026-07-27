import type { Metadata } from "next";
import { Check, MessageCircle, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { pricing, pricingNote } from "@/config/pricing";
import { included } from "@/config/content";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Preços",
  description:
    "Conheça os preços de criação, redesign, manutenção e SEO da 3C Trix Studio.",
  alternates: { canonical: "/precos" },
};

const cardTones = [
  {
    shell: "border-emerald/30 bg-[#153d2b]",
    tab: "bg-emerald text-night",
    accent: "text-emerald-glow",
    icon: "bg-emerald/15 text-emerald-glow",
  },
  {
    shell: "border-lilac/30 bg-[#382f58]",
    tab: "bg-lilac text-night",
    accent: "text-lilac-soft",
    icon: "bg-lilac/15 text-lilac-soft",
  },
  {
    shell: "border-gold/35 bg-[#49351f]",
    tab: "bg-gold text-night",
    accent: "text-gold-light",
    icon: "bg-gold/15 text-gold-light",
  },
];

export default function PricingPage() {
  const mainPlans = pricing.slice(0, 3);
  const customPlan = pricing[3];

  return (
    <>
      <Header variant="solid" />
      <main id="conteudo" className="overflow-hidden bg-paper pt-20">
        <section className="relative border-b-4 border-night bg-night py-24 text-white sm:py-28">
          <div className="comic-dots pointer-events-none absolute inset-0 opacity-20" />
          <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-lilac/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />

          <Container className="relative">
            <FadeIn className="mx-auto max-w-3xl text-center">
              <span className="inline-flex -rotate-1 items-center gap-2 rounded-full border-2 border-night bg-gold px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-night shadow-[4px_4px_0_#9985DC]">
                <Sparkles size={14} aria-hidden />
                Preços claros, projeto à medida
              </span>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Escolha o ponto de partida.
                <span className="mt-2 block text-gradient">Nós tratamos do resto.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                Soluções flexíveis para modernizar, criar ou acompanhar o
                website do seu negócio.
              </p>
            </FadeIn>

            <Stagger className="mt-16 grid items-start gap-5 lg:grid-cols-3">
              {mainPlans.map((plan, index) => {
                const tone = cardTones[index];
                return (
                  <StaggerItem key={plan.id} className={cn("h-full", plan.featured && "lg:-translate-y-4")}>
                    <article
                      id={plan.id}
                      className={cn(
                        "group relative flex h-full min-h-[32rem] scroll-mt-28 flex-col overflow-hidden rounded-[2rem] border-[4px] p-6 shadow-[7px_7px_0_#C69A44] transition-transform duration-300 hover:-translate-y-2 sm:p-7",
                        tone.shell
                      )}
                    >
                      <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/5 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                      <div className="relative">
                        <span className={cn("inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em]", tone.tab)}>
                          {plan.featured ? "Mais procurado" : index === 1 ? "Novo projeto" : "Apoio contínuo"}
                        </span>
                        <h2 className="mt-7 font-display text-2xl font-semibold text-white">
                          {plan.title}
                        </h2>
                        <p className="mt-3 min-h-16 text-sm leading-relaxed text-white/55">
                          {plan.description}
                        </p>
                        <p className={cn("mt-7 font-display text-3xl font-semibold leading-tight", tone.accent)}>
                          {plan.price}
                        </p>
                      </div>

                      <ul className="relative mt-8 space-y-3 border-t border-white/10 pt-6">
                        {plan.highlights.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                            <span className={cn("inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full", tone.icon)}>
                              <Check size={15} aria-hidden />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Button
                        href="/#contacto"
                        variant="outlineLight"
                        size="lg"
                        className="relative mt-auto w-full"
                      >
                        Pedir orçamento
                      </Button>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>

            <FadeIn className="mt-5">
              <div id={customPlan.id} className="flex scroll-mt-28 flex-col items-start justify-between gap-6 rounded-[2rem] border-[3px] border-white bg-white/[0.08] p-6 shadow-[6px_6px_0_#9985DC] backdrop-blur-sm sm:flex-row sm:items-center sm:p-8">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
                    Solução personalizada
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-white">
                    {customPlan.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">
                    {customPlan.description}
                  </p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="font-display text-xl font-semibold text-gold-light">
                    {customPlan.price}
                  </p>
                  <Button href="/#contacto" variant="accent" className="mt-4">
                    Falar sobre o projeto
                  </Button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>

        <section className="relative bg-[#f4f0e7] py-24 sm:py-28">
          <div className="comic-dots pointer-events-none absolute inset-0 opacity-30" />
          <Container className="relative">
            <FadeIn className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-dark">
                Incluído no projeto
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                {included.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate">
                Uma base sólida para lançar um website profissional, rápido e
                simples de utilizar.
              </p>
            </FadeIn>

            <Stagger className="mx-auto mt-14 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {included.items.map((item, index) => (
                <StaggerItem key={item}>
                  <div className="group flex min-h-20 items-center gap-3 rounded-2xl border-[3px] border-night bg-white p-4 shadow-[5px_5px_0_#9985DC] transition-all hover:-translate-y-1">
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                        index % 3 === 0 && "bg-emerald/10 text-emerald-dark",
                        index % 3 === 1 && "bg-lilac/20 text-lilac-deep",
                        index % 3 === 2 && "bg-gold/20 text-gold-deep"
                      )}
                    >
                      <Check size={17} aria-hidden />
                    </span>
                    <span className="text-sm font-medium leading-snug text-ink">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <FadeIn className="mx-auto mt-10 max-w-3xl rounded-2xl border border-sage/25 bg-mist/70 p-5 text-center">
              <p className="text-sm leading-relaxed text-slate">{included.note}</p>
            </FadeIn>
          </Container>
        </section>

        <section className="pb-24 sm:pb-28">
          <Container>
            <FadeIn className="relative overflow-hidden rounded-[2rem] border-[4px] border-night bg-forest-deep px-6 py-12 text-center text-white shadow-[8px_8px_0_#C69A44] sm:px-10">
              <div className="pointer-events-none absolute -left-12 top-0 h-44 w-44 rounded-full bg-lilac/20 blur-3xl" />
              <div className="pointer-events-none absolute -right-12 bottom-0 h-44 w-44 rounded-full bg-gold/20 blur-3xl" />
              <MessageCircle className="relative mx-auto text-emerald-glow" size={28} aria-hidden />
              <h2 className="relative mt-4 font-display text-3xl font-semibold">
                Não sabe qual é a melhor opção?
              </h2>
              <p className="relative mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/65">
                Conte-nos o que precisa. A análise inicial ajuda a definir a
                solução certa sem compromisso.
              </p>
              <Button href="/#contacto" variant="accent" size="lg" className="relative mt-7">
                Pedir análise gratuita
              </Button>
              <p className="relative mx-auto mt-6 max-w-2xl text-xs text-white/45">
                {pricingNote}
              </p>
            </FadeIn>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
