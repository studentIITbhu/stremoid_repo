// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts, search } = require('../controllers/productController');
router.post('/', getAllProducts);  

router.get('/', getAllProducts); 






        // GET /products?page=1&limit=10
//router.get('/search', search);        // GET /products/search?brand=...&minPrice=...&maxPrice=...
module.exports = router;
