// Import Firebase Authentication, Firestore, and Google Auth Provider
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPPviI08M4UwugQ6uU5RwB27IE7suAwjw",
  authDomain: "calorietracker-8a91c.firebaseapp.com",
  projectId: "calorietracker-8a91c",
  storageBucket: "calorietracker-8a91c.appspot.com",
  messagingSenderId: "936482925523",
  appId: "1:936482925523:web:65440e907697e400125d26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Auth and Google Provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
