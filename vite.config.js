import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Weather-App/", // ✅ Replace with your GitHub repository name
});
