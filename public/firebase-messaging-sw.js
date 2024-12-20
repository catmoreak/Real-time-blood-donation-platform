// importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js"
// );

// importScripts("/firebase/firebase-app.js");
// importScripts("/firebase/firebase-messaging.js");

importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDvw9xC6byg4DkNpWzzB4466BidJCJRggU",
  authDomain: "real-time-blood-donation-c0c32.firebaseapp.com",
  projectId: "real-time-blood-donation-c0c32",
  storageBucket: "real-time-blood-donation-c0c32.firebasestorage.app",
  messagingSenderId: "99078731654",
  appId: "1:99078731654:web:9724de214ab7b8cb2f5e07",
  measurementId: "G-BX25M7M35P",
  vapidKey:
    "BAdlA-8wJBL7nixKyuIyTFy6_M7iUpACPCd9b49nT3KDWrUXMtIfW6QshVsL5w_9I1NfqR14bmyzRKgPkkskIEQ",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Recieved background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://png.pngtree.com/png-clipart/20230426/original/pngtree-blood-drop-blood-red-cartoon-illustration-png-image_9103018.png",
    data: {
      url: "payload.notification.click_action",
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification

  const url = event.notification.data.url; // Retrieve the URL from notification data
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // If the URL is already open, focus it; otherwise, open a new window
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
