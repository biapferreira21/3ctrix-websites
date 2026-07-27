"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Logo } from "./ui/Logo";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { navLinks, primaryCta } from "@/config/navigation";
import { cn } from "@/lib/cn";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <span
        className={cn(
          "absolute left-0 h-[2px] w-5 rounded bg-current transition-all duration-300",
          open ? "top-1.5 rotate-45" : "top-0.5"
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1.5 h-[2px] w-5 rounded bg-current transition-opacity duration-200",
          open && "opacity-0"
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-[2px] w-5 rounded bg-current transition-all duration-300",
          open ? "top-1.5 -rotate-45" : "top-[10px]"
        )}
      />
    </span>
  );
}

export function Header({ variant = "auto" }: { variant?: "auto" | "solid" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  // "auto": claro sobre o hero escuro, sólido ao rolar.
  // "solid": sempre sólido/claro (páginas internas de fundo claro).
  const onDark = false;
  const solid = true;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b-2 border-night bg-[#f5f1e8]/90 backdrop-blur-md"
          : "border-b-2 border-night bg-[#f5f1e8]/90 backdrop-blur-md"
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <Link
            href={variant === "solid" ? "/" : "#inicio"}
            aria-label="3C Trix Studio — início"
            className="rounded-md"
          >
            <Logo size={46} light={onDark} />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group relative rounded-full px-3 py-2 text-sm font-medium transition-colors",
                      onDark
                        ? "text-white/75 hover:text-white"
                        : "text-slate hover:text-forest-deep"
                    )}
                  >
                    {link.label}
                    <span className="absolute inset-x-3 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded bg-emerald transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Button
              href={primaryCta.href}
              size="md"
              variant={onDark ? "outlineLight" : "primary"}
            >
              {primaryCta.label}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors lg:hidden",
              onDark ? "text-white hover:bg-white/10" : "text-forest-deep hover:bg-mist"
            )}
            aria-expanded={open}
            aria-controls="menu-movel"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b-2 border-night bg-[#f5f1e8] lg:hidden"
          >
            <nav aria-label="Menu móvel">
              <Container>
                <ul className="flex flex-col py-4">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-mist"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li className="mt-3">
                    <Button
                      href={primaryCta.href}
                      size="lg"
                      className="w-full"
                      onClick={() => setOpen(false)}
                    >
                      {primaryCta.label}
                    </Button>
                  </li>
                </ul>
              </Container>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
