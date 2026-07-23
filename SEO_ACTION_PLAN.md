# SEO Action Plan — flowmoat.com

What is already automated, and what only you can do.

Ordered by **impact per hour spent**. Do them top to bottom. Don't skip to
step 8 because it looks fun — the early steps are what make the later ones
count.

---

## Already done (no action needed)

- Every title ≤60 chars, every description ≤158, no duplicates.
- `og:type` correct on blog posts.
- JSON-LD `@graph`: Organization, WebSite, WebPage, ImageObject sitewide;
  BlogPosting, BreadcrumbList, FAQPage on posts.
- Sitemap with `lastmod` on blog posts.
- `npm run seo:audit` catches regressions; runs on every PR to `main`.

**Meaning:** the technical layer is done. It makes you *eligible* to rank.
It does not make you rank. Everything below is what actually decides that.

---

## STEP 1 — Turn on the merge gate (5 minutes, do today)

The audit workflow exists but cannot block anything until you tell GitHub to
require it.

1. GitHub → repo → **Settings** → **Branches** → **Add branch ruleset**
2. Target branch: `main`
3. Enable **Require status checks to pass**
4. Search for and select **`Build and audit`**
5. Enable **Require a pull request before merging**
6. Save

**Test it:** open a PR that sets a description to 300 characters. It should
refuse to merge. If it merges, the check isn't wired — redo step 4.

**Why first:** every step after this adds pages. Without the gate, step 6
silently breaks step 3 and you find out in Search Console six weeks later.

---

## STEP 2 — Search Console: verify indexing, then wait (15 minutes)

Search Console is already connected (DNS-verified) and the sitemap is
submitted. It has been collecting for under a month, so **there is no
meaningful data yet** — nothing to analyse, and any conclusion drawn now
would be noise.

Three checks, then leave it alone:

1. **Sitemaps tab** — status should read `Success`, with **16 discovered
   URLs**. Fewer means pages aren't being found; tell me and I'll investigate.
2. **Pages tab** — indexed count should climb toward 16 over the coming
   weeks. Anything under "Not indexed", send me the reason string.
3. **URL Inspection** — paste the homepage and the four service pages, hit
   **Request indexing** on each. Skip the blog; let those be found naturally.

