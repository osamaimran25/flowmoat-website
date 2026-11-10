---
title: "How to build a GDPR-compliant AI assistant for your company"
metaTitle: "GDPR-Compliant AI Assistant: Build Guide"
description: "Where data lives, which model sees it, and who approves what: a practical checklist for building an AI assistant that holds up under GDPR and UK GDPR."
excerpt: "Most GDPR problems with AI assistants are architecture decisions made in week one. Here are the six that matter, in the order you should make them."
answer: "A GDPR-compliant AI assistant keeps personal data in approved regions, sends models only the minimum data needed, respects existing access permissions, logs every answer, has a lawful basis and a signed DPA with every processor, and lets people correct or delete their data. Most of this is decided in the architecture, not added afterwards."
published: 2026-11-10
service: ai-engineering
readingTime: 7
faqs:
  - q: "Can we use OpenAI or Anthropic models under GDPR?"
    a: "Often yes, through their business APIs with a signed DPA, EU data residency where offered, and no training on your data. For the most sensitive data, a self-hosted open model in your own EU environment removes the question entirely."
  - q: "Does a RAG assistant store personal data?"
    a: "It stores the text it searches, so if your documents contain personal data, so does the index. Treat the index like the source system: same region, same access rules, same retention and deletion process."
  - q: "Does the EU AI Act apply to an internal assistant?"
    a: "Most internal assistants are limited-risk. The main duties are transparency, so people know they are using AI, and human oversight for consequential decisions. High-risk uses such as hiring decisions carry extra obligations."
---

Most teams ask about GDPR after the AI assistant already works. By then, the expensive decisions are made: where the data went, which model saw it, and who can see the answers.

Here are the six decisions that matter, in the order to make them.

## 1. Decide where the data lives

Pick the region before you pick the model. If personal data has to stay in the EU or UK, your vector database, logs and model endpoint all need to be there too. A RAG index is a copy of your documents, not a pointer to them.

## 2. Send the model the minimum

The model only needs the passages that answer the question. Retrieve narrowly, strip identifiers the answer doesn't need, and never send whole files "just in case".

## 3. Respect the permissions you already have

If an employee can't open a document in your drive, the assistant must not quote it to them. Retrieval has to check the user's existing permissions on every query. This is the most common gap we see.

## 4. Sign a DPA with every processor

Model provider, vector database, hosting, logging: each one that touches personal data needs a data processing agreement and a clear position on training. If a vendor can't give you one, it shouldn't see personal data.

## 5. Log answers, and keep a person in the loop

Keep a record of what was asked, which sources were used, and what was answered. For anything consequential, such as a client email or a decision about a person, a human approves before it goes out.

## 6. Make correction and deletion possible

When someone asks for their data to be deleted, it has to leave the index and the logs too. Build the deletion path on day one; retrofitting it is painful.

## The short version

GDPR compliance for an AI assistant is mostly architecture: region, minimum data, permissions, processors, logs, deletion. Get those six right and the legal review becomes a confirmation, not a rebuild.

If you're planning an assistant for a team in the UK or Europe and want a second opinion on the architecture, [book a free call](/contact/).
