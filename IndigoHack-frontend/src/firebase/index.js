// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeRk17ICFkXIa5_3j_cTJfyn47lvgXHeQ",
  authDomain: "indigohack-225ca.firebaseapp.com",
  projectId: "indigohack-225ca",
  storageBucket: "indigohack-225ca.appspot.com",
  messagingSenderId: "435566989318",
  appId: "1:435566989318:web:05df241f126fe1cb053387",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };

export default app;
