import { fileURLToPath } from "node:url";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  extends: ["@shopware/composables/nuxt-layer"],
  modules: ["@vueuse/nuxt", "@shopware/nuxt-module"],
  shopware: {
    endpoint: "https://demo-frontends.shopware.store/store-api/",
    accessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
  },
  runtimeConfig: {
    public: {
      easycredit: {
        // ...
      },
    },
  },
  telemetry: false,
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("easycredit-"),
    },
  },
});
