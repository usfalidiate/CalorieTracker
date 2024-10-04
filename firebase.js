// Import Firebase and Firestore SDKs

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPPviI08M4UwugQ6uU5RwB27IE7suAwjw",
  authDomain: "calorietracker-8a91c.firebaseapp.com",
  projectId: "calorietracker-8a91c",
  storageBucket: "calorietracker-8a91c.appspot.com",
  messagingSenderId: "936482925523",
  appId: "1:936482925523:web:65440e907697e400125d26"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
