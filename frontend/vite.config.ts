import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@lib": path.resolve(__dirname, "./src/lib"),
        "@services": path.resolve(__dirname, "./src/services"),
        "@types": path.resolve(__dirname, "./src/types"),
        "@config": path.resolve(__dirname, "./src/config"),
        "@context": path.resolve(__dirname, "./src/context"),
        "@features": path.resolve(__dirname, "./src/features"),
      },
    },

    server: {
      host: "0.0.0.0",
      port: 5173,
      strictPort: true,
      open: true,
    },

    preview: {
      host: "0.0.0.0",
      port: 4173,
      strictPort: true,
    },

    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: false,
      target: "es2022",

      chunkSizeWarningLimit: 1000,

      rollupOptions: {
        output: {
          manualChunks(id) {
  if (id.includes("node_modules")) {
    if (
      id.includes("react") ||
      id.includes("react-dom") ||
      id.includes("react-router-dom")
    ) {
      return "react";
    }

    if (
      id.includes("three") ||
      id.includes("@react-three/fiber") ||
      id.includes("@react-three/drei")
    ) {
      return "three";
    }

    if (
      id.includes("framer-motion") ||
      id.includes("gsap")
    ) {
      return "animation";
    }
  }
},
          entryFileNames: "assets/js/[name]-[hash].js",
          chunkFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: ({ name }) => {
            if (/\.(png|jpg|jpeg|svg|webp|gif|avif)$/i.test(name ?? "")) {
              return "assets/images/[name]-[hash][extname]";
            }

            if (/\.(woff|woff2|ttf|otf)$/i.test(name ?? "")) {
              return "assets/fonts/[name]-[hash][extname]";
            }

            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },

    define: {
      __APP_NAME__: JSON.stringify("Dash-it"),
      __APP_ENV__: JSON.stringify(mode),
      __API_URL__: JSON.stringify(env.VITE_API_BASE_URL),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "framer-motion",
        "gsap",
      ],
    },
  };
});