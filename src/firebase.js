import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCJbWq-l7aroTiHXwmhNPpfA4IX7vHQ9LU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sarvadnya-vidyapeeth-20446.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sarvadnya-vidyapeeth-20446",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sarvadnya-vidyapeeth-20446.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "300081063480",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:300081063480:web:d7c6546ada5bb33f4668cd",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-LW0N38WFLZ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let authInstance = null;
try {
  authInstance = getAuth(app);
} catch (err) {
  console.warn("Firebase Auth initialization warning:", err);
}

export const auth = authInstance;
export const googleProvider = new GoogleAuthProvider();
export const firestoreDb = getFirestore(app);
export const realtimeDb = getDatabase(app);
export const db = firestoreDb;
export default app;
export {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

