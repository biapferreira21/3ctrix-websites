import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { brand, contact } from "@/config/brand";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description:
    "Termos e Condições de utilização e prestação de serviços da 3C Trix Studio.",
  robots: { index: true, follow: true },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl font-semibold text-ink">{children}</h2>
  );
}

export default function TermosCondicoes() {
  return (
    <LegalLayout title="Termos e Condições" updatedAt="julho de 2026">
      <p>
        Os presentes Termos e Condições regulam a utilização deste website e a
        prestação de serviços pela {brand.name}. Ao contratar os nossos
        serviços, o cliente aceita as condições aqui descritas.
      </p>

      <section className="space-y-3">
        <H2>1. Serviços</H2>
        <p>
          A {brand.name} presta serviços de criação e redesign de websites, SEO
          e manutenção para pequenos negócios. O âmbito exato de cada projeto é
          definido em orçamento próprio, aprovado por ambas as partes antes do
          início dos trabalhos.
        </p>
      </section>

      <section className="space-y-3">
        <H2>2. Orçamento e pagamento</H2>
        <p>
          Os preços apresentados no website são valores de referência (&ldquo;a
          partir de&rdquo;). O orçamento final depende da dimensão, dos
          conteúdos e das funcionalidades de cada projeto. As condições de
          pagamento são acordadas por escrito antes do início do
          desenvolvimento.
        </p>
      </section>

      <section className="space-y-3">
        <H2>3. Conteúdos fornecidos pelo cliente</H2>
        <p>
          O cliente é responsável por fornecer os conteúdos, fotografias e
          materiais necessários ao projeto, garantindo que detém os direitos
          sobre os mesmos. A {brand.name} pode apoiar a escrita e reorganização
          dos textos.
        </p>
      </section>

      <section className="space-y-3">
        <H2>4. Prazos</H2>
        <p>
          O prazo normal máximo de desenvolvimento é de 15 dias, contando que os
          conteúdos e o feedback sejam entregues atempadamente. Atrasos na
          entrega de materiais por parte do cliente podem prolongar este prazo.
        </p>
      </section>

      <section className="space-y-3">
        <H2>5. Revisões</H2>
        <p>
          Cada projeto inclui uma revisão dentro do período de desenvolvimento.
          Alterações adicionais ou fora do âmbito inicialmente acordado podem ser
          orçamentadas separadamente.
        </p>
      </section>

      <section className="space-y-3">
        <H2>6. Domínio, alojamento e propriedade</H2>
        <p>
          O domínio, o alojamento e as contas digitais ficam em nome do cliente,
          que os paga diretamente e mantém o controlo dos seus ativos digitais.
          Após a entrega e o pagamento integral, o cliente é titular do website
          desenvolvido.
        </p>
      </section>

      <section className="space-y-3">
        <H2>7. Manutenção</H2>
        <p>
          A manutenção é um serviço opcional e não obrigatório, contratado
          separadamente quando o negócio necessita de apoio contínuo.
        </p>
      </section>

      <section className="space-y-3">
        <H2>8. Limitação de responsabilidade</H2>
        <p>
          A {brand.name} compromete-se a prestar os serviços com diligência
          profissional. Não nos responsabilizamos por indisponibilidades
          resultantes de serviços de terceiros (alojamento, domínio, plataformas
          externas) fora do nosso controlo.
        </p>
      </section>

      <section className="space-y-3">
        <H2>9. Lei aplicável</H2>
        <p>
          Os presentes Termos e Condições regem-se pela lei portuguesa. Qualquer
          litígio será resolvido nos tribunais competentes em Portugal.
        </p>
      </section>

      <section className="space-y-3">
        <H2>10. Contacto</H2>
        <p>
          Para qualquer questão sobre estes termos, contacte-nos através de{" "}
          <a
            href={`mailto:${contact.email}`}
            className="font-medium text-forest underline underline-offset-2"
          >
            {contact.email}
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}
