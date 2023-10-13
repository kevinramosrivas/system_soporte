
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, where} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import {  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut

} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyASqiNgA5JxaIs1YhJ5qShSmQweH2krqTc",
authDomain: "soportefisiunmsm-daabe.firebaseapp.com",
projectId: "soportefisiunmsm-daabe",
storageBucket: "soportefisiunmsm-daabe.appspot.com",
messagingSenderId: "555771943224",
appId: "1:555771943224:web:63b35207abab2139dfc9cd",
measurementId: "G-WLW8HPFEBW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const saveRegister = (num_laboratorio, tipo_documento, numero_documento, tipo_evento) => {
    // añadir firestore timestamp
    addDoc(collection(db, "registers"), {
        num_laboratorio: num_laboratorio,
        tipo_documento: tipo_documento,
        numero_documento: numero_documento,
        data_created: serverTimestamp(),
        tipo_evento: tipo_evento
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        Swal.fire(
            'Registrado!',
            `El registro de ${tipo_evento} se ha realizado correctamente!`,
            'success'
        )
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!'
        })
    });
}


export const isAuth = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                console.log('Usuario logueado');
                console.log(user);
                resolve(true);
            } else {
                console.log('Usuario no logueado');
                resolve(false);
            }
        }, (error) => {
            console.log(error);
            reject(error);
        });
    });
}

export const logout = () => {
    signOut(getAuth()).then(() => {
        console.log('Usuario deslogueado');
    }).catch((error) => {
        console.log(error);
    });
}



