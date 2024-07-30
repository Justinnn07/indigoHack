// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAAS0QJs2qrD8UjWFp5fhWIN33qigTYk10",
  authDomain: "indigohack-59191.firebaseapp.com",
  projectId: "indigohack-59191",
  storageBucket: "indigohack-59191.appspot.com",
  messagingSenderId: "708468330850",
  appId: "1:708468330850:web:29052395715b7664885c3b",
  measurementId: "G-JXR1RT9D8P",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("payload", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
