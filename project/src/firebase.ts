// firebase.ts

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCADZ7lMz9HkhF8xSmIS82ohZJIEWQye6o",
  authDomain: "levelonlife.firebaseapp.com",
  projectId: "levelonlife",
  storageBucket: "levelonlife.firebasestorage.app",
  messagingSenderId: "71632724488",
  appId: "1:71632724488:web:4d2f62fd84fd3c4a13a7bd",
  measurementId: "G-9SMWDZRGQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//  Add Firestore (db)
const db = getFirestore(app);

export { db };
