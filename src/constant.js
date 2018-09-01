import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBrBLXvN2jtAfZtHZoBFUswElS9qZ6JyoE",
    authDomain: "dustbin-6aeea.firebaseapp.com",
    databaseURL: "https://dustbin-6aeea.firebaseio.com",
    projectId: "dustbin-6aeea",
    storageBucket: "dustbin-6aeea.appspot.com",
    messagingSenderId: "218495238896"
}

firebase.initializeApp(config)
export const ref = firebase.database().ref('/events')
export const eventref = firebase.database().ref('/notif')
export const key = "AIzaSyCGKx4dxdNhauAxZQUSfYq6ux1CmH2-Odw"
export const firebaseAuth = firebase.auth
export const msg = firebase.messaging()