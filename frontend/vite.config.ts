import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@components": path.resolve(import.meta.dirname, "./src/components"),
      "@pages": path.resolve(import.meta.dirname, "./src/pages"),
      "@assets": path.resolve(import.meta.dirname, "./src/assets"),
      "@hooks": path.resolve(import.meta.dirname, "./src/hooks"),
      "@utils": path.resolve(import.meta.dirname, "./src/utils"),
      "@lib": path.resolve(import.meta.dirname, "./src/lib"),
      "@services": path.resolve(import.meta.dirname, "./src/services"),
      "@types": path.resolve(import.meta.dirname, "./src/types"),
      "@config": path.resolve(import.meta.dirname, "./src/config"),
    },
  },
})
