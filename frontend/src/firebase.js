// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAyzXzDUEb0lWP3Boy8nkpGN0wx3_NsbQ",
  authDomain: "task-app-948ff.firebaseapp.com",
  projectId: "task-app-948ff",
  storageBucket: "task-app-948ff.appspot.com",
  messagingSenderId: "563864642434",
  appId: "1:563864642434:web:f2f7e3139777360537659b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth };