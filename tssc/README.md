# The Standard Savings Club

Local business discount network + community membership platform.

## Tech Stack
- React + Vite
- Tailwind CSS
- Supabase (auth + database)
- Stripe (subscriptions)
- Cloudflare Pages (hosting)

## Getting Started

```bash
npm install
cp .env.example .env
# Fill in your env vars
npm run dev
```

## Environment Variables
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_ADMIN_EMAIL=
```

## Deploy
Push to GitHub → auto-deploys via Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
