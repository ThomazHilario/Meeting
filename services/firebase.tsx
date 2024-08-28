// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7q3h5f4uwDsghCEJz6IzRNSmHorVwE-I",
  authDomain: "fornecedores-b4db8.firebaseapp.com",
  projectId: "fornecedores-b4db8",
  storageBucket: "fornecedores-b4db8.appspot.com",
  messagingSenderId: "61994159187",
  appId: "1:61994159187:web:6b7f3c673ea73857880aa6",
  measurementId: "G-3B6VJ9Q8F0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// DataBase
const db = getFirestore(app)

// Storage
const storage = getStorage(app)


export {db, storage}