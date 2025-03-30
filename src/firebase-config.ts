import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAJAwO7ijIf1vLyRjRQlD5mpRUVJWXXKP8",
    authDomain: "agriflow-570e4.firebaseapp.com",
    projectId: "agriflow-570e4",
    storageBucket: "agriflow-570e4.firebasestorage.app",
    messagingSenderId: "494460915819",
    appId: "1:494460915819:web:9ad09ca236734c7091212e",
    measurementId: "G-JR0XKEXE8C"
};
  
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { app, auth, analytics, database, firestore };
