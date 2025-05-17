const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const sendPdfEmail = async (req, res) => {
    const { to, base64pdf, filename } = req.body;

    if (!to || !base64pdf || !filename) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Inventario PDF',
            text: 'Adjunto el PDF del inventario solicitado.',
            attachments: [{
                filename,
                content: base64pdf,
                encoding: 'base64'
            }]
        });

        res.json({ message: 'Correo enviado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al enviar el correo' });
    }
};

module.exports = { sendPdfEmail };
