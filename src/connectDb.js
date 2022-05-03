// import tools from firebase
import { initalizeApp, getApps, cert } from "firebase-admin/app";

// import firestore from firebase
import { getFirestore } from "firebase-admin/firestore";

//import my credentials to connect to firebase
import myCredentials from "../Credentials.js";

//write a funcction to connect to firebase
export default function connectDb() {
  //first check to see if we are already connected
  if (getApps().length === 0) {
    //if not, connect...
    initalizeApp({
      credential: cert(myCredentials),
    });
  }
  //either way...
  return getFirestore();
  //return the connection firestore
}

// const firebaseConnect = ()
