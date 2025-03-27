import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin(["VITE_IS_PRODUCTION", "NEXT_PUBLIC_LENS_NETWORK"])
  ],
  build: {
    target: "esnext",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          wevm: ["viem", "wagmi"],
          connectkit: ["connectkit"],
          indexer: ["@hey/indexer"],
          react: [
            "react",
            "react-dom",
            "react-virtuoso",
            "react-device-detect",
            "react-easy-crop",
            "react-hook-form",
            "react-hot-toast",
            "react-markdown",
            "react-router",
            "react-scan",
            "react-tracked"
          ],
          misc: [
            "prosekit",
            "@livepeer/react",
            "@uidotdev/usehooks",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-slider",
            "@radix-ui/react-switch",
            "@radix-ui/react-tooltip"
          ]
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
