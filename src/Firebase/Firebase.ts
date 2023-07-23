import firebase from 'firebase/app'
import { initializeAppCheck } from 'firebase/app-check';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {initializeApp} from 'firebase/app'
import {getStorage, ref,uploadBytes,getDownloadURL,UploadTask} from 'firebase/storage'
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyC_ouxh520pRxwCbzn7Ed3u3d9N5YxzFY0",
  authDomain: "authentication-test-8dd29.firebaseapp.com",
  databaseURL: "https://authentication-test-8dd29-default-rtdb.firebaseio.com",
  projectId: "authentication-test-8dd29",
  storageBucket: "authentication-test-8dd29.appspot.com",
  messagingSenderId: "842134803949",
  appId: "1:842134803949:web:39bef99a44499f88cd03e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export default app
export const db = getFirestore(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)
