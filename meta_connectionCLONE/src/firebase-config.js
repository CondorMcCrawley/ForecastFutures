
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBVPAXysuJ70qUO60GiyIFBE95DXEIc058",
  authDomain: "forecastfuturesdb.firebaseapp.com",
  databaseURL: "https://forecastfuturesdb-default-rtdb.firebaseio.com",
  projectId: "forecastfuturesdb",
  storageBucket: "forecastfuturesdb.appspot.com",
  messagingSenderId: "240868430476",
  appId: "1:240868430476:web:5fd4c700bdcff07bbc21a9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);