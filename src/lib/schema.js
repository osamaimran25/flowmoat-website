import { SITE } from "../data/site.js";

export const faqSchema = (faqs, path) => ({
  "@type": "FAQPage",
  "@id": `${SITE.url}${path}#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
});

export const serviceSchema = (service) => ({
  "@type": "Service",
  "@id": `${SITE.url}/services/${service.slug}/#service`,
  name: service.name,
  serviceType: service.name,
  description: service.definition,
  url: `${SITE.url}/services/${service.slug}/`,
  provider: { "@id": `${SITE.url}/#organization` },
  areaServed: SITE.countries.map((name) => ({ "@type": "Country", name })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `${service.name} offerings`,
    itemListElement: service.offerings.map((offering) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: offering.title, description: offering.body },
    })),
  },
});

export const breadcrumbSchema = (crumbs, path) => ({
  "@type": "BreadcrumbList",
  "@id": `${SITE.url}${path}#breadcrumb`,
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: `${SITE.url}${crumb.path}`,
  })),
});

export const PRODUCTS = [
  {
    "@type": "SoftwareApplication",
    "@id": `${SITE.url}/#regrely`,
    name: "RegRely",
    url: "https://regrely.com",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI-powered compliance and privacy management platform for compliance programs, privacy operations, vendor risk, and governance.",
    publisher: { "@id": `${SITE.url}/#organization` },
  },
  {
    "@type": "SoftwareApplication",
    "@id": `${SITE.url}/#greenoh`,
    name: "GreenOH",
    url: "https://greenoh.pk",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Pakistan's first solar aggregator platform, where homes and businesses compare verified solar installers through one trusted marketplace.",
    publisher: { "@id": `${SITE.url}/#organization` },
  },
];
