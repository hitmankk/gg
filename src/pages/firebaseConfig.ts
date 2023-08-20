
// Import the functions you need from the SDKs you need
import 'firebase/storage';
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore,doc,setDoc} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPYW3_mE5bDjtgqXZceHUZUY74OVE0qXc",
  authDomain: "giveandgive-a61cb.firebaseapp.com",
  databaseURL: "https://giveandgive-a61cb-default-rtdb.firebaseio.com",
  projectId: "giveandgive-a61cb",
  storageBucket: "giveandgive-a61cb.appspot.com",
  messagingSenderId: "473551093928",
  appId: "1:473551093928:web:eebef1b513f10fea7fc29d",
  measurementId: "G-KZ01E9LWS1",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth,db ,setDoc, doc, storage};







  function getDatabase(app: FirebaseApp) {
    throw new Error("Function not implemented.");
  }

