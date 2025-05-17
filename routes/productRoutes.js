const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductsGroupedByCompany
} = require('../controllers/productController');

const { getFeaturesByProductName } = require('../controllers/generateFeaturesController');

router.post('/products', createProduct);
router.get('/products', getProducts);
router.get('/inventory', getProductsGroupedByCompany);
router.post('/generate-features', getFeaturesByProductName);

module.exports = router;
