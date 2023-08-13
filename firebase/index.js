import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2_gMqgidAOoQCoNIq1_nKZ9EtFYXtdqg",
  authDomain: "resultchecker-ecbe0.firebaseapp.com",
  projectId: "resultchecker-ecbe0",
  storageBucket: "resultchecker-ecbe0.appspot.com",
  messagingSenderId: "877383804983",
  appId: "1:877383804983:web:e289943973f3496f7037b2",
  measurementId: "G-TP7DCLCBGM"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);

export {firestore, auth, database, storage };