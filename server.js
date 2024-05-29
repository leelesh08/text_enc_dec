const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto-js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for encryption
app.post('/encrypt', (req, res) => {
    const text = req.body.text;
    const ciphertext = crypto.AES.encrypt(text, 'secret key 123').toString();
    res.json({ ciphertext: ciphertext });
});

// Route for decryption
app.post('/decrypt', (req, res) => {
    const ciphertext = req.body.ciphertext;
    const bytes = crypto.AES.decrypt(ciphertext, 'secret key 123');
    const text = bytes.toString(crypto.enc.Utf8);
    res.json({ text: text });
});

// Route to serve the index.html file for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
