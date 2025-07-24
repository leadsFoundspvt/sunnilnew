// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "600e384c4121.ngrok-free.app", // Add your ngrok host
      "localhost", // Keep localhost
    ],
    // Optional: Add these for better ngrok compatibility
    hmr: {
      clientPort: 443,
    },
    cors: true,
  },
});
