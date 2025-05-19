import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: [{ find: /^~/, replacement: "" }],
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        relativeUrls: true,
        modifyVars: {
          "@primary-color": "#3c3f57",
          "@font-family": "'Inter', sans-serif",
          "@border-radius-base": "0.382rem",
          "@modal-header-border-width": 0,
          "@modal-footer-border-width": 0,
        },
      },
    },
  },
  optimizeDeps: {
    include: ["@ant-design/icons"],
  },
  server: {
    fs: {
      allow: ["."],
    },
  },
  plugins: [react(), tsconfigPaths(), nodePolyfills()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@ant-design/pro-form")) {
            return "pro-form";
          }
        },
      },
    },
  },
});
