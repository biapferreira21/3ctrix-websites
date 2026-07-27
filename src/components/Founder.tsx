import Image from "next/image";
import { Container } from "./ui/Container";
import { FadeIn } from "./ui/motion";
import { founder } from "@/config/content";

export function Founder() {
  return (
    <section id="fundadora" className="relative overflow-hidden bg-[#e8e0fb] py-24 sm:py-28">
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-30" />
      <Container className="relative">
        <div className="mx-auto grid max-w-4xl items-center gap-10 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-14">
          <FadeIn className="mx-auto w-full max-w-[220px]">
            <div className="relative aspect-square overflow-hidden rounded-3xl border-[4px] border-night bg-white shadow-[8px_8px_0_#C69A44]">
              {founder.photoExists ? (
                <Image
                  src={founder.photo}
                  alt={`${founder.name} — ${founder.role}`}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-mint-soft to-white">
                  <span className="font-display text-4xl font-semibold text-emerald-dark">
                    BF
                  </span>
                  <p className="text-[0.7rem] font-medium uppercase tracking-wide text-slate/70">
                    {founder.photoPlaceholder}
                  </p>
                </div>
              )}
            </div>
          </FadeIn>

          <FadeIn
            delay={0.1}
            y={24}
            className="rounded-[1.7rem] border-[3px] border-night bg-white p-6 shadow-[7px_7px_0_#3E855A] sm:p-8"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-dark">
              A fundadora
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-[2.4rem]">
              {founder.title}
            </h2>
            <p className="mt-6 font-display text-lg font-semibold text-forest">
              {founder.name}
            </p>
            <p className="text-sm text-slate">{founder.role}</p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-slate">
              {founder.text}
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
