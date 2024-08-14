// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvBeTF2_Fd0xQjJAZOIe9fZUFzJzk2P0A",
  authDomain: "shopsort-9d9dd.firebaseapp.com",
  projectId: "shopsort-9d9dd",
  storageBucket: "shopsort-9d9dd.appspot.com",
  messagingSenderId: "290733012441",
  appId: "1:290733012441:web:fdcedcec56cd0cf44615c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
