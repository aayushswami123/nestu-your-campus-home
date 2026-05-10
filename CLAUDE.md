# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Frontend (root)
```bash
npm run dev        # start Vite dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run lint       # ESLint
npm run format     # Prettier
```

### Backend (backend/)
```bash
cd backend
npm run dev        # tsx watch (auto-reload)
npm run build      # tsc → dist/
npm start          # run compiled output (production)
```

No test suite in this project.

## Architecture

**NestU** is a waitlist landing page split into two independently deployed services.

```
nestu-your-campus-home/
├── src/               ← Vite React SPA → Vercel
│   ├── App.tsx        ← entire landing page (all sections as local components)
│   ├── main.tsx       ← React entry point
│   ├── styles.css     ← Tailwind v4 @theme + custom utilities
│   ├── components/ui/ ← shadcn/ui components (new-york style)
│   ├── hooks/
│   ├── lib/utils.ts   ← cn() helper
│   └── integrations/supabase/
│       ├── client.ts  ← Supabase anon client (Google OAuth only)
│       └── types.ts   ← generated DB types
├── index.html         ← SPA entry with SEO meta tags + JSON-LD
├── backend/           ← Express API → Render
│   └── src/index.ts   ← single file: POST /api/waitlist + email
└── supabase/
    └── migrations/    ← SQL run in order; waitlist_signups table
```

## Frontend

**Stack:** Vite 7 + React 19 + Tailwind v4 + shadcn/ui (new-york)

**Routing:** None — single `App.tsx`, no router.

**Supabase usage:** Client-side only, anon key, used exclusively for Google OAuth (`supabase.auth.signInWithOAuth`). All database writes go to the backend API.

**Google OAuth flow:**
1. User clicks "Continue with Google" → `supabase.auth.signInWithOAuth({ provider: 'google', redirectTo: window.location.origin })`
2. Browser redirects to Google, then back to the app
3. `onAuthStateChange` fires `SIGNED_IN` in `App.tsx` → calls backend API → signs out (email collected, session not needed)

**Key env var:** `VITE_BACKEND_URL` — points to the Render backend (`http://localhost:3001` locally, Render URL in production).

## Backend

**Stack:** Express + TypeScript (ESM), deployed to Render.

**Endpoints:**
- `GET /health` — Render health check
- `POST /api/waitlist` — validates email, inserts to Supabase (service role), sends Resend email (fire-and-forget)

**Duplicate email:** Postgres unique constraint returns code `23505` → backend returns `{ success: true, code: "DUPLICATE" }`, no email sent.

**Key env vars** (set in Render dashboard):
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — from Supabase project settings → API
- `RESEND_API_KEY` — from resend.com dashboard
- `FROM_EMAIL` — sender (domain must be verified in Resend)
- `FRONTEND_URL` — used for CORS origin and email links

## Design system

All colors in `src/styles.css` as CSS custom properties (oklch):

| Token | Value | Use |
|---|---|---|
| `--ink` | near-black | primary text |
| `--orange-accent` | brand orange | CTAs, highlights |
| `--sage` | muted green | success, secondary |
| `--background` | off-white | page background |
| `--border` | warm beige | borders |

Reference them in Tailwind as `text-[var(--ink)]`, `bg-[var(--orange-accent)]`, etc.

Custom utilities: `.shadow-soft`, `.lift` (hover raise), `.grain` (texture overlay), `.bg-tint`, `.marquee` / `.marquee-track`, `.animate-fade-up[-delay-N]`.

Fonts: `font-serif` → DM Serif Display · `font-sans` → Inter · `font-mono` → JetBrains Mono.

## Database

One table: `waitlist_signups` — `email` (unique on `lower(email)`), `role`, `university`, `referral_code`, `source`, `user_agent`, `created_at`. RLS enabled; anon/authenticated can INSERT, not SELECT.

## Deployment

**Vercel (frontend):** connect repo root, build command `npm run build`, output `dist/`. Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_BACKEND_URL` in Vercel env vars.

**Render (backend):** root directory `backend/`, build `npm run build`, start `npm start`. Set all vars from `backend/.env.example` in Render dashboard.

**Supabase Auth (Google OAuth):** Add `http://localhost:5173` and your Vercel production URL to Supabase → Auth → URL Configuration → Redirect URLs.
