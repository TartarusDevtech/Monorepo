import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

const getUniqueChunkName = (facadeModuleId: string) => {
  const modulePathParts = facadeModuleId.split("/");
  const moduleName = modulePathParts[modulePathParts.length - 2] || "module";
  return `assets/${moduleName}-[name].[hash].js`;
};

export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin(["VITE_IS_PRODUCTION", "NEXT_PUBLIC_LENS_NETWORK"])
  ],
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        entryFileNames: (chunkInfo) => {
          if ("facadeModuleId" in chunkInfo && chunkInfo.facadeModuleId) {
            return getUniqueChunkName(chunkInfo.facadeModuleId);
          }
          return "assets/[name].hash-[hash].js";
        },
        chunkFileNames: (chunkInfo) => {
          if ("facadeModuleId" in chunkInfo && chunkInfo.facadeModuleId) {
            return getUniqueChunkName(chunkInfo.facadeModuleId);
          }
          return "assets/[name].[hash].js";
        },
        assetFileNames: "assets/[name].[hash].[ext]",
        manualChunks: {
          viem: ["viem"],
          react: ["react"],
          dom: ["react-dom"],
          wagmi: ["wagmi"],
          virtual: ["react-virtuoso"],
          indexer: ["@hey/indexer"],
          connectkit: ["connectkit"],
          livepeer: ["@livepeer/react"]
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
