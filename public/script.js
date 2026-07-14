const SITE_CONFIG = {
  brandName: "Flowmoat",
  // Free email delivery via FormSubmit (no signup, no API key).
  // Submissions are emailed here. The FIRST submission triggers a one-time
  // activation email to this inbox — click the link in it once, then every
  // future submission (form + AI chat lead) lands straight in your inbox.
  contactEmail: "osamaimran25@gmail.com",
};

// Sends a GA4 event. No-ops safely if analytics is blocked or not yet loaded.
function track(eventName, params = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

const selectors = {
  header: "[data-header]",
  navToggle: "[data-nav-toggle]",
  navMenu: "[data-nav-menu]",
  navLinks: ".nav-link",
  brandTargets: "[data-brand]",
  faqItem: ".faq-item",
  faqQuestion: ".faq-question",
  reveal: ".reveal",
  contactForm: "#contactForm",
  contactCtas: ".js-contact-cta",
  mouseGlow: "[data-mouse-glow]",
  liveLog: "[data-live-log]",
  serviceCards: ".service-card",
};

const header = document.querySelector(selectors.header);
const navToggle = document.querySelector(selectors.navToggle);
const navMenu = document.querySelector(selectors.navMenu);
const navLinks = Array.from(document.querySelectorAll(selectors.navLinks));
const contactForm = document.querySelector(selectors.contactForm);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobilePerformanceMode = window.matchMedia("(max-width: 820px), (pointer: coarse)").matches;

function applyBranding() {
  document.querySelectorAll(selectors.brandTargets).forEach((target) => {
    target.textContent = SITE_CONFIG.brandName;
  });
}

function closeMobileMenu() {
  if (!navMenu || !navToggle) return;

  navMenu.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
  document.body.classList.remove("nav-open");
}

function setupMobileNavigation() {
  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
}

function setupHeaderState() {
  let rafId = null;

  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 18);
    rafId = null;
  };

  updateHeader();
  window.addEventListener("scroll", () => {
    if (!rafId) rafId = window.requestAnimationFrame(updateHeader);
  }, { passive: true });
}

function setupExperienceBackground() {
  const glow = document.querySelector(selectors.mouseGlow);
  if (!glow || reducedMotion || mobilePerformanceMode) return;

  let rafId = null;
  let pendingX = window.innerWidth * 0.5;
  let pendingY = window.innerHeight * 0.35;

  const updateGlow = () => {
    glow.style.setProperty("--mouse-x", `${pendingX}px`);
    glow.style.setProperty("--mouse-y", `${pendingY}px`);
    rafId = null;
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      pendingX = event.clientX;
      pendingY = event.clientY;
      if (!rafId) rafId = window.requestAnimationFrame(updateGlow);
    },
    { passive: true }
  );
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", targetId);
    });
  });

  document.querySelectorAll(selectors.contactCtas).forEach((button) => {
    button.addEventListener("click", () => {
      const firstInput = document.querySelector("#name");
      window.setTimeout(() => firstInput?.focus({ preventScroll: true }), 650);
    });
  });

  // Delegated so CTAs injected later (e.g. the finder result) are tracked too.
  document.addEventListener("click", (event) => {
    const cta = event.target.closest(selectors.contactCtas);
    if (!cta) return;
    track("cta_click", {
      cta_text: cta.textContent.trim().slice(0, 60),
      section: cta.closest("section")?.id || "unknown",
    });
  });
}

