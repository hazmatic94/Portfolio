import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5182,
  },
  // Prebundling can freeze a stale design-system build and drop CSS side effects.
  optimizeDeps: {
    exclude: ["@joker/design-system"],
  },
});
