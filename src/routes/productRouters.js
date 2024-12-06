const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.showAllProducts);
router.get('/shoes', productController.getProductsByCategory);
router.get('/top', productController.getProductsByCategory);
router.get('/bottom', productController.getProductsByCategory);
router.get('/accessories', productController.getProductsByCategory);

module.exports = router;