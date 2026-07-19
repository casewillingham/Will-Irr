# 5. Local SEO hardening

## A. Meta titles & descriptions

Set these in each page’s **SEO (Google)** settings.

### About (`/about` after rename)

- **Title:** `About Willingham Irrigation | Licensed Pros in Benbrook & Fort Worth`  
- **Description:** `Meet Case Willingham and the team behind dependable sprinkler repair and irrigation maintenance in Benbrook, Fort Worth, and nearby North Texas communities.`

### Contact (`/contact` after rename)

- **Title:** `Contact Willingham Irrigation | Book Sprinkler Repair`  
- **Description:** `Call 940-468-9178 or book online for irrigation repair in Benbrook, Fort Worth, and surrounding cities. Email case@will-irr.com.`

### Cities We Serve (`/cities-we-serve`)

- **Title:** `Cities We Serve | Irrigation Repair Near Fort Worth & Benbrook`  
- **Description:** `Willingham Irrigation serves Benbrook, Fort Worth, Cleburne, Aledo, White Settlement, Palmilla Springs, and surrounding North Texas areas.`

### Holiday + Landscape

Use titles/descriptions from:

- `copy/03-holiday-lighting.md`
- `copy/04-landscape-lighting.md`

### Commercial (`/commercial` after rename)

- **Title:** `Commercial Irrigation Repair & Maintenance | Fort Worth Area`  
- **Description:** `Commercial sprinkler repair, maintenance plans, and smart monitoring for properties in Benbrook, Fort Worth, and nearby cities.`

### Design (`/design` after rename)

- **Title:** `Irrigation Design Services | Willingham Irrigation`  
- **Description:** `Licensed irrigation design and oversight (LI0030140) for residential and commercial properties in the Fort Worth / Benbrook area.`

---

## B. Cities hub fixes (`/cities-we-serve`)

### Fix typo
Replace: `And serounding areas`  
With: `And surrounding areas`

### Link all six city pages

Make sure each city is a linked card/button:

| City | URL |
|------|-----|
| Benbrook | `/irrigation-repair-benbrook-tx` |
| Fort Worth | `/irrigation-repair-fortworth-tx` |
| Cleburne | `/irrigation-repair-cleburne-tx` |
| Aledo | `/irrigation-repair-aledo-tx` |
| White Settlement | `/irrigation-repair-whitesettlement-texas` |
| Palmilla Springs | `/irrigation-repair-palmilla-springs-tx` |

### Suggested intro paragraph

Willingham Irrigation provides sprinkler and irrigation repair across Benbrook, Fort Worth, and nearby communities. Choose your city below to see local service details — or book online if you’re in a surrounding area we serve.

---

## C. Cleburne lander cleanup

**Page:** `/irrigation-repair-cleburne-tx`

1. Open page SEO settings.  
2. Ensure **title** mentions Cleburne (not Benbrook / “Copy of…”).  
   Recommended title: `Sprinkler & Irrigation Repair in Cleburne, TX | Willingham Irrigation`  
3. Ensure **meta description** says Cleburne (not Benbrook).  
   Recommended: `Expert sprinkler and irrigation repair in Cleburne, TX. Fast diagnosis, quality fixes, and reliable watering from Willingham Irrigation.`  
4. In Editor page settings / browser tab title leftovers, remove any “Copy of Landing Page Benbrook” labels.  
5. Skim on-page text for accidental “Benbrook” mentions that should be “Cleburne”.

Repeat a quick scan on other city landers for leftover “Copy of…” titles.

---

## D. LocalBusiness JSON-LD

Wix: **Settings → SEO → SEO Settings** (sitewide) and/or page SEO → structured data / custom code (head), depending on your Wix plan.

Paste from [`schema/local-business.json`](schema/local-business.json) into a Custom Code / JSON-LD snippet on the **Home** page (or sitewide if Wix allows).

Update before publishing if you want them public:

- Street address (optional — only if you’re comfortable publishing it)
- Opening hours
- Google Business Profile URL in `sameAs`

Current known facts already filled:

- Name, phone, email, URL
- Area served cities
- License note in description
- Geo centered on Benbrook TX 76126

---

## E. Optional home polish (secondary)

On Home, add a short line under the hero or services section:

**Also offering:** Custom holiday lighting and year-round landscape lighting for homes and businesses in our service area.

Link those phrases to `/holiday-lighting` and `/landscape-lighting`.
