const express = require('express');
const router = express.Router();
const { createCompany, getCompanies, deleteCompany } = require('../controllers/companyController');

router.post('/companies', createCompany);
router.get('/companies', getCompanies);
router.delete('/companies/:nit', deleteCompany);

module.exports = router;
