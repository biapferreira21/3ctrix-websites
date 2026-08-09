import type { Metadata } from "next";
import { Check, MessageCircle, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Website Pricing | 3C Trix Studio",
  description:
    "Starting prices for website redesign, new websites, maintenance, SEO and custom functionality.",
  alternates: {
    canonical: "/websites/en/pricing",
    languages: {
      "pt-PT": "/websites/precos",
      en: "/websites/en/pricing",
    },
  },
};

const plans = [
  {
    id: "redesign",
    title: "Website redesign",
    price: "From €350",
    description:
      "For modernising an existing website and helping it work more effectively.",
    highlights: ["Responsive redesign", "Reorganised content", "Basic SEO"],
    tone: "border-emerald/30 bg-[#153d2b]",
    accent: "text-emerald-glow",
    featured: true,
  },
  {
    id: "raiz",
    title: "New website",
    price: "From €500",
    description:
      "A complete digital presence planned and built from the first screen.",
    highlights: ["Tailored structure", "Up to 5 pages or sections", "Launch included"],
    tone: "border-lilac/30 bg-[#382f58]",
    accent: "text-lilac-soft",
    featured: false,
  },
  {
    id: "manutencao",
    title: "Optional maintenance",
    price: "From €100/month",
    description:
      "Ongoing support for businesses that prefer not to manage technical changes.",
    highlights: ["Updates", "Small content changes", "Technical support"],
    tone: "border-gold/35 bg-[#49351f]",
    accent: "text-gold-light",
    featured: false,
  },
] as const;

const included = [
  "Up to 5 pages or sections",
  "Responsive design",
  "Content structure",
  "Basic search optimisation",
  "Contact form",
  "Publishing on your domain",
] as const;

export default function PricingPage() {
  return (
    <>
      <Header variant="solid" />
      <main id="conteudo" className="overflow-hidden bg-paper pt-20">
        <section className="relative border-b-4 border-night bg-night py-24 text-white sm:py-28">
          <div className="comic-dots pointer-events-none absolute inset-0 opacity-20" />
          <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-lilac/20 blur-3xl" />
          <Container className="relative">
            <FadeIn className="mx-auto max-w-3xl text-center">
              <span className="inline-flex -rotate-1 items-center gap-2 rounded-full border-2 border-night bg-gold px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-night shadow-[4px_4px_0_#9985DC]">
                <Sparkles size={14} aria-hidden />
                Clear starting prices
              </span>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Choose your starting point.
                <span className="mt-2 block text-gradient">
                  We will take care of the rest.
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                Flexible options for creating, modernising or supporting your
                business website.
              </p>
            </FadeIn>

            <Stagger className="mt-16 grid items-start gap-5 lg:grid-cols-3">
              {plans.map((plan) => (
                <StaggerItem
                  key={plan.id}
                  className={plan.featured ? "h-full lg:-translate-y-4" : "h-full"}
                >
                  <article
                    id={plan.id}
                    className={`flex h-full min-h-[31rem] scroll-mt-28 flex-col rounded-[2rem] border-[4px] p-6 shadow-[7px_7px_0_#C69A44] ${plan.tone}`}
                  >
                    <span className="w-fit rounded-full bg-emerald px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-night">
                      {plan.featured ? "Most requested" : "Flexible option"}
                    </span>
                    <h2 className="mt-7 font-display text-2xl font-semibold text-white">
                      {plan.title}
                    </h2>
                    <p className="mt-3 min-h-16 text-sm leading-relaxed text-white/60">
                      {plan.description}
                    </p>
                    <p className={`mt-7 font-display text-3xl font-semibold ${plan.accent}`}>
                      {plan.price}
                    </p>
                    <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
                      {plan.highlights.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                            <Check size={15} aria-hidden />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button
                      href="/websites/en#contacto"
                      variant="outlineLight"
                      size="lg"
                      className="mt-auto w-full"
                    >
                      Request a quote
                    </Button>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>

            <FadeIn className="mt-5 rounded-[2rem] border-[3px] border-white bg-white/[0.08] p-6 shadow-[6px_6px_0_#9985DC] sm:p-8">
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
                    Tailored solution
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-white">
                    SEO and custom functionality
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
                    For bookings, integrations, advanced search visibility or
                    other business-specific requirements.
                  </p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="font-display text-xl font-semibold text-gold-light">
                    Tailored quote
                  </p>
                  <Button href="/websites/en#contacto" variant="accent" className="mt-4">
                    Discuss your project
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
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-dark">
                Included
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                More than a new design.
              </h2>
            </FadeIn>
            <Stagger className="mx-auto mt-14 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex min-h-20 items-center gap-3 rounded-2xl border-[3px] border-night bg-white p-4 shadow-[5px_5px_0_#9985DC]">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald/10 text-emerald-dark">
                      <Check size={17} aria-hidden />
                    </span>
                    <span className="text-sm font-medium text-ink">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <FadeIn className="mx-auto mt-12 max-w-3xl rounded-[2rem] border-[4px] border-night bg-forest-deep px-6 py-12 text-center text-white shadow-[8px_8px_0_#C69A44]">
              <MessageCircle className="mx-auto text-emerald-glow" size={28} aria-hidden />
              <h2 className="mt-4 font-display text-3xl font-semibold">
                Not sure which option fits?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/65">
                Tell us what you need. The initial review helps define the right
                solution without commitment.
              </p>
              <Button href="/websites/en#contacto" variant="accent" size="lg" className="mt-7">
                Request a free review
              </Button>
            </FadeIn>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
