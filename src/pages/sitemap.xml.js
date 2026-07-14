import { SITE } from "../data/site.js";
import { SERVICES } from "../data/services.js";

// Hand-rolled instead of @astrojs/sitemap so the file stays at /sitemap.xml —
// the exact URL already submitted to Google Search Console and Bing.
const PAGES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/services/", priority: "0.9", changefreq: "monthly" },
  ...SERVICES.map((service) => ({
    path: `/services/${service.slug}/`,
    priority: "0.9",
    changefreq: "monthly",
  })),
  { path: "/work/", priority: "0.8", changefreq: "monthly" },
  { path: "/about/", priority: "0.7", changefreq: "monthly" },
  { path: "/contact/", priority: "0.8", changefreq: "monthly" },
];

export function GET() {
  const urls = PAGES.map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE.url}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
