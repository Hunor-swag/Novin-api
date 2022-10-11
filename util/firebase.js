const firebase = require('firebase');

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOngBO-qxtJvvMI18Z1DezInllQhv7toc",
  authDomain: "peldafeladat.firebaseapp.com",
  projectId: "peldafeladat",
  storageBucket: "peldafeladat.appspot.com",
  messagingSenderId: "443546955870",
  appId: "1:443546955870:web:622a1ceb8777ec461b84cf"
};


firebase.initializeApp(firebaseConfig);
module.exports = { firebase };