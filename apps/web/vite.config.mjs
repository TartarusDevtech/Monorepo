import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    EnvironmentPlugin(["VITE_IS_PRODUCTION", "NEXT_PUBLIC_LENS_NETWORK"])
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    proxy: {
      "/og": {
        target: "https://og.hey.xyz",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/og/, "")
      }
    }
  },
  build: {
    target: "esnext",
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.woff2$/.test(assetInfo.name ?? "")) {
            return "assets/fonts/[name][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
        manualChunks: {
          wevm: ["viem", "wagmi", "family"],
          connectkit: ["connectkit"],
          indexer: ["@hey/indexer"],
          react: [
            "react",
            "react-dom",
            "react-virtuoso",
            "react-easy-crop",
            "react-hook-form",
            "react-hot-toast",
            "react-router",
            "react-tracked"
          ],
          editor: [
            "react-markdown",
            "strip-markdown",
            "unified",
            "prosekit",
            "rehype-parse",
            "rehype-remark",
            "remark-breaks",
            "remark-html",
            "remark-linkify-regex",
            "remark-stringify"
          ],
          ui: [
            "@heroicons/react",
            "@headlessui/react",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-slider",
            "@radix-ui/react-tooltip",
            "@uidotdev/usehooks"
          ],
          aws: ["@aws-sdk/client-s3", "@aws-sdk/lib-storage"],
          media: ["plyr-react", "@livepeer/react", "browser-image-compression"],
          misc: [
            "@lens-chain/storage-client",
            "@lens-protocol/metadata",
            "@apollo/client",
            "zustand",
            "tailwind-merge",
            "zod"
          ]
        }
      }
    }
  }
});
