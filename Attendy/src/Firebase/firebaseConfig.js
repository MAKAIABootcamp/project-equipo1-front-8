// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6vbH3_2zM5jcLCizHZ7BmSyf15pJjzdE",
  authDomain: "attendy-b6fdd.firebaseapp.com",
  projectId: "attendy-b6fdd",
  storageBucket: "attendy-b6fdd.appspot.com",
  messagingSenderId: "772526466806",
  appId: "1:772526466806:web:ac7a2d2228f21237aeaed7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
