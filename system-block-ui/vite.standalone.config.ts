import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const repositoryRoot = fileURLToPath(new URL("..", import.meta.url));

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    fs: {
      allow: [repositoryRoot],
    },
  },
  build: {
    outDir: "dist/.standalone-stage",
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    chunkSizeWarningLimit: 32_000,
    rolldownOptions: {
      output: {
        codeSplitting: false,
      },
    },
  },
});
