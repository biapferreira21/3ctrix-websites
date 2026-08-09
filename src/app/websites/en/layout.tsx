import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Creation & Redesign | 3C Trix Studio",
  description:
    "Modern, responsive websites and business-specific digital functionality for micro and small companies.",
  alternates: {
    canonical: "/websites/en",
    languages: {
      "pt-PT": "/websites",
      en: "/websites/en",
    },
  },
  openGraph: {
    title: "Website Creation & Redesign | 3C Trix Studio",
    description:
      "Modern, responsive websites and business-specific digital functionality for micro and small companies.",
    url: "/websites/en",
  },
};

export default function EnglishWebsitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