Then add Bing: [bing.com/webmasters](https://www.bing.com/webmasters) →
import from Google Search Console, one click. Worth the two minutes because
**Bing's index feeds ChatGPT search.**

**Now stop looking at it for 3–4 weeks.** Impressions arrive before clicks —
that is the normal order, not a problem. Checking daily will only tempt you
into reacting to noise.

> **Don't idle during the wait.** The data isn't the bottleneck right now —
> proof is. Spend these weeks on Step 3. When rankings data does arrive, it
> tells you what to *adjust*; it never tells you what to *build*.

Export the Performance CSV once ~6 weeks of data exist and send it to me.
I'll pull the striking-distance keywords — terms sitting at position 11–20,
where small changes move you onto page one. That's the cheapest ranking win
available, but it needs real data to exist first.

---

## STEP 3 — One real case study (1–2 days) ← THE BIG ONE

This is the single highest-return thing on this list, and nothing can
substitute for it.

Right now `/work/` shows RegRely and GreenOH — your own products. Good, but
every agency claims capability. Almost none show the reasoning behind a real
engagement.

Write **one** engagement up properly:

```
1. The constraint      What the client could not do, and why it mattered
                       commercially. Not "they wanted AI."
2. What you rejected   The obvious approach and why it was wrong here.
                       This is the part that proves expertise.
3. The architecture    What you actually built. Be specific and technical.
4. The tradeoff        What you gave up. Every real project has one.
                       Naming it is what makes the rest believable.
5. The result          Measured, if you have it. Honest, always.
```

**Can't name the client?** `"a 400-person logistics operator in the Midlands"`
still beats nothing. Anonymised and specific is far stronger than named and
vague.

**No hard numbers?** Write it without them. A case study with real
architecture and no metrics outranks one with invented metrics — because the
invented one eventually gets caught, and it destroys exactly the authority
you were building.

> One detailed case study outperforms twenty blog posts for this business.

---

## STEP 4 — Put your name on the work (2 hours)

Blog posts are currently authored by "Flowmoat" the organisation. On a site
selling engineering judgement, an anonymous byline is a liability.

1. Add a real author: name, photo, one-paragraph bio, LinkedIn link.
2. Bio must state *why you specifically* can judge this — years, domains,
   systems shipped. Concrete, not adjectives.
3. Add an `/about/` section with the same.

Send me the bio text and I'll wire `Person` schema + author boxes.

---

## STEP 5 — Make Google see one company, not three (1 hour)

Google resolves "Flowmoat" into an entity by matching signals across the web.
Inconsistent details produce three weak entities instead of one strong one.

Use **byte-identical** name, description, and URL everywhere:

- [ ] LinkedIn company page
- [ ] Clutch profile (high authority for this category — worth the effort)
- [ ] Crunchbase
- [ ] GitHub org profile
- [ ] Google Business Profile, if you have a registered address

Copy the description verbatim from `src/data/site.js` → `SITE.description`.
Same URL format everywhere: `https://flowmoat.com` — no `www`, no trailing
slash.

Then tell me every profile URL and I'll add them to `Organization.sameAs`,
which is how Google connects them.

---

## STEP 6 — Strengthen service pages before writing more blog posts (ongoing)

Your four service pages are the money pages. The blog exists to support them.

An agency site with fifty blog posts and four thin service pages has it
backwards. Before any new post, ask: *does an existing service page need this
more?*

Per service page, add:
- A worked example of that service (links to step 3)
- An FAQ block (schema is already wired — just supply Q&A)
- What you *don't* do. Saying no is a trust signal and it filters bad leads.

---

## STEP 7 — Blog: one post per week, maximum (ongoing)

Six posts exist. Quality beats volume decisively here.

**The test:** would you send this to a prospect mid-deal? If no, it doesn't
help you rank either — publish nothing rather than filler.

Priority topics are the ones where RegRely gives you a defensible claim:
compliance-aware AI, data residency, audit trails in AI systems. Most
agencies *claim* this. **You ship a compliance product.** That is your
strongest and least copyable angle, and it is currently underused.

Always open a PR — the audit runs there.

---

## STEP 8 — Markets: not yet

The site targets US/UK/CA/AU/UAE but ships one locale. **Leave it that way
for now.** Five market pages before you rank in one is five ways to split
your authority.

Revisit only when step 2 data shows the site ranking for its core terms.
Then `/uk/` first, alone, and wait 6–8 weeks before adding a second.

---

## Do NOT do these

- **Don't buy backlinks or use link exchanges.** Manual penalty risk on a
  domain you're building for the long term.
- **Don't publish AI-generated posts unedited.** For a firm selling
  engineering judgement, this is self-defeating even when it ranks briefly.
- **Don't invent metrics, clients, or testimonials.** One fabricated case
  study, discovered, costs more than every ranking it gained.
- **Don't keyword-stuff titles.** `"AI Company | AI Development | AI Agency"`
  reads like 2014 and Google treats it that way.
- **Don't rewrite URLs casually.** GitHub Pages cannot issue 301 redirects,
  so a renamed URL loses its history permanently.

---

## Realistic timeline

| When | What you should see |
|---|---|
| Weeks 1–2 | Indexation. Pages appear in Search Console. |
| Weeks 3–8 | Impressions rise. Clicks lag — that's the normal order. |
| Months 3–6 | Rankings move, driven by steps 3–5, not by the technical work. |
| Months 6–12 | Market expansion, if the data earns it. |

Anyone promising faster is describing a different site. Nothing here is
damaged — this is an early-stage SEO posture, which is good news, because
nothing needs undoing first.

---

## When you're stuck, send me

- Case study raw notes → I'll structure it and add `CaseStudy` schema
- Author bio → I'll wire `Person` schema
- Profile URLs → I'll add `sameAs`
- FAQ Q&A → I'll add it to service pages
- Search Console CSV export → I'll find striking-distance keywords

I will not invent client names, metrics, or results. If a number would help
and we don't have it, the sentence gets written without it.
