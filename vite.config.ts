import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import VueRouter from "unplugin-vue-router/vite";
// import vueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VueUseComponentsResolver } from "unplugin-vue-components/resolvers";
import VueLayouts from "vite-plugin-vue-layouts";
import config from "./src/config";

export default defineConfig({
  plugins: [
    // unplugin-vue-router doit être avant vue()
   // vite.config.ts
VueRouter({
  routesFolder: "./src/pages",
  dts: "typed-router.d.ts",
  getRouteName: (routeNode) => {
    const fileName = routeNode.fullPath.replace(/\.[tj]sx?$/, "");
    return fileName.charAt(0).toUpperCase() + fileName.slice(1);
  },
  routeBlockLang: "yaml",
}),


    // vueDevTools(),

    AutoImport({
      imports: [
        "vue",
        "@vueuse/core",
        "@vueuse/math",
        "vue-i18n",
        "pinia",
        { "@/router/app_routes": ["appRoutes"] },
      ],
      vueTemplate: true,
      dirs: [
        "./src/utils",
        "./src/router",
        "./src/models",
        "./src/stores/global",
        "./src/modules/**/store",
        "./src/modules/**/interfaces",
        "./src/modules/**/models",
        "./src/api/**/interfaces",
        "./src/interfaces",
        "./src/services",
        "./src/stores/interfaces",
      ],
      dts: "auto-imports.d.ts",
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
    }),

    vue(),

    Components({
      dirs: ["./src/components", "./src/modules/**/components", "./src/modules/**/views"],
      dts: "components.d.ts",
      extensions: ["vue"],
      deep: true,
      resolvers: [VueUseComponentsResolver()],
    }),

    VueLayouts({
      layoutsDirs: "src/layouts",
      defaultLayout: "blank",
    }),

    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": "/src", // simplifié, plus besoin de Node url
    },
  },

  server: {
    proxy: {
      "/sahges-eval-api": {
        target: config.env.apiUrl,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/sahges-eval-api/, ""),
      },
    },
  },

  build: {
    chunkSizeWarningLimit: 5000,
    outDir: "./build",
  },
});
