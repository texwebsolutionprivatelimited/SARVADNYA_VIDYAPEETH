import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const rawProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const rawApiKey = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: rawApiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL:
    import.meta.env.VITE_FIREBASE_DATABASE_URL ||
    (rawProjectId && !rawProjectId.startsWith("YOUR_")
      ? `https://${rawProjectId}-default-rtdb.firebaseio.com`
      : undefined),
  projectId: rawProjectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let appInstance = null;
try {
  if (rawApiKey && !rawApiKey.startsWith("YOUR_")) {
    appInstance = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  }
} catch (err) {
  console.warn("Firebase initializeApp skipped/warning:", err?.message || err);
}

let authInstance = null;
if (appInstance) {
  try {
    authInstance = getAuth(appInstance);
  } catch (err) {
    console.warn("Firebase Auth initialization warning:", err?.message || err);
  }
}

let googleProviderInstance = null;
try {
  googleProviderInstance = new GoogleAuthProvider();
} catch (err) {
  console.warn("GoogleAuthProvider initialization warning:", err?.message || err);
}

let firestoreInstance = null;
if (appInstance) {
  try {
    firestoreInstance = getFirestore(appInstance);
  } catch (err) {
    console.warn("Firestore initialization warning:", err?.message || err);
  }
}

let realtimeDbInstance = null;
if (appInstance && firebaseConfig.databaseURL) {
  try {
    realtimeDbInstance = getDatabase(appInstance);
  } catch (err) {
    console.warn("Firebase Realtime DB initialization warning:", err?.message || err);
  }
}

export const auth = authInstance;
export const googleProvider = googleProviderInstance;
export const firestoreDb = firestoreInstance;
export const realtimeDb = realtimeDbInstance;
export const db = firestoreInstance;
export default appInstance;

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


