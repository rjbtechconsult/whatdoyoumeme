import type { Pinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) { // Ensure it's only used on the client-side
    const pinia = usePinia() as Pinia;
    pinia.use(piniaPersistedState);
  }
});
