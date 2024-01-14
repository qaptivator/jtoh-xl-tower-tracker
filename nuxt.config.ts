// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: "JToH XL Project Tower Tracker",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Shows your JToH XL Project tower completions.",
        },
      ],
      link: [
        { rel: "shortcut icon", type: "image/x-icon", href: "favicon.ico" },
      ],
    },
    baseURL: "/jtoh-xl-tower-tracker/",
    buildAssetsDir: "assets",
  },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
