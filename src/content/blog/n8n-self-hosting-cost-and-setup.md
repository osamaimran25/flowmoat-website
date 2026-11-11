---
title: "n8n self-hosting cost: what you actually pay beyond the free licence"
metaTitle: "n8n Self-Hosting Cost: What You'll Really Pay"
description: "n8n self-hosting cost explained: server, database, backups and the hours of maintenance nobody budgets for, with typical monthly ranges by setup."
excerpt: "Self-hosted n8n is free to download, but it isn't free to run. Here's what the server, the database, the backups and your team's time really cost, from a weekend project up to a production setup."
answer: "Self-hosting n8n's Community Edition costs nothing in licence fees. The real n8n self-hosting cost is infrastructure and time: typically $5–$50 a month for a small server and database, $100–$400 for a production setup with queue mode and backups, plus roughly 2–8 hours a month of maintenance. Paid licences for SSO and environments cost extra."
published: 2026-11-11
service: workflow-automation
readingTime: 7
faqs:
  - q: "Is self-hosted n8n really free?"
    a: "The Community Edition has no licence fee and no limit on executions. You still pay for the server, database, backups and the time it takes to keep everything patched and running. Some features, such as SSO and multiple environments, need a paid licence."
  - q: "Is it cheaper to self-host n8n or use n8n Cloud?"
    a: "At low volume, n8n Cloud often works out cheaper once you count the hours spent on maintenance. Self-hosting starts to win when you run a lot of executions, need data to stay in your own infrastructure, or already have someone who manages servers."
  - q: "What server size do I need for self-hosted n8n?"
    a: "A single instance with 2 vCPUs and 4 GB of RAM handles most small and mid-sized workloads. If workflows process large files or run at high concurrency, move to queue mode with separate workers instead of just buying a bigger machine."
  - q: "How long does it take to set up self-hosted n8n properly?"
    a: "A basic Docker install takes an hour or two. A production setup with Postgres, HTTPS, backups, monitoring and a tested restore usually takes 1–3 days of engineering time, more if it has to fit an existing security or compliance setup."
---

Most people looking up n8n self-hosting cost have already seen the headline: the Community Edition is free. That's true. You can download it, run it on your own server, and nobody sends you an invoice per workflow or per execution.

What it leaves out is everything around the software. n8n needs somewhere to run, somewhere to store its data, a way to recover when something breaks, and someone who notices when it does. Those costs are real, and for small teams the time usually costs more than the server.

This post goes through each one, with typical ranges, so you can work out what self-hosting will actually cost you.

## What "free" covers and what it doesn't

The self-hosted Community Edition gives you the workflow editor, the node library, code nodes, webhooks and unlimited executions. For a lot of businesses, that's everything they need.

