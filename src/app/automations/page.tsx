import type { Metadata } from "next";
import { ArrowRight, Check, CircleDot, GitBranch, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/studio/PageHero";
import { SectionHeader } from "@/components/studio/SectionHeader";
import { FAQAccordion } from "@/components/studio/FAQAccordion";
import { StudioContactForm } from "@/components/studio/StudioContactForm";
import { automationsContent as content } from "@/content/automations";

export const metadata: Metadata = {
  title: "AI Automation for Business | 3C Trix Studio",
  description:
    "3C Trix Studio designs practical AI-powered workflows and internal tools that help businesses reduce repetitive work, organise information and improve processes.",
  alternates: { canonical: "/automations" },
  openGraph: {
    title: "3C Trix Automations — Practical AI Implementation",
    description:
      "Custom automation and AI-powered workflows designed around real business processes.",
    url: "/automations",
  },
};

export default function AutomationsPage() {
  return (
    <>
      <Header />
      <main id="content">
        <PageHero content={content.hero} visual="automation" />

        <section className="border-b-[3px] border-night bg-white py-20 sm:py-28">
          <Container>
            <SectionHeader
              eyebrow="The operational problem"
              title="Most businesses do not need more tools. They need better-connected processes."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.problems.map(([title, text], index) => (
                <article key={title} className="rounded-2xl border-2 border-night bg-[#f5f1e8] p-5">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-emerald-dark">
                    FRICTION {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate">{text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="use-cases" className="border-b-[3px] border-night bg-mint-soft py-20 sm:py-28">
          <Container>
            <SectionHeader
              eyebrow="What we automate"
              title="Practical automation for real business workflows."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {content.useCases.map(([title, text], index) => (
                <article
                  key={title}
                  className="flex min-h-64 flex-col rounded-3xl border-[3px] border-night bg-white p-6 shadow-[5px_5px_0_#8FA38A]"
                >
                  <GitBranch size={21} className="text-emerald-dark" aria-hidden />
                  <h3 className="mt-8 text-xl font-semibold leading-tight text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">{text}</p>
                  <span className="mt-auto pt-6 text-[10px] font-bold tracking-[0.18em] text-sage-dark">
                    USE CASE {String(index + 1).padStart(2, "0")}
                  </span>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-night py-20 text-white sm:py-28">
          <Container>
            <SectionHeader eyebrow="Our process" title="From process review to working system." />
            <ol className="mt-14 grid gap-0 lg:grid-cols-3">
              {content.process.map(([title, text], index) => (
                <li
                  key={title}
                  className="relative border-l-2 border-white/30 pb-10 pl-8 last:pb-0 lg:border-l-0 lg:border-t-2 lg:px-5 lg:pb-0 lg:pt-9"
                >
                  <span className="absolute -left-[11px] top-0 h-5 w-5 rounded-full border-2 border-white bg-emerald lg:-top-[11px] lg:left-5" />
                  <span className="text-xs font-bold tracking-[0.18em] text-emerald-glow">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">{text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-[#f5f1e8] py-20 sm:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <SectionHeader
                eyebrow="Implementation principles"
                title="Automation should remove friction, not create more of it."
              />
              <ul className="grid gap-3 sm:grid-cols-2">
                {content.principles.map((principle) => (
                  <li key={principle} className="flex gap-3 rounded-2xl border-2 border-night bg-white p-4 text-sm leading-6 text-slate">
                    <ShieldCheck size={19} className="mt-0.5 shrink-0 text-emerald-dark" aria-hidden />
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-[#e8e0fb] py-20 sm:py-28">
          <Container>
            <div className="grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-dark">Internal case study</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-5xl">
                  {content.caseStudy.title}
                </h2>
                <p className="mt-5 text-base leading-7 text-slate">{content.caseStudy.text}</p>
                <p className="mt-7 rounded-2xl border-2 border-night bg-[#f6dfb6] p-5 text-sm font-medium leading-6 text-ink">
                  {content.caseStudy.note}
                </p>
              </div>
              <ol className="rounded-[1.75rem] border-[3px] border-night bg-white p-6 shadow-[8px_8px_0_#16180F] sm:p-8">
                {content.caseStudy.steps.map((step, index) => (
                  <li key={step} className="flex gap-4 border-b border-night/20 py-4 first:pt-0 last:border-0 last:pb-0">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald text-xs font-bold text-night">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium leading-6 text-ink">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-white py-20 sm:py-28">
          <Container>
            <SectionHeader
              eyebrow="Technology"
              title="Built with the tools that fit the process."
              text="We are tool-agnostic. The technology is selected according to the workflow, existing systems, required control and long-term maintainability."
            />
            <ul className="mt-10 flex flex-wrap gap-3">
              {content.technologies.map((technology) => (
                <li key={technology} className="rounded-full border-2 border-night bg-mint px-4 py-2 text-sm font-semibold text-forest-deep">
                  {technology}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-mint-soft py-20 sm:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <SectionHeader
                  eyebrow="Who it is for"
                  title="Designed for teams that have outgrown manual work."
                />
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {content.audiences.map((audience) => (
                    <li key={audience} className="flex items-center gap-3 text-sm text-slate">
                      <CircleDot size={15} className="shrink-0 text-emerald-dark" aria-hidden />
                      {audience}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.75rem] border-[3px] border-night bg-[#f6dfb6] p-7 shadow-[8px_8px_0_#C69A44] sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-dark">Pricing</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink">
                  Every automation begins with the process.
                </h2>
                <p className="mt-8 text-2xl font-semibold text-forest">Custom pricing</p>
                <p className="mt-3 text-sm leading-6 text-slate">
                  Pricing depends on the workflow complexity, number of systems,
                  integrations, data requirements and level of custom development.
                </p>
                <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-ink">
                  <Check size={17} aria-hidden /> Initial process assessment
                </p>
                <a href="#contact" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border-[3px] border-night bg-emerald px-6 py-3 text-sm font-bold text-night">
                  Request a process assessment <ArrowRight size={17} aria-hidden />
                </a>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-white py-20 sm:py-28">
          <Container>
            <SectionHeader eyebrow="Questions" title="AI automation, explained plainly." align="center" />
            <div className="mt-12"><FAQAccordion items={content.faq} /></div>
          </Container>
        </section>

        <StudioContactForm
          title="Show us the process you want to improve."
          text="Describe the workflow, the tools currently involved and where time is being lost."
          submitLabel="Request a process assessment"
          source="Automations enquiry"
          fields={[
            { name: "name", label: "Name", required: true, autoComplete: "name" },
            { name: "company", label: "Company", autoComplete: "organization" },
            { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
            { name: "tools", label: "Current tools" },
            { name: "process", label: "Process to improve", required: true },
            { name: "frequency", label: "Approximate frequency" },
            { name: "problem", label: "Main problem", required: true },
            { name: "message", label: "Message", type: "textarea" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
