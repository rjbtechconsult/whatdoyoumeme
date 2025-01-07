import { db } from "~/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { gameId, playerId, memeUrl } = body;

  const gameRef = doc(db, "game", gameId);
  await updateDoc(gameRef, {
    [`submittedMemes.${playerId}`]: memeUrl,
  });

  return { success: true };
});
