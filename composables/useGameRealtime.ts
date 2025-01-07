import { ref } from "vue";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "~/firebase";

export default function useGameRealtime(gameId) {
  const gameState = ref(null);
  const error = ref(null);

  const startListening = () => {
    try {
      const gameRef = doc(db, "game", gameId);

      const unsubscribe = onSnapshot(gameRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          gameState.value = docSnapshot.data();
        } else {
          gameState.value = null;
          error.value = "Game not found!";
        }
      });

      return unsubscribe; // Return this to stop listening when needed
    } catch (err) {
      error.value = err.message;
      console.error("Error listening to game state:", err);
    }
  };

  return { gameState, error, startListening };
}
