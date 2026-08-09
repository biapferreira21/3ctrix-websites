import type { Metadata } from "next";
import { WebsiteLanguageSwitcher } from "@/components/WebsiteLanguageSwitcher";

export const metadata: Metadata = {
  title: "Criação e Redesign de Websites | 3C Trix Studio",
  description:
    "Websites modernos, responsivos e com funcionalidades adaptadas a micro e pequenas empresas.",
  alternates: {
    canonical: "/websites",
    languages: {
      "pt-PT": "/websites",
      en: "/websites/en",
    },
  },
  openGraph: {
    title: "Criação e Redesign de Websites | 3C Trix Studio",
    description:
      "Websites modernos, responsivos e com funcionalidades adaptadas a micro e pequenas empresas.",
    url: "/websites",
  },
};

export default function WebsitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="content" className="pt-14 lg:pt-0">
      <WebsiteLanguageSwitcher />
      {children}
    </div>
  );
}
