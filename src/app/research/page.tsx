import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/studio/PageHero";
import { SectionHeader } from "@/components/studio/SectionHeader";
import { FAQAccordion } from "@/components/studio/FAQAccordion";
import { StudioContactForm } from "@/components/studio/StudioContactForm";
import { ResearchLens } from "@/components/studio/ResearchLens";
import { ServiceExplorer } from "@/components/studio/ServiceExplorer";
import { researchContent as content } from "@/content/research";

export const metadata: Metadata = {
  title: "Research and Information Quality | 3C Trix",
  description:
    "Research and tools focused on source traceability, context, uncertainty and the quality of information used in decisions.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "3C Trix Research & Information Quality",
    description:
      "Research that keeps sources, context, uncertainty and important qualifications visible.",
    url: "/research",
  },
};

export default function ResearchPage() {
  return (
    <>
      <Header />
      <main id="content">
        <PageHero content={content.hero} visual="research" />

        <section className="border-b-[3px] border-night bg-white py-20 sm:py-28">
          <Container>
            <SectionHeader
              eyebrow="Research themes"
              title="The topics we explore."
            />
            <ul className="mt-8 flex flex-wrap gap-3">
              {content.themes.map((theme) => (
                <li key={theme} className="rounded-full border-2 border-night bg-[#f5f1e8] px-4 py-2 text-sm font-semibold text-ink">
                  {theme}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section id="research-services" className="border-b-[3px] border-night bg-mint-soft py-20 sm:py-28">
          <Container>
            <SectionHeader eyebrow="Research & editorial services" title="Start with what you need to explain." />
            <ServiceExplorer research />
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-night py-20 text-white sm:py-28">
          <Container>
            <SectionHeader
              eyebrow="Experience"
              title="Research & editorial work."
              tone="dark"
            />
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {content.experience.map(([name, description]) => (
                <article key={name} className="rounded-2xl border border-white/30 bg-white/5 p-5">
                  <h3 className="text-base font-semibold leading-5 text-white">{name}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/60">{description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="research-directions" className="border-b-[3px] border-night bg-[#f5f1e8] py-20 sm:py-28">
          <Container>
            <SectionHeader
              eyebrow="Information quality, in practice"
              title="Shorter should still mean accurate."
              text="See how a summary changes when its limits disappear."
            />
            <div className="mt-10"><ResearchLens /></div>
          </Container>
        </section>

        <section id="method" className="border-b-[3px] border-night bg-white py-20 sm:py-28">
          <Container>
            <SectionHeader eyebrow="Method" title="From question to publication." />
            <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {content.process.map(([title, text], index) => (
                <li key={title} className="border-t-[3px] border-night pt-5">
                  <span className="text-xs font-bold tracking-[0.18em] text-emerald-dark">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">{text}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-[#e8e0fb] py-20 sm:py-28">
          <Container className="flex flex-wrap items-center justify-between gap-8">
            <SectionHeader eyebrow="AlphaVote experiment" title="Answer first. Compare after." />
            <a href="/#alphavote" className="inline-flex min-h-12 items-center gap-2 rounded-full border-[3px] border-night bg-white px-6 py-3 text-sm font-bold text-ink">Try the voting cards <ArrowRight size={16} aria-hidden /></a>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-white py-20 sm:py-28">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.75rem] border-[3px] border-night bg-mint shadow-[8px_8px_0_#8FA38A]">
                <Image src="/beatriz-founder.png" alt="Beatriz Ferreira, Founder of 3C Trix Studio" fill sizes="(max-width: 1024px) 90vw, 380px" className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-dark">About the founder</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-5xl">Research led by Beatriz Ferreira.</h2>
                <p className="mt-6 text-base leading-7 text-slate">
                  Beatriz brings together research, product management and media experience across AI, technology and digital finance.
                </p>
                <a href="/#profile" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-forest underline underline-offset-4">About Beatriz <ArrowRight size={15} aria-hidden /></a>
              </div>
            </div>
          </Container>
        </section>

        <section id="engagements" className="border-b-[3px] border-night bg-[#f6dfb6] py-20 sm:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_.9fr]">
              <div>
                <SectionHeader
                  eyebrow="Engagements"
                  title="A project shaped around your question."
                  text="Scope and price agreed before work begins."
                />
                <p className="mt-7 text-2xl font-semibold text-forest">Custom pricing</p>
                <a href="#contact" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border-[3px] border-night bg-emerald px-6 py-3 text-sm font-bold text-night">
                  Discuss a research or content project <ArrowRight size={17} aria-hidden />
                </a>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {["Articles & research reports", "Speaker interviews", "News of the week", "Industry concept explainers", "Blog & social content series", "SEO-led event content"].map((format) => (
                  <li key={format} className="flex items-center gap-3 rounded-2xl border-2 border-night bg-white p-4 text-sm font-medium text-ink">
                    <Check size={17} className="text-emerald-dark" aria-hidden /> {format}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-white py-20 sm:py-28">
          <Container>
            <SectionHeader eyebrow="Questions" title="Research and content, clarified." align="center" />
            <div className="mt-12"><FAQAccordion items={content.faq} /></div>
          </Container>
        </section>

        <StudioContactForm
          title="What do you need to understand or explain?"
          text="Tell us the topic, audience, format and intended outcome."
          submitLabel="Discuss the project"
          source="Research enquiry"
          fields={[
            { name: "name", label: "Name", required: true, autoComplete: "name" },
            { name: "company", label: "Company or publication", autoComplete: "organization" },
            { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
            { name: "topic", label: "Topic", required: true },
            { name: "audience", label: "Intended audience" },
            { name: "format", label: "Required format" },
            { name: "deadline", label: "Approximate deadline" },
            { name: "message", label: "Message", type: "textarea", required: true },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
