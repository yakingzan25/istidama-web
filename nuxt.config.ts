// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'ar',
        dir: 'rtl'
      },
      title: 'مؤسسة الاستدامة | حلول مبتكرة لمستقبل مستدام',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap'
        }
      ]
    }
  }
})