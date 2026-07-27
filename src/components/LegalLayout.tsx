import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { Footer } from "./Footer";

type LegalLayoutProps = {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
};

/**
 * Estrutura simples e reutilizável para páginas legais
 * (Política de Privacidade e Termos e Condições).
 */
export function LegalLayout({ title, updatedAt, children }: LegalLayoutProps) {
  return (
    <>
      <header className="border-b border-sage/25 bg-paper">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" aria-label="3C Trix Studio — início">
              <Logo size={34} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-forest transition-colors hover:bg-mist"
            >
              <ArrowLeft size={16} aria-hidden />
              Voltar ao início
            </Link>
          </div>
        </Container>
      </header>

      <main id="conteudo" className="py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Aviso de revisão necessária */}
            <div className="mb-8 rounded-xl border border-sage/40 bg-mist/60 px-4 py-3 text-sm text-slate">
              <strong className="font-semibold text-forest">
                Documento base.
              </strong>{" "}
              Este texto é uma versão inicial e deve ser revisto por um
              profissional antes da publicação definitiva.
            </div>

            <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-slate">
              Última atualização: {updatedAt}
            </p>

            <div className="legal-prose mt-8 space-y-6 text-[0.95rem] leading-relaxed text-slate">
              {children}
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
