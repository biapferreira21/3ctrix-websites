"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, Download, Expand, ImageIcon, Link2, Mail, Plus, X } from "lucide-react";
import { cvChapters, cvContact, type CvEntry } from "@/content/cv";
import { useReducedMotionPreference } from "@/lib/useReducedMotionPreference";
import { BookPageTurn, type BookTurn } from "./BookPageTurn";
import { CvReader } from "./CvReader";

function hashFor(chapter: string, entry?: string) { return `#${chapter}${entry ? `/${entry}` : ""}`; }
const allStories = cvChapters.flatMap((chapter, chapterIndex) => chapter.entries.map((entry) => ({ chapter, chapterIndex, entry })));

export function CvBook() {
  const [view, setView] = useState<"reader" | "stories">("reader");
  const [storyDirection, setStoryDirection] = useState(1);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<CvEntry | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [turn, setTurn] = useState<BookTurn>({ sequence: 0, direction: 1, title: "", lines: [] });
  const [motionOff, setMotionOff] = useState(false);
  const reduced = useReducedMotionPreference();
  const still = reduced || motionOff;
  const book = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const chapter = cvChapters[index];
  const storyPosition = selected ? allStories.findIndex((story) => story.entry.id === selected.id) : -1;
  const hasSelected = Boolean(selected);
  const theme = { "--cv-accent": chapter.color, "--cv-tint": chapter.paper } as CSSProperties;

  const restoreHash = useCallback(() => {
    const [chapterId, entryId] = window.location.hash.slice(1).split("/");
    const next = cvChapters.findIndex((item) => item.id === chapterId);
    if (next < 0) { setIndex(0); setSelected(null); return; }
    setIndex(next); setPhotoIndex(0);
    setSelected(cvChapters[next].entries.find((entry) => entry.id === entryId) ?? null);
  }, []);
  useEffect(() => { restoreHash(); window.addEventListener("hashchange", restoreHash); return () => window.removeEventListener("hashchange", restoreHash); }, [restoreHash]);

  useEffect(() => {
    const element = dialog.current;
    if (!selected || !element) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    element.querySelector<HTMLButtonElement>("[data-close]")?.focus();
    return () => {
      element.close(); document.body.style.overflow = previousOverflow;
      const destination = trigger.current?.isConnected ? trigger.current : document.querySelector<HTMLElement>(".cv-index [aria-current]");
      destination?.focus({ preventScroll: true });
    };
  }, [hasSelected]);

  useEffect(() => { dialog.current?.querySelector(".cv-detail")?.scrollTo({ top: 0 }); }, [selected?.id]);

  function openReaderStory(chapterId: string, entryId: string, element: HTMLElement) {
    const position = cvChapters.findIndex((item) => item.id === chapterId);
    const entry = cvChapters[position]?.entries.find((item) => item.id === entryId);
    if (!entry) return;
    trigger.current = element; setIndex(position); setPhotoIndex(0); setCopied(false); setSelected(entry);
    window.history.replaceState(null, "", hashFor(chapterId, entryId));
  }
  function moveStory(direction: number) {
    const next = allStories[storyPosition + direction];
    if (!next) return;
    setStoryDirection(direction); setIndex(next.chapterIndex); setSelected(next.entry); setPhotoIndex(0); setCopied(false);
    window.history.replaceState(null, "", hashFor(next.chapter.id, next.entry.id));
  }
  function changeView(next: "reader" | "stories") { setView(next); window.history.replaceState(null, "", next === "stories" ? hashFor(chapter.id) : window.location.pathname); }

  function chooseChapter(next: number) {
    if (next === index || next < 0 || next >= cvChapters.length) return;
    setTurn((current) => ({ sequence: current.sequence + 1, direction: next > index ? 1 : -1, title: chapter.label, lines: chapter.entries.map((entry) => entry.title) }));
    setIndex(next); setSelected(null);
    window.history.replaceState(null, "", hashFor(cvChapters[next].id));
    const top = book.current?.getBoundingClientRect().top ?? 0;
    if (top < 85) book.current?.scrollIntoView({ block: "start", behavior: still ? "instant" : "smooth" });
  }
  function openEntry(entry: CvEntry, element: HTMLElement) {
    trigger.current = element; setPhotoIndex(0); setCopied(false); setSelected(entry);
    window.history.replaceState(null, "", hashFor(chapter.id, entry.id));
  }
  function closeEntry() { setSelected(null); window.history.replaceState(null, "", hashFor(chapter.id)); }
  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); }
    catch { setCopied(false); }
  }
  const activePhoto = selected?.photos[photoIndex];

  return <div className="cv-experience" style={theme} data-motion={still ? "off" : "on"}>
    <div className="cv-topline">
      <div><p className="cv-eyebrow">An interactive curriculum vitae</p><h1>Beatriz <span>Pereira Ferreira</span></h1></div>
      <div className="cv-top-actions"><div className="cv-contact-emails"><a href={`mailto:${cvContact.email}`}><Mail size={15} aria-hidden />{cvContact.email}</a><a href={`mailto:${cvContact.businessEmail}`}><Mail size={15} aria-hidden />{cvContact.businessEmail}</a></div><a className="cv-download" href={cvContact.pdf} download><Download size={17} aria-hidden />Download CV<span>PDF · 2 pages</span></a></div>
    </div>
    <div className="cv-reading-bar"><p><BookOpen size={17} aria-hidden />The complete CV, with the stories behind it.</p><label className="cv-motion"><input type="checkbox" checked={!motionOff} onChange={(event) => setMotionOff(!event.target.checked)} disabled={reduced} />{reduced ? "Reduced motion" : "Page animations"}</label></div>
    <nav className="cv-view-switch" aria-label="CV view">{(["reader", "stories"] as const).map((mode) => <button type="button" key={mode} onClick={() => changeView(mode)} aria-pressed={view === mode}>{view === mode && <motion.span className="cv-view-active" layoutId="cv-view-indicator" transition={{ type: "spring", stiffness: 350, damping: 32, duration: still ? 0 : undefined }} />}<span>{mode === "reader" ? "Read the full CV" : "Explore the stories"}</span><small>{mode === "reader" ? "2 pages" : "9 chapters"}</small></button>)}</nav>
    {view === "reader" ? <CvReader still={still} onOpen={openReaderStory} onExplore={() => { changeView("stories"); document.querySelector(".cv-view-switch")?.scrollIntoView({ block: "start", behavior: still ? "instant" : "smooth" }); }} /> : <div className="cv-workspace">
      <nav className="cv-index" aria-label="CV chapters">
        <p className="cv-eyebrow">Contents</p>
        <ol>{cvChapters.map((item, position) => <li key={item.id}><button type="button" onClick={() => chooseChapter(position)} aria-current={position === index ? "step" : undefined}><span className="cv-index-line" aria-hidden />{item.label}</button></li>)}</ol>
        <label className="cv-mobile-index">Choose a chapter<select value={index} onChange={(event) => chooseChapter(Number(event.target.value))}>{cvChapters.map((item, position) => <option key={item.id} value={position}>{item.label}</option>)}</select></label>
        <a href={cvContact.linkedin} target="_blank" rel="noopener noreferrer" className="cv-index-link">LinkedIn</a><a href={cvContact.github} target="_blank" rel="noopener noreferrer" className="cv-index-link">GitHub</a>
      </nav>
      <div className="cv-book-column">
        <div className="cv-book" ref={book}>
          <div className="cv-book-binding" aria-hidden />
          <motion.section key={`${chapter.id}-left`} className="cv-page cv-page-left" initial={still ? false : { opacity: .5 }} animate={{ opacity: 1 }} transition={{ duration: still ? 0 : .5 }} aria-labelledby="cv-chapter-title">
            <div className="cv-page-running"><span>Beatriz Ferreira</span><span>Curriculum vitae</span></div>
            <p className="cv-eyebrow cv-chapter-label">{chapter.label}</p>
            <h2 id="cv-chapter-title">{chapter.title}</h2>
            <p className="cv-chapter-intro">{chapter.introduction}</p>
            <motion.button type="button" className={`cv-photo-card ${chapter.id === "about" ? "cv-portrait" : ""}`} onClick={(event) => openEntry(chapter.entries.find((entry) => entry.id === chapter.photoEntry)!, event.currentTarget)} whileHover={still ? {} : { rotate: 0, rotateY: 4, rotateX: -3, y: -8, scale: 1.015 }} whileTap={still ? {} : { scale: .99 }} aria-label={`Open ${chapter.entries.find((entry) => entry.id === chapter.photoEntry)?.title}`}>
              <span className="cv-photo-tape" aria-hidden /><span className="cv-photo-frame"><Image src={chapter.photo.src} alt={chapter.photo.alt} width={chapter.photo.width} height={chapter.photo.height} sizes="(max-width: 760px) 88vw, (max-width: 1100px) 40vw, 450px" priority={index === 0} /></span>
              <span className="cv-photo-caption">{chapter.photo.caption}<Expand size={16} aria-hidden /></span>
            </motion.button>
            <div className="cv-page-foot"><span>{chapter.note}</span><span>{String(index * 2 + 1).padStart(2, "0")}</span></div>
          </motion.section>
          <motion.section key={`${chapter.id}-right`} className="cv-page cv-page-right" initial={still ? false : { opacity: .25, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: still ? 0 : .55, delay: still ? 0 : .12 }} aria-label={`${chapter.label} experiences`}>
            <div className="cv-page-running"><span>{chapter.label}</span><span>Explore the details</span></div>
            <div className="cv-right-heading"><h3>{index === 0 ? "How I think & work" : "The experience"}</h3><p>Select a topic to open its story.</p></div>
            <ol className="cv-timeline">{chapter.entries.map((entry) => <li key={entry.id}><button className="cv-entry" type="button" onClick={(event) => openEntry(entry, event.currentTarget)} aria-haspopup="dialog"><span className="cv-timeline-tick" aria-hidden />{entry.date && <span className="cv-date">{entry.date}</span>}<span className="cv-entry-org">{entry.organisation}</span><span className="cv-entry-title">{entry.title}<Plus size={19} aria-hidden /></span><span className="cv-entry-summary">{entry.summary}</span><span className="cv-entry-meta">{entry.photos.length > 0 ? <><ImageIcon size={13} aria-hidden />{entry.photos.length === 1 ? "Photograph & story" : `${entry.photos.length} images & story`}</> : <>Read the story</>}</span></button></li>)}</ol>
            <div className="cv-page-foot"><span>Click to unfold</span><span>{String(index * 2 + 2).padStart(2, "0")}</span></div>
          </motion.section>
          <BookPageTurn turn={turn} disabled={still} />
        </div>
        <div className="cv-book-controls"><button type="button" onClick={() => chooseChapter(index - 1)} disabled={index === 0} aria-label="Previous chapter"><ChevronLeft size={19} aria-hidden /><span>Previous</span></button><p aria-live="polite" aria-atomic="true">{chapter.label}<span>Chapter {index + 1} of {cvChapters.length}</span></p><button type="button" onClick={() => chooseChapter(index + 1)} disabled={index === cvChapters.length - 1} aria-label="Next chapter"><span>Next chapter</span><ChevronRight size={19} aria-hidden /></button></div>
      </div>
    </div>}
    <div className="cv-endnote"><p>Always learning. Always building.</p><a href={`mailto:${cvContact.email}`}>{cvContact.email}</a><a href={`mailto:${cvContact.businessEmail}`}>{cvContact.businessEmail}</a><a href="/about">More about Beatriz</a></div>
    <AnimatePresence>{selected && <dialog ref={dialog} className="cv-dialog" aria-labelledby="cv-detail-title" onKeyDown={(event) => { if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return; if ((event.target as HTMLElement).closest("input, textarea, select")) return; event.preventDefault(); moveStory(event.key === "ArrowRight" ? 1 : -1); }} onCancel={(event) => { event.preventDefault(); closeEntry(); }} onClick={(event) => { if (event.target === event.currentTarget) closeEntry(); }}>
      <motion.div className={`cv-detail ${activePhoto ? "" : "cv-detail-text-only"}`} initial={still ? false : { opacity: 0, y: 55, scale: .94, rotateX: -6 }} animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }} transition={{ duration: still ? 0 : .5, ease: [.22, 1, .36, 1] }}>
        <nav className="cv-story-navigation" aria-label="Experience navigation"><button type="button" onClick={() => moveStory(-1)} disabled={storyPosition <= 0} aria-label="Previous experience"><ChevronLeft size={18} aria-hidden /><span>Previous</span></button><p aria-live="polite"><span>Experience {storyPosition + 1} / {allStories.length}</span><strong>{chapter.label}</strong></p><button type="button" onClick={() => moveStory(1)} disabled={storyPosition === allStories.length - 1} aria-label="Next experience"><span>Next experience</span><ChevronRight size={18} aria-hidden /></button><button type="button" data-close className="cv-close" aria-label="Close story" onClick={closeEntry}><X size={21} aria-hidden /></button><motion.span className="cv-story-progress" initial={false} animate={{ scaleX: (storyPosition + 1) / allStories.length }} transition={{ duration: still ? 0 : .4 }} /></nav>
        {activePhoto && <div className="cv-detail-gallery"><motion.figure key={activePhoto.src} initial={still ? false : { opacity: 0, rotate: -2, scale: .95 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: still ? 0 : .4 }}><Image src={activePhoto.src} alt={activePhoto.alt} width={activePhoto.width} height={activePhoto.height} sizes="(max-width: 760px) 90vw, 600px" /><figcaption>{activePhoto.caption}</figcaption></motion.figure>{selected.photos.length > 1 && <div className="cv-gallery-controls"><button type="button" aria-label="Previous photograph" onClick={() => setPhotoIndex((current) => current - 1)} disabled={photoIndex === 0}><ChevronLeft size={20} aria-hidden /></button><p aria-live="polite">{photoIndex + 1} / {selected.photos.length}</p><button type="button" aria-label="Next photograph" onClick={() => setPhotoIndex((current) => current + 1)} disabled={photoIndex === selected.photos.length - 1}><ChevronRight size={20} aria-hidden /></button></div>}</div>}
        <motion.div key={selected.id} className="cv-detail-copy" initial={still ? false : { opacity: 0, x: storyDirection * 28, rotateY: storyDirection * 4 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ duration: still ? 0 : .45 }}><p className="cv-eyebrow">{chapter.label}</p>{selected.date && <p className="cv-detail-date">{selected.date}</p>}<h2 id="cv-detail-title">{selected.title}</h2><p className="cv-detail-org">{selected.organisation}</p><p className="cv-detail-summary">{selected.summary}</p>{selected.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{selected.points && <ul>{selected.points.map((point) => <li key={point}>{point}</li>)}</ul>}{selected.links && <div className="cv-detail-links">{selected.links.map((link) => <a key={link.href} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>{link.label}</a>)}</div>}<button className="cv-copy" type="button" onClick={copyLink}><Link2 size={15} aria-hidden />{copied ? "Link copied" : "Copy link to this story"}</button><span className="sr-only" role="status">{copied ? "Story link copied to clipboard" : ""}</span></motion.div>
      </motion.div>
    </dialog>}</AnimatePresence>
  </div>;
}
