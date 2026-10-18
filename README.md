# Iron District Fitness

> **"BUILT BY DISCIPLINE."**  
> An industrial, high-contrast, production-ready web platform for Iron District Fitness (Sector 04 Strength Lab). Built with React 18, Vite, Tailwind CSS, Framer Motion, Lenis, Supabase Postgres, and Resend.

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
9. [Verification & Test Results](#verification--test-results)

---

## Tech Stack & Architecture

- **Frontend:** React 18, Vite 5, Tailwind CSS, React Router v6.
- **Pages:** Home (`/`), Programs (`/programs`), Trainers (`/trainers`), Membership (`/membership`), Contact (`/contact`), Success (`/success`), and 404 (`*`).
- **Animation System:**
  - **Framer Motion**: Orchestrated hero entrance (masked line reveals, supporting text, CTA wipes), viewport reveals (`SectionReveal`), accordion height springs, and animated checkmarks.
  - **Lenis**: Smooth inertia scrolling integrated with anchor links and sticky header offsets.
  - **Accessibility**: Strict respect for `prefers-reduced-motion` across all components (disables parallax, smooth scrolling, and Ken Burns; substitutes simple opacity fades).
- **Backend:** Vercel Serverless Functions (`/api/trial.js` ES Modules).
- **Database:** Supabase (PostgreSQL) `trial_requests` table with strict Row Level Security.
- **Email Dispatch:** Resend API for real-time gym owner email notifications.
- **Validation:** Shared Zod schema between client and server (`/src/lib/schema.js`).
- **Rate Limiting:** IP-hashed sliding window rate limiter (5 requests per 10 minutes).

---

## Visual Design System

The visual identity embodies an unapologetic, disciplined, industrial strength aesthetic engineered for high-performance athletes:

| Token | Hex / Value | Purpose |
|---|---|---|
| **Canvas / Background** | `#0A0A0A` | Pure deep industrial black root surface |
| **Card Surface** | `#141414` | Subdued charcoal card container tier |
| **Elevated Surface** | `#1A1A1A` | Elevated interactive cells and metric tracks |
| **Interactive Surface** | `#222222` | Hover tier and selected segmented toggles |
| **Structural Border** | `#262626` | 1px hairline architectural seams |
| **Primary Accent** | `#FF5A1F` | Blast Orange (CTAs, live badges, active borders) |
| **Text Display** | `#FFFFFF` | Stark white display headlines |
| **Text Body** | `#A3A3A3` | Balanced neutral grey body copy |
| **Text Muted** | `#737373` | Technical monospace metadata annotations |

### Typography:
- **Headlines / Display:** `Barlow Condensed` (700 / 800 uppercase).
- **Body & Editorial:** `Inter` (400 / 500 / 600).
- **Data & Technical:** `Space Mono` (400 / 700 uppercase).

---

## Local Development Setup

### Prerequisites
- Node.js `v18.0.0` or higher (Node 20+ recommended)
- npm or pnpm

### Installation
```bash
# Clone or navigate to the repository
cd stitch_iron_district_fitness_website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Running the Frontend Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Supabase Database & Row-Level Security (RLS)

### Step 1: Create a Supabase Project
1. Log in to [Supabase](https://supabase.com).
2. Create a new project (e.g., `iron-district-fitness`).
3. Note your project URL and keys under **Project Settings -> API**:
   - `Project URL` -> `SUPABASE_URL`
   - `service_role` (secret) key -> `SUPABASE_SERVICE_ROLE_KEY`

### Step 2: Run Table Creation & RLS SQL
In your Supabase dashboard, navigate to the **SQL Editor**, paste the following script, and click **Run**:

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
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    ip_hash TEXT NOT NULL
);

-- 2. Create index for IP rate checks and timestamps
CREATE INDEX IF NOT EXISTS idx_trial_requests_created_at ON public.trial_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trial_requests_ip_hash ON public.trial_requests (ip_hash);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.trial_requests ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: No public reads (prohibits anonymous users from querying lifter data)
CREATE POLICY "Deny public read access"
ON public.trial_requests
FOR SELECT
TO anon
USING (false);

-- 5. RLS Policy: Public inserts disallowed directly from client; only service_role can insert
CREATE POLICY "Allow service role insert only"
ON public.trial_requests
FOR INSERT
TO service_role
WITH CHECK (true);

-- 6. RLS Policy: Service role has full administrative access
CREATE POLICY "Allow service role full access"
ON public.trial_requests
FOR ALL
TO service_role
USING (true);
```

---

## Resend Email Notification Setup

1. Create a free account at [Resend](https://resend.com).
2. Under **API Keys**, click **Create API Key** with Full Access permissions (`re_...`).
3. Set the key in your environment variables as `RESEND_API_KEY`.
4. Define your destination email address as `NOTIFY_EMAIL_TO` (e.g., `owner@irondistrictfitness.com`).
5. For testing without a verified custom domain, use Resend's default test address:
   ```env
   NOTIFY_EMAIL_FROM=onboarding@resend.dev
   ```
6. To send from your gym's custom domain (e.g., `noreply@irondistrictfitness.com`), verify your DNS records under Resend **Domains**.

---

## Testing the Form Locally (`vercel dev`)

To test the full stack locally—including the serverless API handler in `/api/trial.js`—install the Vercel CLI:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Run local development with serverless functions mounted
vercel dev
```

During local execution with `vercel dev`:
- Vite serves the frontend on [http://localhost:3000](http://localhost:3000).
- Serverless API requests to `/api/trial` are routed to the local Node runtime in `/api/trial.js`.
- If environment variables are omitted, `/api/trial.js` enters **Demo Mode**, verifying validation, rate limits, and honeypot rules, and returning a generated ticket (`ID-TR-XXXXX`).

---

## Production Deployment to Vercel

### Option 1: Via Vercel Web Dashboard (Recommended)
1. Push your repository to GitHub / GitLab / Bitbucket.
2. In Vercel, click **Add New Project** and import the repository.
3. Configure the **Build & Development Settings**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add the following **Environment Variables**:
   - `VITE_WHATSAPP_NUMBER`: Gym WhatsApp number in international format without `+` or spaces (e.g. `919XXXXXXXXX`).
     > [!IMPORTANT]
     > **Vercel Environment Variable Reminder**: Be sure to add `VITE_WHATSAPP_NUMBER` in **Vercel Dashboard -> Project Settings -> Environment Variables** (for Production and Preview environments) and trigger a redeployment (`Redeploy`) so your live client build bakes in the correct WhatsApp destination number.
   - `VITE_SITE_URL`: Your live domain (e.g. `https://irondistrictfitness.com`)
   - `SUPABASE_URL`: Your Supabase Project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Secret Key
   - `RESEND_API_KEY`: Your Resend API Key (`re_...`)
   - `NOTIFY_EMAIL_TO`: Owner or admissions inbox email
   - `NOTIFY_EMAIL_FROM`: Verified sender email (e.g. `bookings@yourdomain.com`)
5. Click **Deploy**. Vercel will build the frontend, optimize assets, and deploy the `/api/trial.js` serverless function.

### Option 2: Via Vercel CLI
```bash
vercel --prod
```

---

## How to Customize for a Real Client Gym

When delivering this website to a real gym client, all copy, branding, pricing, and programs are centralized in configuration and data files:

1. **Brand Identity & Coordinates:**
   Update `/src/lib/config.js` with the client's legal name, facility address, operating hours, phone number, and Google Maps coordinates.
2. **Programs:**
   Edit `/src/data/programs.js` to modify disciplines, intensity ratings (RPE), equipment specs, and session lengths.
3. **Trainers & Faculty:**
   Edit `/src/data/trainers.js` with real trainer names, certifications, bios, and portraits. Set `isDemo: false`.
4. **Pricing Tiers:**
   Edit `/src/data/plans.js` to update pricing amounts, billing cadence, perk lists, and the comparison matrix.
5. **Facility Photos:**
   Replace the images in `/src/data/gallery.js` with photography of the client's actual training facility.
6. **WhatsApp Integration:**
   Set `VITE_WHATSAPP_NUMBER` in `.env` to the gym manager's direct WhatsApp business number. Prefilled messages will automatically adapt to any program, plan, or trainer context.

---

## Verification & Test Results

The platform has been audited against production quality criteria:

| Category | Status | Details |
|---|---|---|
| **Build & Compilation** | ✅ PASSED | `npm run build` completes with 0 errors and 0 warnings. Code split into lazy chunks. |
| **Responsive Layout** | ✅ PASSED | Tested across 360px, 390px, 768px, 1024px, and 1440px viewports. Sticky mobile booking bar activates under 768px. |
| **Form Validation** | ✅ PASSED | Client and server Zod schemas enforce Indian phone format, future dates (+60 days), and honeypot spam traps. |
| **Focus Management** | ✅ PASSED | On validation failure, focus automatically moves to the first invalid field. Mobile menu and Lightbox trap Tab focus. |
| **Server Error Resilience** | ✅ PASSED | Preserves user input upon failure. Renders actionable "Try again" and WhatsApp fallback options. |
| **Accessibility & Motion** | ✅ PASSED | Tested with `prefers-reduced-motion: reduce`. Disables Lenis and parallax; replaces motion with opacity fades. |
| **SEO & Social Cards** | ✅ PASSED | OpenGraph, Twitter Cards, semantic tags (`h1`, `header`, `main`, `footer`), `robots.txt`, `sitemap.xml`, and JSON-LD structured data included. |
