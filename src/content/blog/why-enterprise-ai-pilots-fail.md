---
title: "Why enterprise AI pilots never reach production"
description: "The demo works. Six months later it still has not shipped. Five failure modes that kill enterprise AI pilots between the prototype and production — and what to build instead."
excerpt: "The pilot impressed everyone in the room. Then it stalled for six months. The reasons are boringly consistent, and all five are avoidable."
answer: "Enterprise AI pilots fail to reach production for five recurring reasons: the prototype was built on clean sample data, there is no way to measure whether the output is good, the model can access data the requesting user cannot, token cost is unmodelled at real scale, and there is no fallback when the system is wrong or unavailable."
published: 2026-07-14
service: ai-engineering
readingTime: 9
faqs:
  - q: "Why do most enterprise AI projects fail?"
    a: "Most fail between the prototype and production, not at the modelling stage. The common causes are unrepresentative test data, no evaluation method, permission leakage through the retrieval layer, unmodelled cost at scale, and no fallback path when the system is wrong or unavailable."
  - q: "How do you measure whether an AI system is good enough to launch?"
    a: "Build an evaluation set of real cases with known correct answers before you build the system, then score every change against it. Without a baseline number, launch decisions come down to opinion, and nobody will sign off on an opinion."
  - q: "How long should an enterprise AI project take?"
    a: "A well-scoped enterprise AI system should reach production in 6 to 12 weeks. Projects that run substantially longer are usually not blocked on the model — they are blocked on data access, evaluation, or permissions, which are the things a pilot skips."
---

The pilot goes well. Someone builds a prototype in three weeks, demos it to the leadership team, and the room is genuinely impressed. It reads the documents. It answers the questions. Everyone agrees this is the future.

Then six months pass and it has not shipped.

This is the single most common shape of an enterprise AI project, and it is not a modelling problem. The model was never the hard part. The hard part is everything a prototype is allowed to skip — and a prototype is allowed to skip almost everything.

Here are the five things that kill it, in roughly the order they surface.

## 1. The prototype ran on clean data

Every demo runs on a curated sample. Twenty documents someone picked because they were representative. They are not representative; they are legible.

The real corpus has scanned PDFs from 2011 that are images of text. It has three contract templates that changed twice. It has a field called `status` that means five different things depending on which team filled it in, and one value that only means anything to a person who left the company.

The prototype never had to deal with any of that, so it never told you the thing you most needed to know: how much of your data is actually usable, and what it costs to make the rest usable.

**What to do instead:** before building anything, take a genuinely random sample of the real corpus — not a chosen one — and measure what fraction is machine-readable. That number, not the demo, tells you whether the project is viable.

## 2. Nobody can tell you if it is working

Ask a team six months into a stalled AI project how good the system is, and watch what happens. You will get anecdotes. "It's pretty good." "It gets most things right." "It struggled with that one query last week."

That is not a launch decision. It is a vibe, and no executive will put their name on a vibe. So the project sits in a loop of endless tweaking, because there is no number that says *done*.

The absence of evaluation is the single most reliable predictor that an AI project will not ship.

**What to do instead:** before you write the system, write the test. Assemble a set of real cases with known correct answers — a few hundred is plenty — and score against it. Now every change has a number attached. Now "is it good enough?" has an answer, and the launch conversation takes ten minutes instead of six weeks.

## 3. The model can see things the user cannot

This is the one that kills projects at the security review, and it kills them late — after everything else is working, which is the most expensive time to find out.

You built a retrieval system over the company's documents. It works beautifully. Then someone asks: when a junior analyst queries it, can it surface a document from the folder only the executive team can open?

If the retrieval layer does not carry the user's permissions, the answer is yes. The model does not know about your access-control model. It knows about the documents in the index, and it will happily quote from any of them.

**What to do instead:** permissions belong in the retrieval query, not in a filter applied to the answer afterwards. The system should never retrieve a document the requesting user could not open directly. Build it this way from the first week — retrofitting permission-aware retrieval into a finished system usually means rebuilding the retrieval layer.

## 4. The cost was never modelled at real scale

At pilot scale, cost is invisible. A hundred queries a day against a frontier model is a rounding error, and nobody thinks about it.

Then you multiply by every employee, every day, with every query pulling twenty documents of context into the prompt. Now the number has four more zeros, and it lands on a budget line nobody approved. The project does not get killed for being bad. It gets killed for being expensive in a way nobody predicted.

**What to do instead:** model cost per task before you scale, not after. Then engineer it down: retrieve fewer and better chunks, cache what repeats, route easy cases to a cheaper model and only escalate the hard ones. The gap between a naive implementation and a considered one is routinely 10x — but only if you look before you launch.

## 5. There is no answer to "what if it is wrong?"

Every AI system is wrong sometimes. That is not a defect to be engineered away; it is a property to be designed around.

The pilot never had to answer this because the pilot had no consequences. Production does. What happens when the model misclassifies the invoice? When it drafts a reply with a wrong number in it? When the provider has an outage in the middle of your working day?

If the answer is a shrug, the system will not be allowed near a real customer — and it should not be.

**What to do instead:** decide up front which actions the system can take alone and which need a human. Set a confidence threshold and route anything below it to a person. Log every decision so a wrong one can be traced and corrected. Have a path that still works when the model is unavailable. None of this is glamorous, and all of it is the difference between a demo and a system.

## The pattern underneath

Look at all five and the same thing is true of each: a prototype is *allowed* to skip it, and production is not.

That is why the prototype took three weeks and the production system has taken six months and counting. The three weeks did not buy you 20% of the work. They bought you the 20% that was easy, and they created the impression that the remaining 80% was a formality.

None of which is an argument against prototyping. It is an argument for being honest about what a prototype has proven — which is that the idea is plausible, not that it is buildable.

## What a production-shaped project looks like

The projects that ship look different from week one. They start with the evaluation set, not the model. They test on the real corpus, not a sample. They build permission-aware retrieval before they build anything on top of it. They know the cost per task before scaling. And they have a written answer to what happens when the system is wrong.

Done that way, a real enterprise AI system reaches production in six to twelve weeks — not because the team is faster, but because they are not spending months rediscovering the five things above.

This is what [AI engineering](/services/ai-engineering/) means as a discipline, as distinct from AI experimentation. Both have their place. Only one of them ships.

If you have a pilot that impressed everyone and has not moved since, that is a diagnosable condition. [Tell us where it is stuck](/contact/) and we will tell you which of the five it is.
