import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9CQFxsKDnf66D3Vp_rkk9MGNyCAVOCbc",
  authDomain: "task-3fa5f.firebaseapp.com",
  projectId: "task-3fa5f",
  storageBucket: "task-3fa5f.appspot.com",
  messagingSenderId: "917212843764",
  appId: "1:917212843764:web:38538edc876badfbc3d8a1",
  measurementId: "G-FYRSYC66R5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// collection ref
const hotelRef = collection(db, 'hotels');

export { db, hotelRef};
