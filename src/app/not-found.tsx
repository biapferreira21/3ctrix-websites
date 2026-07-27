import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-5 text-center">
      <Link href="/" aria-label="3C Trix Studio — início" className="mb-10">
        <Logo size={44} />
      </Link>

      <p className="font-display text-6xl font-semibold text-sage sm:text-7xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-md text-base text-slate">
        A página que procura pode ter sido movida ou já não existe. Regresse ao
        início para continuar a navegar.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" size="lg">
          <Home size={18} aria-hidden />
          Ir para o início
        </Button>
        <Button href="/#contacto" variant="secondary" size="lg">
          <ArrowLeft size={18} aria-hidden />
          Falar connosco
        </Button>
      </div>
    </main>
  );
}
