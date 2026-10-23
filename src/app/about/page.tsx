import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { StoryGallery } from "@/components/studio/StoryGallery";
import { PersonalProjects } from "@/components/studio/PersonalProjects";
import { AboutVisual } from "@/components/studio/AboutVisual";
import { storyChapters } from "@/content/about";
import "./about.css";

export const metadata: Metadata = {
  title: "About Beatriz Ferreira | 3C Trix",
  description: "Meet Beatriz Ferreira, founder of 3C Trix, through her work and a personal story told in photographs and short chapters.",
  alternates: { canonical: "/about" },
  openGraph: { title: "Beatriz Ferreira — the person behind the work", description: "A personal story, in photographs and chapters.", url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="content" lang="en" className="about-editorial">
        <section className="relative overflow-hidden border-b border-night/15 bg-[#FBF5EB] pb-16 pt-32 sm:pb-24 sm:pt-36">
          <AboutVisual />
          <Container className="relative grid items-center gap-10 lg:grid-cols-[1.35fr_.65fr]">
            <div>
              <p data-about-reveal className="text-xs font-bold uppercase tracking-[.18em] text-forest">About Beatriz</p>
              <h1 data-about-reveal className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.03] text-ink sm:text-6xl lg:text-7xl">The person<br className="hidden sm:block" /> behind the <span className="editorial-title italic text-[#624592]">work.</span></h1>
              <p data-about-reveal className="mt-6 max-w-xl text-base leading-8 text-slate">I’m Beatriz Ferreira, founder of 3C Trix. I work across product, research, media and events. Here’s my story — and a few things I’ve built along the way.</p>
              <nav data-about-reveal aria-label="On this page" className="mt-7 flex flex-wrap gap-x-8 gap-y-2 border-t border-night/20 pt-4">
                <a href="#my-story" className="inline-flex min-h-12 items-center gap-3 text-sm font-semibold text-forest"><span className="font-mono text-[10px] text-slate">01</span>My story <ArrowDown size={14} aria-hidden /></a>
                <a href="#projects" className="inline-flex min-h-12 items-center gap-3 text-sm font-semibold text-forest"><span className="font-mono text-[10px] text-slate">02</span>Projects <ArrowDown size={14} aria-hidden /></a>
              </nav>
            </div>
            <div data-about-portrait className="mx-auto w-full max-w-xs rounded-lg border border-night/20 bg-white p-3 shadow-[14px_14px_0_#D9CBEE] lg:rotate-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded bg-mint-soft">
                <Image src="/beatriz-founder.png" alt="Beatriz Ferreira, founder of 3C Trix." fill sizes="(max-width: 1024px) 300px, 280px" className="object-cover object-top" priority />
              </div>
              <div className="px-2 pb-2 pt-4">
                <p className="text-lg font-semibold text-ink">Beatriz Ferreira</p>
                <p className="mt-1 text-xs text-slate">Founder · Researcher · Media contributor</p>
              </div>
            </div>
          </Container>
        </section>

        <StoryGallery chapters={storyChapters} />

        <PersonalProjects />

        <section className="bg-[#f5f1e8] py-10 sm:py-14">
          <Container className="flex flex-wrap items-center justify-between gap-5">
            <p className="max-w-md text-sm leading-7 text-slate">For the professional side of the story, explore my research, media work and the services behind 3C Trix.</p>
            <Link href="/#business-areas" className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-night bg-white px-5 py-3 text-sm font-bold text-forest">Explore my work <ArrowRight size={16} aria-hidden /></Link>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
