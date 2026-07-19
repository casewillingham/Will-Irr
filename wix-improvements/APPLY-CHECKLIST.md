# Master apply checklist (Editor)

Use this inside Wix Editor. Check boxes as you go. Full copy lives in the linked files.

## Access
- [ ] Signed into Wix owner account OR collaborator with Editor access
- [ ] Site **will-irr.com** open in Editor

## 1. Nav + phone ([01-nav-and-phone.md](01-nav-and-phone.md))
- [ ] Replace every `tel:1234567890` with `tel:9404689178`
- [ ] Header phone correct
- [ ] Footer phone correct
- [ ] Contact page phone correct
- [ ] Add **Contact** to desktop menu
- [ ] Add **Contact** to mobile menu (if separate)
- [ ] Book Now URL confirmed
- [ ] Customer Portal URL confirmed

## 2. URLs + redirects ([02-url-redirects.md](02-url-redirects.md))
- [ ] `about-4` → `about`
- [ ] `about-4-1` → `design`
- [ ] `services-8` → `commercial`
- [ ] `services-4` → `landscape-lighting`
- [ ] `contact-9` → `contact`
- [ ] 301 redirects added for all five old paths
- [ ] Menus/buttons updated to new paths
- [ ] Blog `/post/...` URLs untouched

## 3. Holiday lighting ([copy/03-holiday-lighting.md](copy/03-holiday-lighting.md))
- [ ] SEO title + meta pasted
- [ ] H1 + sections pasted
- [ ] FAQ added
- [ ] Form + Book Now still present

## 4. Landscape lighting ([copy/04-landscape-lighting.md](copy/04-landscape-lighting.md))
- [ ] SEO title + meta pasted
- [ ] Slug is `landscape-lighting`
- [ ] H1 capitalization fixed
- [ ] Four service cards updated
- [ ] Process + FAQ added
- [ ] Link to Holiday Lighting added

## 5. Local SEO ([05-local-seo.md](05-local-seo.md))
- [ ] About / Contact / Cities / Commercial / Design metas set
- [ ] Cities typo fixed (`surrounding`)
- [ ] All 6 city pages linked from hub
- [ ] Cleburne title/meta say Cleburne only
- [ ] No “Copy of Landing Page…” leftovers
- [ ] JSON-LD from `schema/local-business.json` added
- [ ] Optional: home polish from `copy/home-polish.md`

## 6. Reviews ([06-reviews.md](06-reviews.md))
- [ ] Reviews section on Home near Book Now
- [ ] Reviews section on Services
- [ ] Optional on lighting pages
- [ ] Widget/link loads on mobile

## 7. Publish ([07-publish-verify.md](07-publish-verify.md))
- [ ] Publish site
- [ ] Run `./wix-improvements/verify-live.sh`
- [ ] Manual incognito checks for redirects
- [ ] Search Console: request indexing on key URLs
