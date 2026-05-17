import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  appType: "spa",
  base: "/",
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          charts: ["recharts", "chart.js", "react-chartjs-2"],
          calendar: [
            "@fullcalendar/daygrid",
            "@fullcalendar/interaction",
            "@fullcalendar/react",
            "@fullcalendar/timegrid",
          ],
          ui: [
            "@mui/material",
            "@emotion/react",
            "@emotion/styled",
            "lucide-react",
            "@heroicons/react",
            "react-icons",
          ],
        },
      },
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
})
