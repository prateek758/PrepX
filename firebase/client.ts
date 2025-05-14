// Import the functions you need from the SDKs you need
import { initializeApp,getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBONL7vonQq5n-46XqAksNpZK8Qp64XJUc",
  authDomain: "prepx-1fd36.firebaseapp.com",
  projectId: "prepx-1fd36",
  storageBucket: "prepx-1fd36.firebasestorage.app",
  messagingSenderId: "512263350577",
  appId: "1:512263350577:web:f05ae0ba4612cdb54b6810",
  measurementId: "G-9SCDC7BT6B"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
