const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../models/database');

// Định tuyến cho trang user
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'user.html'));
});

// API endpoint để lấy dữ liệu users
router.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT user_id, first_name, last_name, email, phone_number, address FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint để xóa user
router.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 