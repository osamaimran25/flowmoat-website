# Greenoh — Enterprise SEO / AEO / GEO Strategy

**Audit date:** 2026-07-14
**Site audited:** `index.html`, `styles.css`, `script.js`, `robots.txt`, `sitemap.xml`, `site.webmanifest` (GitHub Pages, custom domain `thegreenoh.com`)
**Goal:** qualified enterprise leads ($10k–$100k+) from US / CA / UK / AU / UAE — not raw traffic.

---

## THE HEADLINE FINDING (read this first)

Greenoh is a **single-page site with exactly one indexable URL**.

```
sitemap.xml → https://thegreenoh.com/    ← that's the entire site
```

Every nav link is a fragment (`#services`, `#products`, `#use-cases`). Google indexes fragments as **one page**. So today Greenoh can realistically compete for **one** head term — and it is currently pointed at *"enterprise AI engineering company"*, one of the hardest terms in the category, with **zero** EEAT signals behind it.

Everything requested in the brief — keyword clusters, 11 landing pages, 100 blog posts, internal linking, breadcrumbs, Article schema — **requires a multi-page site**. There is no version of this strategy that works on one URL.

**So the sequence is:**

1. Fix what's free on the current page (schema, EEAT, trust) — **this week**
2. Build the URL architecture — **weeks 2–4**
3. Then and only then, execute keywords + content — **month 2 onward**

Doing #3 before #2 is wasted work.

---

## 1. SEO AUDIT

### 1.1 What's already right (don't break these)

| ✅ | Detail |
|---|---|
| Server-rendered HTML | All copy is in the raw HTML — AI crawlers (GPTBot, ClaudeBot, PerplexityBot) **don't execute JS**, so this is critical and you got it right |
| `.reveal` doesn't hide content from crawlers | `script.js:162` adds `is-visible` immediately; no JS-gated content |
| Single, correct `<h1>` | One `<h1>`, clean `h2`→`h3` hierarchy throughout |
| Canonical present | `<link rel="canonical" href="https://thegreenoh.com/">` |
| OG + Twitter cards complete | Title, description, image, dimensions, alt all set |
| `robots` meta is generous | `max-snippet:-1`, `max-image-preview:large` — good for AI citation |
| Organization + WebSite + WebPage schema exists | Solid foundation, just incomplete |
| `prefers-reduced-motion` handled | 5 occurrences in CSS — accessibility win |
| HTTPS + custom domain + `.nojekyll` | Deployment hygiene is fine |

### 1.2 Critical issues (HIGH impact)

| # | Issue | Evidence | Why it kills leads |
|---|---|---|---|
| **C1** | **One URL for 20 keyword clusters** | `sitemap.xml` | Cannot rank for services, industries, or comparisons. Structural ceiling. |
| **C2** | **FAQ content exists, FAQPage schema does not** | `index.html:567-630` — 6 Q&As in HTML, no `FAQPage` in the JSON-LD graph | Biggest single AEO miss. This is the #1 format AI engines quote. **~30 min to fix.** |
| **C3** | **Contact form posts to a Gmail address via formsubmit.co** | `index.html:653` — `formsubmit.co/osamaimran25@gmail.com` | A CTO evaluating a $100k engagement sees a personal Gmail in the form action. Instantly disqualifying. Also zero lead capture / CRM. |
| **C4** | **No `sameAs` in Organization schema** | `index.html:39-64` | Google cannot connect Greenoh to LinkedIn / Clutch / GitHub / Crunchbase. **Without `sameAs`, Greenoh is not a recognized entity** — it's just a string. This is why AI engines won't cite you. |
| **C5** | **Zero EEAT signals on the entire page** | No team, no bios, no client logos, no testimonials, no case study numbers, no certifications, no address, no phone | Google's guidelines weight this heavily for YMYL-adjacent commercial queries. AI engines actively look for it before citing. |
| **C6** | **`areaServed` omits Canada and UAE** | `index.html:45` — `["North America", "United Kingdom", "Australia"]` | Two of five target markets are invisible. Also use ISO codes, not prose. |
| **C7** | **H1 contains no primary keyword** | `index.html:143` — *"Modernize your business with AI-powered software."* | Good copy, weak ranking signal. The `<title>` says "Enterprise AI Engineering Company", the H1 doesn't reinforce it. |
| **C8** | **Brand name is inconsistent** | Brief says **Greenoh**; every file says **Greenoh** | Entity disambiguation depends on exact-string consistency across site + LinkedIn + directories. Pick one. **Decision needed.** |
| **C9** | **No analytics, no Search Console verification** | `grep` for gtag/GSC → 0 hits | You are flying blind. Cannot measure any of this. |

### 1.3 Medium-impact issues

| # | Issue | Evidence |
|---|---|---|
| M1 | No `SoftwareApplication` schema for RegRely or GreenOH | Two real products, zero structured data — a free entity-authority win |
| M2 | No `Service` entities with `@id` | Services are buried inside `hasOfferCatalog` as bare strings; they can't be linked to or cited |
| M3 | No `ContactPoint`, `address`, `foundingDate`, `numberOfEmployees` | Organization node is thin |
| M4 | `og-image.png` is **424 KB** | Slow social/AI preview fetch; should be <150 KB |
| M5 | No `llms.txt` | Emerging convention for AI-crawler guidance. Cheap, growing in adoption. |
| M6 | robots.txt doesn't explicitly name AI crawlers | `Allow: /` covers them, but explicit allow-listing is a clear intent signal |
| M7 | Meta description has no geography and no CTA | 137 chars, functional, unremarkable |
| M8 | Heavy always-on animations (aurora, particles, mouse-glow, `animateMotion`) | INP / mobile battery risk — recent commits suggest you've already been fighting this |
| M9 | `greenoh-widget.js` (16 KB) exists but is never loaded | Dead file — remove or wire up |
| M10 | No `HowTo` or comparison content anywhere | Two formats AI engines cite constantly |

