document.addEventListener('DOMContentLoaded', function() {
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const textInput = document.getElementById('text');
    const resultDiv = document.getElementById('result');

    encryptBtn.addEventListener('click', function() {
        const text = textInput.value;
        if (text.trim() === '') {
            resultDiv.textContent = 'Please enter some text.';
            return;
        }
        // Call the API to encrypt the text
        fetch('/encrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        })
        .then(response => response.json())
        .then(data => {
            resultDiv.textContent = 'Encrypted Text: ' + data.ciphertext;
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'An error occurred while encrypting the text.';
        });
    });

    decryptBtn.addEventListener('click', function() {
        const ciphertext = textInput.value;
        if (ciphertext.trim() === '') {
            resultDiv.textContent = 'Please enter some ciphertext.';
            return;
        }
        // Call the API to decrypt the ciphertext
        fetch('/decrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ciphertext: ciphertext })
        })
        .then(response => response.json())
        .then(data => {
            resultDiv.textContent = 'Decrypted Text: ' + data.text;
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = 'An error occurred while decrypting the ciphertext.';
        });
    });
});