function setupFaqAccordion() {
  document.querySelectorAll(selectors.faqQuestion).forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(selectors.faqItem);
      const answer = item?.querySelector(".faq-answer");
      if (!item || !answer) return;

      const isOpening = !item.classList.contains("open");

      document.querySelectorAll(selectors.faqItem).forEach((faq) => {
        faq.classList.remove("open");
        const faqButton = faq.querySelector(selectors.faqQuestion);
        const faqAnswer = faq.querySelector(".faq-answer");
        faqButton?.setAttribute("aria-expanded", "false");
        if (faqAnswer) faqAnswer.style.maxHeight = "0px";
      });

      if (isOpening) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

function setupScrollReveal() {
  const revealElements = document.querySelectorAll(selectors.reveal);
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

function setupParallaxReveal() {
  if (reducedMotion || mobilePerformanceMode) return;

  const parallaxTargets = document.querySelectorAll(".workflow-canvas, .cta-panel, .result-card");
  let rafId = null;

  const update = () => {
    const viewportCenter = window.innerHeight / 2;
    parallaxTargets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      const distance = rect.top + rect.height / 2 - viewportCenter;
      const offset = Math.max(-18, Math.min(18, distance * -0.025));
      target.style.setProperty("--parallax-y", `${offset}px`);
    });
    rafId = null;
  };

  const requestUpdate = () => {
    if (!rafId) rafId = window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

function setupLiveWorkflow() {
  const log = document.querySelector(selectors.liveLog);
  const aiStatus = document.querySelector("[data-ai-status]");
  const nodes = Array.from(document.querySelectorAll(".workflow-node"));

  if (!log || reducedMotion || mobilePerformanceMode) return;

  const statuses = [
    "Reading context...",
    "Routing model...",
    "Querying knowledge...",
    "Calling secure API...",
    "Syncing system state...",
    "Generating insight...",
  ];

  const events = [
    "Agent retrieved enterprise context",
    "RAG search returned verified source data",
    "API workflow executed successfully",
    "AI insight delivered to dashboard",
    "Mobile assistant state synchronized",
    "ERP approval workflow updated",
    "Cloud function completed orchestration",
    "Policy guardrail validated request",
  ];

  let tick = 0;
  window.setInterval(() => {
    if (document.hidden) return;

    tick += 1;
    const time = new Date().toLocaleTimeString([], { hour12: false });
    const item = document.createElement("li");
    item.innerHTML = `<span>${time}</span> ${events[tick % events.length]}`;
    log.prepend(item);

    while (log.children.length > 4) {
      log.lastElementChild?.remove();
    }

    aiStatus.textContent = statuses[tick % statuses.length];
    nodes.forEach((node, index) => {
      node.classList.toggle("is-active", index === tick % nodes.length);
      node.classList.toggle("is-success", index === (tick + nodes.length - 1) % nodes.length);
    });
  }, 1800);
}

function injectServicePreviews() {
  if (mobilePerformanceMode) return;

  const cards = document.querySelectorAll(selectors.serviceCards);

  cards.forEach((card, index) => {
    if (card.querySelector(".mini-workflow")) return;

    const preview = document.createElement("div");
    preview.className = "mini-workflow";
    preview.setAttribute("aria-hidden", "true");
    preview.innerHTML = `
      <span></span>
      <i></i>
      <span></span>
      <i></i>
      <span></span>
      <b style="--delay:${index * 0.15}s"></b>
    `;

    const icon = card.querySelector(".service-icon");
    icon?.after(preview);
  });
}

function removeMobileMotionArtifacts() {
  if (!mobilePerformanceMode) return;

  document.querySelectorAll(".data-packet, .thinking-dots").forEach((element) => element.remove());
}

function setupActiveNavigation() {
  const sectionIds = navLinks
    .map((link) => link.getAttribute("href"))
    .filter((href) => href?.startsWith("#"))
    .map((href) => href.slice(1));

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    {
      threshold: 0.28,
      rootMargin: "-28% 0px -52% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function setFieldError(field, message) {
  const row = field.closest(".form-row");
  const error = row?.querySelector(".error-message");

  row?.classList.toggle("invalid", Boolean(message));
  if (error) error.textContent = message;
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function validateContactForm() {
  if (!contactForm) return false;

  const name = contactForm.elements.name;
  const email = contactForm.elements.email;
  const company = contactForm.elements.company;
  const budget = contactForm.elements.budget;
  const automation = contactForm.elements.automation;

  let isValid = true;

  if (name.value.trim().length < 2) {
    setFieldError(name, "Enter your name.");
    isValid = false;
  } else {
    setFieldError(name, "");
  }

  if (!validateEmail(email.value.trim())) {
    setFieldError(email, "Enter a valid business email address.");
    isValid = false;
  } else {
    setFieldError(email, "");
  }

  if (company.value.trim().length < 2) {
    setFieldError(company, "Enter your company name.");
    isValid = false;
  } else {
    setFieldError(company, "");
  }

  if (!budget.value) {
    setFieldError(budget, "Select a budget range.");
    isValid = false;
  } else {
    setFieldError(budget, "");
  }

  if (automation.value.trim().length < 20) {
    setFieldError(automation, "Share at least 20 characters about what you want to build or make AI-powered.");
    isValid = false;
  } else {
    setFieldError(automation, "");
  }

  return isValid;
}

function setupContactForm() {
  if (!contactForm) return;

  const successMessage = contactForm.querySelector(".form-success");
  const fields = Array.from(contactForm.querySelectorAll("input, select, textarea"));

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      if (field.closest(".form-row")?.classList.contains("invalid")) {
        validateContactForm();
      }
      if (successMessage) successMessage.textContent = "";
    });
  });

  const submitButton = contactForm.querySelector(".form-submit");

  const resetSubmitButton = () => {
    if (!submitButton) return;
    submitButton.disabled = false;
    submitButton.textContent = "Discuss My Project";
  };

  if (new URLSearchParams(window.location.search).get("submitted") === "1") {
    if (successMessage) {
      successMessage.classList.remove("is-error");
      successMessage.textContent = "Thanks. Your verified project brief was sent — we'll reply by email shortly.";
    }
    // The delivered brief — not the button click — is the real conversion.
    track("generate_lead", { method: "contact_form" });
    history.replaceState(null, "", `${window.location.pathname}#contact`);
  }

  window.addEventListener("pageshow", resetSubmitButton);

  contactForm.addEventListener("submit", (event) => {
    if (!validateContactForm()) {
      event.preventDefault();
      const firstInvalid = contactForm.querySelector(".form-row.invalid input, .form-row.invalid select, .form-row.invalid textarea");
      firstInvalid?.focus();
      return;
    }

    if (successMessage) {
      successMessage.classList.remove("is-error");
      successMessage.textContent = "";
    }

    // Passed validation and is leaving for the verification step. Pairing this
    // with generate_lead shows how many briefs are lost at the captcha.
    track("contact_form_submit", {
      budget: contactForm.querySelector("#budget")?.value || "unspecified",
    });

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Continue to verification...";
    }
  });
}

