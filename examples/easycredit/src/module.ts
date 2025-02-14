import {
  addComponentsDir,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from "@nuxt/kit";

export type EasyCreditModuleOptions = {
  apiKey: string;
};

export default defineNuxtModule<EasyCreditModuleOptions>({
  meta: {
    name: "@teambank/easycredit",
    configKey: "easycredit",
  },
  async setup() {
    const resolver = createResolver(import.meta.url);

    addComponentsDir({
      path: resolver.resolve(__dirname, "./components"),
      global: true,
    });

    addPlugin({
      src: resolver.resolve(__dirname, "./plugins/easycredit-components"),
      mode: "all",
    });
  },
});
