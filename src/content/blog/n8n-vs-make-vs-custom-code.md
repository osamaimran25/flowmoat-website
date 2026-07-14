---
title: "n8n vs Make vs custom code: how to choose an automation approach"
description: "A practical comparison of n8n, Make, and custom-coded workflows — what each is genuinely good at, where each breaks down, and the four signals that tell you which one your process needs."
excerpt: "The honest answer is that most real systems use both a platform and custom code. The question is which parts get which — and there are four signals that decide it."
answer: "Use Make for simple, low-volume integrations between popular SaaS tools. Use n8n when you need self-hosting, complex branching, or data residency control. Use custom code when the workflow exceeds what a visual builder can express, runs at high volume, or is business-critical enough to require real testing and version control."
published: 2026-07-14
service: workflow-automation
readingTime: 8
faqs:
  - q: "Is n8n better than Make?"
    a: "Neither is strictly better. Make is faster to build in and easier for non-engineers, with a large library of pre-built connectors. n8n is self-hostable, handles complex branching and custom code steps more gracefully, and keeps your data inside your own infrastructure — which matters when data residency or compliance is a constraint."
  - q: "When should we use custom code instead of an automation platform?"
    a: "Use custom code when the logic is too complex to express visually, when volume makes per-operation pricing expensive, when the workflow is business-critical enough to need automated tests and version control, or when you need an integration no connector exists for."
  - q: "Can we mix an automation platform with custom code?"
    a: "Yes, and most durable systems do. Platforms handle the simple, frequently-changing integrations that business users need to adjust themselves, while custom services handle the high-volume, business-critical, or logically complex parts. The mistake is forcing everything through one approach."
---

The question usually arrives already framed as a tool decision. Should we use n8n or Make? And the honest answer — that it depends on the workflow, and that most real systems end up using both a platform and custom code — sounds like a dodge.

It is not a dodge. It is the entire point. Choosing one tool for every automation in your business is how you end up with either a fragile visual workflow doing something it was never designed for, or six months of engineering to send a Slack message.

So let us be specific about what each is genuinely good at, and what actually decides between them.

## The three approaches

**Make** (formerly Integromat) is a hosted visual automation platform. You drag modules onto a canvas, connect them, and it runs. It has a very large library of pre-built connectors to popular SaaS tools, and a non-engineer can build something useful in an afternoon. You pay per operation.

**n8n** is a workflow automation tool that you can self-host. It is also visual, but it sits closer to engineers: it handles branching, looping, and error paths more gracefully, and it lets you drop into JavaScript or Python inside a node when the visual model runs out. Because you can run it on your own infrastructure, your data never leaves your environment.

**Custom code** is a service you write and deploy yourself — typically Python or TypeScript, running on a schedule or triggered by an event. Infinite flexibility, real tests, real version control, and no per-operation pricing. It also has no visual canvas, which means the operations team cannot change it without an engineer.

## A direct comparison

| | Make | n8n | Custom code |
|---|---|---|---|
| **Speed to first version** | Fastest | Fast | Slowest |
| **Who can change it** | Business users | Technical users | Engineers only |
| **Self-hostable** | No | Yes | Yes |
| **Data stays in your infra** | No | Yes (self-hosted) | Yes |
| **Complex branching / loops** | Awkward past a point | Good | Unlimited |
| **Cost at high volume** | Per-operation, adds up fast | Flat (self-hosted) | Infrastructure only |
| **Automated tests** | Effectively none | Limited | Full |
| **Version control / rollback** | Weak | Better | Full |
| **Integration with anything unusual** | Only if a connector exists | Connector or code node | Always possible |

## The four signals that actually decide it

Ignore the tooling debate and look at the workflow itself. Four properties settle it.

### 1. Who needs to change this, and how often?

This is the most underrated question and often the decisive one.

If the workflow encodes a business rule that the operations team adjusts regularly — a routing condition, a threshold, a new lead source — putting it in custom code means every change becomes an engineering ticket. That is a tax you will pay every week, and eventually the team will route around it with a spreadsheet.

Put those workflows on a platform. The whole value is that the person who owns the rule can change the rule.

### 2. What is the volume?

Per-operation pricing is fine at a thousand operations a month and painful at a million. Run the arithmetic before you build, not after.

A workflow processing every transaction, every event, or every row of an import is a volume workflow. Those belong in code, or in self-hosted n8n where the cost is your server rather than a per-operation meter.

### 3. How complex is the logic really?

Visual builders are excellent up to a threshold and genuinely bad past it. The threshold is roughly: two or three branches, a loop, some error handling.

Beyond that — nested conditions, retries with backoff, state that has to persist across runs, reconciliation between two systems that disagree — the visual canvas stops helping and starts hiding. You end up with a diagram nobody can read, doing something nobody can reason about, which is worse than the code you were avoiding.

If you cannot explain the workflow on a whiteboard in two minutes, it does not belong on a canvas.

### 4. What happens if it silently fails?

This is the question that decides whether a workflow is business-critical, and business-critical workflows deserve real engineering.

If a workflow stops running and nobody notices for a week, what have you lost? If the answer is "some Slack notifications," a platform is fine. If the answer is "a week of customer records that were never created in the CRM, and we cannot tell which ones," you need retries, alerting, idempotency, and a test suite. That is code — or at minimum a platform workflow built with far more care than the average one.

Silent failure is the characteristic failure mode of automation, and it is the reason "it worked when we built it" is not a standard.

## The answer is usually "both"

Here is what a mature automation setup actually looks like in a company of a few hundred people.

The simple, frequently-changing, low-volume integrations run on a platform. New lead lands in the form, enrich it, create the CRM record, notify the account owner. The ops team owns it and changes it themselves, and that is exactly right.

The high-volume, business-critical, logically complex processes run as code. The nightly reconciliation between billing and the ledger. The pipeline that ingests and validates every import. The workflow where an AI model classifies a document and routes the uncertain cases to a human. These have tests, version control, alerting, and an owner.

And they talk to each other. The platform calls the service; the service writes back where the platform can see it.

The mistake is not picking the wrong tool. The mistake is picking one tool and forcing every process through it — either bolting a mission-critical reconciliation onto a visual canvas because that is what the company standardised on, or writing four hundred lines of Python to move a form submission into a CRM.

## Where to start

Map the process before you choose the tool. The real one, not the one in the handbook — including the step where someone checks the spreadsheet on Friday, which is never in the documentation and is usually the step everything else depends on.

Then run each workflow through the four signals. Most sort themselves immediately.

This is the substance of what we do in [workflow automation](/services/workflow-automation/) engagements: we do not arrive with a tool preference. We arrive with the four questions, and the answers decide the architecture.

If you are staring at a process that runs on someone copying data between two screens, [tell us about it](/contact/) — we will tell you which approach it needs, and roughly what it costs to get there.