### 1.4 Low-impact

- No breadcrumbs (nothing to breadcrumb yet — becomes M/H once pages exist)
- `site.webmanifest` has only an SVG icon (no PNG fallback for older Android)
- No `hreflang` (not needed — single language, 5 English markets)
- Zero `<img>` tags, so no ALT debt (all SVG is correctly `aria-hidden`)

---

## 2. TECHNICAL SEO IMPROVEMENTS

### HIGH

**T1 — Build the URL architecture** *(the unlock for everything else)*

```
/                                 Home — "enterprise AI engineering company"
/services/ai-engineering/
/services/ai-modernization/
/services/enterprise-software-development/
/services/workflow-automation/
/services/custom-saas-development/
/services/ai-agents/
/industries/logistics/
/industries/healthcare/
/industries/manufacturing/
/industries/financial-services/
/products/regrely/
/products/greenoh/
/case-studies/                    + /case-studies/<slug>/
/about/                           ← team, bios, founding story  (EEAT)
/contact/
/blog/                            + /blog/<slug>/
/compare/<x>-vs-<y>/
```

GitHub Pages serves `/services/ai-engineering/index.html` from a folder — no framework required. But at ~15+ pages, hand-maintaining shared header/footer/schema in raw HTML gets painful fast. **Recommendation: move to Astro** (static output, zero JS by default, deploys to Pages, keeps your current CSS as-is). Eleventy is the lighter alternative if you want minimal change.

**T2 — Add FAQPage schema** — content already exists at `index.html:567-630`, just needs the JSON-LD node. Highest ROI item on this list.

**T3 — Complete the Organization node**: `sameAs`, `contactPoint`, `address`, `foundingDate`, `numberOfEmployees`, ISO `areaServed`.

**T4 — Replace the Gmail form endpoint.** Move to a real domain address (`hello@thegreenoh.com`) and a proper handler (Formspark / Basin / a Cloudflare Worker), with the lead pushed into a CRM.

**T5 — Install GA4 + Google Search Console + Bing Webmaster Tools.** Bing matters more than usual now: **ChatGPT search is Bing-backed.**

**T6 — Expand `sitemap.xml`** to every new URL as pages ship.

### MEDIUM

**T7** — Compress `og-image.png` 424 KB → <150 KB (or convert to WebP with a PNG fallback).
**T8** — Add `llms.txt` at the root.
**T9** — Explicitly allow AI crawlers in `robots.txt`.
**T10** — Add `SoftwareApplication` schema for RegRely and GreenOH.
**T11** — Audit Core Web Vitals on real mobile (PageSpeed Insights, field data). Watch **INP** specifically — the mouse-glow + particle field are prime suspects.
**T12** — Add `BreadcrumbList` schema once sub-pages exist.
**T13** — `preconnect` / `preload` the critical CSS; consider inlining above-the-fold CSS (62 KB stylesheet is chunky for a landing page).

### LOW

**T14** — Delete or wire up `greenoh-widget.js`.
**T15** — Add PNG icons (192/512) to the webmanifest.
**T16** — Add `<meta name="author">` and an `Article` `author` entity once the blog exists.

---

## 3. KEYWORD RESEARCH

> Volumes below are directional estimates for US/UK/CA/AU combined. **Validate in Ahrefs/Semrush before committing budget.** Difficulty is the real story: the head terms are agency-saturated, so the money is in the mid- and long-tail.

### 3.1 Primary (head — hard, slow, but they define the entity)

| Keyword | Intent | Difficulty | Target page |
|---|---|---|---|
| enterprise AI engineering company | Commercial | Very High | `/` |
| AI engineering company | Commercial | Very High | `/` |
| enterprise AI development company | Commercial | High | `/services/ai-engineering/` |
| AI software development company | Commercial | Very High | `/services/ai-engineering/` |
| enterprise software development company | Commercial | Very High | `/services/enterprise-software-development/` |
| workflow automation company | Commercial | High | `/services/workflow-automation/` |
| AI modernization services | Commercial | Medium | `/services/ai-modernization/` |

### 3.2 Secondary (mid-tail — **this is where you actually win in year 1**)

- enterprise AI consulting services
- AI integration services for enterprise
- legacy system modernization with AI
- custom SaaS development company
- AI agent development company
- business process automation services
- enterprise AI implementation partner
- custom enterprise software development
- AI transformation consulting
- internal business software development
- enterprise dashboard development
- backend development company for enterprise
- API integration services for enterprise
- n8n automation agency
- AI proof of concept to production

### 3.3 Long-tail (**lowest difficulty, highest lead quality — start here**)

- how to add AI to existing enterprise software
- AI modernization for legacy CRM systems
- enterprise AI engineering company for mid-market
- custom AI agents for business operations
- workflow automation for 100 employee company
- AI document processing for enterprise operations
- how much does enterprise AI development cost
- AI integration with ERP systems
- replacing spreadsheets with custom internal software
- enterprise AI partner for regulated industries
- AI engineering company for logistics operations
- add AI search to internal knowledge base
- automate CRM to ERP data sync
- custom SaaS platform for B2B operations
- AI copilot for internal business tools

