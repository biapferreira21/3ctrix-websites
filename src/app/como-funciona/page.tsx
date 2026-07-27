import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Process } from "@/components/Process";
import { Founder } from "@/components/Founder";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Como funciona e quem somos",
  description:
    "O processo da 3C Trix Studio, do primeiro contacto ao novo website, e quem está por detrás do estúdio.",
  alternates: { canonical: "/como-funciona" },
};

export default function ComoFuncionaPage() {
  return (
    <>
      <Header variant="solid" />
      <main id="conteudo" className="pt-20">
        {/* Intro */}
        <section className="relative overflow-hidden border-b-[3px] border-night bg-[#e8e0fb] py-16 sm:py-20">
          <div className="comic-dots pointer-events-none absolute inset-0 opacity-35" />
          <Container className="relative">
            <FadeIn className="mx-auto max-w-3xl text-center">
              <p className="mb-4 inline-flex -rotate-1 items-center gap-2 rounded-full border-2 border-night bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-forest-deep shadow-[4px_4px_0_#C69A44]">
                <span className="h-px w-6 bg-current opacity-50" />
                Processo e estúdio
              </p>
              <h1 className="font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-6xl">
                Como trabalhamos.
              </h1>
              <p className="mt-4 text-lg text-slate">
                Um processo claro, do primeiro contacto ao website publicado no
                seu domínio.
              </p>
            </FadeIn>
          </Container>
        </section>

        <Process />
        <Founder />

        {/* CTA final */}
        <section className="relative overflow-hidden border-t-[3px] border-night bg-[#f6dfb6] py-16 text-center">
          <div className="comic-dots pointer-events-none absolute inset-0 opacity-25" />
          <Container>
            <FadeIn className="relative mx-auto max-w-2xl rounded-[1.7rem] border-[3px] border-night bg-white p-8 shadow-[7px_7px_0_#9985DC]">
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                Vamos começar pelo seu website?
              </h2>
              <p className="mt-3 text-slate">
                Peça uma análise gratuita e receba as primeiras oportunidades de
                melhoria.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Button href="/#contacto" size="lg">
                  Pedir análise gratuita
                </Button>
                <Button href="/" variant="secondary" size="lg">
                  Voltar ao início
                </Button>
              </div>
            </FadeIn>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
