import { getCollection } from "astro:content";
import { SITE } from "../data/site.js";
import { SERVICES } from "../data/services.js";

// Hand-rolled instead of @astrojs/sitemap so the file stays at /sitemap.xml —
// the exact URL already submitted to Google Search Console and Bing.
export async function GET() {
  const posts = await getCollection("blog");

  const pages = [
    { path: "/", priority: "1.0", changefreq: "weekly" },
    { path: "/services/", priority: "0.9", changefreq: "monthly" },
    ...SERVICES.map((service) => ({
      path: `/services/${service.slug}/`,
      priority: "0.9",
      changefreq: "monthly",
    })),
    { path: "/blog/", priority: "0.8", changefreq: "weekly" },
    ...posts.map((post) => ({
      path: `/blog/${post.id}/`,
      priority: "0.7",
      changefreq: "monthly",
      lastmod: (post.data.updated ?? post.data.published).toISOString().slice(0, 10),
    })),
    { path: "/work/", priority: "0.8", changefreq: "monthly" },
    { path: "/about/", priority: "0.7", changefreq: "monthly" },
    { path: "/contact/", priority: "0.8", changefreq: "monthly" },
  ];

  const urls = pages
    .map(({ path, priority, changefreq, lastmod }) =>
      [
        "  <url>",
        `    <loc>${SITE.url}${path}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
