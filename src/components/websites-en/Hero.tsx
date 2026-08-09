import Image from "next/image";
import {
  ArrowRight,
  Check,
  MousePointer2,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { Container } from "./ui/Container";
import { withBasePath } from "@/config/deployment";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-[#f5f1e8] pb-16 pt-28 text-ink sm:pt-32 lg:flex lg:items-center lg:py-28"
    >
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-55" />
      <div className="pointer-events-none absolute -left-32 top-12 h-96 w-96 rounded-full bg-lilac/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold/30 blur-3xl" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-10">
          <div className="relative z-10">
            <div className="inline-flex -rotate-1 items-center gap-2 rounded-full border-[2px] border-night bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.13em] text-forest-deep shadow-[4px_4px_0_#C69A44]">
              <Sparkles size={15} aria-hidden />
              Digital studio · Portugal
            </div>

            <h1 className="mt-7 max-w-3xl font-display text-[3.25rem] font-semibold leading-[.95] tracking-tightest sm:text-6xl lg:text-[4.5rem]">
              Your business
              <span className="relative mt-1 block w-fit">
                deserves a website
                <span className="absolute -bottom-2 left-0 -z-10 h-5 w-full -rotate-1 bg-gold/65" />
              </span>
              <span className="mt-2 block text-lilac-deep">
                impossible to ignore.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-slate sm:text-lg">
              Transformamos websites parados no tempo em experiências rápidas,
              úteis e cheias de personalidade.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contacto"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border-[3px] border-night bg-emerald px-6 text-sm font-bold text-night shadow-[5px_5px_0_#123626] transition-transform hover:-translate-y-1"
              >
                Request a free review
                <ArrowRight size={18} aria-hidden />
              </a>
              <a
                href="#projetos"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border-[3px] border-night bg-white px-6 text-sm font-bold text-night shadow-[5px_5px_0_#9985DC] transition-transform hover:-translate-y-1"
              >
                See a real transformation
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-forest-deep">
              {[
                "Free initial mockup",
                "Delivery within 15 days",
                "No lock-in",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-lilac/30">
                    <Check size={12} aria-hidden />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[39rem] pb-10 pt-5">
            <div className="absolute -right-3 top-0 z-20 rotate-3 rounded-xl border-[3px] border-night bg-gold px-4 py-2 font-display text-sm font-bold text-night shadow-[4px_4px_0_#123626] sm:right-2">
              De “mais ou menos” a memorável
            </div>

            <div className="absolute -left-3 top-1/4 z-20 -rotate-6 rounded-full border-[3px] border-night bg-lilac px-4 py-3 text-night shadow-[4px_4px_0_#123626]">
              <Zap size={20} fill="currentColor" aria-hidden />
            </div>

            <div className="relative rotate-[1.2deg] rounded-[2rem] border-[4px] border-night bg-[#322b4e] p-3 shadow-[12px_12px_0_#3E855A] sm:p-4">
              <div className="flex items-center justify-between px-2 pb-3">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d47d58]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald" />
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[.65rem] font-semibold text-white/70">
                  website-do-seu-negocio.pt
                </span>
              </div>

              <div className="overflow-hidden rounded-[1.2rem] border-[3px] border-night bg-white">
                <div className="grid min-h-[26rem] grid-rows-[1.1fr_.9fr] sm:min-h-[30rem]">
                  <div className="relative overflow-hidden">
                    <Image
                      src={withBasePath("/business-photo-sprite.png")}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 90vw, 580px"
                      className="object-cover object-left-top"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/45 to-transparent" />
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-white">
                      <span className="font-display text-lg font-bold">
                        Tasca do Bairro
                      </span>
                      <span className="rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-night">
                        Reservar
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-5 max-w-[18rem] text-white">
                      <p className="font-display text-3xl font-semibold leading-none sm:text-4xl">
                        Sabores que sabem a casa.
                      </p>
                      <p className="mt-3 text-xs text-white/70 sm:text-sm">
                        Cozinha portuguesa, ingredientes locais e uma mesa à sua
                        espera.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 bg-[#fffaf0] p-4">
                    {[
                      ["Menu", "Pratos do dia e carta"],
                      ["Reservas", "Em poucos segundos"],
                      ["Localização", "Chegar sem dúvidas"],
                    ].map(([title, copy], index) => (
                      <div
                        key={title}
                        className={`rounded-xl border-2 border-night p-3 ${
                          index === 0
                            ? "bg-[#dfece2]"
                            : index === 1
                              ? "bg-[#e8e0fb]"
                              : "bg-[#f6dfb6]"
                        }`}
                      >
                        <span className="text-xs font-extrabold text-night">
                          {title}
                        </span>
                        <p className="mt-1 text-[.65rem] leading-snug text-slate">
                          {copy}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-1 right-4 z-20 rotate-3 rounded-[1.2rem] border-[3px] border-night bg-white px-4 py-3 shadow-[5px_5px_0_#C69A44]">
              <div className="flex items-center gap-2">
                <MousePointer2
                  size={18}
                  className="text-lilac-deep"
                  aria-hidden
                />
                <div>
                  <span className="block text-xs font-extrabold text-night">
                    Claro. Fast. Seu.
                  </span>
                  <span className="text-[.65rem] text-slate">
                    Pensado para converter
                  </span>
                </div>
              </div>
            </div>

            <Star
              size={30}
              fill="currentColor"
              className="absolute -left-2 bottom-8 rotate-12 text-[#d47d58]"
              aria-hidden
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
