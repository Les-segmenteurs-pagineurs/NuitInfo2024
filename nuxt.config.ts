// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
      '@nuxt/ui',    
      '@nuxt/fonts',
      '@nuxtjs/tailwindcss',
      "@prisma/nuxt"
      
  ],

  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  future: {
    compatibilityVersion: 4
  },

    colorMode: {
        preference: 'dark'
    }
})
