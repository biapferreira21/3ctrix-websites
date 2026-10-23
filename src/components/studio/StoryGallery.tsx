"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, Download, Expand, ExternalLink, X } from "lucide-react";
import type { StoryChapter, StoryLink, StoryMoment } from "@/content/about";
import { moveStoryIndex, storyIndexFromKey } from "@/lib/storyNavigation";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";
import { cn } from "@/lib/cn";
import { chapterTheme, storyImageLayout } from "@/lib/aboutDesign";
import { Container } from "@/components/ui/Container";

export function StoryGallery({ chapters }: { chapters: readonly StoryChapter[] }) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [momentIndex, setMomentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotionPreference();
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const chapterContent = useRef<HTMLDivElement>(null);
  const id = useId();
  const chapter = chapters[chapterIndex];
  const moment = chapter?.moments[momentIndex];

  useEffect(() => {
    const element = dialog.current;
    if (!element || !expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    closeButton.current?.focus();
    return () => { element.close(); document.body.style.overflow = previousOverflow; };
  }, [expanded]);

  if (!chapter || !moment) return null;
  function chooseChapter(index: number) {
    setChapterIndex(index); setMomentIndex(0);
    chapterContent.current?.scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" });
  }
  function move(direction: number) { setMomentIndex((current) => moveStoryIndex(current, direction, chapter.moments.length)); }
  function navigateWithKeys(event: KeyboardEvent<HTMLElement>) {
    // Native selects and links keep their own keyboard behaviour.
    if ((event.target as HTMLElement).closest("select, button, a, input, summary")) return;
    const next = storyIndexFromKey(event.key, momentIndex, chapter.moments.length);
    if (next === null) return;
    event.preventDefault(); setMomentIndex(next);
  }
  const previousDisabled = momentIndex === 0;
  const nextDisabled = momentIndex === chapter.moments.length - 1;
  const theme = chapterTheme(chapter.id);
  const { ratio, panorama } = storyImageLayout(moment.image);
  const themeStyle = { "--chapter-surface": theme.surface, "--chapter-accent": theme.accent, "--chapter-paper": theme.paper, "--chapter-mat": theme.mat, "--chapter-text": theme.text } as CSSProperties;
  const controlClass = "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-night/25 transition-colors disabled:cursor-default disabled:opacity-30";

  return (
    <motion.section id="my-story" aria-labelledby="story-heading" style={themeStyle} initial={false} animate={{ backgroundColor: theme.surface }} transition={{ duration: reducedMotion ? 0 : .75 }} className="relative border-b border-night/15 py-16 sm:py-24">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-5 border-b border-night/15 pb-7"><div><p className="text-xs font-medium chapter-accent">01 / My story, in photographs</p><h2 id="story-heading" className="editorial-title mt-3 text-4xl leading-tight text-ink sm:text-6xl">A life, in chapters.</h2></div><span aria-hidden className="editorial-title hidden text-7xl italic opacity-20 chapter-accent sm:block">0{chapterIndex + 1}</span></div>
      <div className="grid items-start gap-8 lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-10">
      <nav aria-label="Story chapters" className="chapter-navigation sticky top-[5.25rem] z-20 py-2 lg:top-28 lg:py-0">
        <div className="lg:hidden"><label htmlFor={`${id}-chapter-select`} className="mb-2 block text-xs font-medium chapter-accent">Choose a chapter</label><select id={`${id}-chapter-select`} value={chapterIndex} onChange={(event) => chooseChapter(Number(event.target.value))} className="min-h-12 w-full rounded-xl border border-night/20 bg-white px-3 text-sm font-semibold chapter-accent">{chapters.map((item, index) => <option value={index} key={item.id}>{String(index + 1).padStart(2, "0")} / {item.title}</option>)}</select></div>
        <ol className="hidden space-y-1 border-l border-night/20 lg:block">
          {chapters.map((item, index) => <li key={item.id} className="relative"><button type="button" aria-current={chapterIndex === index ? "step" : undefined} aria-controls={`${id}-chapter`} onClick={() => chooseChapter(index)} className={cn("relative w-full py-4 pl-5 pr-2 text-left text-sm leading-6 transition-colors", chapterIndex === index ? "font-semibold chapter-accent" : "chapter-copy")}><span className="mb-1 block font-mono text-[10px] opacity-70">0{index + 1}</span>{item.title}{chapterIndex === index && <motion.span layoutId={`${id}-chapter-indicator`} style={{ backgroundColor: theme.accent }} transition={{ type: "spring", stiffness: 250, damping: 28, duration: reducedMotion ? 0 : undefined }} aria-hidden className="absolute -left-[2px] top-3 bottom-3 w-[3px] rounded-full" />}</button></li>)}
        </ol>
      </nav>

      <div ref={chapterContent} id={`${id}-chapter`} className="min-w-0 scroll-mt-[12rem] lg:scroll-mt-24">
        <motion.div key={chapter.id} initial={reducedMotion ? false : { opacity: 0, y: 22, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: reducedMotion ? 0 : .65, ease: [.22, 1, .36, 1] }}>
          <div className="mb-6">
            <p className="text-xs font-medium chapter-accent">{chapter.eyebrow}</p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{chapter.title}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 chapter-copy">{chapter.introduction}</p>
          </div>

          <div className="story-stage chapter-paper overflow-hidden border border-night/10" data-story-gallery data-photo-layout={panorama ? "panorama" : "portrait"}>
            <div role="region" aria-label={`Photo story: ${moment.title}`} tabIndex={0} onKeyDown={navigateWithKeys} data-image-side={chapterIndex % 2 ? "right" : "left"} className={panorama ? "grid" : "story-portrait-region"}>
              <div className="chapter-mat story-mat-pattern relative flex min-w-0 items-center justify-center p-4 sm:p-7">
                <button type="button" onClick={() => setExpanded(true)} aria-label={`Enlarge image: ${moment.title}`} style={{ maxWidth: `${ratio * 500}px` }} className="story-frame relative block w-full overflow-hidden bg-white">
                  <span style={{ aspectRatio: ratio }} className="relative block w-full">
                    <motion.span key={moment.id} className="absolute inset-0 block" initial={reducedMotion ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }} transition={{ duration: reducedMotion ? 0 : .85, ease: [.22, 1, .36, 1] }}><StoryImage image={moment.image} sizes={panorama ? "(max-width: 1024px) 90vw, 900px" : "(max-width: 1024px) 90vw, 480px"} priority={chapterIndex === 0 && momentIndex === 0} /></motion.span>
                  </span><span className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-forest"><Expand size={16} aria-hidden /></span>
                </button>
              </div>
              <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8">
                <motion.div key={moment.id} className={panorama ? "grid gap-5 md:grid-cols-[.9fr_1.2fr]" : ""} aria-live="polite" aria-atomic="true" initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : .65, delay: reducedMotion ? 0 : .15 }}>
                  <div>{moment.eventRole && <p className="mb-3 text-xs font-semibold chapter-accent">{moment.eventRole} · 3C Trix founder</p>}
                  <p className="text-xs font-medium leading-6 chapter-accent">{moment.label}</p><h4 className="editorial-title mt-3 text-3xl leading-[1.1] text-ink sm:text-4xl">{moment.title}</h4></div><div><p className={cn("text-sm leading-7 chapter-copy", !panorama && "mt-5")}>{moment.text}</p><p className="mt-4 text-xs leading-6 chapter-copy opacity-85">{moment.caption}</p>
                  {moment.links && <div className="mt-4 grid gap-1">{moment.links.map((link) => <StoryResourceLink key={`${link.href}-${link.label}`} link={link} />)}</div>}
                  {moment.resourceNote && <p className="mt-3 text-xs leading-6 chapter-copy">{moment.resourceNote}</p>}</div>
                </motion.div>
              </div>
            </div>
            <div className="flex items-end gap-3 border-t border-night/15 p-4 sm:px-5" role="group" aria-label="Photo navigation">
              <div className="min-w-0 flex-1"><label htmlFor={`${id}-photo-select`} className="mb-2 block text-xs font-medium chapter-accent">Photo {momentIndex + 1} / {chapter.moments.length}</label><select id={`${id}-photo-select`} value={momentIndex} onChange={(event) => setMomentIndex(Number(event.target.value))} className="min-h-11 w-full truncate rounded-lg border border-night/20 bg-white px-2 text-xs text-ink">{chapter.moments.map((item, index) => <option key={item.id} value={index}>{index + 1}. {item.group ? `${item.group} — ` : ""}{item.title}</option>)}</select></div>
              <button type="button" aria-label="Previous photo" onClick={() => move(-1)} disabled={previousDisabled} className={cn(controlClass, "bg-white chapter-accent")}><ArrowLeft size={17} aria-hidden /></button><button type="button" aria-label="Next photo" onClick={() => move(1)} disabled={nextDisabled} style={{ backgroundColor: theme.accent }} className={cn(controlClass, "text-white")}><ArrowRight size={17} aria-hidden /></button>
            </div>
            <motion.div aria-hidden style={{ backgroundColor: theme.accent }} className="h-[3px] origin-left" initial={false} animate={{ scaleX: (momentIndex + 1) / chapter.moments.length }} transition={{ duration: reducedMotion ? 0 : .45 }} />
          </div>

          {(chapter.results || chapter.highlights) && <details key={chapter.id} className="group mt-6 border-y border-night/20"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-forest [&::-webkit-details-marker]:hidden">Details & milestones<ChevronDown size={16} aria-hidden className="transition-transform duration-300 group-open:rotate-180" /></summary><div className="pb-6">
            {chapter.results && <dl aria-label="Academic results" className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">{chapter.results.map((result) => <div key={result.label}><dt className="text-[10px] font-bold text-forest">{result.label}</dt><dd className="mt-1 text-xl font-semibold">{result.value}</dd></div>)}</dl>}
            <div className="grid gap-5 sm:grid-cols-2">{chapter.highlights?.map((highlight) => <div key={highlight.title}><h4 className="text-sm font-semibold text-ink">{highlight.title}</h4><p className="mt-2 text-xs leading-6 text-slate">{highlight.text}</p>{highlight.links?.map((link) => <StoryResourceLink key={link.href} link={link} />)}</div>)}</div>
          </div></details>}
        </motion.div>
      </div>

      <dialog ref={dialog} aria-labelledby={`${id}-viewer-title`} onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)} onClick={(event) => { if (event.target === event.currentTarget) setExpanded(false); }} className="fixed inset-0 m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-5xl overflow-y-auto rounded-2xl border border-night bg-paper p-4 text-ink shadow-2xl backdrop:bg-night/90 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-4"><p id={`${id}-viewer-title`} className="text-sm font-semibold">{moment.title}</p><button type="button" ref={closeButton} aria-label="Close photo viewer" onClick={() => setExpanded(false)} className={cn(controlClass, "bg-white text-forest")}><X size={19} aria-hidden /></button></div>
        {expanded && <div className="relative h-[65dvh] w-full rounded-xl bg-white" tabIndex={0} onKeyDown={navigateWithKeys}><StoryImage image={moment.image} sizes="95vw" /></div>}
        <div className="mt-4 flex items-center justify-between gap-3"><p className="text-xs text-slate">{momentIndex + 1} / {chapter.moments.length}</p><div className="flex gap-2"><button type="button" aria-label="Previous enlarged photo" disabled={previousDisabled} onClick={() => move(-1)} className={cn(controlClass, "bg-white text-forest")}><ArrowLeft size={16} aria-hidden /></button><button type="button" aria-label="Next enlarged photo" disabled={nextDisabled} onClick={() => move(1)} className={cn(controlClass, "bg-night text-white")}><ArrowRight size={16} aria-hidden /></button></div></div>
      </dialog>
      </div>
      </Container>
    </motion.section>
  );
}

function StoryImage({ image, sizes, priority = false }: { image: StoryMoment["image"]; sizes: string; priority?: boolean }) {
  const clipId = useId().replace(/:/g, "");
  if (!image.crop) return <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-contain" />;
  const { x, y, width, height } = image.crop;
  return <svg viewBox={`${x} ${y} ${width} ${height}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={image.alt} focusable="false" className="absolute inset-0 h-full w-full overflow-hidden"><defs><clipPath id={clipId}><rect x={x} y={y} width={width} height={height} /></clipPath></defs><image href={image.src} width={image.width} height={image.height} clipPath={`url(#${clipId})`} /></svg>;
}

function StoryResourceLink({ link }: { link: StoryLink }) {
  const Icon = link.download ? Download : ExternalLink;
  return <a href={link.href} download={link.download || undefined} target={link.download ? undefined : "_blank"} rel={link.download ? undefined : "noopener noreferrer"} className="chapter-accent inline-flex min-h-11 items-center gap-2 text-xs font-semibold leading-6 underline underline-offset-4">{link.label}<Icon size={13} aria-hidden className="shrink-0" /></a>;
}
