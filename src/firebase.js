// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv2KBON3W-pS00_FSyPSxo-NRBrv56LeI",
  authDomain: "blogjuly2022.firebaseapp.com",
  databaseURL: "https://blogjuly2022-default-rtdb.firebaseio.com",
  projectId: "blogjuly2022",
  storageBucket: "blogjuly2022.appspot.com", // FIXED `.app` typo
  messagingSenderId: "374950004069",
  appId: "1:374950004069:web:16d25bb24397620585cd8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);
