import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react()],
});
