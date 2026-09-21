// Import Firebase SDKs from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    query, 
    where, 
    orderBy 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your exact Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAA5ctdE72umRUbLHAbOYMi0FYgY80bax4",
    authDomain: "personal-expense-tracker-dfb68.firebaseapp.com",
    projectId: "personal-expense-tracker-dfb68",
    storageBucket: "personal-expense-tracker-dfb68.firebasestorage.app",
    messagingSenderId: "1089392482303",
    appId: "1:1089392482303:web:b1afb9a237b12b986f39ca",
    measurementId: "G-P2GSBDE8ZJ"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export modules for use across your pages
export { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    updateProfile,
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    query, 
    where, 
    orderBy 
};
