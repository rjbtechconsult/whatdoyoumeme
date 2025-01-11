
<template>
    <div>
        <h1>What Do You Meme</h1>
        <p>Let's have some fun!</p>

        <div v-if="!createdGame">
            
            <form @submit.prevent="createNewGame()">
                <label>Enter your playname?</label><br>
                <input type="text" v-model="playerName" placeholder="Eg. realjblaq" required>
                <button type="submit">New Game</button>
            </form>
        </div>

        <div v-if="createdGame">
            <p>Share with other players</p>
            <a :href="gameUrl">{{ gameUrl }}</a>
        </div>

    </div>
</template>
<script lang="ts" setup>

import { ref } from 'vue';
import { useGames } from '#build/imports';
import { usePlayerStore } from '~/stores/player';



const { createGame } = useGames();
const playerName = ref('');
const gameUrl = ref('');
const createdGame = ref();
const playerStore = usePlayerStore();


const createNewGame = async () => {
    const player = {
        name: playerName.value,
        score: 0,
        isHost: true,
        submittedMeme: "",
        votedFor: ""
    };
              
    const newGame = {
          status: 'waiting',  // Game status can be 'waiting', 'started', etc.
          currentRound: 1,
          maxRounds: 5,
          players: [
              player
            ],
        createdAt: new Date(),
    };


  try {
        createdGame.value = await createGame(newGame);
        gameUrl.value = window.location.origin + '/join/' + createdGame.value.gameId;
      console.log('Game Created:', createdGame.value);
        saveGameToLocalStorage(player, createdGame.value.gameId);
  } catch (error) {
    console.error('Error creating new game: ', error);
  }
};

const saveGameToLocalStorage = (player: any, gameId: any) => {
    console.log('Saving game to local storage');
    
    playerStore.setPlayer({...player, gameId: gameId});
};
</script>