import firebase from "firebase/app"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyDjFhhGW3cRmqq4bYCarNJHV_3vFXl58Qs",
    authDomain: "bemygym-123.firebaseapp.com",
    databaseURL: "https://bemygym-123.firebaseio.com",
    projectId: "bemygym-123",
    storageBucket: "gs://bemygym-123.appspot.com",
    messagingSenderId: "1083395574248",
    appId: "1:1083395574248:web:60071809562cbbfd003c5d",
    measurementId: "G-X9CPF7Z9ZV"
  };
  
  firebase.initializeApp(firebaseConfig);

  

  export default firebase