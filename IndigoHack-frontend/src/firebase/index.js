// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAS0QJs2qrD8UjWFp5fhWIN33qigTYk10",
  authDomain: "indigohack-59191.firebaseapp.com",
  projectId: "indigohack-59191",
  storageBucket: "indigohack-59191.appspot.com",
  messagingSenderId: "708468330850",
  appId: "1:708468330850:web:29052395715b7664885c3b",
  measurementId: "G-JXR1RT9D8P",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };

export default app;
