"use client";

import { useState } from "react";
import { Container } from "./ui/Container";
import { FadeIn } from "./ui/motion";
import { IconCheck } from "./ui/icons";
import { contactSection } from "@/config/content";
import { withBasePath } from "@/config/deployment";
import { cn } from "@/lib/cn";

type FormState = {
  nome: string;
  negocio: string;
  email: string;
  telefone: string;
  website: string;
  servico: string;
  mensagem: string;
  consentimento: boolean;
  _gotcha: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  nome: "",
  negocio: "",
  email: "",
  telefone: "",
  website: "",
  servico: "",
  mensagem: "",
  consentimento: false,
  _gotcha: "",
};

type Status = "idle" | "loading" | "success" | "error";

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.nome.trim()) errors.nome = "Indique o seu nome.";
  if (!values.email.trim()) {
    errors.email = "Indique o seu email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Indique um email válido.";
  }
  if (!values.mensagem.trim()) errors.mensagem = "Escreva uma breve mensagem.";
  if (!values.consentimento)
    errors.consentimento = "É necessário autorizar o contacto para continuar.";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMensagem, setServerMensagem] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("error");
      setServerMensagem("Verifique os campos assinalados e tente novamente.");
      return;
    }

    setStatus("loading");
    setServerMensagem("");

    try {
      const response = await fetch(withBasePath("/api/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...values, formType: "websites" }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Não foi possível enviar o pedido.");
      }

      setValues(initialState);
      setErrors({});
      setStatus("success");
      setServerMensagem(
        "Pedido enviado com sucesso! Vamos responder para o seu email."
      );
    } catch (error) {
      setStatus("error");
      setServerMensagem(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar o pedido. Tente novamente."
      );
    }
  }

  const inputBase =
    "w-full rounded-xl border-2 border-night bg-white px-4 py-3 text-sm text-ink placeholder:text-slate/50 transition-colors focus:outline-none focus:ring-2 focus:ring-lilac focus:border-night";

  return (
    <section id="contacto" className="relative overflow-hidden bg-[#e8e0fb] py-24 sm:py-28">
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-gold/30 blur-3xl" />
      <Container className="relative">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.3fr]">
          <FadeIn className="self-start rounded-[1.7rem] border-[3px] border-night bg-[#f6dfb6] p-6 shadow-[7px_7px_0_#C69A44] sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-dark">
              Contacto
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-[2.4rem]">
              {contactSection.title}
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-slate">
              {contactSection.text}
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate">
              {[
                "Análise inicial sem compromisso",
                "Oportunidades de melhoria concretas",
                "Mockup inicial gratuito para negócios selecionados",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald/15 text-emerald-dark">
                    <IconCheck size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1} y={24}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-[1.7rem] border-[3px] border-night bg-white p-6 shadow-[8px_8px_0_#3E855A] sm:p-8"
            >
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-company-confirmation">
                  Deixe este campo vazio
                </label>
                <input
                  id="contact-company-confirmation"
                  name="_gotcha"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values._gotcha}
                  onChange={(e) => update("_gotcha", e.target.value)}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-ink">
                    Nome <span className="text-emerald-dark">*</span>
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    value={values.nome}
                    onChange={(e) => update("nome", e.target.value)}
                    aria-invalid={Boolean(errors.nome)}
                    aria-describedby={errors.nome ? "erro-nome" : undefined}
                    className={cn(inputBase, errors.nome ? "border-red-400" : "border-sage/40")}
                  />
                  {errors.nome && (
                    <p id="erro-nome" className="mt-1 text-xs text-red-600">
                      {errors.nome}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="negocio" className="mb-1.5 block text-sm font-medium text-ink">
                    Nome do negócio
                  </label>
                  <input
                    id="negocio"
                    name="negocio"
                    type="text"
                    autoComplete="organization"
                    value={values.negocio}
                    onChange={(e) => update("negocio", e.target.value)}
                    className={cn(inputBase, "border-sage/40")}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                    Email <span className="text-emerald-dark">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "erro-email" : undefined}
                    className={cn(inputBase, errors.email ? "border-red-400" : "border-sage/40")}
                  />
                  {errors.email && (
                    <p id="erro-email" className="mt-1 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefone" className="mb-1.5 block text-sm font-medium text-ink">
                    Telefone ou WhatsApp
                  </label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    autoComplete="tel"
                    value={values.telefone}
                    onChange={(e) => update("telefone", e.target.value)}
                    className={cn(inputBase, "border-sage/40")}
                  />
                </div>

                <div>
                  <label htmlFor="website" className="mb-1.5 block text-sm font-medium text-ink">
                    Website atual
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    inputMode="url"
                    placeholder="https://"
                    value={values.website}
                    onChange={(e) => update("website", e.target.value)}
                    className={cn(inputBase, "border-sage/40")}
                  />
                </div>

                <div>
                  <label htmlFor="servico" className="mb-1.5 block text-sm font-medium text-ink">
                    Tipo de serviço
                  </label>
                  <select
                    id="servico"
                    name="servico"
                    value={values.servico}
                    onChange={(e) => update("servico", e.target.value)}
                    className={cn(inputBase, "border-sage/40")}
                  >
                    <option value="">Selecione uma opção</option>
                    {contactSection.serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium text-ink">
                    Mensagem <span className="text-emerald-dark">*</span>
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={4}
                    value={values.mensagem}
                    onChange={(e) => update("mensagem", e.target.value)}
                    aria-invalid={Boolean(errors.mensagem)}
                    aria-describedby={errors.mensagem ? "erro-mensagem" : undefined}
                    className={cn(
                      inputBase,
                      "resize-y",
                      errors.mensagem ? "border-red-400" : "border-sage/40"
                    )}
                  />
                  {errors.mensagem && (
                    <p id="erro-mensagem" className="mt-1 text-xs text-red-600">
                      {errors.mensagem}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="consentimento" className="flex items-start gap-3 text-sm text-slate">
                  <input
                    id="consentimento"
                    name="consentimento"
                    type="checkbox"
                    checked={values.consentimento}
                    onChange={(e) => update("consentimento", e.target.checked)}
                    aria-invalid={Boolean(errors.consentimento)}
                    aria-describedby={errors.consentimento ? "erro-consentimento" : undefined}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-sage/50 text-emerald accent-emerald focus:ring-2 focus:ring-emerald"
                  />
                  <span>
                    {contactSection.consentLabel}{" "}
                    <span className="text-emerald-dark">*</span>
                  </span>
                </label>
                {errors.consentimento && (
                  <p id="erro-consentimento" className="mt-1 text-xs text-red-600">
                    {errors.consentimento}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full border-[3px] border-night bg-emerald px-6 py-3.5 text-base font-bold text-night shadow-[5px_5px_0_#9985DC] transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {status === "loading" ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                      aria-hidden
                    />
                    A enviar…
                  </>
                ) : (
                  contactSection.submitLabel
                )}
              </button>

              <div aria-live="polite" className="mt-4">
                {status === "success" && (
                  <p className="flex items-start gap-2 rounded-xl bg-emerald/10 px-4 py-3 text-sm text-emerald-dark">
                    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center">
                      <IconCheck size={14} />
                    </span>
                    {serverMensagem}
                  </p>
                )}
                {status === "error" && serverMensagem && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {serverMensagem}
                  </p>
                )}
              </div>
            </form>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
