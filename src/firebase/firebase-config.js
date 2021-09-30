import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyACsVnhS7bPrIDazVGFXLNZGb8Dl1hJ35c",
  authDomain: "react-journal-188c5.firebaseapp.com",
  projectId: "react-journal-188c5",
  storageBucket: "react-journal-188c5.appspot.com",
  messagingSenderId: "395847653929",
  appId: "1:395847653929:web:1ec22f3dd912c87a601a38"
};

// Initialize Firebase
initializeApp(firebaseConfig);
 
const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();
 
export{
    db,
    googleAuthProvider
}