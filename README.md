# Edwardsville Tech Solutions — website

Next.js 14 (App Router) + Tailwind. Deployed on Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
```

## Where things live

- `src/lib/site.ts` — business details, every service, every price range, FAQ. Edit wording and prices here.
- `src/app/page.tsx` — home page. `src/app/services/[slug]` — one page per service. `about`, `contact`.
- `src/app/ui/` — the work-order ticket, receipt estimator, call-request form, AI "front counter".
- `src/app/api/contact` — sends call requests by email. `src/app/api/counter` — the AI helper.

## Settings (all optional)

See `.env.example`. Set them in Vercel → Project → Settings → Environment Variables.

| Name | What it does |
| --- | --- |
| `SMTP_USER`, `SMTP_PASS` | Send call requests from this project. Without them, requests go through the old site's mailer. |
| `OPENAI_API_KEY` | Turns on the "Ring the bell" AI helper. Hidden without it. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID (`G-…`). |
