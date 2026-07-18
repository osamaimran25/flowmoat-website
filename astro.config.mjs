// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://flowmoat.com",
  // Every page ships as /path/index.html so URLs stay trailing-slash canonical.
  trailingSlash: "always",
  build: { format: "directory" },
});
