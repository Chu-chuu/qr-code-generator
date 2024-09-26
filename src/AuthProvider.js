import {
  signInWithEmailAndPassword as firebaseSignIn,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  // signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase"; // Make sure you have this properly configured
import {
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

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
  return firebaseSignOut(auth);
};

//Reset Password
const sendPasswordResetEmail = (email) => {
  return firebaseSendPasswordResetEmail(auth, email);
};

// Set session persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Now auth state will persist across page reloads
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
      } else {
        // No user, redirect to login
      }
    });
  })
  .catch((error) => {
    console.error("Error with session persistence:", error);
  });

export {
  signUpWithEmailAndPassword,
  signInWithEmailAndPasswordFunc,
  signInWithGoogle,
  logOut,
  sendPasswordResetEmail,
  auth, // Make this available for other components to use it for authentication purposes.
};
