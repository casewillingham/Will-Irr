# 7. Publish & verify

## Before Publish

- [ ] Footer/header phone = `tel:9404689178` (no `1234567890`)
- [ ] Contact in main + mobile nav
- [ ] Book Now + Customer Portal URLs unchanged and working
- [ ] Slugs renamed + 301 redirects added
- [ ] Internal links updated off old slugs
- [ ] Holiday + landscape pages rewritten with SEO title/meta
- [ ] Cities hub: typo fixed + all 6 cities linked
- [ ] Cleburne meta mentions Cleburne only
- [ ] LocalBusiness JSON-LD added (optional street address filled if desired)
- [ ] Reviews section visible near Book Now
- [ ] Blog posts still at `/post/...` (unchanged)

## Publish

Wix Editor → **Publish**

## After Publish — spot checks

Open in an incognito window:

| Check | Expected |
|-------|----------|
| `https://www.will-irr.com/` | Loads; Book Now works; reviews visible |
| `https://www.will-irr.com/about-4` | 301 → `/about` |
| `https://www.will-irr.com/about-4-1` | 301 → `/design` |
| `https://www.will-irr.com/services-8` | 301 → `/commercial` |
| `https://www.will-irr.com/services-4` | 301 → `/landscape-lighting` |
| `https://www.will-irr.com/contact-9` | 301 → `/contact` |
| `https://www.will-irr.com/holiday-lighting` | Clear copy + meta |
| `https://www.will-irr.com/landscape-lighting` | Clear copy + meta |
| `https://www.will-irr.com/cities-we-serve` | All 6 cities + “surrounding” |
| `https://www.will-irr.com/irrigation-repair-cleburne-tx` | Cleburne-only SEO |
| `https://www.will-irr.com/post/how-to-winterize-your-sprinkler-system-in-texas-without-using-compressed-air` | Still 200 |

## Search Console / sitemap

1. Open [Google Search Console](https://search.google.com/search-console) for `will-irr.com`.  
2. Request indexing for updated URLs (home, lighting pages, cities, renamed pages).  
3. Confirm sitemap still listed: `https://www.will-irr.com/sitemap.xml`  
4. Watch **Page indexing** for 404s on old slugs (should be redirects, not errors).  
5. Optional: URL Inspection on `/about-4` to confirm Google sees the redirect.

## Done when

- Lighting pages make sense to a first-time visitor  
- Contact is findable; phone links dial correctly  
- Old Wix slugs redirect; blogs unchanged  
- City hub complete; Cleburne meta fixed  
- Reviews sit near booking CTAs  
