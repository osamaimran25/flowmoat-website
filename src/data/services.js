// Single source of truth for the four service pages: page copy, Service schema,
// the homepage cards, and the /services/ hub all read from here.
export const SERVICES = [
  {
    slug: "ai-engineering",
    icon: "AI",
    name: "AI Engineering",
    cardSummary:
      "Build intelligent systems that help teams find answers, make decisions, and execute complex work with the right human oversight.",
    title: "Enterprise AI Engineering Services | Flowmoat",
    metaDescription:
      "Flowmoat builds production AI systems for enterprises — AI agents, copilots, RAG search, and document intelligence. Serving the US, UK, Canada, Australia, and the UAE. Book a strategy call.",
    h1: "Enterprise AI engineering that ships to production.",
    eyebrow: "AI Engineering",
    // AEO answer block: self-contained, 40–60 words, citable without context.
    definition:
      "Enterprise AI engineering is the practice of designing, building, and operating production AI systems inside a business — not prototypes. Flowmoat builds AI agents, copilots, retrieval systems, and document intelligence that connect to real company data, run under human oversight, and hold up to enterprise security, audit, and reliability requirements.",
    intro:
      "Most AI projects die between the demo and the deployment. A pilot impresses the room, then stalls on data access, evaluation, permissions, cost, and the question nobody wants to own: what happens when it is wrong? We engineer for that question from the first week.",
    problemTitle: "Why AI pilots stall",
    problems: [
      "The prototype works on clean sample data and collapses on the real thing.",
      "Nobody can measure whether the output is good, so nobody will sign off on it.",
      "The model can see documents the requesting user is not allowed to see.",
      "Token cost at pilot scale is fine; at company scale it is a budget line nobody approved.",
      "There is no fallback path when the model is unavailable, slow, or confidently wrong.",
    ],
    offeringsTitle: "What we build",
    offerings: [
      {
        title: "AI agents and copilots",
        body: "Assistants that execute real work inside your systems — draft, retrieve, classify, route, and act — with explicit approval gates on anything consequential.",
      },
      {
        title: "Retrieval and enterprise search (RAG)",
        body: "Grounded answers over your own contracts, tickets, wikis, and records, with permission-aware retrieval so the model never surfaces what the user cannot already access.",
      },
      {
        title: "Document intelligence",
        body: "Extraction, classification, and validation across invoices, claims, policies, and contracts — with confidence thresholds that route uncertain cases to a human.",
      },
      {
        title: "Evaluation and guardrails",
        body: "Test sets, scoring, regression checks, and monitoring so you can prove the system is working and detect it when it stops.",
      },
    ],
    deliverablesTitle: "What you get",
    deliverables: [
      "A working system in your environment, not a slide deck",
      "An evaluation harness with baselines you can hold us to",
      "Permission-aware data access, documented",
      "Cost-per-task modelling before you scale, not after",
      "Handover documentation and a runbook your team can operate",
    ],
    whoForTitle: "Who this is for",
    whoFor: [
      "Companies with 50–1,000 employees and real operational complexity",
      "Teams sitting on years of documents, tickets, or records nobody can search",
      "Leaders who need AI to survive a security review, not just a demo",
    ],
    faqs: [
      {
        q: "How is AI engineering different from hiring an AI consultant?",
        a: "A consultant produces a strategy and a recommendation. AI engineering produces a running system. Flowmoat writes the code, connects the data, builds the evaluation harness, and hands over software your team can operate.",
      },
      {
        q: "How long does an enterprise AI engineering project take?",
        a: "Most engagements deliver a working system in 6 to 12 weeks. We ship in focused iterations with regular demonstrations rather than disappearing for a quarter and returning with a finished product.",
      },
      {
        q: "Which AI models does Flowmoat build on?",
        a: "We stay model-agnostic and select based on the task, your data-residency requirements, and cost per task. We architect so the model layer can be swapped without rewriting the system around it.",
      },
      {
        q: "How do you prevent an AI system from giving wrong answers?",
        a: "We ground answers in your own data, score outputs against a test set before launch, set confidence thresholds that route uncertain cases to a human, and monitor for regressions after deployment.",
      },
    ],
    related: ["ai-modernization", "workflow-automation"],
  },

  {
    slug: "ai-modernization",
    icon: "MOD",
    name: "AI Modernization",
    cardSummary:
      "Add practical AI capabilities to existing CRMs, ERPs, portals, SaaS products, mobile apps, and legacy systems without forcing a disruptive rebuild.",
    title: "AI Modernization Services for Legacy Systems | Flowmoat",
    metaDescription:
      "Flowmoat adds AI to the systems you already run — CRMs, ERPs, portals, and legacy platforms — without a rebuild. AI modernization for the US, UK, Canada, Australia, and the UAE.",
    h1: "Add AI to the systems you already run.",
    eyebrow: "AI Modernization",
    definition:
      "AI modernization is the process of adding AI capabilities to software a business already depends on, instead of replacing it. Flowmoat layers AI onto existing CRMs, ERPs, portals, and legacy platforms through their data and APIs — so teams gain intelligent search, drafting, and automation without a migration or a rewrite.",
    intro:
      "The system everyone complains about is usually the system everyone depends on. It holds a decade of data and a hundred undocumented rules the business actually runs on. Replacing it is an 18-month bet. Modernizing it is a 10-week one.",
    problemTitle: "The rebuild trap",
    problems: [
      "A full rebuild costs more, takes longer, and stalls the roadmap while it happens.",
      "The legacy system encodes business rules nobody has written down — and a rewrite loses them.",
      "Your team already knows the current tool; retraining everyone is a hidden cost nobody budgets.",
      "Every month of a rebuild is a month of no new capability for the business.",
    ],
    offeringsTitle: "What we build",
    offerings: [
      {
        title: "AI layers over existing platforms",
        body: "Intelligent search, summarisation, drafting, and next-best-action inside the CRM, ERP, or portal your team already opens every morning.",
      },
      {
        title: "Legacy data unlocking",
        body: "Make years of records, PDFs, and free-text notes queryable — without migrating the database that produced them.",
      },
      {
        title: "Integration and API layers",
        body: "When a legacy system has no usable API, we build the interface layer that lets modern software talk to it safely.",
      },
      {
        title: "Incremental replacement (strangler pattern)",
        body: "Where a component genuinely must be replaced, we peel it off and rebuild it in isolation while the rest of the system keeps running.",
      },
    ],
    deliverablesTitle: "What you get",
    deliverables: [
      "A modernization plan sequenced by business value, not technical tidiness",
      "AI capability shipped into the tools your team already uses",
      "No migration, no retraining programme, no roadmap freeze",
      "A documented integration layer you own",
      "A clear map of what is worth replacing later — and what never is",
    ],
    whoForTitle: "Who this is for",
    whoFor: [
      "Companies running a business-critical system that is 5–20 years old",
      "Teams that have been quoted a rebuild and want to check the alternative first",
      "Operations leaders who need capability this quarter, not next year",
    ],
    faqs: [
      {
        q: "Can you add AI to our system without replacing it?",
        a: "Usually, yes. If a system holds data and exposes it through an API, a database, or even scheduled exports, we can build an AI layer on top of it. A full replacement is a last resort, not a starting assumption.",
      },
      {
        q: "What if our legacy system has no API?",
        a: "We build the integration layer. Depending on the platform that means a database read replica, a file-drop interface, or a service wrapper — enough to let modern software work with it safely without touching the original code.",
      },
      {
        q: "Is AI modernization cheaper than rebuilding?",
        a: "Almost always, and it is dramatically faster to show value. Modernization projects typically deliver working capability in 6 to 12 weeks, where a rebuild delivers nothing usable for months.",
      },
      {
        q: "Will this break the system we depend on?",
        a: "We work alongside your system rather than inside it wherever possible — reading data, not rewriting it. Anything that does touch the core is staged, reviewed, and reversible.",
      },
    ],
    related: ["ai-engineering", "enterprise-software-development"],
  },

  {
    slug: "enterprise-software-development",
    icon: "ENT",
    name: "Enterprise Software Development",
    cardSummary:
      "Design and build custom SaaS, internal platforms, business portals, dashboards, back-office systems, and administration software.",
    title: "Enterprise Software Development Company | Flowmoat",
    metaDescription:
      "Flowmoat designs and builds custom enterprise software — SaaS platforms, internal tools, business portals, and back-office systems for companies in the US, UK, Canada, Australia, and the UAE.",
    h1: "Custom enterprise software, built by a team that ships its own products.",
    eyebrow: "Enterprise Software Development",
    definition:
      "Enterprise software development is the design and delivery of custom software for a specific organisation's operations — internal platforms, business portals, back-office systems, and SaaS products. Flowmoat builds these systems end to end, from product definition through architecture, delivery, and rollout, for companies of 50 to 1,000 employees.",
    intro:
      "Off-the-shelf software makes your business run like everyone else's. Sometimes that is exactly right. But when the thing you do differently is the thing you compete on, encoding it in a spreadsheet and three SaaS subscriptions is a tax you pay every day.",
    problemTitle: "When custom software is the right call",
    problems: [
      "Your core workflow lives in spreadsheets that one person understands.",
      "You pay for four SaaS tools and still export CSVs between them by hand.",
      "The process that makes you competitive cannot be bought off the shelf.",
      "You are scaling headcount to absorb work that software should be doing.",
    ],
    offeringsTitle: "What we build",
    offerings: [
      {
        title: "Internal platforms and back-office systems",
        body: "The operational spine of the business — the system your team actually works in all day, built around how you really operate.",
      },
      {
        title: "Customer and partner portals",
        body: "Self-service surfaces that take work off your team and give clients real-time visibility instead of an email thread.",
      },
      {
        title: "Custom SaaS products",
        body: "We build and operate our own SaaS — RegRely and GreenOH — which means we design for multi-tenancy, billing, and onboarding from experience, not theory.",
      },
      {
        title: "Dashboards and decision systems",
        body: "Reporting that answers the question a leader is actually asking, connected to live data rather than a monthly export.",
      },
    ],
    deliverablesTitle: "What you get",
    deliverables: [
      "A product definition before a line of code — scope, users, success criteria",
      "Working software in focused iterations, demonstrated regularly",
      "Architecture documented well enough for another team to take over",
      "Source code and infrastructure you own outright",
      "Rollout support, not a handover email",
    ],
    whoForTitle: "Who this is for",
    whoFor: [
      "Companies whose core operations have outgrown spreadsheets and generic SaaS",
      "Founders and CTOs who need a delivery partner, not a staffing agency",
      "Teams with a clear business outcome and no internal capacity to build for it",
    ],
    faqs: [
      {
        q: "Why build custom software instead of buying a SaaS product?",
        a: "Buy when the process is standard and someone else has already solved it well. Build when the process is the thing that makes you competitive — because at that point off-the-shelf software forces you to work like your competitors.",
      },
      {
        q: "Do we own the code Flowmoat writes?",
        a: "Yes. You own the source code, the repositories, and the infrastructure outright. We document the architecture so another team could take it over without us.",
      },
      {
        q: "What does an enterprise software project cost?",
        a: "Most engagements fall between $10,000 and $100,000+, depending on scope, integrations, and compliance requirements. We scope and price the first phase before you commit to the rest.",
      },
      {
        q: "How do you avoid the classic agency problem of delivering the wrong thing?",
        a: "We define the business outcome and success criteria before we architect, then demonstrate working software on a regular cadence. If we are drifting, you see it in week three, not month six.",
      },
    ],
    related: ["ai-modernization", "workflow-automation"],
  },

  {
    slug: "workflow-automation",
    icon: "AUT",
    name: "Workflow Automation",
    cardSummary:
      "Connect people, systems, and data through business process automation, API integrations, n8n, Make, and custom Python workflows.",
    title: "Business Workflow Automation Services | Flowmoat",
    metaDescription:
      "Flowmoat automates business processes end to end — API integrations, approval flows, data sync, and custom workflow engineering for companies in the US, UK, Canada, Australia, and the UAE.",
    h1: "Automate the work your team should not be doing by hand.",
    eyebrow: "Workflow Automation",
    definition:
      "Workflow automation is the engineering of business processes so they run without manual handoffs — connecting systems, routing approvals, syncing data, and triggering actions automatically. Flowmoat builds these workflows with API integrations, tools like n8n and Make, and custom code where off-the-shelf automation cannot reach.",
    intro:
      "Every company has a process that runs on someone copying data from one screen into another. It works, until that person is on leave. Automation is not about cutting headcount — it is about not spending your team's judgement on clerical work.",
    problemTitle: "The manual-handoff tax",
    problems: [
      "Data is rekeyed between systems that were never connected.",
      "Approvals live in inboxes, so nobody knows what is blocked or where.",
      "Reports are assembled by hand every week and are stale by the time they land.",
      "Onboarding a customer takes eleven steps across five tools and one memory.",
      "The process only works because one experienced person remembers all of it.",
    ],
    offeringsTitle: "What we build",
    offerings: [
      {
        title: "Process automation",
        body: "End-to-end flows — intake, routing, approval, fulfilment, notification — running reliably without anyone chasing them.",
      },
      {
        title: "API and system integration",
        body: "Make your CRM, ERP, billing, support, and internal tools exchange data automatically, in the right direction, with conflict handling that does not corrupt records.",
      },
      {
        title: "AI-assisted workflows",
        body: "Where a step needs judgement — classify this ticket, extract this field, draft this reply — we put AI in the loop with a human approving the consequential moves.",
      },
      {
        title: "Automation platforms and custom engineering",
        body: "n8n, Make, and Zapier where they fit; custom Python services where they do not. We do not force a business process through a tool that cannot hold it.",
      },
    ],
    deliverablesTitle: "What you get",
    deliverables: [
      "A mapped process — the real one, not the one in the handbook",
      "Working automations with error handling, retries, and alerting",
      "Monitoring so a silent failure does not become a silent data loss",
      "Documentation your team can maintain and extend",
      "Time-saved measurement against the baseline we captured first",
    ],
    whoForTitle: "Who this is for",
    whoFor: [
      "Operations leaders whose teams spend hours a week on copy-paste work",
      "Companies where growth means hiring more people to do the same manual steps",
      "Teams running critical processes that depend on one person's memory",
    ],
    faqs: [
      {
        q: "What business processes are worth automating first?",
        a: "The ones that are high-volume, rule-based, and repeated — data entry between systems, approval routing, customer onboarding steps, and recurring reporting. We measure the current time cost before we automate so the saving is provable.",
      },
      {
        q: "Should we use n8n, Make, or custom code?",
        a: "Use a platform when the workflow fits its model — it is faster to build and easier for your team to change. Use custom code when the logic, volume, or integration depth exceeds what the platform can hold. Most real systems end up using both.",
      },
      {
        q: "How quickly does workflow automation pay for itself?",
        a: "For high-volume manual processes, typically within the first year. We capture the baseline hours before building so the return is measured against a real number rather than an estimate.",
      },
      {
        q: "What happens when an automation fails?",
        a: "Every workflow we build has explicit error handling, retries, and alerting. A failure surfaces immediately to a named owner rather than quietly dropping records until someone notices months later.",
      },
    ],
    related: ["ai-engineering", "enterprise-software-development"],
  },
];

export const getService = (slug) => SERVICES.find((s) => s.slug === slug);
