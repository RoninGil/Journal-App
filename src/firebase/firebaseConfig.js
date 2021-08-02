import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDfF6Pn7B3AN-bkRUVRUMIV9TTkmPlpPfU",
    authDomain: "react-curso-3127c.firebaseapp.com",
    projectId: "react-curso-3127c",
    storageBucket: "react-curso-3127c.appspot.com",
    messagingSenderId: "779916178811",
    appId: "1:779916178811:web:588bb91b235ff7f7e6f9de"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }
