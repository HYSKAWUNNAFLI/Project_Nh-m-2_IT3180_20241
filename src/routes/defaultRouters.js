const express = require("express");
const router = express.Router();
const defaultController = require("../controllers/defaultController");

router.get("/", defaultController.show);
router.get("/about", defaultController.show_about);
router.get('/', (req, res) => {
    if (req.session.user) {
        console.log('User found in session:', req.session.user);
    } else {
        console.log('No user data in session');
    }
    res.render('index.handlebars', {
        title: "Home",
        user: req.session.user || null // Lấy thông tin người dùng từ session
    });
});


module.exports = router;