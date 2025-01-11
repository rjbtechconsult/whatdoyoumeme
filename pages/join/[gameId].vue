<template>
  <div>
    <em v-if="isLoading">Loading..</em>
    <div v-else>

      <div v-if="game">
        <h1>Join Game</h1>
        <p> <span>{{host}}</span> is inviting you to play What Do You Meme</p>

        <form @submit.prevent="joinGame">
          <label>Enter your playname</label><br>
          <input type="text" v-model="playName" placeholder="Eg. realjblaq" required>
          <button type='submit'>Join</button>
        </form>
      </div>

      <div v-if="!game">
        Game not found
      </div>


    </div>
  </div>
</template>

<script lang="ts" setup>

import {useGames} from '#build/imports';
import {useRoute} from 'vue-router';
import { usePlayerStore } from '@/stores/player';


const {getGameById, addPlayerToGame} = useGames();
const route = useRoute();
const router = useRouter();
const gameId = ref<any>('');
const game = ref<any>();
const host = ref<any>('');
const isLoading = ref<boolean>(true);


const playName = ref<any>('');

onMounted(async () => {
  const id = route.params.gameId;
  gameId.value = id;
  if (gameId.value) {
    await getGame();
  }
});


const getGame = async () => {
    try {
        const res:any  = await getGameById(gameId.value);
        game.value = res;

        // get the player object fromt he array of players who is the host
        const player = res.players.find((player: any) => player.isHost);
        host.value = player.name
        console.log(res)
    } catch (error) {
        console.error(error);
    }finally {
        isLoading.value = false;
    }
}


const joinGame = async () => {
    try {
         const res  = await addPlayerToGame(gameId.value, playName.value);
        console.log(res)


        const playerStore = usePlayerStore();

        const player:any = {
            name: playName.value,
            score: 0,
            isHost: false,
            submittedMeme: "",
            votedFor: "",
            gameId: gameId.value
        };

        playerStore.setPlayer(player);
        router.push(`/play/${gameId.value}`);



    } catch (error:any) {
        console.log(error.message);
        if (error.message === 'Player name already exists') {
            alert(error);
        }
    }
}
</script>