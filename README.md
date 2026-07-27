# 3C Trix Studio — Landing Page

Landing page profissional da **3C Trix Studio**, um estúdio digital que ajuda
pequenos negócios a transformar websites antigos em websites modernos, rápidos e
adaptados às necessidades reais do negócio.

Construída com **Next.js (App Router)**, **TypeScript** e **Tailwind CSS**.
Preparada para publicar na **Cloudflare Workers** em
[`https://3ctrix.com/websites`](https://3ctrix.com/websites).

---

## 🧱 Tecnologia

- [Next.js 15](https://nextjs.org/) — App Router
- TypeScript
- Tailwind CSS
- [Framer Motion](https://www.framer.com/motion/) — animações de UI e interações
- [Three.js](https://threejs.org/) — fundo WebGL 3D da secção de exemplos
- [GSAP](https://gsap.com/) — rotação fluida do carrossel 3D
- Ícones SVG desenhados à medida (+ lucide-react para poucos ícones funcionais)
- Componentes reutilizáveis e conteúdos centralizados
- HTML semântico, acessibilidade e SEO básico

### Destaques interativos

- **Hero** em verde profundo com composição animada (janela antiga → moderna).
- **Carrossel 3D de exemplos** (`Showcase`): protótipos de websites _preenchidos_
  (restaurante, clínica, ginásio, loja, cabeleireiro, oficina, associação,
  imobiliária) que rodam entre si em coverflow 3D (GSAP), com arrasto, sobre um
  **fundo WebGL** de campo de pontos ondulante em verde → lilás (Three.js).
  Mockups desenhados à mão — sem imagens de terceiros.
- **Comparador Antes/Depois** arrastável no caso de estudo.
- Animações de entrada em scroll, accordion animado e header adaptativo.
- Tudo respeita `prefers-reduced-motion`; o Three.js/GSAP só carrega quando a
  secção se aproxima do ecrã (bundle inicial leve, ~158 kB First Load JS).

> Para trocar os protótipos por screenshots reais, edite
> `src/components/showcase/sites.tsx`.

Sem bibliotecas de componentes visuais (Material UI, etc.) e sem templates
prontos.

---

## 🚀 Instalação

Requisitos: **Node.js 18.18+** (recomendado 20+).

```bash
npm install
```

## 💻 Executar localmente

```bash
npm run dev
```

Abra [http://localhost:3000/websites](http://localhost:3000/websites) no navegador.

### Outros comandos

```bash
npm run lint     # análise de código (ESLint)
npm run build    # build de produção
npm run start    # servir o build de produção localmente
```

---

## ☁️ Deploy na Cloudflare

O projeto usa o adaptador OpenNext para executar o Next.js em Cloudflare
Workers. A rota está configurada para `3ctrix.com/websites` e
`3ctrix.com/websites/*`.

Pré-visualização no runtime da Cloudflare:

```bash
npm run preview
```

Publicação:

```bash
npx wrangler login
npm run deploy
```

O domínio `3ctrix.com` tem de estar numa zona ativa da Cloudflare e o registo
DNS do domínio tem de estar com proxy Cloudflare ativo. Os ficheiros
`wrangler.jsonc`, `open-next.config.ts` e `next.config.mjs` contêm a
configuração de produção.

---

## ⚙️ Onde alterar (guia rápido)

Todos os conteúdos editáveis estão centralizados em **`src/config/`**.
Não é preciso mexer nos componentes visuais.

| O que quer alterar        | Ficheiro                                   |
| ------------------------- | ------------------------------------------ |
| **Email**                 | `.env.local` → `NEXT_PUBLIC_CONTACT_EMAIL` (ou `src/config/brand.ts`) |
| **Número de WhatsApp**    | `.env.local` → `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| **Mensagem do WhatsApp**  | `src/config/brand.ts` → `contact.whatsappMessage` |
| **Preços**                | `src/config/pricing.ts` e `src/config/services.ts` |
| **Serviços**              | `src/config/services.ts`                   |
| **Perguntas frequentes**  | `src/config/faq.ts`                        |
| **Textos das secções**    | `src/config/content.ts`                    |
| **Links / navegação**     | `src/config/navigation.ts`                 |
| **Redes sociais**         | `src/config/brand.ts` → `social`           |
| **URL do site (SEO)**     | `.env.local` → `NEXT_PUBLIC_SITE_URL`      |
| **Logótipo**              | `public/3ctrix-logo.svg` (ou ver abaixo)   |
| **Fotografias / imagens** | pasta `public/` (ver abaixo)               |

### Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_WHATSAPP_NUMBER` — número em formato internacional, apenas
  dígitos (ex.: `351912345678`). Enquanto estiver vazio, o botão de WhatsApp
  fica **desativado** (nenhum número é inventado).
- `NEXT_PUBLIC_CONTACT_EMAIL` — email público mostrado no site.
- `NEXT_PUBLIC_SITE_URL` — URL final do site (usado no SEO/sitemap/Open Graph).

> ⚠️ Nunca coloque chaves ou segredos no frontend. As integrações do formulário
> usam variáveis **server-side** (sem prefixo `NEXT_PUBLIC_`).

### Logótipo

Por defeito é usado um logótipo vetorial em `public/3ctrix-logo.svg`.
Para usar o logótipo real:

1. Coloque o ficheiro em `public/3ctrix-logo.jpg`.
2. Em `src/config/brand.ts`, altere `logo.src` para `"/3ctrix-logo.jpg"`.

### Imagens (caso de estudo e fundadora)

As imagens têm **placeholders elegantes** até serem adicionadas. Para as ativar:

1. Coloque os ficheiros em `public/`:
   - `clube-antes.jpg` — screenshot do website anterior
   - `clube-depois.jpg` — screenshot do novo website
   - `beatriz.jpg` — fotografia da fundadora
2. Em `src/config/content.ts`, mude a respetiva flag para `true`:
   - `caseStudy.before.imageExists`
   - `caseStudy.after.imageExists`
   - `founder.photoExists`

---

## 📬 Formulário de contacto

O formulário envia os dados para a rota **`/websites/api/contact`**
(`src/app/api/contact/route.ts`), que valida os campos no servidor.

**Estado atual:** o pedido é validado e registado no log do servidor, mas ainda
**não envia** email/notificação real. O ficheiro da rota inclui comentários
prontos para ativar uma destas integrações:

- **Formspree** — cole o endpoint em `FORMSPREE_ENDPOINT`
- **Resend** — envio de email (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`)
- **Supabase** — guardar em base de dados (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)

Basta descomentar o bloco pretendido e definir as variáveis de ambiente.

---

## 🗂️ Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx              # layout global, fontes e metadados (SEO)
│   ├── page.tsx                # página inicial (monta todas as secções)
│   ├── globals.css             # estilos base + Tailwind
│   ├── icon.svg                # favicon
│   ├── opengraph-image.tsx     # imagem Open Graph (gerada dinamicamente)
│   ├── sitemap.ts              # sitemap.xml
│   ├── robots.ts               # robots.txt
│   ├── not-found.tsx           # página 404 personalizada
│   ├── api/contact/route.ts    # API do formulário de contacto
│   ├── politica-de-privacidade/page.tsx
│   └── termos-e-condicoes/page.tsx
├── components/                 # componentes de secções e UI
│   ├── Header.tsx, Hero.tsx, TrustBar.tsx, Problems.tsx, Services.tsx,
│   ├── IncludedFeatures.tsx, BusinessFeatures.tsx, CaseStudy.tsx,
│   ├── Process.tsx, Ownership.tsx, Founder.tsx, Pricing.tsx, FAQ.tsx,
│   ├── ContactForm.tsx, WhatsAppButton.tsx, Footer.tsx, LegalLayout.tsx,
│   ├── BrowserMockup.tsx
│   └── ui/                     # Button, Container, Logo, Reveal, Icon, SectionHeading
├── config/                     # ⭐ conteúdos centralizados (editar aqui)
│   ├── brand.ts, navigation.ts, services.ts, pricing.ts, faq.ts, content.ts
└── lib/                        # utilitários (whatsapp, cn)
```

---

## 🎨 Identidade visual

- **Verde quase-preto:** `#040D08` (`night`) — hero e secções escuras
- **Verde escuro principal:** `#0B4F1C` / `#052A12` (`forest` / `forest-deep`)
- **Verde de destaque (esmeralda):** `#16B978` (`emerald`)
- **Verde sálvia:** `#8FA38A` (`sage`)
- **Fundo claro:** branco quente (`#F6F8F5` — `paper`)
- **Fundo secundário:** verde muito claro (`#EAF2EC` — `mist`)
- **Texto principal:** quase preto (`#0B1410` — `ink`)
- **Texto secundário:** cinzento esverdeado (`#59635B` — `slate`)

Tipografia: **Inter** (corpo) e **Space Grotesk** (títulos/display).

As cores estão definidas em `tailwind.config.ts`.

---

## ✅ Acessibilidade e SEO

- HTML semântico e estrutura de headings correta
- Navegação por teclado, foco visível e link "saltar para o conteúdo"
- `alt` nas imagens e `aria-label` onde necessário
- Suporte a `prefers-reduced-motion`
- Metadados, Open Graph, sitemap, robots e dados estruturados
  (`ProfessionalService` + `FAQPage`), sem inventar morada ou avaliações

---

## 📝 Placeholders por preencher (antes de publicar)

- [x] **Logótipo real** — já integrado em `public/3ctrix-logo.jpg`
- [ ] **Email** de contacto (`NEXT_PUBLIC_CONTACT_EMAIL`)
- [ ] **Número de WhatsApp** (`NEXT_PUBLIC_WHATSAPP_NUMBER`)
- [ ] **URL final do site** (`NEXT_PUBLIC_SITE_URL`)
- [ ] **Imagem** `public/clube-antes.jpg` (+ `imageExists: true`)
- [ ] **Imagem** `public/clube-depois.jpg` (+ `imageExists: true`)
- [ ] **Fotografia** `public/beatriz.jpg` (+ `photoExists: true`)
- [ ] **(Opcional)** screenshots reais para a parede de exemplos —
  ver `src/components/showcase/mockups.tsx`
- [ ] **Redes sociais** (Instagram / LinkedIn) em `src/config/brand.ts`
- [ ] **Integração real** do formulário (Formspree / Resend / Supabase)
- [ ] **Revisão jurídica** da Política de Privacidade e dos Termos e Condições

> Nenhuma informação (contactos, métricas, clientes, morada) foi inventada.
> Os campos por preencher estão claramente identificados no código.
