import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcNLCJsfaA7a4p1qw55S57b5YT58qdtUY",
  authDomain: "qr-code-generator-1e2ac.firebaseapp.com",
  projectId: "qr-code-generator-1e2ac",
  storageBucket: "qr-code-generator-1e2ac.appspot.com",
  messagingSenderId: "993771413512",
  appId: "1:993771413512:web:19427079ac3271e6beb1bd",
  measurementId: "G-XFFH8ZL4SH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
