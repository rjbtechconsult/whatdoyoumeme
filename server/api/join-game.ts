import { db } from "~/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { gameId, playerId } = body;

  const gameRef = doc(db, "game", gameId);
  await updateDoc(gameRef, {
    players: arrayUnion(playerId),
  });

  return { success: true };
});
