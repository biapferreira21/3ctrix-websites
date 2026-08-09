import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Container } from "./ui/Container";

export function LegalLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="content" className="bg-white pb-20 pt-32 sm:pb-28 sm:pt-36">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link href="/" className="text-sm font-semibold text-forest underline underline-offset-4">
              Back to 3C Trix Studio
            </Link>
            <h1 className="mt-8 text-4xl font-semibold text-ink sm:text-5xl">{title}</h1>
            <p className="mt-3 text-sm text-slate">Last updated: {updatedAt}</p>
            <aside className="mt-8 rounded-2xl border-2 border-night bg-[#f6dfb6] p-5 text-sm leading-6 text-ink">
              This text is a working website placeholder and requires legal review
              before publication.
            </aside>
            <div className="mt-10 space-y-9 text-sm leading-7 text-slate sm:text-base">
              {children}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
