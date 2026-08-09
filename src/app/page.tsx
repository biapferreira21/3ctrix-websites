import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  Check,
  ExternalLink,
  FileSearch,
  GitBranch,
  MousePointer2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/studio/PageHero";
import { SectionHeader } from "@/components/studio/SectionHeader";
import { StudioContactForm } from "@/components/studio/StudioContactForm";
import { homeContent } from "@/content/home";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "3C Trix Studio | Research, AI Automation and Digital Products",
  description:
    "3C Trix Studio combines emerging-technology research, content, AI automation, digital products and website development to help organisations understand and implement technological change.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "3C Trix Studio — Research, Content and AI Implementation",
    description:
      "We research emerging technology, communicate it clearly and build practical products, automations and business solutions.",
    url: "/",
  },
};

export default function StudioHomePage() {
  return (
    <>
      <Header />
      <main id="content">
        <PageHero content={homeContent.hero} />

        <section className="border-b-[3px] border-night bg-white py-20 sm:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
              <SectionHeader
                eyebrow={homeContent.evolution.eyebrow}
                title={homeContent.evolution.title}
              />
              <div className="space-y-5 text-base leading-7 text-slate">
                {homeContent.evolution.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <ol className="mt-14 grid gap-4 md:grid-cols-3">
              {homeContent.evolution.stages.map((stage, index) => (
                <li
                  key={stage.title}
                  className="relative rounded-3xl border-[3px] border-night bg-[#f5f1e8] p-6 shadow-[5px_5px_0_#8FA38A]"
                >
                  <span className="text-xs font-bold tracking-[0.18em] text-emerald-dark">
                    {stage.number}
                  </span>
                  <h3 className="mt-8 text-2xl font-semibold text-ink">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">{stage.text}</p>
                  {index < 2 && (
                    <ArrowRight
                      aria-hidden
                      className="absolute -right-7 top-1/2 z-10 hidden rounded-full border-2 border-night bg-emerald p-1 text-night md:block"
                      size={30}
                    />
                  )}
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section
          id="business-areas"
          className="relative overflow-hidden border-b-[3px] border-night bg-mint-soft py-20 sm:py-28"
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
          <Container className="relative">
            <SectionHeader
              eyebrow="Business areas"
              title="One studio. Four connected areas."
              text="Research is the foundation. Content, systems, websites and products are different ways of applying what we learn."
            />
            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              {homeContent.areas.map((area) => (
                <article
                  key={area.title}
                  className="group flex min-h-[22rem] flex-col rounded-[1.75rem] border-[3px] border-night bg-white p-6 shadow-[7px_7px_0_#16180F] transition-transform hover:-translate-y-1 sm:p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-xs font-bold tracking-[0.18em] text-emerald-dark">
                      AREA {area.index}
                    </span>
                    <AreaIcon theme={area.theme} />
                  </div>
                  <h3 className="mt-10 max-w-md text-3xl font-semibold leading-tight text-ink">
                    {area.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-slate sm:text-base">
                    {area.description}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8">
                    {area.external ? (
                      <a
                        href={area.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-semibold text-forest underline decoration-2 underline-offset-4"
                      >
                        {area.cta} <ExternalLink size={16} aria-hidden />
                      </a>
                    ) : (
                      <Link
                        href={area.href}
                        className="inline-flex items-center gap-2 font-semibold text-forest underline decoration-2 underline-offset-4"
                      >
                        {area.cta} <ArrowRight size={16} aria-hidden />
                      </Link>
                    )}
                    {"secondaryCta" in area && area.secondaryCta && (
                      <a
                        href={area.secondaryCta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-slate underline underline-offset-4"
                      >
                        {area.secondaryCta.label}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-night py-20 text-white sm:py-28">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-glow">
                  {homeContent.alphaVote.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
                  {homeContent.alphaVote.title}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-7 text-white/70">
                  {homeContent.alphaVote.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={siteConfig.urls.alphaVote}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-white bg-white px-6 py-3 text-sm font-bold text-night"
                  >
                    Explore AlphaVote <ExternalLink size={16} aria-hidden />
                  </a>
                  <a
                    href={siteConfig.urls.alphaVoteContent}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-white/60 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
                  >
                    Read 3C Trix Content <ExternalLink size={16} aria-hidden />
                  </a>
                </div>
              </div>

              {/* TODO: replace this text treatment only when the verified AlphaVote logo is supplied. */}
              <div
                aria-label="AlphaVote product interface concept"
                className="rounded-[2rem] border-2 border-white/50 bg-[#123626] p-5 shadow-[9px_9px_0_#3E855A] sm:p-7"
              >
                <div className="flex items-center justify-between gap-3 border-b border-white/20 pb-4">
                  <span className="text-xl font-semibold">AlphaVote</span>
                  <span className="rounded-full bg-emerald px-3 py-1 text-[10px] font-bold tracking-wider text-night">
                    OPINION FIRST
                  </span>
                </div>
                <div className="mt-8 rounded-2xl bg-white p-5 text-night">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-dark">
                    Read · decide · compare
                  </p>
                  <p className="mt-4 text-xl font-semibold leading-snug">
                    A structured way to participate in complex topics.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <span className="rounded-xl border-2 border-night bg-mint p-3 text-center text-xs font-bold">
                      Form a view
                    </span>
                    <span className="rounded-xl border-2 border-night bg-[#e8e0fb] p-3 text-center text-xs font-bold">
                      See the community
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-[#f5f1e8] py-20 sm:py-28">
          <Container>
            <SectionHeader
              eyebrow="Selected experience"
              title="Research and content experience across technology and digital assets."
              text="Research, editorial and event-content experience includes work associated with organisations such as:"
            />
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {homeContent.experience.map((organisation) => (
                <li
                  key={organisation}
                  className="flex min-h-28 items-center rounded-2xl border-2 border-night bg-white p-5 text-sm font-semibold leading-5 text-ink"
                >
                  {organisation}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-white py-20 sm:py-28">
          <Container>
            <SectionHeader
              eyebrow="Why 3C Trix"
              title="Built around research, not assumptions."
            />
            <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {homeContent.principles.map((principle) => (
                <article key={principle.title} className="border-t-[3px] border-night pt-5">
                  <Check size={20} className="text-emerald-dark" aria-hidden />
                  <h3 className="mt-5 text-xl font-semibold text-ink">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">{principle.text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <StudioContactForm
          title="What are you trying to understand, communicate or improve?"
          text="Tell us about the research question, workflow, product or digital challenge you are working on."
          submitLabel="Start a conversation"
          source="Home enquiry"
          fields={[
            { name: "name", label: "Name", required: true, autoComplete: "name" },
            { name: "company", label: "Company", autoComplete: "organization" },
            { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
            { name: "website", label: "Website", type: "url", autoComplete: "url" },
            {
              name: "interest",
              label: "Area of interest",
              type: "select",
              required: true,
              options: ["Research & Content", "AI Automation", "Website Project", "AlphaVote or Media", "Other"],
            },
            { name: "message", label: "Message", type: "textarea", required: true },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}

function AreaIcon({ theme }: { theme: string }) {
  const Icon =
    theme === "research"
      ? FileSearch
      : theme === "automation"
        ? GitBranch
        : theme === "websites"
          ? MousePointer2
          : Box;
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-night bg-mint text-forest">
      <Icon size={22} aria-hidden />
    </span>
  );
}
