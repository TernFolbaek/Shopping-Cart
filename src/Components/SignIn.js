import { GoogleButton } from 'react-google-button';
import { useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  doc,

} from 'firebase/firestore';
import { db } from '../index.js';

// Signs-out of Friendly Chat.
function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}
export function getUserName() {
  let userName = getAuth().currentUser.displayName;
  userName.toString()
  return userName.trim();
}

async function saveUser() {
  console.log('at save user')

  try {
    await setDoc(doc(db, `users/userNames/userItems`, `${getUserName()}`), {
      

      items: '',
    });
  } catch (error) {
    console.error('Error writing new message to Firebase Database', error);
  }
}

const SignIn = () => {
  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    let provider = new GoogleAuthProvider();
    await signInWithRedirect(getAuth(), provider);
  }

  return (
    <div className='sign-in'>
      {!!getAuth().currentUser ? (
        <div onClick={saveUser}>
          <h1>Already Signed In</h1>
        </div>
      ) : (
        <div className='sign-in'>
          <h1>Sign In:</h1>
          <GoogleButton onClick={signIn} />
        </div>
      )}
    </div>
  );
};

export default SignIn;
