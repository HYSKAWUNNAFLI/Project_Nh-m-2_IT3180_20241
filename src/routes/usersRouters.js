const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { authenticator, authorize } = require('../middleware/authMiddleware');
const { register, login } = require('../controllers/usersController');

router.get("/", usersController.show);
// Route for registering a user
router.post('/register', register);

router.post('/login', (req, res, next) => {
    console.log('Login route hit:', req.body); // Xác nhận router nhận được yêu cầu
    next(); // Tiếp tục xử lý trong controller
});

// Route for logging in a user
router.post('/login', login);

// Protected route (Example: Payment success)
router.get('/payment/success', authenticator, (req, res) => {
    res.render('success.handlebars', { title: "Payment Successful" });
});

// Route hiển thị trang home sau khi đăng nhập thành công
router.get('/', authenticator, (req, res) => {
    res.render('index.handlebars', {
        title: "Home",
        message: `Welcome back!`,
    });
});

// Route xử lý logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('Unable to log out');
        }

        // Xóa cookie session
        res.clearCookie('connect.sid', { path: '/' });

        // Chuyển hướng về trang chủ
        return res.redirect('/');
    });
});


module.exports = router;

