import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

function htmlSiteUrl() {
  return {
    name: "html-site-url",
    transformIndexHtml(html) {
      const siteUrl = process.env.VITE_SITE_URL?.replace(/\/$/, "") ?? "";
      return html.replaceAll("__SITE_URL__", siteUrl);
    },
  };
}

export default defineConfig({
  plugins: [react(), htmlSiteUrl()],
  server: {
    host: true,
    port: 5180,
  },
  // Prebundling can freeze a stale design-system build and drop CSS side effects.
  optimizeDeps: {
    exclude: ["@joker/design-system"],
  },
});
