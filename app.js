import { saveRegister } from "./firebase.js";
function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    // actualizar el valor del input con el valor del código QR
    document.getElementById('numero_documento').value = decodedText;
  }
  
function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    //console.warn(`Code scan error = ${error}`);
}
  
let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 40, qrbox: {width: 350, height: 150} },
    /* verbose= */ false);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);


window.addEventListener('load', () => {

});

const registerForm = document.getElementById('form_register_student');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const data = {
        numero_laboratorio: formData.get('num_laboratorio'),
        tipo_documento: formData.get('tipo_documento'),
        numero_documento: formData.get('numero_documento')
    };
    // validar los datos del formulario
    const isValid = validateForm(data.numero_laboratorio, data.tipo_documento, data.numero_documento);
    if(isValid){
        saveRegister(data.numero_laboratorio, data.tipo_documento, data.numero_documento);
    }

});

const validateForm = (num_laboratorio, tipo_documento, numero_documento) => {
    if(num_laboratorio === '' || tipo_documento === '' || numero_documento === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios!'
        })
        return false;
    }
    else {
        // validar que el número de laboratorio sea un número mediante expresiones regulares
        const regex_num_laboratorio = /^[0-9]+$/;
        if(!regex_num_laboratorio.test(num_laboratorio)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El número de laboratorio debe ser un número!'
            })
            return false;
        }
        // validar que el número de documento sea un número mediante expresiones regulares
        const regex_num_documento = /^[0-9]+$/;
        if(!regex_num_documento.test(numero_documento)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El número de documento debe ser un número!'
            })
            return false;
        }
        return true;

    }
}
