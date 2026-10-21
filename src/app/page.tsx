import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  Check,
  ExternalLink,
  FileSearch,
  GitBranch,
  Linkedin,
  MousePointer2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/studio/PageHero";
import { SectionHeader } from "@/components/studio/SectionHeader";
import { StudioContactForm } from "@/components/studio/StudioContactForm";
import { SignalToDecision } from "@/components/studio/SignalToDecision";
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

        <section className="border-b-[3px] border-night bg-[#f6dfb6] py-20 sm:py-28">
          <Container>
            <SectionHeader
              eyebrow={homeContent.audiences.eyebrow}
              title={homeContent.audiences.title}
              text={homeContent.audiences.text}
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {homeContent.audiences.items.map(([title, text], index) => (
                <article
                  key={title}
                  className="flex min-h-56 flex-col rounded-2xl border-[3px] border-night bg-white p-5 shadow-[5px_5px_0_#16180F]"
                >
                  <span className="text-[10px] font-bold tracking-[0.18em] text-emerald-dark">
                    AUDIENCE {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">{text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="business-areas"
          className="relative overflow-hidden border-b-[3px] border-night bg-mint-soft py-20 sm:py-28"
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
          <Container className="relative">
            <SectionHeader
              eyebrow="What we do"
              title="Four connected areas of work."
              text="Events create the context. Media and research make ideas understandable. Digital tools help people participate, learn and act on what matters."
            />
            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              {homeContent.areas.map((area) => (
                <article
                  key={area.title}
                  className="group flex min-h-[36rem] flex-col rounded-[1.75rem] border-[3px] border-night bg-white p-6 shadow-[7px_7px_0_#16180F] transition-transform hover:-translate-y-1 sm:p-8"
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
                  <ul className="mt-7 space-y-3 border-t-2 border-night/10 pt-6">
                    {area.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-6 text-slate">
                        <Check className="mt-0.5 shrink-0 text-emerald-dark" size={16} aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
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
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="event-tools" className="border-b-[3px] border-night bg-white py-20 sm:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
              <SectionHeader
                eyebrow={homeContent.eventTools.eyebrow}
                title={homeContent.eventTools.title}
                text={homeContent.eventTools.text}
              />
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {homeContent.eventTools.stages.map(([stage, text], index) => (
                  <article
                    key={stage}
                    className="rounded-2xl border-[3px] border-night bg-[#f5f1e8] p-6 shadow-[5px_5px_0_#8FA38A]"
                  >
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald text-xs font-bold text-night">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-semibold text-ink">{stage} the event</h3>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate">{text}</p>
                  </article>
                ))}
              </div>
            </div>
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
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {homeContent.alphaVote.cardTypes.map(([title, text]) => (
                    <article key={title} className="rounded-2xl border border-white/25 bg-white/5 p-4">
                      <h3 className="text-sm font-semibold text-white">{title}</h3>
                      <p className="mt-2 text-xs leading-5 text-white/60">{text}</p>
                    </article>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={siteConfig.urls.alphaVote}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-white bg-white px-6 py-3 text-sm font-bold text-night"
                  >
                    View AlphaVote prototype <ExternalLink size={16} aria-hidden />
                  </a>
                </div>
              </div>

              {/* TODO: replace this text treatment only when the verified AlphaVote logo is supplied. */}
              <div
                aria-label="AlphaVote product interface concept"
                className="rounded-[2rem] border-2 border-white/50 bg-[#123626] p-5 shadow-[9px_9px_0_#3E855A] sm:p-7"
              >
                <div className="flex items-center justify-between gap-3 border-b border-white/20 pb-4">
                  <span className="text-xl font-semibold">AlphaVote concept</span>
                  <span className="rounded-full bg-emerald px-3 py-1 text-[10px] font-bold tracking-wider text-night">
                    OPINION FIRST
                  </span>
                </div>
                <div className="mt-8 rounded-2xl bg-white p-5 text-night">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-dark">
                    Question · vote · reflect
                  </p>
                  <p className="mt-4 text-xl font-semibold leading-snug">
                    A simple event card designed to reveal questions, priorities and perspectives.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <span className="rounded-xl border-2 border-night bg-mint p-3 text-center text-xs font-bold">
                      Share a view
                    </span>
                    <span className="rounded-xl border-2 border-night bg-[#e8e0fb] p-3 text-center text-xs font-bold">
                      Compare perspectives
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="experience" className="border-b-[3px] border-night bg-[#f5f1e8] py-20 sm:py-28">
          <Container>
            <SectionHeader
              eyebrow="Selected experience"
              title="Work across research, media and technology events."
              text="Roles are described conservatively so that research, writing and event-related work remain clearly distinguished."
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
          </Container>
        </section>

        <SignalToDecision content={homeContent.informationSystem} />

        <section id="information-quality" className="border-b-[3px] border-night bg-[#e8e0fb] py-20 sm:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr]">
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
                <blockquote className="mt-7 rounded-2xl border-[3px] border-night bg-[#f6dfb6] p-5 text-base font-semibold leading-7 text-ink shadow-[4px_4px_0_#C69A44]">
                  “{homeContent.profile.motivation}”
                </blockquote>
                <div className="mt-8 rounded-2xl border-[3px] border-night bg-white p-6 shadow-[5px_5px_0_#C69A44]">
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-dark">
                    Questions guiding the work
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {homeContent.informationQuality.questions.map((question) => (
                      <li key={question} className="flex gap-3 text-sm leading-6 text-slate">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-lilac-deep" />
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-dark">
                  Information theory as a design lens
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {homeContent.informationQuality.concepts.map(([title, text], index) => (
                    <article
                      key={title}
                      className="min-h-48 rounded-2xl border-[3px] border-night bg-white p-5 shadow-[5px_5px_0_#16180F]"
                    >
                      <span className="text-[10px] font-bold tracking-[0.18em] text-emerald-dark">
                        CONCEPT {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-7 text-xl font-semibold text-ink">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate">{text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
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
                <div className="mt-6 space-y-4 text-base leading-7 text-slate">
                  {homeContent.profile.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {homeContent.profile.journey.map(([title, text]) => (
                    <article key={title} className="rounded-2xl border-2 border-night bg-white p-4">
                      <h3 className="text-sm font-bold text-ink">{title}</h3>
                      <p className="mt-2 text-xs leading-5 text-slate">{text}</p>
                    </article>
                  ))}
                </div>
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

        <section className="border-b-[3px] border-night bg-white py-20 sm:py-28">
          <Container>
            <SectionHeader
              eyebrow="How 3C Trix works"
              title="Clear about evidence, purpose and human judgement."
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
          title="What event, idea or workflow are you trying to improve?"
          text="Tell us about the audience, event, research question or practical challenge you are working on."
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
              options: ["Events & Media", "Event Website or App", "Research & Information Quality", "Workflow Automation", "AlphaVote Prototype", "Other"],
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
        : theme === "event-tools"
          ? MousePointer2
          : Box;
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-night bg-mint text-forest">
      <Icon size={22} aria-hidden />
    </span>
  );
}
