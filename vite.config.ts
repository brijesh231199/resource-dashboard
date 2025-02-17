import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 5175,
  },
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  base: "/resource-dashboard/", // This tells Vite to use /resource-dashboard/ as the base URL
});
