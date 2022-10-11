const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyAOngBO-qxtJvvMI18Z1DezInllQhv7toc",
  authDomain: "peldafeladat.firebaseapp.com",
  projectId: "peldafeladat",
  storageBucket: "peldafeladat.appspot.com",
  messagingSenderId: "443546955870",
  appId: "1:443546955870:web:622a1ceb8777ec461b84cf",
};

firebase.initializeApp(firebaseConfig);
module.exports = { firebase };
