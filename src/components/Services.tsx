"use client";

import Link from "next/link";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { Stagger, StaggerItem, FadeIn } from "./ui/motion";
import { Button } from "./ui/Button";
import { serviceIcons, IconArrowRight } from "./ui/icons";
import { services, servicesNote } from "@/config/services";

// Alterna o gradiente dos ícones (verde→roxo / verde→dourado).
const gradients = [
  "from-emerald to-lilac-deep",
  "from-lilac-deep to-gold",
  "from-gold-deep to-emerald",
];
const cardTones = [
  "bg-[#dfece2] shadow-[6px_6px_0_#3E855A]",
  "bg-[#e8e0fb] shadow-[6px_6px_0_#9985DC]",
  "bg-[#f6dfb6] shadow-[6px_6px_0_#C69A44]",
  "bg-[#f6d5c8] shadow-[6px_6px_0_#d47d58]",
];

function ServiceCard({
  id,
  title,
  description,
  gradient,
  tone,
}: {
  id: string;
  title: string;
  description: string;
  gradient: string;
  tone: string;
}) {
  const Icon = serviceIcons[id as keyof typeof serviceIcons];

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Link
      href={`/precos#${id}`}
      aria-label={`Saber mais sobre ${title}`}
      onMouseMove={onMove}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border-[3px] border-night p-6 transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lilac focus-visible:ring-offset-4 ${tone}`}
    >
      {/* luz que segue o cursor (verde → roxo) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx,50%) var(--my,0%), rgba(153,133,220,0.16), rgba(62,133,90,0.10) 40%, transparent 70%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        <span
          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-night bg-gradient-to-br ${gradient} text-white`}
        >
          {Icon && <Icon size={22} />}
        </span>

        <h3 className="mt-5 font-display text-lg font-semibold text-ink">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
          {description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-sage/15 pt-4">
          <span className="text-xs font-medium uppercase tracking-wider text-slate/70">
            Saber mais
          </span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-night bg-white text-forest-deep transition-all duration-300 group-hover:bg-lilac group-hover:text-night">
            <IconArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Services() {
  return (
    <section id="servicos" className="relative overflow-hidden bg-[#f4f0e7] py-24 sm:py-28">
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-30" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Serviços"
          title="Uma presença digital melhor, do início ao fim."
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <StaggerItem key={service.id} className="h-full">
              <ServiceCard
                id={service.id}
                title={service.title}
                description={service.description}
                gradient={gradients[i % 2]}
                tone={cardTones[i % 4]}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="mt-12 flex flex-col items-center gap-6 text-center">
          <p className="max-w-xl text-sm text-slate">{servicesNote}</p>
          <Button href="/precos" variant="secondary">
            Ver preços
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
