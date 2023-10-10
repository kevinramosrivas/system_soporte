
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
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

export const saveRegister = async(num_laboratorio, tipo_documento, numero_documento) => {
    //verificar si existe un registro previo el mismo día
    // si es asi regitrar como salida y si no como entrada
    const q = query(collection(db, "registers"));
    const q1 = query(q, where("tipo_documento", "==", tipo_documento), where("numero_documento", "==", numero_documento));
    const q2 = query(q1, where("tipo_registro", "==", "entrada"));
    const querySnapshot = await getDocs(q2);
    if (querySnapshot.empty) {
        console.log("No hay registros de entrada");
        addRegister(num_laboratorio, tipo_documento, numero_documento, "entrada");
    } else {
        console.log("Hay registros de entrada");
        addRegister(num_laboratorio, tipo_documento, numero_documento, "salida");
    }
}


const addRegister = (num_laboratorio, tipo_documento, numero_documento, tipo_registro) => {
        // añadir firestore timestamp
        addDoc(collection(db, "registers"), {
            num_laboratorio: num_laboratorio,
            tipo_documento: tipo_documento,
            numero_documento: numero_documento,
            tipo_registro: tipo_registro,
            data_created: serverTimestamp()
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            Swal.fire(
                'Registrado!',
                `El registro de {tipo_registro} fue exitoso!`,
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




