import { defineNuxtPlugin, useHead } from "#imports";

export default defineNuxtPlugin({
  name: "easycredit-components",
  enforce: "pre",

  setup() {
    useHead({
      script: [
        {
          src: "https://ratenkauf.easycredit.de/api/resource/webcomponents/v3/easycredit-components/easycredit-components.esm.js",
          type: "module",
        },
      ],
    });
  },
});
