// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC5i-LBnIIeK-_CommeivZbhIa7GWPeCQ",
  authDomain: "recipe-preserve.firebaseapp.com",
  databaseURL: "https://recipe-preserve-default-rtdb.firebaseio.com",
  projectId: "recipe-preserve",
  storageBucket: "recipe-preserve.appspot.com",
  messagingSenderId: "218992542606",
  appId: "1:218992542606:web:e90a350e477be04cc05adf"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;