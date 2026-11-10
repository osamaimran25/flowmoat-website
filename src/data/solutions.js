// Use-case, industry and engagement landing pages (see KEYWORDS.md).
// Each page targets one commercial keyword and links back to its parent service.
// No client names or result numbers here until they are real and approved.
export const SOLUTIONS = [
  {
    slug: "hire-dedicated-ai-engineer",
    service: "ai-engineering",
    title: "Hire a Dedicated AI Engineer for Your Team | Flowmoat",
    metaDescription:
      "Add a dedicated AI or automation engineer to your team on a monthly basis. RAG, AI agents, n8n and Python. Start in days, not months. Book a free call.",
    eyebrow: "Dedicated AI engineer",
    h1: "Hire a dedicated AI engineer without a months-long hiring process.",
    definition:
      "A dedicated AI engineer from Flowmoat joins your team on a monthly basis, works in your tools and stand-ups, and reports to your lead. They build and maintain AI assistants, RAG search, agents and workflow automation inside your existing systems, and you can scale the engagement up or down month to month.",
    problems: [
      "Hiring an experienced AI engineer takes months, and the roadmap can't wait.",
      "Your developers are strong, but nobody has shipped RAG or AI agents to production before.",
      "A freelancer built a prototype, then disappeared before it was production-ready.",
      "You need AI capability for a few months of build, not a permanent senior hire.",
    ],
    steps: [
      { title: "Scope call", body: "We learn your stack, team, and the first outcome the engineer should deliver." },
      { title: "Match", body: "We propose an engineer whose experience fits the work: RAG, agents, automation, or integrations." },
      { title: "Onboard", body: "The engineer joins your Slack, repo, and stand-ups and ships a first change in the first week." },
      { title: "Monthly review", body: "Each month we review delivery with your lead and adjust scope or capacity." },
    ],
    faqs: [
      {
        q: "How is a dedicated AI engineer different from a project?",
        a: "A project has a fixed scope and price. A dedicated engineer works as part of your team on a monthly basis, so priorities can change week to week without renegotiating a contract.",
      },
      {
        q: "What time zones do you cover?",
        a: "We work with teams in the US, UK, Canada, Australia and the UAE, and set daily overlap hours with your team for stand-ups and reviews.",
      },
      {
        q: "Who owns the code?",
        a: "You do. All work is committed to your repositories under your accounts from the first day.",
      },
      {
        q: "Can we start with one engineer and add more later?",
        a: "Yes. Most teams start with one engineer and adjust capacity after the first month.",
      },
    ],
    posts: ["why-ai-pilots-fail", "ai-agents-vs-automation-when-to-use-which"],
  },
  {
    slug: "rag-chatbot-for-company-documents",
    service: "ai-engineering",
    title: "RAG Chatbot for Company Documents | Flowmoat",
    metaDescription:
      "We build RAG chatbots that answer from your own documents with citations and permission-aware search over contracts, policies and wikis. Book a call.",
    eyebrow: "RAG chatbot",
    h1: "A RAG chatbot that answers from your documents, and shows where the answer came from.",
    definition:
      "A RAG (retrieval-augmented generation) chatbot searches your company's own documents, retrieves the most relevant passages, and uses them to write an answer with citations. Flowmoat builds RAG assistants over contracts, policies, wikis and tickets, with permission-aware retrieval so users only see what they are already allowed to access.",
    problems: [
      "Staff spend hours searching shared drives for the right policy, precedent or answer.",
      "A generic AI chatbot invents answers that sound confident and are wrong.",
      "Sensitive documents can't be pasted into a public AI tool.",
      "Search works on exact keywords, so people miss documents that use different wording.",
    ],
    steps: [
      { title: "Ingest", body: "Clean PDFs, Word files and pages, keep metadata, and remove duplicates." },
      { title: "Chunk and index", body: "Split by meaning, not by page, and combine keyword and semantic search." },
      { title: "Answer with citations", body: "Every answer links to the passage it came from. No source, no answer." },
      { title: "Evaluate", body: "Test against real questions from your team before anyone relies on it." },
    ],
    faqs: [
      {
        q: "Will the chatbot make things up?",
        a: "It is built to answer only from retrieved passages and to say when it can't find a source. We test it against real questions before launch and keep measuring after.",
      },
      {
        q: "Where does our data live?",
        a: "In your cloud account or on your own servers. We can use hosted models or self-hosted ones, depending on how sensitive the documents are.",
      },
      {
        q: "Can it respect who is allowed to see what?",
        a: "Yes. Retrieval checks the user's permissions, so the assistant never shows a document the user couldn't already open.",
      },
      {
        q: "Can it connect to Slack, Teams or our website?",
        a: "Yes. The same assistant can sit in Slack, Teams, an internal portal, or a customer-facing widget.",
      },
    ],
    posts: ["why-ai-pilots-fail", "add-ai-to-existing-crm-erp"],
  },
  {
    slug: "document-processing-automation",
    service: "workflow-automation",
    title: "AI Document Processing Automation | Flowmoat",
    metaDescription:
      "Automate data entry from PDFs, invoices, forms and contracts with AI extraction, validation and human review for uncertain cases. Book a free call.",
    eyebrow: "Document processing",
    h1: "AI document processing that removes manual data entry from PDFs and forms.",
    definition:
      "AI document processing reads documents such as invoices, forms, claims and contracts, extracts the fields your team needs, validates them against your rules, and sends the data into your systems. Flowmoat builds these pipelines with confidence thresholds, so uncertain cases go to a person instead of being guessed.",
    problems: [
      "Your team retypes data from PDFs and emails into a CRM, ERP or spreadsheet.",
      "Typing errors cause wrong invoices, missed deadlines, or rework later.",
      "Document volume grows faster than the team that processes it.",
      "Template-based OCR breaks every time a supplier changes their layout.",
    ],
    steps: [
      { title: "Map the documents", body: "Collect real samples and define the fields and rules that matter." },
      { title: "Extract and validate", body: "AI extracts fields; rules check totals, dates and required values." },
      { title: "Human review", body: "Low-confidence documents go to a review queue instead of straight through." },
      { title: "Push to your systems", body: "Clean data lands in your CRM, ERP, database or sheet automatically." },
    ],
    faqs: [
      {
        q: "What document types can you process?",
        a: "Invoices, purchase orders, forms, claims, contracts, IDs and emails, including scanned documents and layouts that change between senders.",
      },
      {
        q: "What happens when the AI isn't sure?",
        a: "Each field has a confidence score. Below the threshold, the document goes to a person to check, so errors don't flow into your systems.",
      },
      {
        q: "Do we need to replace our current software?",
        a: "No. The pipeline writes into the tools you already use through their APIs, n8n, or a direct database connection.",
      },
    ],
    posts: ["n8n-vs-make-vs-custom-code", "ai-agents-vs-automation-when-to-use-which"],
  },
  {
    slug: "ai-automation-for-law-firms",
    service: "workflow-automation",
    title: "AI Automation for Law Firms | Flowmoat",
    metaDescription:
      "AI and automation for law firms: client intake, research assistants over your precedent library, and document review with lawyer sign-off. Book a free call.",
    eyebrow: "Law firms",
    h1: "AI automation for law firms, with a lawyer still signing off.",
    definition:
      "AI automation for law firms means using software to handle the repetitive parts of legal work, such as intake, document review and precedent research, while lawyers keep every decision. Flowmoat builds intake workflows, RAG research assistants with citations, and document pipelines that fit how a firm already works.",
    problems: [
      "Leads go cold between the first call and the signed engagement letter.",
      "Associates spend hours searching past matters for the right precedent.",
      "Generic AI tools invent case law, so nobody trusts them.",
      "Client documents can't leave the firm's systems.",
    ],
    steps: [
      { title: "Map the intake", body: "Lay out every stage from first contact to signed client, and where work waits." },
      { title: "Automate handoffs", body: "Conflict checks, reminders and document requests run without manual chasing." },
      { title: "Research assistant", body: "A RAG assistant over your precedent library that cites the exact paragraph." },
      { title: "Lawyer review", body: "Nothing reaches a client without a lawyer checking it." },
    ],
    faqs: [
      {
        q: "Is client data safe?",
        a: "Systems can run in your own cloud or servers, with access controls and audit logs. Documents are never used to train public models.",
      },
      {
        q: "Will the research assistant cite real cases?",
        a: "It only answers from your own library and links to the source paragraph. If it can't find a source, it says so.",
      },
      {
        q: "Does this work with our practice management software?",
        a: "Usually yes, through its API or through n8n. We check this on the first call.",
      },
    ],
    posts: ["why-ai-pilots-fail", "add-ai-to-existing-crm-erp"],
  },

  {
    slug: "ai-automation-agency-usa",
    service: "workflow-automation",
    title: "AI Automation Agency for US Businesses | Flowmoat",
    metaDescription:
      "AI and workflow automation for US companies: RAG assistants, AI agents and n8n automation, delivered remotely with daily overlap on Eastern and Pacific hours.",
    eyebrow: "United States",
    h1: "AI and automation engineering for US businesses.",
    definition:
      "Flowmoat is an AI engineering and automation company working with US businesses, from founders to operations teams. We build AI assistants, RAG search, agents and workflow automation inside the tools you already use, deliver remotely with daily overlap on US working hours, and hand over code your team owns.",
    problems: [
      "Senior AI engineers in the US are expensive and slow to hire.",
      "Your team spends hours a week moving data between your CRM, inbox and spreadsheets.",
      "An offshore vendor delivered code nobody on your team can maintain.",
      "Client or patient data means the AI has to respect HIPAA, SOC 2 or contract terms.",
    ],
    steps: [
      { title: "Free call in your hours", body: "We schedule around Eastern, Central or Pacific time and map the workflow together." },
      { title: "Fixed scope or dedicated engineer", body: "A priced first project, or an engineer who joins your team monthly." },
      { title: "Weekly demos", body: "Working software every week, shown live, with decisions written down." },
      { title: "Handover", body: "Code in your repos, docs for your team, and support if you want it." },
    ],
    faqs: [
      {
        q: "Do you overlap with US working hours?",
        a: "Yes. We keep daily overlap with US Eastern time, and schedule calls and stand-ups for Central and Pacific teams.",
      },
      {
        q: "How do contracts and payment work for US clients?",
        a: "We work under a standard services agreement with an NDA, invoice in USD, and can bill per milestone or monthly.",
      },
      {
        q: "Can you work with HIPAA or SOC 2 requirements?",
        a: "We design around them: data stays in your cloud account, access is logged, and sensitive data is never sent to tools you haven't approved. Your compliance team keeps the final say.",
      },
    ],
    posts: ["n8n-vs-make-vs-custom-code", "what-custom-software-costs"],
  },
  {
    slug: "ai-development-company-uk",
    service: "ai-engineering",
    title: "AI Development Company for UK Businesses | Flowmoat",
    metaDescription:
      "AI development and automation for UK companies: RAG assistants, AI agents and workflow automation built for UK GDPR, with full overlap on UK working hours.",
    eyebrow: "United Kingdom",
    h1: "AI development and automation for UK businesses, built with UK GDPR in mind.",
    definition:
      "Flowmoat builds AI assistants, RAG search, AI agents and workflow automation for UK businesses, from law firms to logistics and SaaS teams. We work across UK business hours, design every system around UK GDPR and your data processing terms, and hand over software your team owns.",
    problems: [
      "Your team wants to use AI, but nobody is sure what UK GDPR allows.",
      "Legal, finance or client data can't be pasted into public AI tools.",
      "UK agency rates make a first AI project hard to justify.",
      "Manual handoffs between systems slow down every client or order.",
    ],
    steps: [
      { title: "Discovery call", body: "During UK hours, we map the workflow and what data it touches." },
      { title: "Data plan", body: "Where data lives, which models see it, and what goes in your DPA." },
      { title: "Build and demo", body: "Weekly working demos, with a person approving anything consequential." },
      { title: "Handover", body: "Code, documentation and a support option, all under your accounts." },
    ],
    faqs: [
      {
        q: "Do you work in UK hours?",
        a: "Yes. Our working day overlaps fully with UK business hours for calls, stand-ups and support.",
      },
      {
        q: "Will you sign a data processing agreement?",
        a: "Yes. We sign NDAs and DPAs, and can keep data in UK or EU cloud regions when required.",
      },
      {
        q: "Do you invoice in GBP?",
        a: "Yes. We can invoice in GBP, per milestone or monthly.",
      },
    ],
    posts: ["gdpr-compliant-ai-assistant", "add-ai-to-existing-crm-erp"],
  },
  {
    slug: "ai-automation-europe",
    service: "ai-engineering",
    title: "AI Engineering for European Companies | Flowmoat",
    metaDescription:
      "AI assistants, RAG and automation for companies in Germany, the Netherlands, Ireland, France and the Nordics. GDPR-aware, EU data residency.",
    eyebrow: "Europe",
    h1: "AI engineering for European companies, with GDPR and EU data residency built in.",
    definition:
      "Flowmoat builds AI assistants, RAG search, AI agents and workflow automation for companies across Europe, including Germany, the Netherlands, Ireland, France and the Nordics. Systems can run entirely in EU cloud regions or on your own servers, are designed around GDPR and the EU AI Act, and are delivered with daily overlap on CET working hours.",
    problems: [
      "Your data has to stay in the EU, which rules out many US-hosted AI tools.",
      "Nobody can say yet what the EU AI Act means for the feature you want to build.",
      "Local AI engineers are hard to hire and expensive to keep.",
      "Teams work across languages, so search and assistants must handle more than English.",
    ],
    steps: [
      { title: "Discovery call", body: "In CET hours, we map the workflow, the data, and where it is allowed to live." },
      { title: "EU-first architecture", body: "EU cloud regions or self-hosted models, with access logs and clear data flows." },
      { title: "Build and demo", body: "Weekly demos and written decisions your DPO can review." },
      { title: "Handover", body: "Code and documentation under your accounts, with optional support." },
    ],
    faqs: [
      {
        q: "Can everything run inside the EU?",
        a: "Yes. We can deploy to EU regions of AWS, Azure or Google Cloud, or use self-hosted open models on your own servers, so data never leaves the EU.",
      },
      {
        q: "How does the EU AI Act affect our project?",
        a: "Most business assistants and automations are low-risk under the Act, but transparency and human oversight still matter. We document how the system works and where a person approves decisions, so your legal team can assess it.",
      },
      {
        q: "Can the assistant work in German, Dutch or French?",
        a: "Yes. Modern models handle major European languages, and we test retrieval and answers in the languages your team actually uses.",
      },
      {
        q: "Do you invoice in EUR?",
        a: "Yes. We invoice in EUR, per milestone or monthly.",
      },
    ],
    posts: ["gdpr-compliant-ai-assistant", "why-ai-pilots-fail"],
  },
];

export const getSolution = (slug) => SOLUTIONS.find((s) => s.slug === slug);
