import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmDERN_2oteKivdsipDLrPL_DlFn9O5ow",
  authDomain: "istidama-web.firebaseapp.com",
  projectId: "istidama-web",
  storageBucket: "istidama-web.firebasestorage.app",
  messagingSenderId: "306963832109",
  appId: "1:306963832109:web:3e9b5dcdeaad79254987a4",
  measurementId: "G-ESCB3GW5S8"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
export const db = getFirestore(app)
export const auth = getAuth(app)