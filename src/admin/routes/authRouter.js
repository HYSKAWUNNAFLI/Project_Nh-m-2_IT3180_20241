const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

router.post('/login', AuthMiddleware.login);
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

router.get('/check', (req, res) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            res.json({
                isAuthenticated: true,
                user: {
                    name: decoded.name,
                    email: decoded.email
                }
            });
        } catch (err) {
            res.json({ isAuthenticated: false });
        }
    } else {
        res.json({ isAuthenticated: false });
    }
});

module.exports = router; 