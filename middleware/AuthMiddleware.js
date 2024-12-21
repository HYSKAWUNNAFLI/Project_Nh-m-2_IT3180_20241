const jwt = require('jsonwebtoken');
const pool = require('../models/database');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'your-secret-key';

const AuthMiddleware = {
    authenticateToken: (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            return res.redirect('/login');
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            res.clearCookie('token');
            return res.redirect('/login');
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const result = await pool.query(
                'SELECT * FROM admin_info WHERE admin_email = $1',
                [email]
            );

            if (result.rows.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const admin = result.rows[0];

            // So sánh trực tiếp với password từ database
            if (password !== admin.admin_password) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = jwt.sign(
                {
                    id: admin.admin_id,
                    email: admin.admin_email,
                    name: admin.admin_name
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });

            res.json({
                message: 'Login successful',
                admin_name: admin.admin_name
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    logout: (req, res) => {
        res.clearCookie('token');
        res.redirect('/login');
    }
};

module.exports = AuthMiddleware; 