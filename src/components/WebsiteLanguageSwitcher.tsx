"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const languagePairs: Record<string, { pt: string; en: string }> = {
  "/websites": { pt: "/websites", en: "/websites/en" },
  "/websites/como-funciona": {
    pt: "/websites/como-funciona",
    en: "/websites/en/how-it-works",
  },
  "/websites/precos": {
    pt: "/websites/precos",
    en: "/websites/en/pricing",
  },
  "/websites/en": { pt: "/websites", en: "/websites/en" },
  "/websites/en/how-it-works": {
    pt: "/websites/como-funciona",
    en: "/websites/en/how-it-works",
  },
  "/websites/en/pricing": {
    pt: "/websites/precos",
    en: "/websites/en/pricing",
  },
};

export function WebsiteLanguageSwitcher() {
  const pathname = usePathname();
  const english = pathname.startsWith("/websites/en");
  const pair = languagePairs[pathname] || languagePairs[english ? "/websites/en" : "/websites"];

  return (
    <nav
      aria-label="Website page language"
      className="fixed right-3 top-24 z-40 flex rounded-full border-2 border-night bg-[#f5f1e8] p-1 shadow-[3px_3px_0_#16180F] sm:right-5"
    >
      <Link
        href={pair.pt}
        lang="pt"
        hrefLang="pt"
        aria-current={!english ? "page" : undefined}
        className={cn(
          "rounded-full px-3 py-2 text-xs font-bold transition-colors",
          !english ? "bg-emerald text-night" : "text-slate hover:bg-mint"
        )}
      >
        Português
      </Link>
      <Link
        href={pair.en}
        lang="en"
        hrefLang="en"
        aria-current={english ? "page" : undefined}
        className={cn(
          "rounded-full px-3 py-2 text-xs font-bold transition-colors",
          english ? "bg-emerald text-night" : "text-slate hover:bg-mint"
        )}
      >
        English
      </Link>
    </nav>
  );
}
