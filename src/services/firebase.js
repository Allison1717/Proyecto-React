// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
//1. Iniciar la conexión a firestore
const firebaseConfig = {
  apiKey: "AIzaSyDve4ECCijn18qnRsr2tHRztKsjQgzklCo",
  authDomain: "la-casa-del-libro.firebaseapp.com",
  projectId: "la-casa-del-libro",
  storageBucket: "la-casa-del-libro.appspot.com",
  messagingSenderId: "169767342293",
  appId: "1:169767342293:web:90a4f33d1485fbf790125c",
  measurementId: "G-TY65D6RC9T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Funcion que retorna todos los items de la colección "Libros"
export async function getItems() {

  const librosCollection = collection(db, "libros");
  const querySnapshot = await getDocs(librosCollection);

  const dataDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataDocs;
}
export function getItemsPromise() {
  return new Promise((resolve, reject) => {
    const librosCollectionRef = collection(db, "libros");
    getDocs(librosCollectionRef).then((querySnapshot) => {
      const dataDocs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      resolve(dataDocs);
    });
  });
}
// Funcion que retorna un documento segun su ID
export  async function getSingleItem(itemid) {
  // 1. Necesito una referencia a la colección
  const librosCollectionRef = collection(db, "productos");

  // 2. Referencia al documento
  const librosRef = doc(librosCollectionRef, itemid);

  // 3. Recibimos el snap del doc con getDoc(referencia)
  const snapshot = await getDoc(librosRef);

  return { ...snapshot.data(), id: snapshot.id };
}

//Funcion que retorna docs de una colección segun una Query o "consulta"
export  async function getItemsByGender(genderid) {
  // 1. Necesito una referencia a la colección
  const librosCollectionRef = collection(db, "libros");

  // 2. Crear una query personalizada
  console.log(genderid);
  const q = query(librosCollectionRef, where("gender", "==", genderid));

  //3. Pedirle a Firebase los documentos de esa Query
  const querySnapshot = await getDocs(q);

  // 4. Mapeamos el snapshot para sacar los datos
  const dataDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  console.log(dataDocs);
}

export default getItems;
