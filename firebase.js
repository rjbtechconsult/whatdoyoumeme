// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAGHXIZVEIea8H_nxIcygQOACC24RDqjG0",
  authDomain: "what-do-you-meme-5e573.firebaseapp.com",
  projectId: "what-do-you-meme-5e573",
  storageBucket: "what-do-you-meme-5e573.firebasestorage.app",
  messagingSenderId: "85863659780",
  appId: "1:85863659780:web:fcccf29e5b26618a16b851",
  measurementId: "G-HSZGRH42LR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Optionally sign in users anonymously
signInAnonymously(auth).catch((error) => {
  console.error("Authentication error:", error);
});

export { db, auth };
