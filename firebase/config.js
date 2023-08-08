
import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCIuBmRbYjwpQf8cky3OoVdGN4kvRJAoMU",
  authDomain: "dcam-staff-demo.firebaseapp.com",
  projectId: "dcam-staff-demo",
  storageBucket: "dcam-staff-demo.appspot.com",
  messagingSenderId: "333129012535",
  appId: "1:333129012535:web:2fbd22f183042993fa36b2",
  measurementId: "G-63E5EDK729"
};


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)