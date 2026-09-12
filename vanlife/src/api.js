// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, query, where } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWAtUeCJx6g5mrOP7Ejg-lVslBBc9OBTQ",
  authDomain: "vanlife-cc.firebaseapp.com",
  projectId: "vanlife-cc",
  storageBucket: "vanlife-cc.firebasestorage.app",
  messagingSenderId: "998928972315",
  appId: "1:998928972315:web:ac04246ad6abacc345d6be"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const vansCollectionRef = collection(db, "vans");


export async function getVan(id) {
  const docRef = doc(db, "vans", id)
  const snapshot = await getDoc(docRef)
  return {
    ...snapshot.data(),
    id: snapshot.id
  }
}

// export async function getVans(id) {
//   const url = id ? `/api/vans/${id}` : "/api/vans"
//   const res = await fetch(url)
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status
//     }
//   }
//   const data = await res.json()
//   return data.vans
// }

export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef)
  const vans = snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  // console.log(vans)
  return vans
}

// export async function getHostVans(id) {
//   const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//   const res = await fetch(url)
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch host vans",
//       statusText: res.statusText,
//       status: res.status
//     }
//   }
//   const data = await res.json()
//   return data.vans
// }

export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"))
  const snapshot = await getDocs(q)
  const vans = snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return vans
}

export async function loginUser(creds) {
  const res = await fetch("/api/login",
    { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status
    }
  }

  return data
}
