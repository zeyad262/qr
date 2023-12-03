
document.getElementById('btn').addEventListener('click', function()
{let val = document.getElementById("barcodeInput").value;
JsBarcode(".barcode", val, {displayValue: false, formate:'code128' });
}  )

function generateCode(containerId, codeType) {
    const inputValue = document.getElementById('linkInput').value;
    const codeContainer = document.getElementById(containerId);

    // Validate input
    if (!isValidInput(inputValue)) {
        alert('Please enter a valid value');
        return;
    }

    // Clear previous code
    codeContainer.innerHTML = '';

    // Generate code
    if (codeType === 'qrcode') {
        generateQRCode(codeContainer, inputValue);
    }
}

function generateQRCode(container, value) {
    const qrCode = new QRCode(container, value);
}

function isValidInput(value) {
    return value.trim().length > 0;
}

// Add event listener for the QR Code download button
document.getElementById('download-qr-btn').addEventListener('click', function () {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const dataURL = qrCodeContainer.querySelector('img').src;

    // Create a temporary link element
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);

    // Trigger the download
    downloadLink.click();

    // Remove the temporary link element
    document.body.removeChild(downloadLink);
});

// Assuming you have a function generateBarcode(value) that generates the barcode and updates the SVG
document.getElementById('btn').addEventListener('click', function () {
    const inputValue = document.getElementById('barcodeInput').value;
    generateBarcode(inputValue);
});

document.getElementById('download-barcode-btn').addEventListener('click', function () {
    const barcodeContainer = document.querySelector('.barcode'); // Use querySelector to select by class

    // Create a temporary canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set the canvas size to match the SVG size
    canvas.width = barcodeContainer.clientWidth;
    canvas.height = barcodeContainer.clientHeight;

    // Use canvg to render the SVG onto the canvas
    canvg(canvas, barcodeContainer.outerHTML);

    // Convert the canvas to a data URL (PNG format)
    const dataURL = canvas.toDataURL('image/png');

    // Create a temporary link element
    const downloadLink = document.createElement('a');
    const blob = dataURItoBlob(dataURL);
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'barcode.png';
    document.body.appendChild(downloadLink);

    // Trigger the download
    downloadLink.click();

    // Remove the temporary link element
    document.body.removeChild(downloadLink);
});

// Helper function to convert data URI to Blob
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}
