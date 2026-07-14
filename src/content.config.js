import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    // Meta description. Kept separate from the excerpt shown on the index.
    description: z.string(),
    excerpt: z.string(),
    // The 40–60 word citable answer block AI engines lift verbatim.
    answer: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    // Which service page this post funnels toward.
    service: z.enum([
      "ai-engineering",
      "ai-modernization",
      "enterprise-software-development",
      "workflow-automation",
    ]),
    readingTime: z.number(),
    faqs: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .default([]),
  }),
});

export const collections = { blog };
