import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_lCknVPGM5R5YQ6U4UiPDUSSHvgHbyig",
  authDomain: "pasteleria-coderhouse.firebaseapp.com",
  projectId: "pasteleria-coderhouse",
  storageBucket: "pasteleria-coderhouse.firebasestorage.app",
  messagingSenderId: "761579330333",
  appId: "1:761579330333:web:a13a4dcab45f8acef6dff4",
  measurementId: "G-Z5CR8JDMTQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);