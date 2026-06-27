// Local mock Firebase authentication and Firestore database using localStorage

// --- Auth Mock ---
class MockAuth {
  constructor() {
    this.listeners = [];
    const savedUser = localStorage.getItem("mock_firebase_auth_user");
    this.currentUser = savedUser ? { email: savedUser } : null;
  }

  _notify() {
    this.listeners.forEach((cb) => cb(this.currentUser));
  }
}

export const auth = new MockAuth();

export function onAuthStateChanged(authInstance, callback) {
  authInstance.listeners.push(callback);
  // Call callback immediately with the current state (async to match Firebase behavior)
  setTimeout(() => {
    callback(authInstance.currentUser);
  }, 0);

  return () => {
    authInstance.listeners = authInstance.listeners.filter((cb) => cb !== callback);
  };
}

export async function signInWithEmailAndPassword(authInstance, email, password) {
  // Check against registered users in localStorage, defaulting to admin@gmail.com / admin@147
  const users = JSON.parse(localStorage.getItem("mock_firebase_auth_users") || "[]");
  
  // Also support default admin credentials
  const userExists = users.some(u => u.email === email && u.password === password) || 
                     (email === "admin@gmail.com" && password === "admin@147");

  if (!userExists) {
    const err = new Error("Invalid credentials");
    err.code = "auth/invalid-credential";
    throw err;
  }

  authInstance.currentUser = { email };
  localStorage.setItem("mock_firebase_auth_user", email);
  authInstance._notify();
  return { user: authInstance.currentUser };
}

export async function createUserWithEmailAndPassword(authInstance, email, password) {
  const users = JSON.parse(localStorage.getItem("mock_firebase_auth_users") || "[]");
  if (users.some(u => u.email === email)) {
    const err = new Error("Email already in use");
    err.code = "auth/email-already-in-use";
    throw err;
  }

  users.push({ email, password });
  localStorage.setItem("mock_firebase_auth_users", JSON.stringify(users));

  authInstance.currentUser = { email };
  localStorage.setItem("mock_firebase_auth_user", email);
  authInstance._notify();
  return { user: authInstance.currentUser };
}

export async function signOut(authInstance) {
  authInstance.currentUser = null;
  localStorage.removeItem("mock_firebase_auth_user");
  authInstance._notify();
}

// --- Firestore Mock ---
export const db = "mock-firestore-db";

class MockDocSnapshot {
  constructor(id, data) {
    this.id = id;
    this._data = data;
  }
  data() {
    return this._data;
  }
}

class MockQuerySnapshot {
  constructor(docs) {
    this.docs = docs;
  }
  forEach(callback) {
    this.docs.forEach(callback);
  }
}

export function collection(dbInstance, collectionName) {
  return { path: collectionName };
}

export function doc(dbOrCol, pathOrId, id) {
  if (id !== undefined) {
    return { path: pathOrId, id: id };
  } else {
    return { path: dbOrCol.path, id: pathOrId };
  }
}

export async function getDocs(collectionRef) {
  const collectionName = collectionRef.path;
  const items = JSON.parse(localStorage.getItem(`mock_firestore_${collectionName}`) || "[]");
  
  // Map internal items to DocSnapshots
  const docs = items.map((item) => new MockDocSnapshot(item.id, item));
  return new MockQuerySnapshot(docs);
}

export async function addDoc(collectionRef, data) {
  const collectionName = collectionRef.path;
  const items = JSON.parse(localStorage.getItem(`mock_firestore_${collectionName}`) || "[]");
  
  const newId = Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
  const newItem = { id: newId, ...data };
  items.push(newItem);
  
  localStorage.setItem(`mock_firestore_${collectionName}`, JSON.stringify(items));
  return { id: newId };
}

export async function updateDoc(docRef, data) {
  const collectionName = docRef.path;
  const items = JSON.parse(localStorage.getItem(`mock_firestore_${collectionName}`) || "[]");
  
  const updatedItems = items.map((item) => {
    if (String(item.id) === String(docRef.id)) {
      return { ...item, ...data };
    }
    return item;
  });
  
  localStorage.setItem(`mock_firestore_${collectionName}`, JSON.stringify(updatedItems));
}

export async function deleteDoc(docRef) {
  const collectionName = docRef.path;
  const items = JSON.parse(localStorage.getItem(`mock_firestore_${collectionName}`) || "[]");
  
  const updatedItems = items.filter((item) => String(item.id) !== String(docRef.id));
  
  localStorage.setItem(`mock_firestore_${collectionName}`, JSON.stringify(updatedItems));
}

// Pass-through helpers for BlogManager query
export function query(collectionRef, ...constraints) {
  return collectionRef;
}

export function orderBy(field, direction) {
  return { type: "orderBy", field, direction };
}
