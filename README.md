# Willingham Irrigation — Custom Website

Custom marketing site for [will-irr.com](https://www.will-irr.com): Next.js + Tailwind, Markdown blog, SEO-ready for Vercel.

The `wix-improvements/` folder is the old Wix paste kit — keep as reference until DNS cutover is done.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve production build
```

## Project layout

| Path | Purpose |
|------|---------|
| `app/` | Routes, layout, sitemap, robots |
| `components/` | Header, Footer, Hero, CTAs, etc. |
| `content/blog/` | Blog posts (Markdown/MDX) |
| `lib/content/posts.ts` | Post loader — swap to Sanity later without changing pages |
| `lib/site.ts` | Phone, HCP URLs, nav, cities |
| `lib/schema/` | LocalBusiness JSON-LD |
| `public/images/placeholders/` | Swap these for real job photos |
| `next.config.ts` | 301 redirects from old Wix slugs |

## Add a blog post

1. Create `content/blog/your-slug.mdx`
2. Frontmatter:

```mdx
---
title: "Your title"
description: "Meta description for SEO"
date: "2026-07-19"
updated: "2026-07-19"
image: "/images/placeholders/blog-cover.svg"
draft: false
---

Post body in Markdown…
```

3. Commit and push — Vercel deploys automatically. Live URL: `/post/your-slug`

Draft posts (`draft: true`) are excluded from the site and sitemap.

## Housecall Pro & contact (do not change casually)

- Book Now and Customer Portal URLs live in `lib/site.ts`
- Phone: `940-468-9178` → `tel:9404689178`
- License: `#LI0030140`

## Google reviews (live sync)

Reviews render in your own layout (no free widget). Sync uses the **Google Business Profile API** (works for **service-area businesses** without a public address). Places API is not used — it often returns empty for SABs.

### 1. Get API access (required — Google must approve)

1. Create/select a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Confirm your GBP is verified and active **60+ days**, and lists your website
3. Submit **Application for Basic API Access** via the [GBP API contact form](https://developers.google.com/my-business/content/prereqs) (use an email that is owner/manager on the profile)
4. Wait for approval — in Cloud Console, GBP API quota should be **~300 QPM** (0 QPM = not approved yet)

### 2. Enable APIs + OAuth client

After approval, enable at least:

- Google My Business API
- My Business Account Management API
- My Business Business Information API

Then **Credentials → Create credentials → OAuth client ID**:

- Application type: **Desktop** or **Web**
- Authorized redirect URI: `http://127.0.0.1:8787/oauth2/callback`
- Copy Client ID + Client Secret

OAuth consent screen: add yourself as a test user if the app is in Testing.

### 3. One-time connect

```bash
cp .env.example .env.local
# put CLIENT_ID and CLIENT_SECRET in .env.local first

npm run gbp:setup
```

Sign in with the Google account that owns/manages Willingham Irrigation. The script prints the rest of the env vars (refresh token, account ID, location ID).

### 4. Deploy

Add the same `GOOGLE_GBP_*` vars in Vercel → Environment Variables → redeploy.

Health check: `GET /api/reviews` → `"ok": true`

**Notes**

- Pulls **all** reviews (paginated), not the Places API 5-review cap
- Cached ~1 hour
- Fallback: `content/reviews.json` if OAuth/API fails
- Optional: set `googleReviewsUrl` in `lib/site.ts` for “Read all on Google”

## Photos & logo

Replace files under `public/images/` (and update `src` paths in heroes if you rename them). Placeholder SVGs are labeled in the UI so you can find every swap slot.

## Deploy on Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Framework preset: Next.js (defaults are fine)
4. Deploy a preview URL and click through Book Now, phone links, blog posts, and old Wix redirects (`/about-4`, `/contact-9`, etc.)

## DNS cutover (`www.will-irr.com`)

When the preview looks right:

1. In Vercel → Project → Settings → Domains → add `will-irr.com` and `www.will-irr.com`
2. At your DNS host, point records as Vercel instructs (usually A/ALIAS for apex + CNAME for `www`)
3. Wait for SSL to issue
4. Verify:
   - Homepage, services, city landers, `/blog`, each `/post/...`
   - 301s: `/about-4` → `/about`, `/about-4-1` → `/design`, `/services-8` → `/commercial`, `/services-4` → `/landscape-lighting`, `/contact-9` → `/contact`
   - Book Now + `tel:` links
5. Google Search Console → submit `https://www.will-irr.com/sitemap.xml`
6. Keep Wix live (or parked) for ~2 weeks while you watch GSC, then cancel Wix

## Later: browser CMS

`lib/content/posts.ts` is the only place that reads blog files. Replace its internals with Sanity (or similar) and keep the same `getPosts` / `getPostBySlug` shapes so pages stay unchanged.