function setupAiAssistant() {
  const brand = SITE_CONFIG.brandName;

  const logoSvg = `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="fmChatGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#54d7ff" />
          <stop offset="55%" stop-color="#76f0b1" />
          <stop offset="100%" stop-color="#ffd166" />
        </linearGradient>
      </defs>
      <path d="M26.4 10A12 12 0 1 0 26.4 22" fill="none" stroke="url(#fmChatGradient)" stroke-width="2.2" stroke-linecap="round" />
      <path d="M8 21C13 21 13 11 18 11C23 11 22 16 28 16" fill="none" stroke="url(#fmChatGradient)" stroke-width="2.4" stroke-linecap="round" />
      <circle cx="8" cy="21" r="2.1" fill="#54d7ff" />
      <circle cx="18" cy="11" r="1.9" fill="#76f0b1" />
      <circle cx="28" cy="16" r="2.1" fill="#ffd166" />
    </svg>`;

  const widget = document.createElement("div");
  widget.className = "fm-assistant";
  widget.innerHTML = `
    <button class="fm-launcher" type="button" aria-label="Chat with the ${brand} AI assistant" data-fm-launcher>
      <span class="fm-launcher-icon">${logoSvg}</span>
      <span class="fm-launcher-text">Ask ${brand} AI</span>
      <span class="fm-launcher-ping" aria-hidden="true"></span>
    </button>
    <section class="fm-chat" aria-label="${brand} AI assistant" data-fm-chat hidden>
      <header class="fm-chat-head">
        <span class="fm-avatar">${logoSvg}</span>
        <div class="fm-chat-id">
          <strong>${brand} AI</strong>
          <span class="fm-status"><i></i> Online · replies instantly</span>
        </div>
        <button class="fm-chat-close" type="button" aria-label="Close chat" data-fm-close>&times;</button>
      </header>
      <div class="fm-messages" data-fm-messages aria-live="polite"></div>
      <div class="fm-quick" data-fm-quick></div>
      <form class="fm-input" data-fm-form>
        <input type="text" placeholder="Type your message..." autocomplete="off" aria-label="Message" data-fm-text />
        <button type="submit" aria-label="Send message">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M3 11.5 21 3l-8.5 18-2.2-7.3L3 11.5Z"/></svg>
        </button>
      </form>
    </section>`;
  document.body.appendChild(widget);

  const launcher = widget.querySelector("[data-fm-launcher]");
  const chat = widget.querySelector("[data-fm-chat]");
  const closeBtn = widget.querySelector("[data-fm-close]");
  const messages = widget.querySelector("[data-fm-messages]");
  const quickWrap = widget.querySelector("[data-fm-quick]");
  const form = widget.querySelector("[data-fm-form]");
  const textInput = widget.querySelector("[data-fm-text]");

  const state = { started: false, capture: null, lead: {} };

  const knowledge = [
    {
      keywords: ["service", "services", "offer", "do you do", "what do you", "kya karte", "kaam"],
      reply: `We help growing companies modernize operations through AI engineering, AI modernization, enterprise software development, and workflow automation. Which business outcome are you working toward?`,
      quick: ["AI engineering", "Modernization", "Enterprise software", "Strategy call"],
    },
    {
      keywords: ["agent", "copilot", "chatbot", "rag", "assistant", "llm", "gpt", "claude"],
      reply: `Yes — we build AI agents, copilots, RAG search and multi-agent systems that plug into your tools and act on real data (not just chat). Want to tell us what it should automate?`,
      quick: ["Strategy call", "Enterprise software", "Automation"],
    },
    {
      keywords: ["automat", "workflow", "n8n", "zapier", "make", "process", "integrate", "integration"],
      reply: `We automate the repetitive workflows — lead handling, follow-ups, data entry, reporting, approvals — using n8n, Make, Zapier or custom code wired into your stack. What's eating most of your team's time?`,
      quick: ["Strategy call", "AI engineering", "Modernization"],
    },
    {
      keywords: ["web", "website", "app", "mobile", "saas", "platform", "dashboard", "portal", "software"],
      reply: `We build custom SaaS products, internal platforms, business portals, dashboards, and back-office systems—and can introduce AI into software you already run. What are you trying to improve or build?`,
      quick: ["Strategy call", "AI engineering", "Modernization"],
    },
    {
      keywords: ["price", "pricing", "cost", "budget", "rate", "charge", "kitna", "paisa", "quote", "how much"],
      reply: `Every engagement is scoped around the business outcome, system complexity, integrations, and delivery requirements. Share a short project brief and our team can recommend the right next step.`,
      quick: ["Discuss my project", "Strategy call", "Services"],
    },
    {
      keywords: ["time", "long", "timeline", "deadline", "how fast", "kitne din", "duration"],
      reply: `Timelines depend on scope, data readiness, integrations, governance, and testing requirements. We normally define a phased roadmap during discovery. Shall I take your project details?`,
      quick: ["Discuss my project", "Strategy call"],
    },
    {
      keywords: ["secure", "security", "data", "privacy", "compliance", "safe"],
      reply: `Security is designed in from day one — least-privilege access, careful data handling, auditability and your compliance needs. Happy to go deeper on a call.`,
      quick: ["Strategy call", "Services"],
    },
    {
      keywords: ["who", "about", "company", "experience", "trust", "kaun"],
      reply: `${brand} is an enterprise AI engineering company that turns business goals into production-ready software—through strategy, architecture, delivery, integration, and long-term support.`,
      quick: ["Strategy call", "Services", "Products"],
    },
    {
      keywords: ["hi", "hello", "hey", "salam", "assalam", "hola", "yo"],
      reply: `Hi! 👋 I'm the ${brand} AI assistant. I can explain our services, products, delivery approach, or help you discuss an AI roadmap. What brings you here?`,
      quick: ["Services", "Products", "AI engineering", "Strategy call"],
    },
    {
      keywords: ["thank", "thanks", "shukria", "great", "ok", "cool"],
      reply: `Anytime! If you'd like, I can take a few details and a human will follow up by email.`,
      quick: ["Strategy call", "Discuss my project"],
    },
  ];

  const leadTriggers = ["book", "call", "roadmap", "discuss my project", "start", "contact", "talk", "human", "demo", "consult", "strategy"];

  const fallbackReply = {
    reply: `Good question — I'll make sure a specialist covers that. Meanwhile I can take a few quick details so our team can reply by email. Want to do that?`,
    quick: ["Strategy call", "Services", "Products"],
  };

  function scrollToEnd() {
    messages.scrollTop = messages.scrollHeight;
  }

  function addMessage(text, who) {
    const bubble = document.createElement("div");
    bubble.className = `fm-msg fm-msg-${who}`;
    bubble.innerHTML = text;
    messages.appendChild(bubble);
    scrollToEnd();
    return bubble;
  }

  function setQuickReplies(options) {
    quickWrap.innerHTML = "";
    (options || []).forEach((label) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "fm-chip";
      chip.textContent = label;
      chip.addEventListener("click", () => handleUserInput(label));
      quickWrap.appendChild(chip);
    });
  }

  function botSay(text, quick, delay = 600) {
    setQuickReplies([]);
    const typing = document.createElement("div");
    typing.className = "fm-msg fm-msg-bot fm-typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    messages.appendChild(typing);
    scrollToEnd();

    const wait = reducedMotion ? 0 : delay;
    window.setTimeout(() => {
      typing.remove();
      addMessage(text, "bot");
      setQuickReplies(quick);
    }, wait);
  }

  function matchIntent(text) {
    const value = text.toLowerCase();
    return knowledge.find((entry) => entry.keywords.some((kw) => value.includes(kw)));
  }

  function isLeadTrigger(text) {
    const value = text.toLowerCase();
    return leadTriggers.some((kw) => value.includes(kw));
  }

  function startLeadCapture() {
    state.capture = null;
    botSay(`Use the protected project form below. It includes a real “I'm not a robot” check before anything is delivered.`, ["Services", "Products"]);
    document.querySelector("#contact")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => document.querySelector("#name")?.focus({ preventScroll: true }), 650);
  }

  function handleUserInput(rawText) {
    const text = (rawText || "").trim();
    if (!text) return;

    addMessage(escapeHtml(text), "user");
    textInput.value = "";

    if (isLeadTrigger(text)) {
      startLeadCapture();
      return;
    }

    const intent = matchIntent(text);
    if (intent) {
      botSay(intent.reply, intent.quick);
    } else {
      botSay(fallbackReply.reply, fallbackReply.quick);
    }
  }

  function openChat() {
    chat.hidden = false;
    widget.classList.add("is-open");
    window.requestAnimationFrame(() => widget.classList.add("is-visible"));
    textInput.focus({ preventScroll: true });

    if (!state.started) {
      state.started = true;
      botSay(
        `Hi! 👋 I'm the ${brand} AI assistant. Ask me about our services, products, or delivery approach—or discuss the AI roadmap you are working on.`,
        ["Services", "Products", "AI engineering", "Strategy call"],
        300
      );
    }
  }

  function closeChat() {
    widget.classList.remove("is-visible");
    window.setTimeout(() => {
      chat.hidden = true;
      widget.classList.remove("is-open");
    }, 180);
  }

  launcher.addEventListener("click", () => (widget.classList.contains("is-open") ? closeChat() : openChat()));
  closeBtn.addEventListener("click", closeChat);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleUserInput(textInput.value);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && widget.classList.contains("is-open")) closeChat();
  });
}

