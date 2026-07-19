# 2. Cleaner URLs + 301 redirects

Do **not** change any `/post/...` blog URLs.

## Rename page slugs in Wix

For each page: **Pages** panel → page settings (gear) → **SEO (Google)** or **URL slug** → set new slug → Save.

| Current slug | New slug | New public URL |
|--------------|----------|----------------|
| `about-4` | `about` | `/about` |
| `about-4-1` | `design` | `/design` |
| `services-8` | `commercial` | `/commercial` |
| `services-4` | `landscape-lighting` | `/landscape-lighting` |
| `contact-9` | `contact` | `/contact` |

Leave these alone:

- `/` (home)
- `/services`
- `/holiday-lighting`
- `/blog`
- `/cities-we-serve`
- `/irrigation-repair-*` city pages
- `/post/*`

## Add 301 redirects

Wix: **Dashboard → Marketing & SEO → SEO Tools → URL Redirect Manager**  
(or **Settings → SEO → URL Redirects**)

Add permanent (301) redirects:

| Old path | New path |
|----------|----------|
| `/about-4` | `/about` |
| `/about-4-1` | `/design` |
| `/services-8` | `/commercial` |
| `/services-4` | `/landscape-lighting` |
| `/contact-9` | `/contact` |

If Wix auto-creates redirects when you rename a slug, still verify each old URL returns **301 → new URL**.

## Update internal links after rename

Search the Editor for old paths and update menu/buttons that still point at:

- `/about-4`
- `/about-4-1`
- `/services-8`
- `/services-4`
- `/contact-9`

Especially:

- Header/footer menus
- Home service cards
- Cities / About cross-links
- Any “Learn more” buttons

## Verify after publish

Open each old URL in an incognito window — should land on the new URL with no 404.
