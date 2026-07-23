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

## STEP 3 — Write up RegRely as a build story (1–2 days) ← THE BIG ONE

**No clients yet? You already have two case studies. You just haven't
written them as case studies.**

RegRely and GreenOH are live, in production, and you designed and built
both. That is real engineering work with real constraints and real
tradeoffs. The only difference from a client engagement is that the client
was you — and that difference matters far less than it feels like it does.

It also hands you an advantage agencies don't have:

> Agencies can't discuss client work in depth — NDAs, approvals, "the client
> said no." **You can disclose everything about RegRely.** No permission
> needed. Treat that as an asset, not a consolation prize.

Right now `/work/` gives each product a paragraph and three bullets. That is
a *summary*. Nobody evaluating you as an engineer can tell from it whether
you can think. Start with **RegRely** — compliance is a harder domain than
marketplaces, and it's the claim most agencies can't make.

Write it up properly:

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

Concretely, for RegRely, the questions worth answering:

- How do you model compliance rules that differ per jurisdiction *and* per
  framework, without the schema collapsing every time a regulation changes?
- Where did you let AI decide, and where did you force a human to approve —
  and what made you draw the line exactly there?
- How do you keep an audit trail trustworthy when part of the output was
  generated?
- Multi-tenant isolation: what did you get wrong first, and how did you find
  out?

**Label it honestly.** "A product we built and operate" — never dressed up
as a client engagement. Anyone senior enough to hire you will spot the
difference, and the moment they do, everything else on the site becomes
suspect too.

**No metrics?** Write it without them. A writeup with real architecture and
no numbers beats one with invented numbers — the invented one eventually
gets caught, and it destroys exactly the authority you were building.

**Usage numbers you *do* have are fair game** — your own signups, uptime,
documents processed. You own the data, so you can state it.

> One detailed build story outperforms twenty blog posts for this business.

**Then GreenOH**, a few weeks later. Different proof: two-sided marketplace,
trust and verification, a category that didn't exist in the market before.

---

## A word on timing, since you have no clients yet

SEO is a 3–6 month channel. It will not produce your first client, and you
should not wait on it as if it might.

**For the first few clients, direct outreach and your existing network will
beat SEO decisively** — and they'll also hand you the thing SEO needs most:
real engagements to write about. The two compound; they don't compete.

So keep SEO to roughly a day a week. Steps 1, 2, 4, and 5 are a few hours
total. Step 3 is the one worth real time — and note that a good RegRely
writeup doubles as sales material you can send a prospect directly, which
pays off long before it ranks.

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
