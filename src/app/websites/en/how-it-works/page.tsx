import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "How It Works | Website Services",
  description:
    "A clear website design and redesign process, from the first review to launch and ongoing support.",
  alternates: {
    canonical: "/websites/en/how-it-works",
    languages: {
      "pt-PT": "/websites/como-funciona",
      en: "/websites/en/how-it-works",
    },
  },
};

const steps = [
  {
    number: "01",
    title: "Initial review",
    text: "We review your current website, business goals and the main opportunities for improvement.",
  },
  {
    number: "02",
    title: "Scope and proposal",
    text: "You receive a clear recommendation covering structure, functionality, timings and investment.",
  },
  {
    number: "03",
    title: "Content and structure",
    text: "We organise the information so visitors can understand your offer and act without friction.",
  },
  {
    number: "04",
    title: "Design and development",
    text: "The approved direction becomes a responsive, accessible and business-ready website.",
  },
  {
    number: "05",
    title: "Review and launch",
    text: "We test the experience, make the agreed refinements and publish it on your domain.",
  },
  {
    number: "06",
    title: "Optional support",
    text: "Maintenance and future improvements remain available when your business needs them.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <>
      <Header variant="solid" />
      <main id="conteudo" className="pt-20">
        <section className="relative overflow-hidden border-b-[3px] border-night bg-[#e8e0fb] py-16 sm:py-20">
          <div className="comic-dots pointer-events-none absolute inset-0 opacity-35" />
          <Container className="relative">
            <FadeIn className="mx-auto max-w-3xl text-center">
              <p className="mb-4 inline-flex -rotate-1 items-center rounded-full border-2 border-night bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-forest-deep shadow-[4px_4px_0_#C69A44]">
                Process and studio
              </p>
              <h1 className="font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-6xl">
                How we work.
              </h1>
              <p className="mt-4 text-lg text-slate">
                A clear path from the first conversation to a website published
                on your domain.
              </p>
            </FadeIn>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-[#f4f0e7] py-24 sm:py-28">
          <div className="comic-dots pointer-events-none absolute inset-0 opacity-30" />
          <Container className="relative">
            <FadeIn className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-dark">
                How it works
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                From first review to launch.
              </h2>
            </FadeIn>
            <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, index) => (
                <StaggerItem key={step.number}>
                  <article
                    className={[
                      "h-full rounded-2xl border-[3px] border-night p-6",
                      index % 3 === 0
                        ? "bg-[#dfece2] shadow-[6px_6px_0_#3E855A]"
                        : index % 3 === 1
                          ? "bg-[#e8e0fb] shadow-[6px_6px_0_#9985DC]"
                          : "bg-[#f6dfb6] shadow-[6px_6px_0_#C69A44]",
                    ].join(" ")}
                  >
                    <span className="font-display text-3xl font-semibold text-forest-deep/30">
                      {step.number}
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate">{step.text}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-[#e8e0fb] py-24 sm:py-28">
          <Container>
            <div className="mx-auto grid max-w-4xl items-center gap-10 sm:grid-cols-[220px_1fr] sm:gap-14">
              <FadeIn className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-3xl border-[4px] border-night bg-white shadow-[8px_8px_0_#C69A44]">
                <Image
                  src="/beatriz-founder.png"
                  alt="Beatriz Ferreira, founder of 3C Trix Studio"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </FadeIn>
              <FadeIn
                delay={0.1}
                className="rounded-[1.7rem] border-[3px] border-night bg-white p-6 shadow-[7px_7px_0_#3E855A] sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-dark">
                  The founder
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
                  The person behind 3C Trix Studio.
                </h2>
                <p className="mt-5 font-display text-lg font-semibold text-forest">
                  Beatriz Ferreira
                </p>
                <p className="text-sm text-slate">Founder, 3C Trix Studio</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-slate">
                  3C Trix Studio helps small businesses build modern,
                  professional and useful websites by combining design, code
                  and a practical analysis of each business.
                </p>
              </FadeIn>
            </div>
          </Container>
        </section>

        <section className="border-t-[3px] border-night bg-[#f6dfb6] py-16 text-center">
          <Container>
            <FadeIn className="mx-auto max-w-2xl rounded-[1.7rem] border-[3px] border-night bg-white p-8 shadow-[7px_7px_0_#9985DC]">
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                Ready to improve your website?
              </h2>
              <p className="mt-3 text-slate">
                Start with a free review and a clear set of improvement
                opportunities.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button href="/websites/en#contacto" size="lg">
                  Request a free review
                </Button>
                <Button href="/websites/en" variant="secondary" size="lg">
                  Back to Websites
                </Button>
              </div>
            </FadeIn>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