function setupOpportunityFinder() {
  const input = document.querySelector("#finderInput");
  const runBtn = document.querySelector("#finderRun");
  const output = document.querySelector("[data-finder-output]");
  const scan = document.querySelector("[data-finder-scan]");
  const status = document.querySelector("[data-finder-status]");
  const results = document.querySelector("[data-finder-results]");
  const exampleChips = document.querySelectorAll("[data-finder-examples] .finder-chip");

  if (!input || !runBtn || !output || !results) return;

  const SOLUTIONS = [
    {
      keywords: ["lead", "sales", "crm", "prospect", "deal", "pipeline", "follow up", "follow-up", "followup", "inquir", "enquir"],
      title: "AI Lead-Response Agent",
      desc: "Instantly qualifies and replies to every new lead, books meetings, and logs everything in your CRM — 24/7.",
      hours: 9,
      tag: "Sales",
    },
    {
      keywords: ["support", "customer", "ticket", "complaint", "chat", "help desk", "helpdesk", "query", "faq", "service"],
      title: "AI Support Copilot",
      desc: "Deflects repetitive questions, drafts accurate replies from your docs, and escalates only what truly needs a human.",
      hours: 12,
      tag: "Support",
    },
    {
      keywords: ["invoice", "document", "pdf", "data entry", "extract", "report", "paperwork", "form", "contract", "scan"],
      title: "Document Intelligence Agent",
      desc: "Reads invoices, contracts and PDFs, extracts the data you need, and files it into your systems automatically.",
      hours: 10,
      tag: "Operations",
    },
    {
      keywords: ["hir", "recruit", "resume", "cv", "candidate", "interview", "screening", "applicant"],
      title: "AI Screening Agent",
      desc: "Screens resumes against your criteria, shortlists candidates, and drafts personalized outreach in minutes.",
      hours: 8,
      tag: "HR",
    },
    {
      keywords: ["email", "outreach", "newsletter", "campaign", "cold", "reply"],
      title: "Automated Outreach Engine",
      desc: "Personalizes and sequences follow-ups at scale, so no lead or contact ever slips through the cracks.",
      hours: 6,
      tag: "Growth",
    },
    {
      keywords: ["schedul", "appointment", "booking", "calendar", "reminder", "reschedul"],
      title: "AI Scheduling Assistant",
      desc: "Handles bookings, reminders and rescheduling over chat or email — zero back-and-forth for your team.",
      hours: 5,
      tag: "Operations",
    },
    {
      keywords: ["finance", "account", "expense", "bookkeep", "payroll", "tax", "reconcil", "billing"],
      title: "Finance Automation Agent",
      desc: "Categorizes expenses, reconciles records, and flags anomalies — turning hours of finance admin into minutes.",
      hours: 8,
      tag: "Finance",
    },
    {
      keywords: ["ecommerce", "e-commerce", "order", "inventory", "shopify", "store", "product", "shipment", "return"],
      title: "E-commerce Ops Automation",
      desc: "Syncs orders, updates inventory, answers buyer questions, and automates returns across your stack.",
      hours: 7,
      tag: "E-commerce",
    },
    {
      keywords: ["content", "marketing", "social", "blog", "post", "copy", "seo", "writing"],
      title: "AI Content Engine",
      desc: "Drafts on-brand content, repurposes it across channels, and schedules it — keeping your pipeline always full.",
      hours: 6,
      tag: "Marketing",
    },
    {
      keywords: ["approval", "workflow", "process", "internal", "ops", "operation", "manual", "repetit", "admin", "spreadsheet", "excel"],
      title: "Custom Workflow Agent",
      desc: "Connects your tools and runs multi-step internal processes end-to-end, with humans approving only key decisions.",
      hours: 7,
      tag: "Automation",
    },
  ];

  const DEFAULTS = ["Custom Workflow Agent", "AI Lead-Response Agent", "Document Intelligence Agent"];

  function pickSolutions(text) {
    const value = text.toLowerCase();
    const scored = SOLUTIONS.map((sol) => ({
      sol,
      score: sol.keywords.reduce((acc, kw) => (value.includes(kw) ? acc + 1 : acc), 0),
    })).filter((entry) => entry.score > 0);

    scored.sort((a, b) => b.score - a.score);

    let chosen = scored.slice(0, 3).map((entry) => entry.sol);
    if (chosen.length === 0) {
      chosen = DEFAULTS.map((title) => SOLUTIONS.find((s) => s.title === title)).filter(Boolean);
    }
    return chosen;
  }

  function renderResults(chosen) {
    const cards = chosen
      .map(
        (s, i) => `
        <article class="finder-result" style="--i:${i}">
          <div class="finder-result-top">
            <span class="finder-result-tag">${s.tag}</span>
            <span class="finder-result-hours">Opportunity area</span>
          </div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          <button type="button" class="finder-build" data-build="${escapeHtml(s.title)}">Build this →</button>
        </article>`
      )
      .join("");

    results.innerHTML = `
      <div class="finder-summary">
        <div>
          <strong>${chosen.length}</strong>
          <span>opportunities mapped</span>
        </div>
        <div>
          <strong>Business</strong>
          <span>outcome first</span>
        </div>
        <div>
          <strong>Human</strong>
          <span>control built in</span>
        </div>
      </div>
      <div class="finder-cards">${cards}</div>
      <p class="finder-cta-line">Ready to prioritize the strongest opportunity?
        <a href="#contact" class="js-contact-cta finder-cta-link">Discuss your AI roadmap →</a>
      </p>`;

    results.querySelectorAll("[data-build]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const want = btn.getAttribute("data-build");
        track("finder_opportunity_selected", { opportunity: want });
        const automation = document.querySelector("#automation");
        const contact = document.querySelector("#contact");
        if (automation) {
          automation.value = `I'm interested in: ${want}. ` + (input.value.trim() ? `Context: ${input.value.trim()}` : "");
        }
        contact?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
        window.setTimeout(() => document.querySelector("#name")?.focus({ preventScroll: true }), 650);
      });
    });
  }

  function runAnalysis() {
    const text = input.value.trim();
    if (text.length < 3) {
      input.focus();
      input.classList.add("finder-shake");
      window.setTimeout(() => input.classList.remove("finder-shake"), 500);
      return;
    }

    output.hidden = false;
    scan.style.display = "flex";
    results.innerHTML = "";
    runBtn.disabled = true;

    const chosen = pickSolutions(text);

    // High-intent: someone described a real workflow. Track which opportunity
    // areas resonate, but never the free-text itself — that is the visitor's.
    track("finder_run", {
      opportunities: chosen.map((s) => s.title).join(", "),
    });
    const steps = ["Analyzing your workflow...", "Mapping AI opportunities...", "Estimating impact...", "Ready."];
    let step = 0;

    const advance = () => {
      if (status) status.textContent = steps[step];
      step += 1;
      if (step < steps.length) {
        window.setTimeout(advance, reducedMotion ? 0 : 450);
      } else {
        scan.style.display = "none";
        renderResults(chosen);
        runBtn.disabled = false;
        output.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
      }
    };
    advance();
  }

  runBtn.addEventListener("click", runAnalysis);
  input.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") runAnalysis();
  });
  exampleChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      input.value = chip.textContent.trim();
      runAnalysis();
    });
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

applyBranding();
removeMobileMotionArtifacts();
injectServicePreviews();
setupMobileNavigation();
setupHeaderState();
setupExperienceBackground();
setupSmoothScrolling();
setupFaqAccordion();
setupScrollReveal();
setupParallaxReveal();
setupActiveNavigation();
setupContactForm();
setupLiveWorkflow();
setupAiAssistant();
setupOpportunityFinder();
