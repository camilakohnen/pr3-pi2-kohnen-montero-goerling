import app from 'firebase/app'
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB5FMLxtmLs7N5r1mB-l_gmtjKZMc_eaSo",
    authDomain: "pruebafirebase-79bdf.firebaseapp.com",
    projectId: "pruebafirebase-79bdf",
    storageBucket: "pruebafirebase-79bdf.appspot.com",
    messagingSenderId: "624264126911",
    appId: "1:624264126911:web:06e33045bf18ab7dea010a"
  };

  app.initializeApp(firebaseConfig) //conecta la aplicacion con el firebase que cree

  export const auth = firebase.auth() // lo llamo cuando necesito autentificar el usuario 
  export const db = app.firestore() // lo lalmo cuando neceito llamar a mi base de datos 
  export const storage = app.storage()

