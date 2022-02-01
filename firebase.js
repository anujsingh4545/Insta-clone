// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByxvQuIY3xJ86jSkM_R5gsji-I3CzuZmc",
  authDomain: "insta-clone-d6913.firebaseapp.com",
  projectId: "insta-clone-d6913",
  storageBucket: "insta-clone-d6913.appspot.com",
  messagingSenderId: "211123718132",
  appId: "1:211123718132:web:c3ecdcdd4fb77910871ba1",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
