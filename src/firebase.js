import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs
} from 'firebase/firestore'

// ⚠️ REEMPLAZA ESTO con tu configuración real de Firebase
const firebaseConfig = {
 apiKey: "AIzaSyDHAkrZS2X3kwzJrIIxNeQWid6Lhz65lE0",
  authDomain: "test1-7dc10.firebaseapp.com",
  projectId: "test1-7dc10",
  storageBucket: "test1-7dc10.firebasestorage.app",
  messagingSenderId: "639660119751",
  appId: "1:639660119751:web:d7d530b57aceb3cd0bd0e2"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export {
  auth,
  db,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
}
