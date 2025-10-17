// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getProducts, search } = require('../controllers/productController');

router.get('/', getProducts);         // GET /products?page=1&limit=10
router.get('/search', search);        // GET /products/search?brand=...&minPrice=...&maxPrice=...
module.exports = router;
