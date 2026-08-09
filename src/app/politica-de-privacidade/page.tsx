import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | 3C Trix Studio",
  description: "How 3C Trix Studio handles information submitted through this website.",
  alternates: { canonical: "/politica-de-privacidade" },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updatedAt="July 2026">
      <p>
        This working policy explains how {siteConfig.companyName} handles personal
        information submitted through this website, particularly through its
        contact forms.
      </p>
      <Section title="1. Information we collect">
        <p>
          Depending on the form, information may include your name, organisation,
          email address, website, project details and any other information you
          choose to include in your message.
        </p>
      </Section>
      <Section title="2. How information is used">
        <p>
          Information is used to review and respond to enquiries, prepare project
          discussions or proposals, and maintain relevant business correspondence.
        </p>
      </Section>
      <Section title="3. Service providers">
        <p>
          Technical providers may process limited information when required for
          website hosting or email delivery. Personal information is not sold.
        </p>
      </Section>
      <Section title="4. Retention and security">
        <p>
          Information should be retained only for as long as reasonably required
          for the relevant enquiry, relationship, legal obligation or legitimate
          business record. Appropriate technical and organisational safeguards
          should be maintained.
        </p>
      </Section>
      <Section title="5. Your rights">
        <p>
          Depending on applicable law, you may have rights to access, correct,
          restrict or request deletion of personal information. Use the professional
          contact email configured on this website to make a request.
        </p>
      </Section>
      <Section title="6. Cookies and analytics">
        <p>
          The website is designed to minimise tracking. If analytics or additional
          cookies are enabled later, this policy and any required consent controls
          should be updated first.
        </p>
      </Section>
    </LegalLayout>
  );
}
