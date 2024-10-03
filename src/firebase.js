import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
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
  apiKey: "AIzaSyBGY9aE89TVaiR9Ex4UfPz-lx7fTW7Xzo8",
  authDomain: "mishkan-group-qrcode.firebaseapp.com",
  projectId: "mishkan-group-qrcode",
  storageBucket: "mishkan-group-qrcode.appspot.com",
  messagingSenderId: "989503769644",
  appId: "1:989503769644:web:fe4a64ed87535aa6b31589",
  // measurementId: "G-XFFH8ZL4SH", for behaviour tracking(google analytics only)
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// Initialize Firebase Auth and enable persistence
setPersistence(auth, browserLocalPersistence);

export { auth, db, storage };
