import { defineNuxtPlugin } from '#app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';

let firebaseApp: FirebaseApp;
let firestore: Firestore;

export default defineNuxtPlugin(() => {
  if (!firebaseApp) {
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAGHXIZVEIea8H_nxIcygQOACC24RDqjG0",
      authDomain: "what-do-you-meme-5e573.firebaseapp.com",
      databaseURL: "https://what-do-you-meme-5e573-default-rtdb.firebaseio.com",
      projectId: "what-do-you-meme-5e573",
      storageBucket: "what-do-you-meme-5e573.firebasestorage.app",
      messagingSenderId: "85863659780",
      appId: "1:85863659780:web:fcccf29e5b26618a16b851",
      measurementId: "G-HSZGRH42LR",
    };

    // Initialize Firebase app
    firebaseApp = initializeApp(firebaseConfig);

    // Initialize Firestore
    firestore = getFirestore(firebaseApp);
  }

  // Provide Firestore instance globally
  return {
    provide: {
      firestore: firestore as Firestore,
    },
  };
});
