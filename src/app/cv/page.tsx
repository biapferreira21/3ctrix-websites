import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CvBook } from "@/components/cv/CvBook";
import { cvChapters, cvContact } from "@/content/cv";
import "./cv.css";

export const metadata: Metadata = {
  title: "Beatriz Ferreira | Interactive CV — 3C Trix",
  description: "Explore Beatriz Ferreira’s work in product, research and AI through an interactive book of experiences, photographs and projects.",
  alternates: { canonical: "/cv" },
  openGraph: { title: "Beatriz Ferreira — A life in chapters", description: "Product, research and AI. Open the book and explore the stories behind the CV.", url: "/cv", images: [{ url: "/cv/beatriz.webp", width: 1046, height: 777, alt: "Beatriz Pereira Ferreira" }] },
};

export default function CvPage() {
  return <><Header /><main id="content" className="cv-main"><CvBook /><noscript><section className="cv-noscript"><h2>Full curriculum vitae</h2><p><a href={cvContact.pdf}>Download the two-page PDF</a></p>{cvChapters.map((chapter) => <section key={chapter.id}><h2>{chapter.label}</h2>{chapter.entries.map((entry) => <article key={entry.id}><h3>{entry.title}</h3><p>{entry.organisation} {entry.date}</p><p>{entry.summary}</p>{entry.paragraphs?.map((text) => <p key={text}>{text}</p>)}{entry.points && <ul>{entry.points.map((text) => <li key={text}>{text}</li>)}</ul>}{entry.links?.map((link) => <p key={link.href}><a href={link.href}>{link.label}</a></p>)}</article>)}</section>)}</section></noscript></main><Footer /></>;
}
