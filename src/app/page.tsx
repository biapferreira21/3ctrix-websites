import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Showcase } from "@/components/Showcase";
import { MockupSection } from "@/components/MockupSection";
import { Problems } from "@/components/Problems";
import { Services } from "@/components/Services";
import { BusinessFeatures } from "@/components/BusinessFeatures";
import { CaseStudy } from "@/components/CaseStudy";
import { Ownership } from "@/components/Ownership";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/components/Footer";
import { faqItems } from "@/config/faq";
import { services } from "@/config/services";
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
