# 1. Bugs and navigation

## Fix bad phone link

The footer shows **940-468-9178** but at least one link still uses `tel:1234567890`.

### In Wix Editor

1. Open the site Editor.
2. Scroll to the **footer** on any page (or open the Master/Header & Footer if using Studio).
3. Click the phone number text/link.
4. Open the link settings (chain icon).
5. Change the link to **Phone** → `9404689178` (or paste `tel:9404689178`).
6. Repeat for every phone number on:
   - Header
   - Footer
   - Contact page (`/contact-9` until renamed)
   - Any lightbox / mobile menu
7. Publish after verifying: hover or inspect that the destination is `tel:9404689178`.

### Quick verify (after publish)

- Click the footer phone on mobile/desktop → should dial **940-468-9178**.
- Search site HTML for `1234567890` — should return **zero** matches.

## Add Contact to main nav

1. Click the main menu (header).
2. **Manage Menu** → **Add Item**.
3. Label: `Contact`
4. Link to page: Contact (`contact-9` until slug is cleaned).
5. Place it after Blog or near the end of the menu (suggested order below).
6. Mirror the same item in any **mobile menu** if separate.

### Suggested menu order

1. About Us  
2. Services  
3. Commercial  
4. Design  
5. Holiday Lighting  
6. Landscape Lighting  
7. Cities We Serve  
8. Blog  
9. Contact  

## Verify Housecall Pro CTAs sitewide

Confirm these links on header (and footer if present):

| Label | URL |
|-------|-----|
| Book Now | `https://book.housecallpro.com/book/Willingham-Irrigation/6e06bb46fdb04f3a873b5ff79cd78988?v2=true` |
| Customer Portal | `https://client.housecallpro.com/customer_portal/request-link?token=e58f7193b64443c28a3778721017892b` |

Open both in a new tab after publish to confirm they still load.
