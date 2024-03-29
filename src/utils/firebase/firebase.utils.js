import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBMsz2W4Q9cgwGmKmGTKNbPhv-K_AS9L04",
  authDomain: "crown-clothing-db-6e272.firebaseapp.com",
  projectId: "crown-clothing-db-6e272",
  storageBucket: "crown-clothing-db-6e272.appspot.com",
  messagingSenderId: "57453419333",
  appId: "1:57453419333:web:5d592b07aec125f3f8bc2c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProivder = new GoogleAuthProvider();
googleProivder.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProivder);
export const SignInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProivder);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  // await Promise.reject(
  //   new Error("new error woops, in fetching categories and documents")
  // );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (userAuth, info = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // check if userdata
  // create / set the doc with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email, cartItems } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...cartItems,
        ...info,
      });
    } catch (error) {
      console.error(error);
    }
  }

  // if exist ? userDocRef
  return userDocRef;
};

export const updateUserDataInFirebase = async (field, data) => {
  const auth = getAuth();
  if (!auth || !auth.currentUser) return;

  try {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, {
      [field]: data,
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const getCurrentUserCartItems = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No user is signed in!");
  }

  const userDocRef = doc(db, "users", currentUser.uid);
  const userDocSnapshot = await getDoc(userDocRef);

  if (!userDocSnapshot.exists()) {
    throw new Error("User document does not exist!");
  }

  const cartItems = userDocSnapshot.get("cartItems");
  if (!cartItems || !Array.isArray(cartItems)) {
    throw new Error("Invalid cartItems data!");
  }

  return cartItems;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeListener = (callback) =>
  onAuthStateChanged(auth, callback);
