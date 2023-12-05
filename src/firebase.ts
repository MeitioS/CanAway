import { getAuth } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDWzHajqdApvnv2hPFOLZhX02G7IwdICb0",
    authDomain: "canaway-9b984.firebaseapp.com",
    projectId: "canaway-9b984",
    storageBucket: "canaway-9b984.appspot.com",
    messagingSenderId: "693774003869",
    appId: "1:693774003869:web:58905f6ec03c761d99ae74",
    measurementId: "G-H15GEX39Z4"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore(firebase);

export {firebase, auth, db};