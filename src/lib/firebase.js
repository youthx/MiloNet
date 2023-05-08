/*

Firestore database API manager

*/


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7Sfvgs22TbWFH_IByuAQFxREhvX8ypUw",
  authDomain: "wasp-a3f19.firebaseapp.com",
  projectId: "wasp-a3f19",
  storageBucket: "wasp-a3f19.appspot.com",
  messagingSenderId: "873300165193",
  appId: "1:873300165193:web:f1a859c98d683c9e023598",
  measurementId: "G-912FLV5RKW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Get Analytics
export const analytics = getAnalytics(app);