### 3.4 Question keywords (**AEO gold — these become FAQ + blog H2s**)

- What is enterprise AI engineering?
- What does an AI engineering company do?
- How much does it cost to build enterprise AI software?
- How long does AI modernization take?
- What is the difference between AI consulting and AI engineering?
- Should we build or buy enterprise AI?
- How do you add AI to legacy systems safely?
- What is an AI agent in a business context?
- Is workflow automation worth it for a 200-person company?
- How do you measure ROI on enterprise AI?
- What is AI modernization?
- Do we need a data team before doing AI?
- How do you keep enterprise AI secure and compliant?
- What is the difference between RPA and AI workflow automation?
- Who owns the code when you hire an AI engineering firm?

### 3.5 Comparison keywords (**high commercial intent + heavily cited by AI**)

- AI engineering company vs AI consulting firm
- build vs buy enterprise AI
- custom software vs off-the-shelf SaaS for operations
- n8n vs Make vs custom Python automation
- RPA vs AI workflow automation
- in-house AI team vs AI engineering partner
- Greenoh vs [competitor] *(add once competitors are chosen)*
- legacy modernization vs full rebuild
- LangChain vs custom agent architecture for enterprise
- offshore dev shop vs specialist AI engineering firm

### 3.6 Buyer-intent

- hire enterprise AI engineers
- enterprise AI development agency pricing
- book AI strategy consultation
- enterprise AI engineering partner
- AI modernization consultants
- request enterprise software development quote
- best AI development companies for mid-market

### 3.7 Local / geo

| Market | Keywords |
|---|---|
| **US** | AI engineering company USA · enterprise AI development company United States · AI consulting firm for US enterprises |
| **UK** | AI engineering company UK · enterprise software development company London · AI modernization UK |
| **Canada** | AI development company Canada · enterprise AI Toronto |
| **Australia** | AI engineering company Australia · workflow automation Sydney |
| **UAE** | AI development company Dubai · enterprise AI UAE · digital transformation partner Dubai |

> ⚠️ **Honest caveat:** local pack rankings need a verified Google Business Profile with a real physical address in-market. Without one, treat these as **content-page targets** (organic blue links), not map-pack targets. Don't fake an address — it's a suspension risk and an EEAT disaster if discovered.

### 3.8 Industry

- AI for logistics companies · AI for healthcare operations · AI for manufacturing operations · AI for financial services · AI for compliance teams · AI for supply chain operations · AI for insurance operations · AI for professional services firms

---

## 4. KEYWORD CLUSTERS

Each cluster = **one pillar page** + supporting blog posts + one FAQ block.

| # | Cluster | Pillar URL | Primary term | Supporting content |
|---|---|---|---|---|
| **1** | **Enterprise AI Engineering** *(brand-defining)* | `/services/ai-engineering/` | enterprise AI engineering company | What is enterprise AI engineering · AI eng vs AI consulting · PoC→production · How to evaluate an AI partner |
| **2** | **AI Modernization** | `/services/ai-modernization/` | AI modernization services | Adding AI to legacy CRM/ERP · Modernize vs rebuild · AI on top of legacy safely · Modernization cost |
| **3** | **Enterprise Software Development** | `/services/enterprise-software-development/` | enterprise software development company | Custom vs off-the-shelf · Internal portals · Enterprise dashboards · Back-office systems |
| **4** | **Workflow Automation** | `/services/workflow-automation/` | workflow automation services | BPA guide · n8n vs Make vs custom · RPA vs AI automation · Automation ROI calculator |
| **5** | **AI Agents** | `/services/ai-agents/` | AI agent development company | What is an AI agent · Agent architecture · Human-in-the-loop · Agent security |
| **6** | **Custom SaaS Development** | `/services/custom-saas-development/` | custom SaaS development company | B2B SaaS from scratch · Multi-tenant architecture · SaaS MVP → enterprise |
| **7** | **AI Digital Transformation** | `/insights/ai-transformation/` | AI digital transformation | Roadmap · Measuring ROI · Change management · Common failures |
| **8** | **Compliance & Privacy AI** *(RegRely halo)* | `/products/regrely/` | AI compliance platform | GDPR automation · Vendor risk · Evidence collection · AI governance |
| **9** | **Solar / Energy Tech** *(GreenOH halo)* | `/products/greenoh/` | solar aggregator platform Pakistan | Solar marketplace tech · Installer verification |
| **10** | **Industries** | `/industries/<x>/` | AI for [industry] | One page + 3 posts per industry |

> **Note on clusters 8 & 9:** RegRely and GreenOH serve *different audiences* than Greenoh's core buyer. Their SEO value to Greenoh is **entity authority and proof-of-work**, not lead gen. Don't over-invest — they should each get one strong page that links back to Greenoh as the builder. If RegRely needs real SEO, it needs its own domain strategy.

---

## 5. CONTENT CLUSTERS (pillar → spoke model)

```
PILLAR: /services/ai-engineering/          [3,000+ words, the definitive page]
  ├── What Is Enterprise AI Engineering? (definition post — AEO anchor)
  ├── AI Engineering vs AI Consulting: What's the Difference?
  ├── From AI Proof of Concept to Production: A 6-Stage Framework
  ├── How to Evaluate an Enterprise AI Engineering Partner (buying guide)
  ├── The True Cost of Enterprise AI Development in 2026
  └── 7 Reasons Enterprise AI Pilots Never Reach Production
        ↑ every spoke links UP to pillar; pillar links DOWN to all spokes
        ↑ spokes cross-link to /contact/ and to one adjacent cluster
```

