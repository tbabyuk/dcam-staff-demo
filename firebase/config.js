
import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBcamKh36INoRpR98yUKNgVAAvwWwC1ZEk",
    authDomain: "dcam-hours-worked.firebaseapp.com",
    projectId: "dcam-hours-worked",
    storageBucket: "dcam-hours-worked.appspot.com",
    messagingSenderId: "758738253807",
    appId: "1:758738253807:web:47b5cae49f74413104681a"
  };


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)