const qr = require('qr-image');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/qrcode/gerar', (req, res) => {
    try {
        const { url, nome } = req.body;

        if (!url) {
            return res.status(400).send({ message: 'URL não fornecida' });
        }

        const fileName = nome ? `${nome}.png` : 'qrCode.png';
        const qrCode = qr.image(url, { type: 'png' });
        qrCode.pipe(fs.createWriteStream(fileName));

        res.send({ message: 'QR Code gerado com sucesso', file: fileName });
    } catch (err) {
        console.log('Erro: ', err);
        res.status(500).send({ message: 'Erro ao gerar QR Code' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando');
});