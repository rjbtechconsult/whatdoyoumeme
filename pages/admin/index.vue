<template>
    <div>
        <h1>Admin Page</h1>

        <div v-if="games.length">
            <h2>Games</h2>
            <ul >
                <li v-for="game in games" :key="game.gameId">
                    <p>
                        Host: {{ hostPlayer(game).name }} <br>
                        Status: {{ game.status }} <br>
                        Link: <a :href="`/play/${game.gameId}`">{{ game.gameId }}</a>

                    </p>
                </li>
            </ul>
        </div>

        <div>
            <h2>Memes</h2>
            <form @submit.prevent="submitMeme">
                <label>Enter a meme</label><br>
                <textarea v-model="newMeme" placeholder="Eg. realjblaq" cols="50" rows="5" required></textarea>
                <br/>
                <button type="submit">Add Meme</button>
            </form>

            <br/>
            <ul v-if="memes.length" style="height: 200px; overflow-y: scroll; width: 40%">
                <li v-for="meme in memes" :key="meme.memeId">
                    <p>
                        {{ meme.meme }}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
const { getAllGames, addMeme, getAllMemes } = useGames();
const games = ref<any>([]);
const newMeme = ref<any>('');
const memes = ref<any[]>([]);



onMounted(() => {
  getGames();
  getMemes();
});



const getGames = async () => {
    try {
        const res = await getAllGames();
        console.log(res)
        games.value = res;
    } catch (error) {
        console.error(error);
    }
}

const hostPlayer = (game:any) => {
    return game.players.find((player:any) => player.isHost);
}


const getMemes = async () => {
    try {
        const res = await getAllMemes();
        console.log(res);
        memes.value = res;
    } catch (error) {
        console.error(error);
    }
};


const submitMeme = async () => {
    const meme = {
        meme: newMeme.value,
        createdAt: new Date()
    }
    try {
        const res = await addMeme(meme);
        console.log(res)
        newMeme.value = '';
        getMemes();
    } catch (error) {
        console.error(error);
    }
};


</script>
