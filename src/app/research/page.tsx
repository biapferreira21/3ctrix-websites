import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BookOpenCheck, Check, ExternalLink, FileText } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/studio/PageHero";
import { SectionHeader } from "@/components/studio/SectionHeader";
import { FAQAccordion } from "@/components/studio/FAQAccordion";
import { StudioContactForm } from "@/components/studio/StudioContactForm";
import { researchContent as content } from "@/content/research";
import { siteConfig } from "@/config/site";

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
              title="How information moves, changes and informs decisions."
              text="The work connects emerging technology with questions of source traceability, compression, uncertainty, interpretation and real-world use."
            />
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {content.themes.map((theme, index) => (
                <li key={theme} className="flex min-h-32 flex-col justify-between rounded-2xl border-2 border-night bg-[#f5f1e8] p-5">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-emerald-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-6 text-sm font-semibold leading-5 text-ink">{theme}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-mint-soft py-20 sm:py-28">
          <Container>
            <SectionHeader eyebrow="Services" title="Research can take many forms." />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {content.services.map(([title, text]) => (
                <article key={title} className="rounded-3xl border-[3px] border-night bg-white p-6 shadow-[5px_5px_0_#8FA38A]">
                  <FileText size={20} className="text-emerald-dark" aria-hidden />
                  <h3 className="mt-7 text-xl font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">{text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-night py-20 text-white sm:py-28">
          <Container>
            <SectionHeader
              eyebrow="Experience"
              title="Selected research and editorial experience."
              text="Experience includes research, editorial and event-content work associated with organisations such as:"
            />
            <div className="mt-12 grid gap-4 lg:grid-cols-5">
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
              eyebrow="Questions in development"
              title="Research directions shaping the work."
              text="These are active lines of inquiry and product-design questions, not claims that a universal information-quality score already exists."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {content.directions.map(([question, exploration, aim], index) => (
                <article
                  key={question}
                  className="flex min-h-[22rem] flex-col rounded-[1.75rem] border-[3px] border-night bg-white p-6 shadow-[6px_6px_0_#16180F] sm:p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-emerald-dark">
                      DIRECTION {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-night bg-mint text-forest">
                      <FileText size={18} aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-9 text-2xl font-semibold leading-tight text-ink">{question}</h3>
                  <p className="mt-5 text-sm leading-6 text-slate">{exploration}</p>
                  <p className="mt-auto border-t-2 border-night/10 pt-6 text-sm font-semibold leading-6 text-forest">
                    {aim}
                  </p>
                </article>
              ))}
            </div>
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

        <section className="border-b-[3px] border-night bg-[#dfece2] py-20 sm:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <SectionHeader eyebrow="Research principles" title="Credibility before volume." />
              <ul className="grid gap-3 sm:grid-cols-2">
                {content.principles.map((principle) => (
                  <li key={principle} className="flex gap-3 rounded-2xl border-2 border-night bg-white p-4 text-sm leading-6 text-slate">
                    <BookOpenCheck size={19} className="mt-0.5 shrink-0 text-emerald-dark" aria-hidden />
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-[#e8e0fb] py-20 sm:py-28">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-dark">Research + participation</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-5xl">Research does not have to end at publication.</h2>
                <p className="mt-6 text-base leading-7 text-slate">
                  Beatriz created AlphaVote as an experiment in independent judgement: form a view before seeing the group response, then consider other arguments.
                </p>
                <p className="mt-4 text-base leading-7 text-slate">
                  That question connects her research interests with interface design, learning and thoughtful participation. Voting cards can also inspire a single feature within a conference app.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={siteConfig.urls.alphaVote} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-[3px] border-night bg-white px-6 py-3 text-sm font-bold text-ink">
                    Explore AlphaVote <ExternalLink size={16} aria-hidden />
                  </a>
                </div>
              </div>
              {/* TODO: add the verified AlphaVote logo or screenshot here when supplied. */}
              <div className="rounded-[2rem] border-[3px] border-night bg-night p-8 text-white shadow-[8px_8px_0_#3E855A]">
                <p className="text-3xl font-semibold">AlphaVote</p>
                <div className="mt-10 space-y-3">
                  {["Read the context", "Form an independent view", "Compare perspectives"].map((step, index) => (
                    <div key={step} className="flex items-center gap-4 rounded-xl border border-white/30 p-4">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald text-xs font-bold text-night">{index + 1}</span>
                      <span className="text-sm font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                  Beatriz Ferreira is the Founder of 3C Trix Studio. Her work focuses on artificial intelligence, digital assets, stablecoins, financial technology and the practical implementation of emerging technology.
                </p>
                <p className="mt-4 text-base leading-7 text-slate">
                  Her experience includes research, editorial work, event content and the development of AlphaVote.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-b-[3px] border-night bg-[#f6dfb6] py-20 sm:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_.9fr]">
              <div>
                <SectionHeader
                  eyebrow="Engagements"
                  title="Research adapted to the question and format."
                  text="Pricing depends on the depth of research, format, length, number of interviews or sources, publication requirements and delivery timeline."
                />
                <p className="mt-7 text-2xl font-semibold text-forest">Custom pricing</p>
                <a href="#contact" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border-[3px] border-night bg-emerald px-6 py-3 text-sm font-bold text-night">
                  Discuss a research or content project <ArrowRight size={17} aria-hidden />
                </a>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {["Individual article", "Multi-article series", "Report", "Event content package", "Ongoing editorial support", "Research and SEO package"].map((format) => (
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
