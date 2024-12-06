const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.showAllProducts);
router.get('/shoes', productController.showAllProductsByCategory1);
router.get('/top', productController.showAllProductsByCategory2);
router.get('/bottom', productController.showAllProductsByCategory3);
router.get('/accessories', productController.showAllProductsByCategory4);


module.exports = router;