Repeat this shape for all 10 clusters. **Rules:**
- Pillar = comprehensive, commercial-intent, converts.
- Spokes = specific, informational, capture long-tail, feed the pillar.
- Every spoke links to its pillar with descriptive anchor text (**never** "click here").
- Every pillar links to `/contact/` at least twice.
- Publish the pillar **first**, then spokes.

---

## 6. LANDING PAGES (priority-ordered)

### Tier 1 — build first (HIGH)

| Page | Why now |
|---|---|
| `/services/ai-engineering/` | Core positioning. Everything hangs off this. |
| `/services/ai-modernization/` | Lowest-difficulty head term of the four services. |
| `/services/enterprise-software-development/` | Biggest search volume. |
| `/services/workflow-automation/` | Clearest, most concrete buyer pain. |
| `/about/` | **The EEAT page.** Team, faces, bios, founding story, location. Currently the single biggest credibility gap. |
| `/contact/` | Real form, real email, calendar booking, real address. |
| `/case-studies/` | You have two real products — that's two case studies you already own. |

### Tier 2 — next (MEDIUM)

`/industries/logistics/` · `/industries/healthcare/` · `/industries/manufacturing/` · `/industries/financial-services/` · `/services/ai-agents/` · `/services/custom-saas-development/` · `/products/regrely/` · `/products/greenoh/`

### Tier 3 — later (MEDIUM/LOW)

`/solutions/enterprise-dashboards/` · `/solutions/internal-business-portals/` · `/compare/build-vs-buy-enterprise-ai/` · `/compare/rpa-vs-ai-workflow-automation/` · `/pricing/` (even a "how we scope engagements" page beats nothing — buyers search for it constantly)

### Landing page template (use for every service page)

```
H1                  [Primary keyword, naturally phrased]
Answer block        40–60 words. Direct definition. ← THE AI-CITABLE UNIT.
                    Put this immediately after H1, before any marketing copy.
Trust bar           Client logos / product logos / years / project count
H2 The problem      Buyer's language, not yours
H2 What we deliver  3–5 concrete deliverables (scannable, bulleted)
H2 How it works     4-step process (HowTo schema)
H2 Proof            Case study + a real metric
H2 Comparison       Table: us vs typical alternative
H2 FAQ              5–7 questions (FAQPage schema)
CTA                 Book a Strategy Call
```

The **answer block** is the most important element for AEO. Write it as a clean, self-contained definition an AI can lift verbatim.

---

## 7. METADATA

### Homepage — revised

```html
<title>Enterprise AI Engineering Company | Greenoh</title>
<meta name="description" content="Greenoh is an enterprise AI engineering company. We build AI-powered software, modernize legacy systems, and automate workflows for companies in the US, UK, Canada, Australia, and UAE. Book a strategy call.">
```
*(Current title is already good — keep it. Description gains geography + CTA.)*

**H1 recommendation:** the current H1 is strong copy but carries no keyword. Best of both:

