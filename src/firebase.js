import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAcRiiRDsacSggiBhtxFZMjRTm730TxYpQ",
  authDomain: "this-coder-alive-todoapp.firebaseapp.com",
  projectId: "this-coder-alive-todoapp",
  storageBucket: "this-coder-alive-todoapp.appspot.com",
  messagingSenderId: "281106416676",
  appId: "1:281106416676:web:59a3a31ce9f5138b79c4b1",
  measurementId: "G-R4TJJ2R5RM"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}