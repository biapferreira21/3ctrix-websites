import Image from "next/image";
import {
  CalendarCheck,
  ClipboardList,
  FileText,
  Images,
  MapPin,
  MessageCircle,
  Newspaper,
  Share2,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem, FadeIn } from "./ui/motion";
import { businessFeatures } from "@/config/content";
import { withBasePath } from "@/config/deployment";

const featureIcons = [
  CalendarCheck,
  ClipboardList,
  FileText,
  UtensilsCrossed,
  Images,
  Sparkles,
  MessageCircle,
  MapPin,
  CalendarCheck,
  Newspaper,
  CalendarCheck,
  MessageCircle,
  Share2,
];

const cardStyles = [
  "border-forest-deep bg-[#dfece2] text-forest-deep shadow-[4px_4px_0_#3E855A]",
  "border-[#5d4a94] bg-[#e8e0fb] text-[#4a397e] shadow-[4px_4px_0_#9985DC]",
  "border-[#79501c] bg-[#f6dfb6] text-[#654115] shadow-[4px_4px_0_#C69A44]",
  "border-[#914f38] bg-[#f6d5c8] text-[#743e2d] shadow-[4px_4px_0_#d47d58]",
];

const rotations = [
  "-rotate-1",
  "rotate-1",
  "-rotate-[0.5deg]",
  "rotate-[0.7deg]",
];

export function BusinessFeatures() {
  return (
    <section
      id="funcionalidades"
      className="relative overflow-hidden bg-[#f4f0e7] py-24 text-ink sm:py-28"
    >
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-lilac/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-gold/25 blur-3xl" />

      <Container className="relative">
        <SectionHeading
          eyebrow="Funcionalidades à medida"
          title={businessFeatures.title}
        />
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate sm:text-base">
          Cada módulo entra em cena quando faz sentido para o seu negócio.
          Nada de soluções copiadas e coladas.
        </p>

        <FadeIn className="relative mx-auto mt-14 max-w-6xl">
          <div className="absolute -left-3 -top-3 h-full w-full rounded-[1.8rem] border-4 border-night bg-lilac-deep sm:-left-5 sm:-top-5" />
          <div className="relative overflow-hidden rounded-[1.8rem] border-4 border-night bg-paper shadow-[10px_10px_0_#C69A44]">
            <Image
              src={withBasePath("/features-comic.png")}
              alt="Ilustração em estilo banda desenhada de duas pessoas a montar um website com várias funcionalidades"
              width={1744}
              height={981}
              sizes="(max-width: 1200px) 94vw, 1120px"
              className="h-auto w-full"
            />
          </div>
          <div className="relative mx-4 -mt-7 flex justify-center sm:mx-10">
            <p className="rounded-[1.4rem] border-[3px] border-night bg-white px-5 py-3 text-center font-display text-sm font-semibold text-forest-deep shadow-[5px_5px_0_#3E855A] sm:text-base">
              O website certo liga todas as peças do seu negócio.
            </p>
          </div>
        </FadeIn>

        <Stagger
          amount={0.08}
          className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {businessFeatures.items.map((item, index) => {
            const Icon = featureIcons[index];
            return (
              <StaggerItem
                key={item}
                className={index === businessFeatures.items.length - 1 ? "lg:col-start-2" : ""}
              >
                <div
                  className={`group flex min-h-20 items-center gap-3 rounded-2xl border-[3px] px-4 py-3 transition-all duration-200 hover:-translate-y-1 hover:rotate-0 ${cardStyles[index % 4]} ${rotations[index % 4]}`}
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-current bg-white/70">
                    <Icon size={18} strokeWidth={2.1} aria-hidden />
                  </span>
                  <span className="text-sm font-bold leading-snug">{item}</span>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <FadeIn className="mx-auto mt-16 max-w-3xl">
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-night bg-forest-deep px-6 py-10 text-center text-white shadow-[8px_8px_0_#9985DC] sm:px-10">
            <span className="absolute left-6 top-4 font-display text-7xl leading-none text-gold/35" aria-hidden>
              “
            </span>
            <p className="relative font-display text-2xl font-semibold leading-snug sm:text-3xl">
              Não criamos apenas websites mais bonitos.
              <span className="mt-1 block text-gold-light">
                Criamos websites mais úteis.
              </span>
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
