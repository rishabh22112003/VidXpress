import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ⚠️ Replace these with your own Firebase config values
const firebaseConfig = {
    apiKey: "AIzaSyBIvsFmLwEZOjyLEQeiBY8v25rLD_Guk9Y",
    authDomain: "cloneauth-3c7b1.firebaseapp.com",
    projectId: "cloneauth-3c7b1",
    storageBucket: "cloneauth-3c7b1.firebasestorage.com",
    messagingSenderId: "438492048333",
    appId: "1:438492048333:web:dd8572647acf839fc73284",
    measurementId: "G-MMX3NWHP3E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
