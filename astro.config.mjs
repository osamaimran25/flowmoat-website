// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://flowmoat.com",
  // Every page ships as /path/index.html so URLs stay trailing-slash canonical.
  trailingSlash: "always",
  build: { format: "directory" },
  // Kept from the enterprise-positioned URLs so anything Google already
  // indexed lands on the renamed page instead of a 404.
  redirects: {
    "/services/enterprise-software-development/": "/services/custom-software-development/",
    "/blog/what-custom-enterprise-software-costs/": "/blog/what-custom-software-costs/",
    "/blog/why-enterprise-ai-pilots-fail/": "/blog/why-ai-pilots-fail/",
  },
});
