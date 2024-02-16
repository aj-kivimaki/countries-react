// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"; // auth
import { addDoc, collection, getFirestore } from "firebase/firestore"; // db
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "countries-react-78b7f.firebaseapp.com",
  projectId: "countries-react-78b7f",
  storageBucket: "countries-react-78b7f.appspot.com",
  messagingSenderId: "952372311624",
  appId: "1:952372311624:web:3a0d0d72a00ed14a620a7d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get access to the auth and db services
const auth = getAuth(app);
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password); // create user in auth
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    }); // create user in db
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const logout = () => auth.signOut();

export {
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  logout,
  app,
  auth,
  db,
};
