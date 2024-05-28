// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgr4bxMIEliBbx-lU2ylQ7noqwZRJuTzM",
  authDomain: "recipe-view-management-system.firebaseapp.com",
  projectId: "recipe-view-management-system",
  storageBucket: "recipe-view-management-system.appspot.com",
  messagingSenderId: "608916112932",
  appId: "1:608916112932:web:374b6934d692f0d440fab1",
  measurementId: "G-VVREBMKY8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//new code

const auth = getAuth(app);

// Check if analytics is supported
isSupported().then(supported => {
  if (supported) {
    getAnalytics(app);
  } else {
    console.log("Analytics is not supported in this environment.");
  }
}).catch(error => {
  console.error("Error checking for analytics support: ", error);
});

export { auth };