A paid licence (n8n's Business or Enterprise tiers) adds things larger teams tend to want: SSO via SAML or LDAP, separate development and production environments with Git-based deployment, log streaming to your monitoring tools, and more granular user permissions. n8n changes these packages from time to time, so check the current feature list before you decide. The basic split has stayed the same, though. The core tool is free, and governance features are paid.

If you're a small team and nobody is asking for SSO or audit logs, you can ignore the licence question for now. Plenty of companies outgrow that assumption later, usually when security or compliance gets involved.

## The infrastructure costs

### The server

n8n runs happily in Docker on a modest virtual machine. For a single instance:

- **Budget VPS** (Hetzner, Contabo and similar): roughly $5–$20 a month for 2–4 vCPUs and 4–8 GB of RAM.
- **Mainstream cloud VM** (DigitalOcean, AWS Lightsail, Azure, Google Cloud): roughly $20–$80 a month for a similar spec.
- **Managed container platforms** (Railway, Render, Fly.io, or a Kubernetes cluster you already run): anything from $10 to well over $100, depending on how much else you're running.

The main choice here is region. If you serve UK or EU customers and want personal data kept in Europe, pick a European region and write that down. It will matter later if anyone asks about data residency.

### The database

Out of the box, n8n uses SQLite. That's fine for testing. For anything you depend on, use Postgres. It copes better with concurrency, it's easier to back up properly, and you need it for queue mode.

You can run Postgres on the same server for no extra cost, or pay for a managed instance (AWS RDS, DigitalOcean Managed Databases, Supabase, Neon) at roughly $15–$60 a month for a small one. The managed option costs more, but you get automated backups and someone else handles database patching.

### Queue mode, for when you outgrow one instance

When workflows get heavy, with lots of webhooks, big files or long-running AI calls, a single n8n process starts to struggle. Queue mode splits n8n into a main instance plus workers, with Redis managing the job queue between them.

That means more moving parts: one or more worker containers, a Redis instance ($0 if self-run, around $10–$30 a month managed), and usually a bigger total footprint. Expect a production queue-mode setup to cost roughly $100–$400 a month in infrastructure, depending on worker count and provider.

### Backups, HTTPS and monitoring

These are cheap in money and easy to forget:

- **Backups:** nightly database dumps to object storage (S3, Backblaze B2, Cloudflare R2) usually cost a few dollars a month.
- **HTTPS:** free with a reverse proxy such as Caddy or Traefik using Let's Encrypt certificates.
- **Uptime and error alerts:** free tiers of UptimeRobot or Better Stack cover basic checks. An n8n error workflow that posts failures to Slack or email costs nothing and is worth setting up on day one.

## Typical monthly costs by setup

| Setup | Who it suits | Infrastructure per month | Maintenance time per month |
|---|---|---|---|
| Single VPS, SQLite | Testing, personal use | $5–$20 | 1–2 hours |
| Single VPS, Postgres, backups | Small teams, internal workflows | $15–$60 | 2–4 hours |
| Cloud VM, managed Postgres, monitoring | Business-critical workflows | $50–$150 | 3–6 hours |
| Queue mode with workers and Redis | High volume, heavy or AI-driven workflows | $100–$400 | 4–8 hours |
| Any of the above plus a paid licence | Teams needing SSO, environments, audit logs | Add licence fee (quoted by n8n) | Similar |

These are typical ranges, not quotes. Your real number depends on provider, region and how much you already run.

## The cost nobody budgets for: time

Here's where most estimates go wrong. The server bill is small and predictable. The hours are neither.

### Initial setup

A Docker Compose install that works on your laptop takes an hour. A setup you'd trust with customer data takes longer, usually 1–3 days of engineering time. That covers Postgres, HTTPS, environment variables and an encryption key stored somewhere safe, backups, an error-handling workflow, and, most importantly, a restore you've actually tested.

At typical contractor or internal engineering rates, that first setup often costs more than a year of server fees.

### Ongoing maintenance

Once it's running, plan for:

1. **Upgrades.** n8n releases often. Most updates are painless, but major versions occasionally change node behaviour, so test upgrades on a copy first.
2. **OS and Docker patching.** The server underneath needs security updates like any other.
3. **Watching disk and execution data.** Execution logs grow quickly. Set pruning (`EXECUTIONS_DATA_PRUNE` and a max age) or the database will fill up.
4. **Credential rotation.** API keys expire, OAuth tokens get revoked, and someone has to fix them when a workflow starts failing.
5. **Restore drills.** A backup you've never restored is just a hope. Test it once a quarter.

That typically comes to 2–8 hours a month, more in a month when something breaks. If nobody on your team is comfortable on a Linux server, those hours either get skipped or they get expensive.

## Self-hosting vs n8n Cloud

n8n Cloud removes the server, the patching and the backups, and charges a monthly fee that scales with executions. Self-hosting removes the execution limits and keeps the data on your infrastructure, and in return you handle operations yourself.

A rough way to decide:

- **Choose Cloud** if volume is modest, nobody on the team wants to run servers, and you're happy with n8n hosting the data.
- **Choose self-hosting** if you run a lot of executions, need data residency in a specific country or your own cloud account, need to connect to systems inside a private network, or already have someone who manages infrastructure.

Volume is usually what tips it. On a per-execution plan, a workflow that fires on every order, every email or every row of an import adds up quickly. On a self-hosted server it costs the same whether it runs a thousand times or a hundred thousand. If you're still deciding between n8n and other platforms, our comparison of [n8n vs Make vs custom code](/blog/n8n-vs-make-vs-custom-code/) covers that side of the decision.

## Ways to keep self-hosting costs down

- Start with a single instance on Postgres. Move to queue mode only when you can see the main process struggling.
- Turn on execution pruning from day one.
- Put the setup in a Docker Compose file or Terraform in version control, so rebuilding the server takes minutes, not a day of guesswork.
- Export workflows to Git on a schedule, even without the paid environments feature. It's cheap insurance against someone accidentally deleting a workflow.
- Keep heavy processing out of n8n where it makes sense. Large file conversions or long batch jobs often run better as a small separate service that n8n calls.

## When to get outside help

You can run self-hosted n8n with no outside help if someone on your team is comfortable with Docker, Postgres and basic server security, and the workflows aren't critical to revenue or compliance.

Outside help is worth it when the setup has to meet a security review, when workflows touch customer or financial data, when you need queue mode or a private-network setup on the first attempt, or when nobody internally wants to be paged at night because an integration stopped.

Flowmoat sets up and maintains self-hosted n8n as part of our [workflow automation](/services/workflow-automation/) work, and our [n8n automation agency](/n8n-automation-agency/) page explains how those engagements usually run. If you want a second opinion on whether self-hosting makes sense for your volume, or a rough cost for your setup, [get in touch](/contact/) and we'll go through the numbers with you.
