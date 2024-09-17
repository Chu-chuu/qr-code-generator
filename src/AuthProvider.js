import {
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase"; // Make sure you have this properly configured

// Sign up with email and password
const signUpWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with email and password
const signInWithEmailAndPasswordFunc = (email, password) => {
  return firebaseSignIn(auth, email, password);
};

// Sign in with Google
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Log out function
const logOut = () => {
  return signOut(auth);
};

export {
  signUpWithEmailAndPassword,
  signInWithEmailAndPasswordFunc,
  signInWithGoogle,
  signOut,
};
