const express = require('express');
const router = express.Router();
const { suggestPrices } = require('../controllers/aiController');

router.post('/suggest-prices', suggestPrices);

module.exports = router;
