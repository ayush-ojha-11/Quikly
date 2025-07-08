import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: "./dist/stats.html", // You can change this path
      open: true, // Automatically opens the report after build
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
