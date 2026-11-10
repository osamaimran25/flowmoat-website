# SEO Audit — flowmoat.com

**Date:** 2026-10-14
**Method:** `npm run build`, then every page in `dist/` parsed for title, description, headings,
canonical, OG/Twitter, JSON-LD types, internal links and word count. Source read alongside.
**Baseline:** `npm run seo:audit` passes — 0 errors, 1 warning. 14 indexable pages, 3 redirect stubs.

## Summary

The technical base is solid. Every page is static HTML, titles and descriptions sit inside
Google's limits, canonicals are self-referencing with consistent trailing slashes, and the JSON-LD
graph covers Organization, WebSite, Service, BlogPosting, FAQPage and BreadcrumbList. There are no
`<img>` tags or web fonts, so Core Web Vitals risk is low.

The gaps are **coverage and proof, not markup**:

- Only 4 pages target buyer-intent keywords, and there are no industry or use-case pages.
- Proof is two short product cards. There are no case study pages.
- Service pages don't link to the blog posts that support them.
- Blog posts have no named author.
- The AI Opportunity Finder produces nothing Google can index and captures no email.

## Findings

| Issue | Page/file | Severity | Fix | Effort |
|---|---|---|---|---|
| `og:image` points to files that don't exist (renamed pages, images still under old `enterprise-*` names), so shares show no preview | `/services/custom-software-development/`, `/blog/what-custom-software-costs/`, `/blog/why-ai-pilots-fail/` | High | Rename the 3 images; add an audit rule that fails when `og:image` has no file in `dist/` | 15 min |
| Only 4 commercial landing pages, no industry or use-case pages, so long-tail terms like "AI automation for law firms" and "document processing automation" have no page to rank | site-wide | High | Build industry and use-case pages (needs your approval — see SEO_PLAN.md) | 1–2 days per page |
| No case study pages; proof is ~300 words on `/work/` with no challenge, approach, stack or results | `src/pages/work.astro` | High | `/work/regrely/` and `/work/greenoh/` with Challenge, Approach, Stack, Results, schema, CTA (new routes, needs approval) | 1 day each |
| Service pages link only to other services, not to the blog posts that support them or to proof, so the blog-to-service link only goes one way | `src/pages/services/[slug].astro` | High | Add a "Related reading" block (posts whose `service` matches) and a link to `/work/` | 30 min |
| Blog posts have no named author, which is weak E-E-A-T for a site selling engineering judgement | `src/pages/blog/[...slug].astro` | High | Author box now (organization, honest); `Person` schema once you send a bio | 30 min now, 30 min later |
| "Book a Free Call" leads to a form, not a calendar. The flow is: form → FormSubmit captcha → email reply. Each step loses buyers, and the form posts to a Gmail address | `src/components/ContactForm.astro` | High (conversion) | Add a booking link (Cal.com or Calendly) next to the form; move the form to a domain inbox | 1 hour (your accounts) |
| Redirects are meta-refresh pages, not 301s, because GitHub Pages can't send 301s. Google usually follows them, but they pass signal less reliably | `astro.config.mjs` | Med | Keep URLs stable. If URL changes become frequent, move hosting to Cloudflare Pages or Netlify for real 301s | — |
| No table of contents on blog posts (1,260–1,630 words each) | `src/pages/blog/[...slug].astro` | Med | Auto-generate from H2s | 30 min |
| `/work/` links only to `/services/` and `/contact/`; it doesn't link to the specific services each product proves | `src/pages/work.astro` | Med | Link each product to its relevant service pages | 15 min |
| `/about/` links only to `/work/` and `/contact/` in body content | `src/pages/about.astro` | Low | Link the principles and engagement sections to services and posts | 15 min |
| Opportunity Finder runs entirely in JavaScript: results aren't indexable, there's no email capture, and its CTA jumps to the form | `public/script.js:658`, `src/pages/index.astro:246` | Med | Give it its own indexable page and an optional "email me this list" capture (new route, needs approval) | 1 day |
| CTA clicks are tracked only for `#contact` anchors on the home page; clicks on `/contact/` links on every other page go uncounted | `public/script.js:138` | Med | Delegated `cta_click` listener for any link to `/contact/` | 15 min |
| Brand spelled "Flowmoat" on site but "FlowMoat" in briefs | site-wide | Med | Your decision; then use it byte-identical everywhere (site, LinkedIn, directories) | 30 min |
| Target markets don't match: site schema lists US, CA, UK, AU, UAE; brief adds EU; notes say US, UK, IE, UAE | `src/data/site.js`, `BaseLayout.astro`, `llms.txt` | Med | Your decision; one list, updated in 3 places | 15 min |
| `Organization.sameAs` has only LinkedIn | `BaseLayout.astro` | Med | Add Clutch, GoodFirms, Crunchbase, GitHub once they exist | 5 min each |
| Contact page body has no links beyond Home; a visitor who isn't ready to book has nowhere to go | `src/pages/contact.astro` | Low | Add "Not ready? Read…" links to 2–3 posts | 10 min |
| 404 meta description is 62 chars (audit warning; the page is `noindex`, so this is cosmetic) | `src/pages/404.astro` | Low | Lengthen | 2 min |
| One 69 KB stylesheet (14 KB gzipped) blocks render on every page | `public/styles.css` | Low | Fine at this size. Revisit only if field LCP data in Search Console flags it | — |
| `script.js` is 32 KB (10 KB gzipped) and loads at the end of `<body>`; GA is async | `BaseLayout.astro` | Low | No action needed | — |
| Sitemap has `lastmod` only on posts; Google ignores `priority` and `changefreq` | `src/pages/sitemap.xml.js` | Low | Leave it. Add `lastmod` to static pages if they start changing often | — |
| No `twitter:site` handle | `BaseLayout.astro` | Low | Add one if you start an X account | 2 min |
| README describes the old single-file site | `README.md` | Low | Update to Astro build and deploy | 10 min |
| Hreflang | — | n/a | Not needed: one English locale. Add only if market-specific pages ship | — |

## What passes (keep it this way)

| Check | Status |
|---|---|
| Unique title ≤60, description ≤158 on every page | ✅ enforced by `scripts/seo-audit.mjs` on every PR |
| One H1 per page, H2/H3 hierarchy | ✅ |
| Canonical, absolute, self-referencing, trailing slash | ✅ |
| `robots.txt` → sitemap; AI crawlers allowed | ✅ |
| Sitemap auto-includes blog posts, excludes redirect stubs | ✅ |
| OG + Twitter tags on every page | ✅ (images broken on 3, see above) |
| Organization + WebSite (site-wide), Service, BlogPosting, FAQPage, BreadcrumbList | ✅ |
| FAQ schema text matches rendered FAQ text | ✅ same array feeds both (`Faq.astro`) |
| All indexable content static and server-rendered | ✅ except the Opportunity Finder results |
| Descriptive link text, no "click here" | ✅ |
| Custom 404, `noindex` | ✅ |
| Old enterprise URLs redirect to renamed pages | ✅ meta refresh (see GitHub Pages note) |
| GA4 with `generate_lead`, `contact_form_submit`, `finder_*` events | ✅ |
| Search Console verified (DNS) and sitemap submitted | ✅ per `SEO_ACTION_PLAN.md` |
