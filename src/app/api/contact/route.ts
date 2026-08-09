import { NextResponse } from "next/server";

type ContactPayload = {
  formType?: "websites" | "studio";
  nome?: string;
  negocio?: string;
  email?: string;
  telefone?: string;
  website?: string;
  servico?: string;
  mensagem?: string;
  consentimento?: boolean;
  _gotcha?: string;
};

const limits = {
  nome: 100,
  negocio: 120,
  email: 254,
  telefone: 40,
  website: 500,
  servico: 120,
  mensagem: 5000,
} as const;

function clean(value: string | undefined, max: number) {
  return value?.trim().slice(0, max) ?? "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (data._gotcha?.trim()) return NextResponse.json({ ok: true });

  const contact = {
    nome: clean(data.nome, limits.nome),
    negocio: clean(data.negocio, limits.negocio),
    email: clean(data.email, limits.email),
    telefone: clean(data.telefone, limits.telefone),
    website: clean(data.website, limits.website),
    servico: clean(data.servico, limits.servico),
    mensagem: clean(data.mensagem, limits.mensagem),
  };

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);
  if (!contact.nome || !validEmail || !contact.mensagem || data.consentimento !== true) {
    return NextResponse.json(
      { ok: false, error: "Please check the required fields." },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const isWebsitesEnquiry = data.formType === "websites";
  const toEmail = isWebsitesEnquiry
    ? process.env.WEBSITES_CONTACT_TO_EMAIL?.trim() || "websites@3ctrix.com"
    : process.env.CONTACT_TO_EMAIL?.trim() || "beatrizferreira@3ctrix.com";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "3C Trix Studio <contact@3ctrix.com>";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { ok: false, error: "Email delivery is temporarily unavailable." },
      { status: 503 }
    );
  }

  const detailRows = [
    ["Name", contact.nome],
    ["Company", contact.negocio],
    ["Email", contact.email],
    ["Phone", contact.telefone],
    ["Website", contact.website],
    ["Enquiry", contact.servico],
  ]
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#55615A">${escapeHtml(label)}</td><td style="padding:8px 12px;font-weight:600">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const text = [
    "New 3C Trix Studio enquiry",
    `Name: ${contact.nome}`,
    contact.negocio && `Company: ${contact.negocio}`,
    `Email: ${contact.email}`,
    contact.telefone && `Phone: ${contact.telefone}`,
    contact.website && `Website: ${contact.website}`,
    contact.servico && `Enquiry: ${contact.servico}`,
    "",
    contact.mensagem,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: contact.email,
        subject: `New 3C Trix enquiry — ${contact.servico || contact.negocio || contact.nome}`,
        text,
        html: `<div style="max-width:640px;margin:auto;font-family:Arial,sans-serif;color:#18211B"><div style="border:2px solid #18211B;border-radius:18px;overflow:hidden"><div style="background:#0B4F1C;color:white;padding:24px"><strong>3C Trix Studio</strong><h1 style="font-size:24px;margin:8px 0 0">New website enquiry</h1></div><table style="width:100%;padding:12px">${detailRows}</table><div style="margin:12px 24px 24px;padding:18px;background:#F2F6F1;border-radius:12px;white-space:pre-wrap">${escapeHtml(contact.mensagem)}</div></div></div>`,
        tags: [{ name: "source", value: isWebsitesEnquiry ? "websites" : "studio" }],
      }),
    });

    if (!response.ok) {
      console.error(`[contact] Resend returned ${response.status}: ${await response.text()}`);
      return NextResponse.json(
        { ok: false, error: "The request could not be sent. Please try again." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("[contact] Resend request failed.", error);
    return NextResponse.json(
      { ok: false, error: "The request could not be sent. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
