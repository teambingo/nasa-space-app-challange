importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

const config = {
    apiKey: "AIzaSyBrBLXvN2jtAfZtHZoBFUswElS9qZ6JyoE",
    authDomain: "dustbin-6aeea.firebaseapp.com",
    databaseURL: "https://dustbin-6aeea.firebaseio.com",
    projectId: "dustbin-6aeea",
    storageBucket: "dustbin-6aeea.appspot.com",
    messagingSenderId: "218495238896"
}
firebase.initializeApp(config);
const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function(payload) {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: 'images/avatar.jpg'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});