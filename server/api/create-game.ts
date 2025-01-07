import { db } from "~/firebase";
import { doc, setDoc } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { gameId, playerId } = body;

  const gameRef = doc(db, "game", gameId);
  await setDoc(gameRef, {
    gameId,
    players: [playerId],
    currentStatement: null,
    submittedMemes: {},
    votes: {},
    scores: {},
    status: "waiting",
  });

  return { success: true };
});
