# Kala Art Wrap — कला

Website for **Kala Art Wrap**, handmade satin ribbon bouquets (forever flowers) from Jaipur.

Live: https://kalaartwrap.insporaone.in

## Pages
| Page | File |
|---|---|
| Home (hero, process, gallery wall, E-bouquet teaser) | `index.html` |
| Gallery (accordion, 3D spiral, lanyards) | `gallery.html` |
| E-bouquet studio — design & download a bouquet as JPG | `custom.html` |
| Contact / enquiry form | `contact.html` |
| FAQs, Privacy Policy, Terms | `faq.html`, `privacy.html`, `terms.html` |
| CRM dashboard (staff only, not indexed) | `crm.html` |

## Tech
- Plain HTML/CSS/JS — no build step. GSAP, Lenis and three.js are loaded from CDNs.
- Enquiries go to Supabase through RPC functions in an isolated `kaw_crm` schema (`assets/kala-api.js`). The key in that file is Supabase's *publishable* key; all tables are locked and only the `kaw_*` functions are callable.
- Light/dark theme: `assets/theme.css` + `assets/theme.js`.
- SEO: canonical + Open Graph tags, JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt`.

## Run locally
```bash
node serve.js
```
Then open http://localhost:5173.

## Deploy
Hosted on Vercel (`vercel.json` enables clean URLs and headers):
```bash
npx vercel deploy --prod
```

---
© 2026 Kala Art Wrap · All rights reserved by Vijay Sharma / Insporaone.
