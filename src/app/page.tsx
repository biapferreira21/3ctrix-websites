import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Linkedin,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/studio/PageHero";
import { SectionHeader } from "@/components/studio/SectionHeader";
import { StudioContactForm } from "@/components/studio/StudioContactForm";
import { ResearchLens } from "@/components/studio/ResearchLens";
import { EventAppDemo } from "@/components/studio/EventAppDemo";
import { AlphaVoteExperiment } from "@/components/studio/AlphaVoteExperiment";
import { ServiceExplorer } from "@/components/studio/ServiceExplorer";
import { FounderPerspectives } from "@/components/studio/FounderPerspectives";
import { homeContent } from "@/content/home";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "3C Trix | Events, Media, Research and Technology",
  description:
    "3C Trix combines events, media, research and tailored digital tools to help people understand emerging technology and make better-informed decisions.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "3C Trix — Events, Media, Research and Technology",
    description:
      "We connect information with people and ideas through events, media, research and tailored technology.",
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
              eyebrow="Services · AI, technology & crypto"
              title="What do you need to make happen?"
            />
            <ServiceExplorer />
          </Container>
        </section>

        <section id="event-tools" className="border-b-[3px] border-night bg-white py-20 sm:py-28">
          <Container>
            <SectionHeader eyebrow={homeContent.eventTools.eyebrow} title={homeContent.eventTools.title} text={homeContent.eventTools.text} />
            <EventAppDemo />
          </Container>
        </section>

        <section id="alphavote" className="border-b-[3px] border-night bg-night py-20 text-white sm:py-28">
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
                    Open AlphaVote <ExternalLink size={16} aria-hidden />
                  </a>
                  <a href="https://alphavote.app/help/why.html" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 px-2 py-3 text-sm font-semibold text-white underline underline-offset-4">Why it exists <ExternalLink size={14} aria-hidden /></a>
                </div>
              </div>

              <AlphaVoteExperiment />
            </div>
          </Container>
        </section>

        <section id="experience" className="border-b-[3px] border-night bg-[#f5f1e8] py-20 sm:py-28">
          <Container>
            <SectionHeader
              eyebrow="Selected events"
              title="Events Beatriz has represented."
            />
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {homeContent.experience.map((organisation) => (
                <li
                  key={organisation.name}
                  className="flex min-h-32 flex-col justify-center rounded-2xl border-2 border-night bg-white p-5 text-ink"
                >
                  <span className="text-sm font-semibold leading-5">{organisation.name}</span>
                  <span className="mt-2 text-xs leading-5 text-slate">{organisation.role}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 rounded-2xl border-2 border-night bg-[#e8e0fb] p-5 sm:flex-row sm:items-center sm:gap-6">
              <span className="text-sm font-semibold text-ink">Emergence · The Block</span>
              <p className="text-sm leading-6 text-slate">Beatriz also supported Emergence while working as a researcher at The Block.</p>
            </div>
          </Container>
        </section>

        <section id="information-quality" className="border-b-[3px] border-night bg-[#e8e0fb] py-20 sm:py-28">
          <Container>
            <div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-dark">
                  {homeContent.informationQuality.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-5xl">
                  {homeContent.informationQuality.title}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-7 text-slate">
                  {homeContent.informationQuality.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-10"><ResearchLens /></div>
            <Link href="/research" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-forest underline underline-offset-4">Explore Research <ArrowRight size={16} aria-hidden /></Link>
          </Container>
        </section>

        <section id="profile" className="border-b-[3px] border-night bg-mint-soft py-20 sm:py-28">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[.82fr_1.18fr]">
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -inset-3 translate-x-3 translate-y-3 rounded-[2rem] border-[3px] border-night bg-lilac" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-[3px] border-night bg-white shadow-[8px_8px_0_#C69A44]">
                  <Image
                    src="/beatriz-founder.png"
                    alt="Beatriz Ferreira, founder of 3C Trix"
                    fill
                    sizes="(max-width: 1024px) 90vw, 420px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-dark">
                  {homeContent.profile.eyebrow}
                </p>
                <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-ink sm:text-5xl">
                  {homeContent.profile.title}
                </h2>
                <p className="mt-6 text-base leading-7 text-slate">Product, research, media and events — brought together at 3C Trix.</p>
                <FounderPerspectives />
                <p className="mt-6 text-sm leading-6 text-slate">{homeContent.profile.paragraphs[2]}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-[3px] border-night bg-white px-6 py-3 text-sm font-bold text-night shadow-[4px_4px_0_#16180F]"
                  >
                    <Linkedin size={17} aria-hidden /> View LinkedIn
                  </a>
                  <Link
                    href="#contact"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-[3px] border-night bg-emerald px-6 py-3 text-sm font-bold text-night shadow-[4px_4px_0_#16180F]"
                  >
                    Work with Beatriz <ArrowRight size={17} aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <StudioContactForm
          title="What are you working on?"
          text="Tell us what you need. We’ll take it from there."
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
              options: ["Events, Media & Content", "Event Websites & Apps", "Research & Information Quality", "Workflow Automation", "Website Creation or Redesign"],
            },
            { name: "message", label: "Message", type: "textarea", required: true },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
