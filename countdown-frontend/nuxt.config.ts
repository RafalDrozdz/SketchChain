// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/i18n",
    "nuxt-lodash",
  ],
  components: {
    global: true,
    dirs: ["~/components"],
  },
  typescript: {
    strict: true,
  },
  //@ts-ignore
  shadcn: {
    prefix: "Base",
    componentDir: "./components/UI",
  },
  i18n: {
    locales: [
      {
        code: "en",
      },
      {
        code: "pl",
      },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
  },
});
