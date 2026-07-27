import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/config/brand";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "3C Trix Studio | Criação e Redesign de Websites",
    template: "%s | 3C Trix Studio",
  },
  description:
    "Criamos e modernizamos websites para pequenos negócios em Lisboa e Portugal. Design responsivo, funcionalidades personalizadas e entrega até 15 dias.",
  keywords: [
    "criação de websites",
    "redesign de websites",
    "websites para pequenos negócios",
    "web design Lisboa",
    "criação de websites Portugal",
    "melhorar website empresarial",
    "website para restaurante",
    "website para clínica",
    "website para loja local",
  ],
  authors: [{ name: "3C Trix Studio" }],
  creator: "3C Trix Studio",
  publisher: "3C Trix Studio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: siteUrl,
    siteName: "3C Trix Studio",
    title: "3C Trix Studio | Criação e Redesign de Websites",
    description:
      "Criamos e modernizamos websites para pequenos negócios em Lisboa e Portugal. Design responsivo, funcionalidades personalizadas e entrega até 15 dias.",
  },
  twitter: {
    card: "summary_large_image",
    title: "3C Trix Studio | Criação e Redesign de Websites",
    description:
      "Criamos e modernizamos websites para pequenos negócios em Lisboa e Portugal.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#06140D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Saltar para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
