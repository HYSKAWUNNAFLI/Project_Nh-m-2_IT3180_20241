const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controllers/searchController');

// Định nghĩa route GET /search?query=<từ_khóa>
router.get('/', searchProducts);

module.exports = router;