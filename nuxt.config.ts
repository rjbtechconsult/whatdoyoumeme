// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,
  modules: ['@pinia/nuxt'],
  plugins: ['~/plugins/piniaPersistedState.ts'],
  ssr: false,
  nitro: {
    preset: 'node-server'
  }
})
