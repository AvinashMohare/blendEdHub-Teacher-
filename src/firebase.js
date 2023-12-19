import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB6lt19vu4m04Ofa3AB0iXhr4BCVLKnS3s",
    authDomain: "blendedhub-4ca39.firebaseapp.com",
    projectId: "blendedhub-4ca39",
    storageBucket: "blendedhub-4ca39.appspot.com",
    messagingSenderId: "389072964152",
    appId: "1:389072964152:web:1c04148befa3bbe0afb4cd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
