import { Header } from "@/components/Header";
import { Hero } from "@/components/websites-en/Hero";
import { TrustBar } from "@/components/websites-en/TrustBar";
import { Showcase } from "@/components/websites-en/Showcase";
import { MockupSection } from "@/components/websites-en/MockupSection";
import { Problems } from "@/components/websites-en/Problems";
import { Services } from "@/components/websites-en/Services";
import { BusinessFeatures } from "@/components/websites-en/BusinessFeatures";
import { CaseStudy } from "@/components/websites-en/CaseStudy";
import { Ownership } from "@/components/websites-en/Ownership";
import { FAQ } from "@/components/websites-en/FAQ";
import { ContactForm } from "@/components/websites-en/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/components/Footer";
import { faqItems } from "@/config/websites-en/faq";
import { services } from "@/config/websites-en/services";
import { brand, siteUrl } from "@/config/brand";

/**
 * Dados estruturados (JSON-LD) para SEO.
 * Descreve uma empresa de serviços profissionais e a página de FAQ.
 * ⚠️ Não inclui morada nem avaliações (não inventamos dados).
 */
function StructuredData() {
  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brand.name,
    description:
      "Criação e redesign de websites para pequenos negócios em Lisboa e Portugal.",
    url: siteUrl,
    areaServed: { "@type": "Country", name: "Portugal" },
    knowsLanguage: ["pt-PT"],
    serviceType: services.map((s) => s.title),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Header />
      <main id="conteudo">
        <Hero />
        <Showcase />
        <MockupSection />
        <Services />
        <TrustBar />
        <Problems />
        <BusinessFeatures />
        <CaseStudy />
        <Ownership />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
