// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 Firestore added

const firebaseConfig = {
    apiKey: "AIzaSyBIvsFmLwEZOjyLEQeiBY8v25rLD_Guk9Y",
    authDomain: "cloneauth-3c7b1.firebaseapp.com",
    projectId: "cloneauth-3c7b1",
    storageBucket: "cloneauth-3c7b1.appspot.com",
    messagingSenderId: "438492048333",
    appId: "1:438492048333:web:dd8572647acf839fc73284",
    measurementId: "G-MMX3NWHP3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // 👈 This allows Firestore DB usage
