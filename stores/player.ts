import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('player', {
  state: () => ({
    player: null as null | {
      id: string;
      name: string;
      isHost: boolean;
      gameId: string;
    },
  }),
  actions: {
    setPlayer(playerData: { id: string; name: string; isHost: boolean; gameId: string }) {
      this.player = playerData;
    },
    clearPlayer() {
      this.player = null;
    },
    },
    persist: true,
    getters: {
        isPlayerInGame: (state) => !!state.player && !!state.player.gameId,
    },
});
