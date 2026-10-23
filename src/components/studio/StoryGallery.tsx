"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, ChevronDown, Download, Expand, ExternalLink, Hand, X } from "lucide-react";
import type { StoryChapter, StoryLink } from "@/content/about";
import { moveStoryIndex, storyGroupStarts, storyIndexFromKey } from "@/lib/storyNavigation";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";
import { cn } from "@/lib/cn";

export function StoryGallery({ chapters }: { chapters: readonly StoryChapter[] }) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [momentIndex, setMomentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotionPreference();
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const thumbnailButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbnailStrip = useRef<HTMLDivElement>(null);
  const id = useId();
  const chapter = chapters[chapterIndex];
  const moment = chapter?.moments[momentIndex];

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (expanded) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      element.showModal();
      closeButton.current?.focus();
      return () => {
        element.close();
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [expanded]);

  useEffect(() => {
    const strip = thumbnailStrip.current;
    const thumbnail = thumbnailButtons.current[momentIndex];
    if (!strip || !thumbnail) return;
    const railBounds = strip.getBoundingClientRect();
    const photoBounds = thumbnail.getBoundingClientRect();
    const delta = photoBounds.left < railBounds.left + 4
      ? photoBounds.left - railBounds.left - 4
      : photoBounds.right > railBounds.right - 4 ? photoBounds.right - railBounds.right + 4 : 0;
    // Keep the selected thumbnail visible without moving the page vertically.
    if (delta) strip.scrollBy({ left: delta, behavior: reducedMotion ? "auto" : "smooth" });
  }, [chapterIndex, momentIndex, reducedMotion]);

  if (!chapter || !moment) return null;

  function chooseMoment(index: number) {
    setMomentIndex(moveStoryIndex(index, 0, chapter.moments.length));
  }

  function move(direction: number) {
    setMomentIndex((current) => moveStoryIndex(current, direction, chapter.moments.length));
  }

  function navigateWithKeys(event: KeyboardEvent<HTMLElement>, focusThumbnail = false) {
    const next = storyIndexFromKey(event.key, momentIndex, chapter.moments.length);
    if (next === null) return;
    event.preventDefault();
    event.stopPropagation();
    chooseMoment(next);
    if (focusThumbnail) {
      thumbnailButtons.current[next]?.focus({ preventScroll: true });
    }
  }

  const previousDisabled = momentIndex === 0;
  const nextDisabled = momentIndex === chapter.moments.length - 1;
  const groups = storyGroupStarts(chapter.moments);
  const controlClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-night px-4 py-2 text-xs font-bold transition-colors disabled:cursor-default disabled:opacity-35";

  return (
    <div>
      <nav aria-label="Story chapters" className="sticky top-[5.25rem] z-30 mb-8 flex gap-3 overflow-x-auto bg-mint-soft/95 py-3 pr-2 backdrop-blur-sm">
        {chapters.map((item, index) => (
          <button key={item.id} type="button" aria-pressed={chapterIndex === index} aria-controls={`${id}-chapter`} onClick={() => { setChapterIndex(index); setMomentIndex(0); }}
            className={cn("inline-flex min-h-12 shrink-0 items-center gap-3 whitespace-nowrap rounded-full border-2 border-night px-5 py-3 text-sm font-semibold", chapterIndex === index ? "bg-night text-white shadow-[3px_3px_0_#8FA38A]" : "bg-white text-ink hover:bg-mint")}>
            <span className="text-[10px] opacity-60">{String(index + 1).padStart(2, "0")}</span>{item.title}
          </button>
        ))}
      </nav>

      <div id={`${id}-chapter`}>
        <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <div>
            {chapter.identityImage && <Image src={chapter.identityImage.src} alt={chapter.identityImage.alt} width={64} height={64} className="mb-4 rounded-full border-2 border-night bg-white" />}
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-forest">{chapter.eyebrow}</p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">{chapter.title}</h3>
          </div>
          <div>
            <p className="max-w-xl text-sm leading-7 text-slate">{chapter.introduction}</p>
            <ul aria-label="Topics in this chapter" className="mt-4 flex flex-wrap gap-2">
              {chapter.topics.map((topic) => <li key={topic} className="rounded-full border border-night/25 bg-white px-3 py-1 text-[11px] font-semibold text-forest">{topic}</li>)}
            </ul>
          </div>
        </div>

        {chapter.results && (
          <dl className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Academic results">
            {chapter.results.map((result) => <div key={result.label} className="rounded-2xl border-2 border-night bg-white p-4"><dt className="text-[10px] font-bold uppercase tracking-[.1em] text-forest">{result.label}</dt><dd className="mt-2 text-2xl font-semibold text-ink">{result.value}</dd></div>)}
          </dl>
        )}

        {chapter.highlights && (
          <div className="mb-8">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.15em] text-forest">{chapter.highlightsLabel ?? "University roles · select to explore"}</p>
            <div className="grid items-start gap-3 lg:grid-cols-3">
              {chapter.highlights.map((highlight) => (
                <details key={highlight.title} name={`${id}-roles`} className="group rounded-2xl border-2 border-night bg-white">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-4 py-3 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">{highlight.title}<ChevronDown size={16} aria-hidden className="shrink-0 text-forest transition-transform group-open:rotate-180" /></summary>
                  <div className="border-t border-night/10 px-4 pb-4 pt-3">
                    <p className="text-sm leading-7 text-slate">{highlight.text}</p>
                    {highlight.links && <div className="mt-3 flex flex-wrap gap-3">{highlight.links.map((link) => <StoryResourceLink key={link.href} link={link} compact />)}</div>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="overflow-hidden rounded-[1.75rem] border-[3px] border-night bg-white shadow-[7px_7px_0_#16180F]" data-story-gallery>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-night bg-[#f5f1e8] px-4 py-3 sm:px-6">
            <p className="flex items-center gap-2 text-xs font-semibold text-forest"><Hand size={15} aria-hidden /> Choose an image. Read its story.</p>
            <span className="font-mono text-[11px] font-bold text-slate" aria-live="polite" aria-atomic="true">Image {momentIndex + 1} of {chapter.moments.length}</span>
          </div>

          {groups.length > 1 && (
            <div role="group" aria-label="Jump to part of this chapter" className="flex flex-wrap items-center gap-2 border-b border-night/15 px-4 py-3 sm:px-6">
              <span className="mr-1 text-[10px] font-bold uppercase tracking-[.12em] text-forest">Jump to</span>
              {groups.map((group) => <button key={group.label} type="button" aria-pressed={moment.group === group.label} onClick={() => chooseMoment(group.index)} className={cn("min-h-11 rounded-full border-2 border-night px-3 py-2 text-xs font-semibold transition-colors", moment.group === group.label ? "bg-night text-white" : "bg-white text-forest hover:bg-mint")}>{group.label}</button>)}
            </div>
          )}

          <div role="tabpanel" id={`${id}-story`} aria-labelledby={`${id}-photo-${momentIndex}`} tabIndex={0} onKeyDown={(event) => navigateWithKeys(event)} className="grid lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative min-w-0 border-b-2 border-night bg-mint-soft p-4 sm:p-6 lg:border-b-0 lg:border-r-2">
              <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
              <button type="button" onClick={() => setExpanded(true)} aria-label={`Enlarge image: ${moment.title}`} className="relative block w-full rounded-2xl border-2 border-night bg-white shadow-[4px_4px_0_#8FA38A]">
                <span className="relative block h-[min(56svh,28rem)] min-h-64 overflow-hidden rounded-[.8rem] sm:h-[30rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={moment.id} className="absolute inset-0 block" initial={reducedMotion ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={reducedMotion ? undefined : { opacity: 0, x: -10 }} transition={{ duration: reducedMotion ? 0 : .22 }}>
                      <Image src={moment.image.src} alt={moment.image.alt} fill sizes="(max-width: 1024px) 90vw, 580px" priority={chapterIndex === 0 && momentIndex === 0} className="object-contain" />
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="absolute bottom-3 right-3 inline-flex min-h-10 items-center gap-2 rounded-full border-2 border-night bg-white/95 px-3 py-2 text-[10px] font-bold text-forest"><Expand size={13} aria-hidden /> Enlarge image</span>
              </button>
            </div>

            <div className="flex min-w-0 flex-col p-6 sm:p-9">
              <div className="min-h-48" aria-live="polite" aria-atomic="true">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={moment.id} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .2 }}>
                    {moment.eventRole && <p className={cn("mb-4 inline-flex rounded-full border-2 border-night px-3 py-1 text-xs font-bold", moment.eventRole === "Ambassador" ? "bg-mint text-forest" : "bg-paper text-ink")}>{moment.eventRole} · 3C Trix founder</p>}
                    <p className="text-[10px] font-bold uppercase tracking-[.18em] text-forest">{moment.label}</p>
                    <h4 className="mt-5 max-w-sm text-3xl font-semibold leading-tight text-ink sm:text-4xl">{moment.title}</h4>
                    <p className="mt-6 max-w-md text-base leading-8 text-slate">{moment.text}</p>
                    <p className="mt-5 text-xs leading-6 text-slate">{moment.caption}</p>
                    {moment.links && <div className={cn("mt-5 gap-3", moment.linkLayout === "list" ? "grid" : "flex flex-wrap")}>{moment.links.map((link) => <StoryResourceLink key={`${link.href}-${link.label}`} link={link} block={moment.linkLayout === "list"} />)}</div>}
                    {moment.resourceNote && <p className="mt-3 text-xs leading-6 text-slate">{moment.resourceNote}</p>}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 border-t-2 border-night/10 pt-5 lg:mt-auto lg:pt-6">
                <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-forest"><BookOpen size={14} aria-hidden /> Images in this chapter</p>
                <div ref={thumbnailStrip} role="tablist" aria-label={`${chapter.title} images`} className="flex gap-3 overflow-x-auto p-1 pb-3" onKeyDown={(event) => navigateWithKeys(event, true)}>
                  {chapter.moments.map((item, index) => (
                    <button key={item.id} ref={(node) => { thumbnailButtons.current[index] = node; }} type="button" role="tab" id={`${id}-photo-${index}`} aria-selected={momentIndex === index} aria-controls={`${id}-story`} tabIndex={momentIndex === index ? 0 : -1} onClick={() => chooseMoment(index)} aria-label={`Image ${index + 1}: ${item.title}`}
                      className={cn("relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-mint-soft", momentIndex === index ? "border-forest ring-2 ring-forest ring-offset-2" : "border-night/25 opacity-60 transition-opacity hover:opacity-100")}>
                      <Image src={item.image.thumbnail} alt="" fill sizes="64px" className="object-contain" loading="lazy" />
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between gap-3" role="group" aria-label="Photo navigation">
                  <button type="button" onClick={() => move(-1)} disabled={previousDisabled} className={cn(controlClass, "bg-white text-forest hover:bg-mint")}><ArrowLeft size={15} aria-hidden />Previous</button>
                  <button type="button" onClick={() => move(1)} disabled={nextDisabled} className={cn(controlClass, "bg-night text-white hover:bg-forest")}>Next<ArrowRight size={15} aria-hidden /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog ref={dialog} aria-labelledby={`${id}-viewer-title`} onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)} onClick={(event) => { if (event.target === event.currentTarget) setExpanded(false); }} onKeyDown={(event) => navigateWithKeys(event)} className="fixed inset-0 m-auto w-[calc(100%-1.5rem)] max-w-5xl max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl border-[3px] border-night bg-paper p-4 text-ink shadow-2xl backdrop:bg-night/90 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p id={`${id}-viewer-title`} className="text-sm font-semibold">{moment.title}</p>
          <button type="button" ref={closeButton} aria-label="Close photo viewer" onClick={() => setExpanded(false)} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-night bg-white text-forest"><X size={19} aria-hidden /></button>
        </div>
        {expanded && <div className="relative h-[65dvh] w-full rounded-xl bg-white"><Image src={moment.image.src} alt={moment.image.alt} fill sizes="95vw" className="object-contain" /></div>}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate">{moment.caption} · {momentIndex + 1} / {chapter.moments.length}</p>
          <div className="flex gap-2" role="group" aria-label="Enlarged photo navigation">
            <button type="button" aria-label="Previous enlarged photo" disabled={previousDisabled} onClick={() => move(-1)} className={cn(controlClass, "bg-white text-forest")}><ArrowLeft size={15} aria-hidden />Previous</button>
            <button type="button" aria-label="Next enlarged photo" disabled={nextDisabled} onClick={() => move(1)} className={cn(controlClass, "bg-night text-white")}>Next<ArrowRight size={15} aria-hidden /></button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

function StoryResourceLink({ link, compact = false, block = false }: { link: StoryLink; compact?: boolean; block?: boolean }) {
  const Icon = link.download ? Download : ExternalLink;
  return <a href={link.href} download={link.download || undefined} target={link.download ? undefined : "_blank"} rel={link.download ? undefined : "noopener noreferrer"} className={cn("inline-flex min-h-11 items-center gap-2 text-xs font-semibold", block ? "justify-between rounded-2xl border-2 border-night bg-white px-4 py-3 text-left leading-6 text-forest transition-colors hover:bg-mint" : compact ? "justify-center text-forest underline underline-offset-4" : "justify-center rounded-full border-2 border-night bg-white px-4 py-2 text-forest transition-colors hover:bg-mint")}>
    {link.label}<Icon size={14} aria-hidden className="shrink-0" />
  </a>;
}
