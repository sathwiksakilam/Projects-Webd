// import firebase from "firebase/app";
// import "firebase/compat/database";
// import 'firebase/auth';
// import "firebase/firestore";
// import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUbFEWKFMVEX4toVpkkAxxg0oEw6bMMPE",
  authDomain: "slack-clone-project-312d3.firebaseapp.com",
  projectId: "slack-clone-project-312d3",
  storageBucket: "slack-clone-project-312d3.appspot.com",
  messagingSenderId: "842617200930",
  appId: "1:842617200930:web:ad6117ef966cd4823e057b",
  measurementId: "G-Z5FJ85SJSH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const database = firebaseApp.database;

// const db = getFirestore(app);
// const database = firebase.database();
// const database = firebase.database();
const auth = getAuth(firebaseApp);


export {auth}
// export {database};
export default firebase;
// export default firebase;


