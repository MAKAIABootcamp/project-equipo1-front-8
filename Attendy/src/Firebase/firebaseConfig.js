// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqObVRNe-sVKpqH3TgKngnRySXNUr4gpo",
  authDomain: "attendy-6be48.firebaseapp.com",
  projectId: "attendy-6be48",
  storageBucket: "attendy-6be48.appspot.com",
  messagingSenderId: "827905088282",
  appId: "1:827905088282:web:538cd70463cdb69adb2aa3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
