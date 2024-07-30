// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBeRk17ICFkXIa5_3j_cTJfyn47lvgXHeQ",
  authDomain: "indigohack-225ca.firebaseapp.com",
  projectId: "indigohack-225ca",
  storageBucket: "indigohack-225ca.appspot.com",
  messagingSenderId: "435566989318",
  appId: "1:435566989318:web:05df241f126fe1cb053387",
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
