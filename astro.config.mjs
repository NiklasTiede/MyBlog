import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://the-coding-lab.com",
  integrations: [sitemap()],
});
