const express = require("express");
const router = express.Router();
const defaultController = require("../controllers/defaultController");

router.get("/", defaultController.show);
router.get("/about", defaultController.show_about);

module.exports = router;