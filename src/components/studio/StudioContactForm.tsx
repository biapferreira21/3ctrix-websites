"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";

export type StudioField = {
  name: string;
  label: string;
  type?: "text" | "email" | "url" | "textarea" | "select";
  required?: boolean;
  options?: readonly string[];
  autoComplete?: string;
};

export function StudioContactForm({
  title,
  text,
  submitLabel,
  source,
  fields,
}: {
  title: string;
  text: string;
  submitLabel: string;
  source: string;
  fields: readonly StudioField[];
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setStatus("loading");
    setMessage("");

    const detailLines = fields
      .filter((field) => !["name", "company", "email", "website", "message"].includes(field.name))
      .map((field) => `${field.label}: ${values[field.name] || "Not provided"}`);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          formType: "studio",
          nome: values.name,
          negocio: values.company,
          email: values.email,
          website: values.website,
          servico: source,
          mensagem: [
            values.message || "Contact request submitted.",
            "",
            `Source: ${source}`,
            ...detailLines,
          ].join("\n"),
          consentimento: true,
          _gotcha: values._gotcha,
        }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "The request could not be sent.");
      }
      setValues({});
      setStatus("success");
      setMessage("Thank you. Your request has been sent.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "The request could not be sent. Please try again."
      );
    }
  }

  const fieldClass =
    "mt-2 min-h-12 w-full rounded-xl border-2 border-night/70 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate/50 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/25";

  return (
    <section id="contact" className="relative overflow-hidden border-t-[3px] border-night bg-[#dfece2] py-20 sm:py-28">
      <div className="comic-dots pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-dark">
            Start a conversation
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-slate">{text}</p>
          <p className="mt-8 rounded-2xl border-2 border-night bg-[#f6dfb6] p-5 text-sm leading-6 text-slate shadow-[5px_5px_0_#C69A44]">
            Required fields are marked with an asterisk. Details are sent through
            the same secure server-side contact route used by the Websites page.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-[1.75rem] border-[3px] border-night bg-[#f5f1e8] p-5 shadow-[8px_8px_0_#16180F] sm:p-8"
        >
          <div className="sr-only" aria-hidden>
            <label htmlFor={`${source}-gotcha`}>Leave this field empty</label>
            <input
              id={`${source}-gotcha`}
              tabIndex={-1}
              autoComplete="off"
              value={values._gotcha || ""}
              onChange={(event) =>
                setValues((current) => ({ ...current, _gotcha: event.target.value }))
              }
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => {
              const id = `${source}-${field.name}`.toLowerCase().replaceAll(" ", "-");
              const wide = field.type === "textarea";
              return (
                <div key={field.name} className={wide ? "sm:col-span-2" : undefined}>
                  <label htmlFor={id} className="text-sm font-semibold text-ink">
                    {field.label}
                    {field.required && <span aria-hidden="true"> *</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={id}
                      name={field.name}
                      rows={5}
                      required={field.required}
                      value={values[field.name] || ""}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.name]: event.target.value,
                        }))
                      }
                      className={cn(fieldClass, "resize-y")}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={id}
                      name={field.name}
                      required={field.required}
                      value={values[field.name] || ""}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.name]: event.target.value,
                        }))
                      }
                      className={fieldClass}
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={id}
                      name={field.name}
                      type={field.type || "text"}
                      required={field.required}
                      autoComplete={field.autoComplete}
                      value={values[field.name] || ""}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.name]: event.target.value,
                        }))
                      }
                      className={fieldClass}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full border-[3px] border-night bg-emerald px-6 py-3 text-sm font-bold text-night shadow-[4px_4px_0_#9985DC] transition-transform hover:-translate-y-1 disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {status === "loading" ? "Sending…" : submitLabel}
          </button>
          <div aria-live="polite" className="mt-4 min-h-6">
            {message && (
              <p
                className={cn(
                  "flex items-start gap-2 rounded-xl px-4 py-3 text-sm",
                  status === "success"
                    ? "bg-emerald/10 text-emerald-dark"
                    : "bg-red-50 text-red-700"
                )}
              >
                {status === "success" && <CheckCircle2 size={17} aria-hidden />}
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
