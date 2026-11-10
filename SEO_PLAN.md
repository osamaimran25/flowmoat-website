# SEO Plan — 30 / 60 / 90 days

**Start:** 2026-10-14. Builds on SEO_ACTION_PLAN.md (which still holds) and SEO_AUDIT.md.
**Goal:** booked discovery calls, not traffic. Every new page ends with "Book a Free Call".

## Already done on branch `seo/audit-keywords-plan`

- Fixed broken share images on 3 renamed pages; the audit now fails if an `og:image` file is missing.
- Service pages link to their supporting blog posts and to `/work/`.
- Blog posts have a contents list and an author box (team byline; a real `Person` comes later).
- `cta_click` now fires on every "Book a Free Call" link, not just on the home page.
- `/work/` links to the services each product proves, and `/contact/` links to reading for visitors not ready to book.

## Decisions I need from you

| # | Decision | My recommendation |
|---|---|---|
| 1 | Brand spelling: Flowmoat or FlowMoat | Keep **Flowmoat**. It's already on the site, schema, LinkedIn and OG images. Changing it costs more than it gains |
| 2 | Market list | One list in `site.js`; I'll apply it to schema and `llms.txt` |
| 3 | Approve new routes (below) | Approve phase 1 first |
| 4 | Booking link (Cal.com or Calendly) | Add one next to the form. It's the biggest conversion fix on the site |
| 5 | Author bio + photo | Needed for `Person` schema and E-E-A-T |

## New routes (need approval — none are built yet)

None of these change an existing URL, so no redirects are needed.

**Phase 1 (days 1–30):**
- `/work/regrely/` — case study
- `/document-processing-automation/` — use case
- `/rag-chatbot-for-company-documents/` — use case

**Phase 2 (days 31–60):**
- `/ai-customer-support-agent/` — WhatsApp RAG proof
- `/work/whatsapp-ordering-assistant/`
- `/work/greenoh/`
- `/ai-opportunity-finder/`

**Phase 3 (days 61–90):** two industry pages, chosen from Search Console data. My guesses are
`/ai-automation-for-law-firms/` and `/ai-automation-for-ecommerce/`.

## Page templates

### Landing page (use case or industry)
Built from one data file, as `services.js` does for services.

1. **H1** with the primary keyword, plus a short answer block (40–60 words) that can be quoted
2. **Problem:** 3–5 specific symptoms the buyer recognises
3. **Solution:** what gets built, in plain terms
4. **How it works:** 3–5 steps (map → build → test on real data → hand over)
5. **Proof:** link to the relevant case study; `[ADD REAL NUMBER]` where a result belongs
6. **FAQ:** 4–6 questions, rendered with `Faq.astro` and `faqSchema()` from the same array
7. **Related:** the parent service page and 2 blog posts
8. **CTA:** Book a Free Call
- Schema: `Service` (with `@id` linking to the parent service), `FAQPage`, `BreadcrumbList`

### Case study
1. **Label:** "A product we built and operate", never presented as client work
2. **Challenge:** the constraint and why it mattered commercially
3. **Approach:** what was rejected and why; where AI decides and where a human approves
4. **Stack:** the real technologies
5. **Results:** `[ADD REAL NUMBER]` (users, documents processed, uptime, time saved). Leave it out rather than estimate
6. **Tradeoffs:** what you gave up
7. **CTA**, plus links to the services it proves
- Schema: `Article` with `about` → the `SoftwareApplication` node already in `schema.js`, plus `BreadcrumbList`

### Blog post (done)
The contents list, author box, related posts, service block, CTA, `BlogPosting`, `FAQPage` and
`BreadcrumbList` now all come from `[...slug].astro`. A new post is just a Markdown file.

### AI Opportunity Finder → lead asset
- Give it its own page `/ai-opportunity-finder/` with indexable static content: what the tool
  does, the ~10 opportunity types it suggests (each with a static description and a link to the
  matching use-case page), and an FAQ.
- Keep the interactive tool on that page and on the home page.
- After results show: an optional "Email me this list" field that posts through the existing
  FormSubmit setup with the results included. GA4 event `finder_email_capture`.
- Don't show "hours saved" figures. The script has `hours` values in it but they aren't
  measured, so they stay hidden, as they are now.

## Analytics

- GA4 is in place. Mark `generate_lead` as a **key event** in GA4 Admin (needs your account).
- After a booking tool is added: track `booking_click` and, if the tool supports it, the booking
  confirmation (Cal.com and Calendly both send a postMessage event).
- Search Console is DNS-verified, so no meta tag is needed. Bing Webmaster: import from Search
  Console.

## 30 / 60 / 90

### Days 1–30 — proof and conversion
- Merge this branch; confirm the deploy; request indexing on the 4 service pages.
- Add the booking link (you create the account, I wire it).
- Build `/work/regrely/`, the highest-value page on the site (see SEO_ACTION_PLAN.md step 3).
- Build `/document-processing-automation/` and `/rag-chatbot-for-company-documents/`.
- Publish 2 posts: #5 (invoice processing) and #3 (permission-aware RAG).
- Off-site: Clutch and GoodFirms profiles; add both to `sameAs`.
- **Check:** all new pages indexed; `cta_click` and `generate_lead` show in GA4.

### Days 31–60 — breadth
- Build `/ai-customer-support-agent/`, `/work/whatsapp-ordering-assistant/`, `/work/greenoh/`.
- Turn the Finder into its own page with email capture.
- Publish 4 posts (#1, #6, #9, #12).
- Add a `Person` author once the bio arrives.
- Off-site: 2 guest posts or podcast spots (see summary); Crunchbase; GitHub org.
- **Check:** impressions rising on P1 terms in Search Console.

### Days 61–90 — use the data
- Export Search Console data and find queries at positions 8–20. Rewrite titles and intros on those pages first.
- Build the 2 industry pages that the data supports.
- Publish 4 posts.
- Refresh `updated` dates only on posts you actually changed.
- **Check:** calls booked from organic search (GA4 `generate_lead` by source/medium = google / organic).

## Not doing, on purpose
- **hreflang / country pages:** one English locale until a market proves itself (SEO_ACTION_PLAN.md step 8).
- **Host migration for real 301s:** only needed if URLs start changing. Nothing in this plan changes one.
- **Visual redesign:** none needed for SEO.
