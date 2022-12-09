import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App.js';
import { BrowserRouter } from 'react-router-dom';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDb0zoSbQQz1ZfM_cbjyhKR9TXiahmtyY",
  authDomain: "fake-store-597ae.firebaseapp.com",
  projectId: "fake-store-597ae",
  storageBucket: "fake-store-597ae.appspot.com",
  messagingSenderId: "968634306056",
  appId: "1:968634306056:web:6ed963ab57a71c56f78bbd",
  measurementId: "G-8S63D9Z3LT"
};

// Initialize Firebase
export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      'No Firebase configuration object provided.' +
        '\n' +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return firebaseConfig;
  }
}
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
