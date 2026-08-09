import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms and Conditions | 3C Trix Studio",
  description: "Working terms for using the 3C Trix Studio website.",
  alternates: { canonical: "/termos-e-condicoes" },
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

export default function TermsPage() {
  return (
    <LegalLayout title="Terms and Conditions" updatedAt="July 2026">
      <p>
        These working terms cover use of the {siteConfig.companyName} website.
        Project-specific terms, scope, timing, responsibilities and payment
        conditions should be agreed separately in writing.
      </p>
      <Section title="1. Website information">
        <p>
          Website content is provided for general information and does not create
          a binding project commitment, professional guarantee or automatic
          service relationship.
        </p>
      </Section>
      <Section title="2. Services and proposals">
        <p>
          Research, content, automation and website engagements are adapted to the
          relevant question or process. A proposal or written agreement should
          define the final scope and commercial terms.
        </p>
      </Section>
      <Section title="3. Client materials and access">
        <p>
          Clients are responsible for ensuring they have the right to provide and
          use any content, data, images, credentials or other materials supplied
          for a project.
        </p>
      </Section>
      <Section title="4. Third-party systems">
        <p>
          Projects may use hosting services, APIs, software platforms and other
          third-party systems. Their availability and terms remain subject to
          their respective providers.
        </p>
      </Section>
      <Section title="5. Intellectual property">
        <p>
          Ownership and licensing for project deliverables, source materials,
          third-party assets and pre-existing tools should be specified in the
          applicable project agreement.
        </p>
      </Section>
      <Section title="6. Applicable terms">
        <p>
          This placeholder must be reviewed and completed with the correct legal
          entity details, applicable law, dispute provisions and professional
          contact information before publication.
        </p>
      </Section>
    </LegalLayout>
  );
}
