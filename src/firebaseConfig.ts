// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfMLeI5AJMjy7_xN7bBBPcwoMEUEYIe1I",
  authDomain: "canaway-9b215.firebaseapp.com",
  projectId: "canaway-9b215",
  storageBucket: "canaway-9b215.appspot.com",
  messagingSenderId: "107306126925",
  appId: "1:107306126925:web:0a1502ed8ebcbe4c1d9604",
  measurementId: "G-LDGHT8K5E5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);