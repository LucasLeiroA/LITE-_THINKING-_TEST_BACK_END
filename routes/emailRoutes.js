const express = require('express');
const router = express.Router();
const { sendPdfEmail } = require('../controllers/emailController');

router.post('/send-pdf', sendPdfEmail);

module.exports = router;
