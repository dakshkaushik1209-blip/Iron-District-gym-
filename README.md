# Iron District Fitness

> **"BUILT BY DISCIPLINE."**
> An industrial, high-contrast marketing website for Iron District Fitness (Sector 04 Strength Lab). Built with React 18, Vite, Tailwind CSS, Framer Motion, Lenis, Supabase Postgres, and Resend.

> **Portfolio demo project.** Iron District Fitness is a fictional brand. All names, trainers, prices, addresses, phone numbers and statistics are placeholder content.

**Live demo:** https://iron-district-fitness-indol.vercel.app

---

## Table of Contents
1. [Tech Stack & Architecture](#tech-stack--architecture)
2. [Visual Design System](#visual-design-system)
3. [Local Development Setup](#local-development-setup)
4. [Supabase Database & Row-Level Security (RLS)](#supabase-database--row-level-security-rls)
5. [Resend Email Notification Setup](#resend-email-notification-setup)
6. [Testing the Form Locally (`vercel dev`)](#testing-the-form-locally-vercel-dev)
7. [Production Deployment to Vercel](#production-deployment-to-vercel)
8. [How to Customize for a Real Client Gym](#how-to-customize-for-a-real-client-gym)
9. [Testing Checklist](#testing-checklist)

---

## Tech Stack & Architecture

- **Frontend:** React 18, Vite 5, Tailwind CSS, React Router v6.
- **Pages:** Home (`/`), Programs (`/programs`), Trainers (`/trainers`), Membership (`/membership`), Contact (`/contact`), Success (`/success`), Terms (`/terms`), Privacy (`/privacy`), and 404 (`*`).
- **Animation System:**
  - **Framer Motion**: Orchestrated hero entrance, viewport reveals (`SectionReveal`), accordion height transitions, and animated checkmarks.
  - **Lenis**: Smooth scrolling integrated with anchor links and sticky header offsets.
  - **Accessibility**: Respects `prefers-reduced-motion` (disables parallax, smooth scrolling and Ken Burns; substitutes simple opacity fades).
- **Backend:** Vercel Serverless Functions (`/api/trial.js`, ES Modules).
- **Database:** Supabase (PostgreSQL) `trial_requests` table with Row Level Security.
- **Email Dispatch:** Resend API for email notifications to the gym owner.
- **Validation:** Shared Zod schema between client and server (`/src/lib/schema.js`).
- **Spam Protection:** Honeypot field and IP-hashed rate limiting (5 requests per 10 minutes).

---

## Visual Design System

| Token | Hex / Value | Purpose |
|---|---|---|
| **Canvas / Background** | `#0A0A0A` | Root surface |
| **Card Surface** | `#141414` | Card containers |
| **Elevated Surface** | `#1A1A1A` | Elevated cells and tracks |
| **Interactive Surface** | `#222222` | Hover tier and selected toggles |
| **Structural Border** | `#262626` | 1px hairline borders |
| **Primary Accent** | `#FF5A1F` | CTAs, badges, active borders |
| **Text Display** | `#FFFFFF` | Headlines |
| **Text Body** | `#A3A3A3` | Body copy |
| **Text Muted** | `#737373` | Metadata annotations |

### Typography
- **Headlines / Display:** `Barlow Condensed` (700 / 800)
- **Body:** `Inter` (400 / 500 / 600)
- **Data & Technical:** `Space Mono` (400 / 700)

---

## Local Development Setup

### Prerequisites
- Node.js `v18.0.0` or higher (Node 20+ recommended)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/dakshkaushik1209-blip/Iron-District-gym-.git
cd Iron-District-gym-

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Running the Frontend Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. This serves the frontend only; use `vercel dev` to test the form (see below).

---

## Supabase Database & Row-Level Security (RLS)

### Step 1: Create a Supabase Project
1. Log in to [Supabase](https://supabase.com).
2. Create a new project (e.g., `iron-district-fitness`).
3. Note your project URL and keys under **Project Settings -> API**:
   - `Project URL` -> `SUPABASE_URL`
   - `service_role` (secret) key -> `SUPABASE_SERVICE_ROLE_KEY`

Never expose the service role key in the browser, never prefix it with `VITE_`, and never commit it.

### Step 2: Run Table Creation & RLS SQL
In your Supabase dashboard, open the **SQL Editor**, paste the following script, and click **Run**:

```sql
-- 1. Create the trial_requests table
CREATE TABLE IF NOT EXISTS public.trial_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    program TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    plan TEXT,
    trainer TEXT,
    notes TEXT CHECK (char_length(notes) <= 300),
    status TEXT NOT NULL DEFAULT 'new',
    ip_hash TEXT NOT NULL
);

-- 2. Indexes for IP rate checks and timestamps
CREATE INDEX IF NOT EXISTS idx_trial_requests_created_at ON public.trial_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trial_requests_ip_hash ON public.trial_requests (ip_hash);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.trial_requests ENABLE ROW LEVEL SECURITY;

-- 4. No public reads
CREATE POLICY "Deny public read access"
ON public.trial_requests
FOR SELECT
TO anon
USING (false);

-- 5. Only the service role can insert
CREATE POLICY "Allow service role insert only"
ON public.trial_requests
FOR INSERT
TO service_role
WITH CHECK (true);

-- 6. Service role has full administrative access
CREATE POLICY "Allow service role full access"
ON public.trial_requests
FOR ALL
TO service_role
USING (true);
```

---

## Resend Email Notification Setup

1. Create a free account at [Resend](https://resend.com).
2. Under **API Keys**, create a key with **Sending access** (`re_...`).
3. Set it as `RESEND_API_KEY`.
4. Set `NOTIFY_EMAIL_TO` to the inbox that should receive new trial requests. Without a verified domain, Resend only delivers to the email address that owns your Resend account, so use that address while testing.
5. For testing without a custom domain, use Resend's default sender:
```env
   NOTIFY_EMAIL_FROM=onboarding@resend.dev
```
6. To send from a custom domain (e.g., `noreply@yourgym.com`), verify your DNS records under Resend **Domains**.

---

## Testing the Form Locally (`vercel dev`)

To test the full stack locally, including the serverless API in `/api/trial.js`, install the Vercel CLI:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Run local development with serverless functions mounted
vercel dev
```

During local execution with `vercel dev`:
- The frontend is served on [http://localhost:3000](http://localhost:3000).
- Requests to `/api/trial` are routed to the local Node runtime.
- Local development only: if the Supabase or Resend variables are missing, the API may run in a demo mode that checks validation, rate limits and the honeypot but does **not** save anything. In production and preview, missing variables return a server error and the form never shows success.

Required environment variables (copy `.env.example` to `.env`):

```env
VITE_WHATSAPP_NUMBER=
VITE_SITE_URL=http://localhost:3000
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NOTIFY_EMAIL_TO=
NOTIFY_EMAIL_FROM=onboarding@resend.dev
```

---

## Production Deployment to Vercel

### Option 1: Via Vercel Web Dashboard (Recommended)
1. Push your repository to GitHub.
2. In Vercel, click **Add New Project** and import the repository.
3. Configure **Build & Development Settings**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add the following **Environment Variables**:
   - `VITE_WHATSAPP_NUMBER`: WhatsApp number in international format, digits only, no `+` or spaces (e.g. `919XXXXXXXXX`).
   - `VITE_SITE_URL`: Your live URL (e.g. `https://your-site.vercel.app`)
   - `SUPABASE_URL`: Your Supabase Project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role secret key
   - `RESEND_API_KEY`: Your Resend API key (`re_...`)
   - `NOTIFY_EMAIL_TO`: Inbox that receives trial requests
   - `NOTIFY_EMAIL_FROM`: Sender email (`onboarding@resend.dev` until you verify a domain)
5. Click **Deploy**.
6. After the first deploy, set `VITE_SITE_URL` to the live URL and **Redeploy**, so canonical URLs and the Open Graph image use the correct address.

> **Reminder:** `VITE_` variables are baked in at build time. After changing `VITE_WHATSAPP_NUMBER` or `VITE_SITE_URL`, trigger a redeploy.

### Option 2: Via Vercel CLI
```bash
vercel --prod
```

---

## How to Customize for a Real Client Gym

All copy, branding, pricing and programs live in config and data files:

1. **Brand identity & location:** Update `/src/lib/config.js` with the client's name, address, operating hours, phone number and Google Maps embed URL.
2. **Programs:** Edit `/src/data/programs.js`.
3. **Trainers:** Edit `/src/data/trainers.js` with real names, verified qualifications, bios and portraits. Set `isDemo: false`.
4. **Pricing:** Edit `/src/data/plans.js` for amounts, billing cadence and perks.
5. **Photos:** Replace the images in `/src/data/gallery.js` and `/public/images` with the client's own photography.
6. **WhatsApp:** Set `VITE_WHATSAPP_NUMBER` to the gym's business number. Prefilled messages adapt to the program, plan or trainer the visitor selected.
7. **Email:** Verify a sending domain in Resend and set the client's notification inbox.

---

## Testing Checklist

Run this before every deployment:

- `npm run build` completes with no errors
- Submit the form with valid data: a row appears in Supabase, an email arrives, the success page shows
- Submit invalid data: inline errors appear and nothing is sent
- Go offline and submit: an error is shown, never a success message
- Click every WhatsApp button: WhatsApp opens with the correct prefilled message
- Click every nav and footer link: no 404s
- Refresh an inner page such as `/membership`: it still loads
- Check 360px, 390px, 768px and 1440px widths
- Check the browser console for errors
- Test with `prefers-reduced-motion: reduce` enabled