> **H1:** `Enterprise AI engineering that modernizes how your business runs.`
> **Subhead:** *(keep the existing subheadline verbatim — it's excellent)*

This keeps the emotional hook, adds the head term, and stays human. Avoid `"Enterprise AI Engineering Company | AI Development Services"` — that's keyword stuffing and reads like 2014.

### New pages

| URL | Title (≤60 char) | Description (≤155 char) |
|---|---|---|
| `/services/ai-engineering/` | AI Engineering Services for Enterprise \| Greenoh | Custom AI systems, agents, and copilots engineered for production. From proof of concept to enterprise scale. Book a strategy call. |
| `/services/ai-modernization/` | AI Modernization Services \| Legacy Systems \| Greenoh | Add AI to your existing CRM, ERP, and legacy systems — without a disruptive rebuild. Enterprise AI modernization from Greenoh. |
| `/services/enterprise-software-development/` | Enterprise Software Development Company \| Greenoh | Custom SaaS, internal platforms, dashboards, and back-office systems built on enterprise-grade architecture. |
| `/services/workflow-automation/` | Workflow Automation Services for Enterprise \| Greenoh | Automate business processes, connect systems, and remove manual work with custom automation and API integration. |
| `/about/` | About Greenoh \| Enterprise AI Engineering Team | Meet the team behind Greenoh, RegRely, and GreenOH. Enterprise AI engineers building production systems since [YEAR]. |
| `/case-studies/` | Case Studies \| Enterprise AI & Software \| Greenoh | Real enterprise AI, modernization, and automation projects — with the architecture decisions and outcomes behind them. |

**Rules:** one keyword per title · brand always last · description = benefit + proof + CTA · never duplicate a title.

---

## 8. SCHEMA RECOMMENDATIONS

### HIGH — do immediately

**S1 — `FAQPage`** *(content already written, zero new copy needed)*

```json
{
  "@type": "FAQPage",
  "@id": "https://thegreenoh.com/#faq",
  "isPartOf": { "@id": "https://thegreenoh.com/#webpage" },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Greenoh build?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Greenoh builds AI-powered enterprise software, modernizes existing systems, develops custom SaaS and internal platforms, and automates operational workflows."
      }
    }
    // ... the remaining 5 Q&As, verbatim from index.html:567-630
  ]
}
```

**S2 — Complete the `Organization` node.** Additions to `index.html:39-64`:

```json
"sameAs": [
  "https://www.linkedin.com/company/greenoh",
  "https://github.com/greenoh",
  "https://clutch.co/profile/greenoh",
  "https://www.crunchbase.com/organization/greenoh",
  "https://x.com/greenoh"
],
"areaServed": [
  { "@type": "Country", "name": "United States" },
  { "@type": "Country", "name": "Canada" },
  { "@type": "Country", "name": "United Kingdom" },
  { "@type": "Country", "name": "Australia" },
  { "@type": "Country", "name": "United Arab Emirates" }
],
"contactPoint": {
  "@type": "ContactPoint",
  "contactType": "sales",
  "email": "hello@thegreenoh.com",
  "availableLanguage": ["English"],
  "areaServed": ["US", "CA", "GB", "AU", "AE"]
},
"foundingDate": "20XX",
"numberOfEmployees": { "@type": "QuantitativeValue", "minValue": X, "maxValue": Y },
"slogan": "Enterprise AI engineering for companies that need more than code delivery."
```

> **`sameAs` is the highest-leverage schema field you are missing.** It is how Google's Knowledge Graph and every AI engine confirm Greenoh is a *real entity* rather than an unverified string. Ship it as soon as the profiles exist — and **create the profiles if they don't** (LinkedIn Company Page first, then Clutch, then Crunchbase).

**S3 — `SoftwareApplication`** for RegRely and GreenOH:

```json
{
  "@type": "SoftwareApplication",
  "@id": "https://thegreenoh.com/#regrely",
  "name": "RegRely",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "url": "https://regrely.com",
  "description": "AI-powered compliance and privacy management platform for compliance operations, vendor risk, and governance.",
  "publisher": { "@id": "https://thegreenoh.com/#organization" }
}
```
*(Same shape for GreenOH with `applicationCategory: "BusinessApplication"`, `url: "https://greenoh.pk"`.)*

**S4 — `Service` entities with real `@id`s**, one per service, each linked to its landing page via `url`. Currently they exist only as bare strings inside `hasOfferCatalog`.

### MEDIUM

- **`BreadcrumbList`** — every page except home, once the architecture exists
- **`Article`** (or `BlogPosting`) — every blog post, with a **real named `author`** who has a `Person` node and an `/about/#person-slug` `@id`. Anonymous content has near-zero EEAT.
- **`HowTo`** — on process sections and any "how to" post
- **`WebPage` + `speakable`** — helps voice/AI extraction
- **`ItemList`** — for case study and blog index pages

### LOW / conditional

- **`Review` / `AggregateRating`** — **only from genuine, verifiable reviews.** Self-serving review markup is a manual-action risk. Get real Clutch/G2 reviews first, then mark them up.
- **`LocalBusiness`** — **only if you have a real, staffed, physical address.** If Greenoh is remote-first, **skip it entirely.** Fabricating a location to chase local packs is fraud-adjacent and will burn the domain. Use `Organization` + `areaServed` instead — that's the honest and correct choice for a distributed company.

---

## 9. INTERNAL LINKING PLAN

**Today:** zero internal link equity. Every link is a `#fragment` — Google treats it all as one page, so no PageRank flows anywhere.

**Target model — hub & spoke:**

```
                          HOME (/)
                             │  authority hub
        ┌──────────┬─────────┼─────────┬──────────┐
     SERVICES  INDUSTRIES  PRODUCTS  CASES     ABOUT
        │          │           │        │         │
      spokes ◄─────┴──── cross-link ────┴───────► CONTACT
        │
      BLOG POSTS ──► always link UP to their pillar
```

**Rules:**

| Rule | Detail |
|---|---|
| Depth | Every page **≤3 clicks** from home |
| Blog → pillar | Every post links to its pillar, keyword-rich anchor, **in the first 2 paragraphs** |
| Pillar → spokes | Each pillar links to **all** its spokes (a "Related reading" block is fine) |
| Cross-service | Each service page links to **2** adjacent services (`ai-modernization` ↔ `workflow-automation`) |
| Industry → service | Each industry page links to all **4** core services |
| Case study → service | Each case study links to the service(s) it proves |
| Products → home | RegRely/GreenOH pages link back to Greenoh as builder — **this is how you transfer product credibility to the parent entity** |
| Anchor text | Descriptive, varied, natural. Never "click here", never the same exact-match anchor 50×. |
| Footer | Include the **full** service + industry list — a site-wide crawl path |
| CTA links | Every page → `/contact/` at least twice |
| External | Link **out** to authoritative sources (NIST, ISO, Gartner, vendor docs). Outbound links to quality sources are a **positive** EEAT signal — most agencies get this backwards and hoard link equity. |

---

## 10. BLOG ROADMAP — 100 IDEAS

Each targets a distinct intent. **`[I]`** informational · **`[C]`** commercial · **`[T]`** transactional · **`[N]`** navigational/comparison

### AI (1–15)
1. What Is Enterprise AI Engineering? A Definition for Business Leaders `[I]`
2. AI Engineering vs AI Consulting: What's the Difference? `[N]`
3. From AI Proof of Concept to Production: A 6-Stage Framework `[I]`
4. Why 80% of Enterprise AI Pilots Never Reach Production `[I]`
5. How to Evaluate an Enterprise AI Engineering Partner `[C]`
6. The True Cost of Enterprise AI Development in 2026 `[C]`
7. Build vs Buy: Enterprise AI Decision Framework `[N]`
8. What Is an AI Agent? A Business Leader's Guide `[I]`
9. Human-in-the-Loop AI: Designing Approval Workflows That Work `[I]`
10. How to Measure ROI on Enterprise AI Projects `[I]`
11. AI Readiness Assessment: 12 Questions Before You Start `[I]`
12. Do You Need a Data Team Before You Can Do AI? `[I]`
13. RAG vs Fine-Tuning for Enterprise Knowledge Systems `[I]`
14. How to Keep Enterprise AI Secure, Auditable, and Compliant `[I]`
15. Hire an AI Engineering Firm or Build an In-House Team? `[N]`

### Automation (16–30)
16. What Is Workflow Automation? Complete Enterprise Guide `[I]`
17. RPA vs AI Workflow Automation: Which Do You Actually Need? `[N]`
18. n8n vs Make vs Custom Python: Choosing an Automation Stack `[N]`
19. 15 Business Processes Worth Automating First `[I]`
20. How to Calculate Workflow Automation ROI `[I]`
21. Automating CRM → ERP Data Sync Without Breaking Anything `[I]`
22. Why Your Zapier Automations Keep Breaking (and What Replaces Them) `[I]`
23. Document Processing Automation for Enterprise Operations `[I]`
24. Approval Workflow Automation: Design Patterns That Scale `[I]`
25. When Automation Fails: 7 Anti-Patterns to Avoid `[I]`
26. Business Process Automation Services: What to Expect `[C]`
27. Automating Back-Office Operations: A Practical Roadmap `[I]`
28. How Much Does Workflow Automation Cost? `[C]`
29. From Spreadsheets to Systems: A Migration Playbook `[I]`
30. API Integration Strategy for Growing Companies `[I]`

### Enterprise Software (31–45)
31. Custom Software vs Off-the-Shelf SaaS: How to Decide `[N]`
32. What Makes Software "Enterprise-Grade"? `[I]`
33. Building Internal Business Portals: An Architecture Guide `[I]`
34. Enterprise Dashboard Design: Beyond the Vanity Metric `[I]`
35. How Much Does Custom Enterprise Software Cost? `[C]`
36. Choosing an Enterprise Software Development Partner `[C]`
37. Multi-Tenant Architecture: A Decision Guide `[I]`
38. Back-Office Systems That Scale With Headcount `[I]`
39. Why Your Internal Tools Are Slowing the Business Down `[I]`
40. Enterprise Software Security Checklist `[I]`
41. Who Owns the Code? IP in Software Engagements `[I]`
42. Technical Debt: When to Refactor vs Rebuild `[I]`
43. Offshore Dev Shop vs Specialist Engineering Firm `[N]`
44. Enterprise Software Handover: Doing It Properly `[I]`
45. Scoping an Enterprise Software Project Accurately `[C]`

### Compliance (46–58)
46. What Is AI Governance? Enterprise Guide `[I]`
47. GDPR Compliance Automation: What Can Be Automated `[I]`
48. Vendor Risk Management Software: Buyer's Guide `[C]`
49. Building an Evidence Collection System for Audits `[I]`
50. AI and Data Privacy: Practical Enterprise Guardrails `[I]`
51. SOC 2 Readiness for Software Companies `[I]`
52. Compliance Operations: Manual to Automated `[I]`
53. EU AI Act: What Enterprise Teams Need to Know `[I]`
54. Privacy by Design in Enterprise AI Systems `[I]`
55. RegRely: How We Built an AI Compliance Platform `[C]` *(case study)*
56. Automating DPIA and Privacy Assessments `[I]`
57. Third-Party Risk in the Age of AI Vendors `[I]`
58. Compliance Tech Stack for a 500-Person Company `[C]`

### Solar / Energy (59–68) — *GreenOH halo; lower priority for Greenoh lead gen*
59. Building a Solar Marketplace Platform: Technical Architecture `[I]`
60. How Aggregator Platforms Create Trust in Fragmented Markets `[I]`
61. GreenOH: Building Pakistan's First Solar Aggregator `[C]` *(case study)*
62. Verifying Installers at Scale: Trust & Safety Systems `[I]`
63. Marketplace Matching Algorithms `[I]`
64. Two-Sided Marketplace Software: What to Build First `[I]`
65. Energy Tech Software: The Data Problem `[I]`
66. Quoting and Comparison Engines: Design Patterns `[I]`
67. Building for Emerging Markets: Technical Constraints `[I]`
68. Lead Routing in Marketplace Platforms `[I]`

### SaaS (69–80)
69. Custom SaaS Development: From Idea to First Enterprise Customer `[I]`
70. B2B SaaS Architecture: Foundations That Don't Collapse `[I]`
71. SaaS MVP vs Enterprise-Ready: What Actually Differs `[I]`
72. How Much Does It Cost to Build a SaaS Product? `[C]`
73. SaaS Onboarding That Drives Activation `[I]`
74. Building AI Features Into an Existing SaaS Product `[I]`
75. Usage-Based Billing Architecture `[I]`
76. SaaS Security for Enterprise Buyers `[I]`
77. Choosing a SaaS Development Company `[C]`
78. Scaling a SaaS Backend Past the First 100 Customers `[I]`
79. White-Label vs Custom SaaS `[N]`
80. SaaS Product Analytics: What to Instrument First `[I]`

### Digital Transformation (81–90)
81. AI Digital Transformation Roadmap for Mid-Market `[I]`
82. Why Digital Transformation Projects Fail `[I]`
83. Change Management for AI Adoption `[I]`
84. Legacy System Modernization: Strategy Guide `[I]`
85. Modernize vs Rebuild: A Cost/Risk Framework `[N]`
86. Adding AI to Legacy CRM Systems `[I]`
87. AI Modernization for ERP Systems `[I]`
88. The Hidden Cost of Doing Nothing `[I]`
89. Phased Modernization: Shipping Without Big-Bang Risk `[I]`
90. Digital Transformation KPIs That Mean Something `[I]`

### Operations (91–100)
91. AI for Logistics Operations: Practical Applications `[I]`
92. AI for Healthcare Operations (Non-Clinical) `[I]`
93. AI for Manufacturing Operations `[I]`
94. AI for Financial Services Operations `[I]`
95. Reducing Manual Work: An Operations Leader's Playbook `[I]`
96. Operational Visibility: Building the Right Dashboards `[I]`
97. Connecting Fragmented Systems Without a Rebuild `[I]`
98. The COO's Guide to Evaluating AI Vendors `[C]`
99. Scaling Operations Without Scaling Headcount `[I]`
100. Building an Internal Operations Platform `[I]`

### Publishing cadence

| Phase | Cadence | Focus |
|---|---|---|
| Month 1–2 | Pillars only | Ship the 4 service pillars + `/about/` |
| Month 3–6 | 4 posts/month | Definition + comparison posts (fastest AEO wins) |
| Month 7–12 | 6–8 posts/month | Buying guides, industry, case studies |

> **Quality > volume.** 40 genuinely excellent posts will outperform 100 thin ones, and thin AI-generated content is exactly what Google's helpful-content systems demote. **This list is a menu, not a quota.**

---

## 11. GEO / AEO IMPROVEMENTS

AI engines (ChatGPT, Claude, Perplexity, Gemini, AI Overviews) **cite differently than Google ranks**. They reward: clear definitions, structured extractable facts, named authors, verifiable claims, and third-party corroboration.

### A1 — The Answer Block *(HIGH — do on every page)*

Directly after each H1, a **40–60 word self-contained definition** an AI can lift verbatim:

> **Greenoh is an enterprise AI engineering company that builds AI-powered software, modernizes legacy systems, and automates business workflows for companies with 50–1,000 employees. Greenoh serves clients in the United States, Canada, the United Kingdom, Australia, and the UAE, and builds its own products: RegRely and GreenOH.**

Every noun is a fact. No adjectives. No marketing. **This is the single highest-leverage AEO change on the site.**

### A2 — FAQPage schema *(HIGH)* — see S1. FAQs are the most-quoted format across every AI engine.

### A3 — Comparison tables *(HIGH)*

AI engines love tables — they're trivially extractable. Add to every service page:

| | Typical dev agency | In-house team | Greenoh |
|---|---|---|---|
| Time to production | 6–12 months | 12+ months | 8–16 weeks |
| AI specialization | Generalist | Varies | Core focus |
| Owns production SaaS | No | N/A | Yes (RegRely, GreenOH) |

*(Fill with **honest** numbers you can defend. Fabricated comparison claims get caught and destroy trust.)*

### A4 — Named authors + `Person` schema *(HIGH — EEAT)*

Anonymous content is barely citable. Every page needs a **real named human** with a bio, a photo, a LinkedIn link, and a `Person` node. AI engines explicitly weight author identity.

### A5 — Statistics and specifics *(HIGH)*

AI engines cite **numbers**. Vague claims get skipped. Publish original data you actually own:
- *"Across N modernization engagements, median time-to-first-production-value was X weeks"*
- *"RegRely processes N compliance evidence items across N frameworks"*

**Only publish numbers you can defend.** An invented stat that gets quoted by an AI engine and then found false is far worse than no stat.

### A6 — `llms.txt` *(MEDIUM)*

```
# Greenoh

> Greenoh is an enterprise AI engineering company that builds AI-powered
> software, modernizes legacy systems, and automates workflows for companies
> with 50-1,000 employees across the US, UK, Canada, Australia, and UAE.

## Services
- [AI Engineering](https://thegreenoh.com/services/ai-engineering/): Custom AI systems, agents, copilots — PoC to production.
- [AI Modernization](https://thegreenoh.com/services/ai-modernization/): Add AI to existing CRM, ERP, and legacy systems.
- [Enterprise Software Development](https://thegreenoh.com/services/enterprise-software-development/): Custom SaaS, internal platforms, dashboards.
- [Workflow Automation](https://thegreenoh.com/services/workflow-automation/): Business process automation and API integration.

## Products
- [RegRely](https://regrely.com): AI compliance and privacy management platform.
- [GreenOH](https://greenoh.pk): Pakistan's first solar aggregator platform.

## Contact
- [Book a strategy call](https://thegreenoh.com/contact/)
```

### A7 — Explicit AI crawler access *(MEDIUM)*

```
# robots.txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://thegreenoh.com/sitemap.xml
```

> `Google-Extended` controls Gemini training/grounding — allowing it is a **deliberate trade** (visibility in exchange for training use). Your call; for a company that wants AI citation, allowing is the right move.

### A8 — Off-site presence *(HIGH — and mostly not on your website)*

**Hard truth:** AI engines cite **consensus across sources**, not your own marketing copy. You cannot win AEO from your own domain alone. Highest-leverage off-site work:

- **LinkedIn Company Page** — non-negotiable, do it today
- **Clutch / G2 / DesignRush** profiles with **real** reviews — these dominate "best AI development companies" queries, which is exactly what your buyers ask ChatGPT
- **Crunchbase** entity
- **GitHub org** with genuine open-source contributions (strong dev-credibility signal)
- Founder posting substantively on LinkedIn/X under a real name
- Guest posts and podcasts in the enterprise-AI space

**Reality check:** when a CTO asks ChatGPT *"best enterprise AI engineering companies"*, the answer is assembled from Clutch listicles, G2, and industry roundups — **not** from thegreenoh.com. Getting listed in those sources is the highest-ROI AEO work available to you, and none of it is code.

### A9 — Content structure for extraction *(MEDIUM)*
Question-form H2s · short paragraphs (2–4 sentences) · bullets over prose · a bolded key sentence per section · a TL;DR at the top of long posts.

### A10 — Recency signals *(MEDIUM)*
AI engines favor fresh content. Add visible `dateModified` + schema `dateModified`. Refresh pillars quarterly.

---

## 12. PRIORITY IMPLEMENTATION ROADMAP

### 🔴 Week 1 — Free wins on the current page *(no architecture change needed)*

| Task | Impact | Effort |
|---|---|---|
| Add `FAQPage` schema (content already exists) | **HIGH** | 30 min |
| Add the answer block under H1 | **HIGH** | 1 hr |
| Fix `areaServed` → all 5 countries, ISO-correct | **HIGH** | 15 min |
| Create LinkedIn Company Page → add `sameAs` | **HIGH** | 2 hr |
| Replace Gmail form endpoint → `hello@thegreenoh.com` | **HIGH** | 1 hr |
| Install GA4 + Search Console + Bing Webmaster | **HIGH** | 1 hr |
| Add `SoftwareApplication` schema (RegRely, GreenOH) | MED | 30 min |
| Add `llms.txt` + AI-crawler `robots.txt` | MED | 30 min |
| Compress `og-image.png` (424 KB → <150 KB) | MED | 15 min |
| Decide: **Greenoh** or **Greenoh** — then unify everywhere | **HIGH** | 30 min |

**~8 hours of work. Meaningful AEO improvement. Do this before anything else.**

### 🟠 Weeks 2–4 — Architecture

| Task | Impact |
|---|---|
| Migrate to Astro (or Eleventy) — static output, same CSS | **HIGH** |
| Build 4 service pages + `/about/` + `/contact/` | **HIGH** |
| `/about/` with real team, photos, bios, `Person` schema | **HIGH** *(biggest EEAT gap)* |
| 2 case studies (RegRely, GreenOH — you already own these) | **HIGH** |
| Expand sitemap; add `BreadcrumbList` | **HIGH** |
| Implement internal linking model (§9) | **HIGH** |

### 🟡 Months 2–3 — Content & authority

| Task | Impact |
|---|---|
| 4 pillar pages, 3,000+ words each | **HIGH** |
| Clutch + G2 + Crunchbase profiles, chase **real** reviews | **HIGH** |
| First 8 blog posts (definitions + comparisons — fastest AEO) | **HIGH** |
| Comparison tables on every service page | **HIGH** |
| Core Web Vitals pass (INP is the risk) | MED |

### 🟢 Months 4–6 — Scale

Industry pages · 4 posts/month · founder-led LinkedIn/X presence · guest posts & podcasts · comparison pages · digital PR for backlinks · quarterly refresh of pillars.

### 🔵 Months 7–12 — Compound

6–8 posts/month · original research (**your best backlink & AI-citation asset**) · expand case studies · geo pages per market · conversion optimization on live data.

---

## CONVERSION SEO (§ bonus — you asked, and it matters more than rankings)

| Current | Problem | Fix |
|---|---|---|
| CTA: *"Book a Strategy Call"* | Fine, but no urgency, no risk-reversal | *"Book a Free 30-Minute AI Strategy Call"* — time-bound + free = lower friction |
| Hero H1 | No keyword, no proof | See §7 |
| Trust elements | **None** | Client logos · "Builders of RegRely & GreenOH" · years in business · project count |
| Testimonials | **None** | 3 quotes with **name + title + company + photo**. Anonymous quotes are worthless. |
| Case studies | **None** (you have 2 products worth of material) | Problem → approach → architecture → outcome, with a real metric |
| ROI stats | **None** | Publish honest numbers from real engagements |
| Form | 5 fields incl. budget | Budget-gating on first touch suppresses good leads. **Move budget to the call.** Ask: name, work email, company, "what do you want to build". |
| Booking | Form only | Add **Calendly/Cal.com** — enterprise buyers want to self-serve a slot, not wait for an email |
| Social proof | **None** | "Trusted by teams at…" bar directly under the hero |

> **The uncomfortable truth:** Greenoh currently asks a CTO to disclose a **$100,000 budget** through a form that posts to a **personal Gmail address**, on a site with **no team page, no client names, no testimonials, and no case studies**. No amount of schema markup fixes that. **Trust is the bottleneck, not rankings.** Fix trust first.

---

## DECISIONS NEEDED FROM YOU

1. **Brand casing** — "Greenoh" or "Greenoh"? Must be identical across site, LinkedIn, Clutch, everywhere.
2. **Framework** — Astro (recommended), Eleventy, or hand-rolled HTML folders?
3. **Physical address** — is there a real, staffed office? Determines whether `LocalBusiness` schema and Google Business Profile are honest options.
4. **Team visibility** — are you willing to put real names, faces, and bios on `/about/`? **EEAT does not work anonymously.**
5. **Real metrics** — what numbers from real engagements can you publish and defend?
6. **Founding year** and **team size** — needed for `Organization` schema.
