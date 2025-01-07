import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { gameId, voterId, votedFor } = body;

  const gameRef = doc(db, "game", gameId);
  await updateDoc(gameRef, {
    [`votes.${voterId}`]: votedFor,
  });

  return { success: true };
});
