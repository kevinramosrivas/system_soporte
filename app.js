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
    { fps: 40, qrbox: {width: 250, height: 250} },
    /* verbose= */ false);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);


window.addEventListener('load', () => {

});
