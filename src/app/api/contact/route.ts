import { NextResponse } from "next/server";

/**
 * ============================================================
 * API ROUTE — Formulário de contacto
 * ------------------------------------------------------------
 * Esta rota recebe os dados do formulário (POST /api/contact),
 * valida-os no servidor e devolve uma resposta.
 *
 * ⚠️ ESTADO ATUAL: a rota valida e regista o pedido no log do
 * servidor, mas AINDA NÃO ENVIA email/notificação real.
 * Escolha UMA das integrações abaixo para ativar o envio.
 * As chaves/segredos ficam SEMPRE em variáveis de ambiente
 * (server-side) — nunca no frontend. Ver .env.example.
 * ============================================================
 */

type ContactPayload = {
  nome?: string;
  negocio?: string;
  email?: string;
  telefone?: string;
  website?: string;
  servico?: string;
  mensagem?: string;
  consentimento?: boolean;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  // ---- Validação no servidor (não confiar apenas no cliente) ----
  const errors: string[] = [];
  if (!data.nome?.trim()) errors.push("nome");
  if (!data.email?.trim() || !isValidEmail(data.email.trim()))
    errors.push("email");
  if (!data.mensagem?.trim()) errors.push("mensagem");
  if (data.consentimento !== true) errors.push("consentimento");

  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Campos inválidos.", fields: errors },
      { status: 422 }
    );
  }

  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT?.trim();

  if (!formspreeEndpoint) {
    console.error(
      "[contacto] FORMSPREE_ENDPOINT não está configurado; o pedido não foi enviado."
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "O formulário está temporariamente indisponível. Contacte-nos por email ou WhatsApp.",
      },
      { status: 503 }
    );
  }

  const formspreeResponse = await fetch(formspreeEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!formspreeResponse.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Não foi possível enviar o pedido. Contacte-nos por email ou WhatsApp.",
      },
      { status: 502 }
    );
  }

  /* ============================================================
   * OPÇÃO ALTERNATIVA — RESEND (envio de email)
   * ------------------------------------------------------------
   * npm install resend  ·  defina RESEND_API_KEY e CONTACT_TO_EMAIL
   *
   * import { Resend } from "resend";
   * const resend = new Resend(process.env.RESEND_API_KEY);
   * await resend.emails.send({
   *   from: "3C Trix Studio <onboarding@resend.dev>",
   *   to: process.env.CONTACT_TO_EMAIL!,
   *   subject: `Novo pedido — ${data.negocio ?? data.nome}`,
   *   text: JSON.stringify(data, null, 2),
   * });
   *
   * ============================================================
   * OPÇÃO ALTERNATIVA — SUPABASE (guardar em base de dados)
   * ------------------------------------------------------------
   * npm install @supabase/supabase-js  ·  defina SUPABASE_URL e
   * SUPABASE_SERVICE_ROLE_KEY (apenas no servidor).
   *
   * import { createClient } from "@supabase/supabase-js";
   * const supabase = createClient(
   *   process.env.SUPABASE_URL!,
   *   process.env.SUPABASE_SERVICE_ROLE_KEY!
   * );
   * const { error } = await supabase.from("pedidos").insert(data);
   * if (error) throw error;
   * ============================================================
   */

  return NextResponse.json({ ok: true });
}

// Bloqueia métodos não suportados de forma explícita.
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Método não permitido." },
    { status: 405 }
  );
}
