import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { brand, contact } from "@/config/brand";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da 3C Trix Studio — como tratamos os dados recolhidos através do website.",
  robots: { index: true, follow: true },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xl font-semibold text-ink">{children}</h2>
  );
}

export default function PoliticaPrivacidade() {
  return (
    <LegalLayout title="Política de Privacidade" updatedAt="julho de 2026">
      <p>
        A presente Política de Privacidade descreve como a {brand.name} recolhe,
        utiliza e protege os dados pessoais fornecidos através deste website. Ao
        utilizar o website e, em particular, o formulário de contacto, o
        utilizador declara ter tomado conhecimento desta política.
      </p>

      <section className="space-y-3">
        <H2>1. Responsável pelo tratamento</H2>
        <p>
          O responsável pelo tratamento dos dados é a {brand.name}. Para
          qualquer questão relacionada com privacidade, pode contactar-nos
          através do email indicado no website.
        </p>
      </section>

      <section className="space-y-3">
        <H2>2. Dados recolhidos</H2>
        <p>
          Através do formulário de contacto podemos recolher: nome, nome do
          negócio, email, telefone ou WhatsApp, endereço do website atual, tipo
          de serviço pretendido e a mensagem enviada. Apenas são tratados os
          dados que o utilizador escolhe fornecer.
        </p>
      </section>

      <section className="space-y-3">
        <H2>3. Finalidade e fundamento</H2>
        <p>
          Os dados são utilizados exclusivamente para responder ao pedido de
          contacto, elaborar propostas e prestar os serviços solicitados. O
          fundamento para este tratamento é o consentimento do utilizador,
          manifestado ao submeter o formulário, e a execução de diligências
          pré-contratuais.
        </p>
      </section>

      <section className="space-y-3">
        <H2>4. Conservação dos dados</H2>
        <p>
          Os dados são conservados apenas durante o período necessário ao
          cumprimento das finalidades referidas ou até que o utilizador solicite
          a sua eliminação.
        </p>
      </section>

      <section className="space-y-3">
        <H2>5. Partilha com terceiros</H2>
        <p>
          A {brand.name} não vende nem cede os dados a terceiros. Poderão ser
          utilizados fornecedores de serviços técnicos (por exemplo, alojamento
          ou envio de email) estritamente para o funcionamento do website e da
          comunicação, sempre com garantias adequadas de proteção de dados.
        </p>
      </section>

      <section className="space-y-3">
        <H2>6. Direitos do titular</H2>
        <p>
          O utilizador pode, a qualquer momento, exercer os direitos de acesso,
          retificação, eliminação, limitação, portabilidade e oposição
          relativamente aos seus dados, contactando-nos através do email
          disponível no website. Tem ainda o direito de apresentar reclamação
          junto da Comissão Nacional de Proteção de Dados (CNPD).
        </p>
      </section>

      <section className="space-y-3">
        <H2>7. Cookies</H2>
        <p>
          Este website procura minimizar a utilização de cookies. Caso venham a
          ser utilizados cookies de medição ou funcionalidades adicionais, esta
          política será atualizada em conformidade.
        </p>
      </section>

      <section className="space-y-3">
        <H2>8. Contacto</H2>
        <p>
          Para exercer os seus direitos ou esclarecer dúvidas sobre esta
          política, contacte-nos através de{" "}
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
