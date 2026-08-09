# 3C Trix Studio website

One Next.js application for the complete 3C Trix Studio website:

- `/` — company homepage
- `/research` — Research & Content
- `/automations` — AI Automation & Implementation
- `/websites` — Website Creation & Redesign (Portuguese default)
- `/websites/en` — Website Creation & Redesign (English)
- `/politica-de-privacidade` — Privacy Policy
- `/termos-e-condicoes` — Terms and Conditions

The project uses Next.js App Router, TypeScript, Tailwind CSS, Framer Motion
and OpenNext for Cloudflare Workers.

## Run locally

Requirements: Node.js 20 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deploy

The Cloudflare Worker configuration covers `3ctrix.com` and
`3ctrix.com/*`.

```bash
npx wrangler login
npm run deploy
```

Configure these server-side values in the Cloudflare Worker before publishing:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` — general, Research and Automations enquiries
- `WEBSITES_CONTACT_TO_EMAIL` — Websites enquiries
- `CONTACT_FROM_EMAIL`

Do not expose server-side secrets through `NEXT_PUBLIC_*` variables.

## Public configuration

Edit `src/config/site.ts` or set the matching public environment variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_LINKEDIN_URL`

The file contains the verified public contact details supplied for launch.

## Content updates

- Homepage: `src/content/home.ts`
- Automations: `src/content/automations.ts`
- Research: `src/content/research.ts`
- Research portfolio: `src/content/researchProjects.ts`

Add verified research links and images only in `researchProjects.ts`.

No verified AlphaVote logo is currently present. The site uses the product name
as text. Add the correct supplied asset to `public/` and replace the TODO-marked
text treatments in `src/app/page.tsx` and `src/app/research/page.tsx`.

No third-party client logos are fabricated. If verified logo files and usage
rights become available, add them to `public/` and update the experience sections.

The Privacy Policy and Terms and Conditions contain a visible reminder that
legal review is required before publication.
