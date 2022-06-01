import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7hIkv_oUzmBeP7lTa-WetHsRWiqG3rrE",
  authDomain: "streak-pomodoro.firebaseapp.com",
  projectId: "streak-pomodoro",
  storageBucket: "streak-pomodoro.appspot.com",
  messagingSenderId: "832447905222",
  appId: "1:832447905222:web:298008d2538c28e46846c7",
  measurementId: "G-KJQBCHTP6T",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
