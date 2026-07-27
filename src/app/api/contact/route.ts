import { NextResponse } from "next/server";

type ContactPayload = {
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

const MAX_LENGTHS = {
  nome: 100,
  negocio: 120,
  email: 254,
  telefone: 40,
  website: 500,
  servico: 120,
  mensagem: 3000,
} as const;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value: string | undefined, maxLength: number): string {
  return value?.trim().slice(0, maxLength) ?? "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function detailRow(label: string, value: string): string {
  if (!value) return "";

  return `
    <tr>
      <td style="padding:8px 12px;color:#5e665f;font-size:14px;vertical-align:top">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;color:#102018;font-size:14px;font-weight:600;vertical-align:top">${escapeHtml(value)}</td>
    </tr>
  `;
}

export async function POST(request: Request) {
  let data: ContactPayload;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Pedido inválido." },
      { status: 400 }
    );
  }

  // Campo invisível: bots costumam preenchê-lo, pessoas não.
  if (data._gotcha?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const contact = {
    nome: clean(data.nome, MAX_LENGTHS.nome),
    negocio: clean(data.negocio, MAX_LENGTHS.negocio),
    email: clean(data.email, MAX_LENGTHS.email),
    telefone: clean(data.telefone, MAX_LENGTHS.telefone),
    website: clean(data.website, MAX_LENGTHS.website),
    servico: clean(data.servico, MAX_LENGTHS.servico),
    mensagem: clean(data.mensagem, MAX_LENGTHS.mensagem),
  };

  const errors: string[] = [];
  if (!contact.nome) errors.push("nome");
  if (!contact.email || !isValidEmail(contact.email)) errors.push("email");
  if (!contact.mensagem) errors.push("mensagem");
  if (data.consentimento !== true) errors.push("consentimento");

  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Campos inválidos.", fields: errors },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail =
    process.env.CONTACT_TO_EMAIL?.trim() || "websites@3ctrix.com";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "3C Trix Studio <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("[contacto] RESEND_API_KEY não está configurada.");
    return NextResponse.json(
      {
        ok: false,
        error:
          "O envio por email está temporariamente indisponível. Contacte-nos por WhatsApp.",
      },
      { status: 503 }
    );
  }

  const subjectName = contact.negocio || contact.nome;
  const plainText = [
    "Novo pedido de análise gratuita",
    "",
    `Nome: ${contact.nome}`,
    contact.negocio ? `Negócio: ${contact.negocio}` : "",
    `Email: ${contact.email}`,
    contact.telefone ? `Telefone ou WhatsApp: ${contact.telefone}` : "",
    contact.website ? `Website atual: ${contact.website}` : "",
    contact.servico ? `Tipo de serviço: ${contact.servico}` : "",
    "",
    "Mensagem:",
    contact.mensagem,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <!doctype html>
    <html lang="pt">
      <body style="margin:0;background:#f2eefb;font-family:Arial,sans-serif;color:#102018">
        <div style="max-width:640px;margin:0 auto;padding:32px 16px">
          <div style="overflow:hidden;border:2px solid #102018;border-radius:20px;background:#ffffff;box-shadow:6px 6px 0 #9985dc">
            <div style="background:#3e855a;padding:22px 24px;color:#ffffff">
              <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">3C Trix Studio</p>
              <h1 style="margin:0;font-size:24px;line-height:1.25">Novo pedido de análise gratuita</h1>
            </div>
            <div style="padding:22px 12px">
              <table role="presentation" style="width:100%;border-collapse:collapse">
                ${detailRow("Nome", contact.nome)}
                ${detailRow("Negócio", contact.negocio)}
                ${detailRow("Email", contact.email)}
                ${detailRow("Telefone ou WhatsApp", contact.telefone)}
                ${detailRow("Website atual", contact.website)}
                ${detailRow("Tipo de serviço", contact.servico)}
              </table>
              <div style="margin:18px 12px 4px;padding:18px;border-radius:14px;background:#f6dfb6">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#3e855a">Mensagem</p>
                <p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.6">${escapeHtml(contact.mensagem)}</p>
              </div>
            </div>
          </div>
          <p style="margin:18px 0 0;text-align:center;color:#667068;font-size:12px">
            Enviado através do formulário em 3ctrix.com/websites
          </p>
        </div>
      </body>
    </html>
  `;

  let resendResponse: Response;

  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
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
        subject: `Novo pedido — ${subjectName}`,
        text: plainText,
        html,
        tags: [{ name: "source", value: "website-contact-form" }],
      }),
    });
  } catch (error) {
    console.error("[contacto] Falha de ligação ao Resend.", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Não foi possível enviar o pedido. Tente novamente ou contacte-nos por WhatsApp.",
      },
      { status: 502 }
    );
  }

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();
    console.error(
      `[contacto] Resend devolveu ${resendResponse.status}: ${resendError}`
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Não foi possível enviar o pedido. Tente novamente ou contacte-nos por WhatsApp.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Método não permitido." },
    { status: 405 }
  );
}
