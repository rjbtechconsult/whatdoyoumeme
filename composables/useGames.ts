import { collection, addDoc, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNuxtApp } from '#app'; // Access global Nuxt context
import type { Firestore } from 'firebase/firestore';


export const useGames = () => {
  const { $firestore } = useNuxtApp(); // Assuming Firestore is initialized in Nuxt's context
  const firestore = $firestore as Firestore; // Explicitly cast $firestore to Firestore

  // Function to create a new game
  const createGame = async (newGame: Record<string, any>) => {
    try {
      const gamesCollection = collection(firestore, 'games'); // Reference the 'games' collection
      const docRef = await addDoc(gamesCollection, newGame); // Add a new document
      return { ...newGame, gameId: docRef.id }; // Return the created game with its ID
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  };


  // Function to get all games
  const getAllGames = async () => {
    try {
      const gamesCollection = collection(firestore, 'games');
      const querySnapshot = await getDocs(gamesCollection);
      const res = querySnapshot.docs.map((doc) => ({
        gameId: doc.id,
        ...doc.data(),
      }));

      return res;
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  };


  const addPlayerToGame = async (gameId: string, player: string) => {
  try {
    // Reference to the specific game document
    const gameDocRef = doc(firestore, 'games', gameId);

    // Get the current data of the game
    const gameDoc = await getDoc(gameDocRef);

    if (gameDoc.exists()) {
      const gameData = gameDoc.data();

      // Check if players field exists and if the player already exists
      const existingPlayers = gameData?.players || [];
      const playerExists = existingPlayers.some((existingPlayer: Record<string, any>) => existingPlayer.name === player);

      if (playerExists) {
        throw new Error('Player name already exists');
      }

      // Add the new player
      const newPlayer = {
        name: player,
        score: 0,
        isHost: false,
        submittedMeme: "",
        votedFor: ""
      };

      // Update the game document with the new player
      const updatedPlayers = [...existingPlayers, newPlayer];
      await updateDoc(gameDocRef, {
        players: updatedPlayers,
      });

      return { gameId, players: updatedPlayers };
    } else {
      throw new Error('Game not found');
    }
  } catch (error) {
    throw error;
  }
};


  const getGameById = async (gameId: string) => {
    try {
      if (!gameId) throw new Error('Game ID is required.');

      // Reference to the game document
      const gameDocRef = doc(firestore, 'games', gameId);

      // Fetch the document
      const gameDoc = await getDoc(gameDocRef);

      if (gameDoc.exists()) {
        const gameData = gameDoc.data();
        return { id: gameDoc.id, ...gameData }; // Include the document ID in the result
      } else {
        console.error('No game found with the given ID.');
        throw new Error('Game not found.');
      }
    } catch (error) {
      console.error('Error fetching game by ID:', error);
      throw error;
    }
  };

  const addMeme = async (newMeme: Record<string, any>) => {
    try {
      const memesCollection = collection(firestore, 'memes'); // Reference the 'memes' collection
      const docRef = await addDoc(memesCollection, newMeme); // Add a new document
      return { ...newMeme, memeId: docRef.id }; // Return the created meme with its ID
    } catch (error) {
      console.error('Error adding meme:', error);
      throw error;
    }
  };

  const getAllMemes = async () => {
    try {
      const memesCollection = collection(firestore, 'memes');
      const querySnapshot = await getDocs(memesCollection);
      const res = querySnapshot.docs.map((doc) => ({
        memeId: doc.id,
        ...doc.data(),
      }));
      return res;
    } catch (error) {
      console.error('Error fetching memes:', error);
      throw error;
    }
  };



  return {
    createGame,
    getAllGames,
    getGameById, 
    addPlayerToGame,
    addMeme, 
    getAllMemes
  };
};
