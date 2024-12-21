const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../models/database');

// Route cho trang admin
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'admin.html'));
});

// Thêm route cho trang create-new-admin
router.get('/create-new-admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'create-new-admin.html'));
});

// API endpoint để lấy danh sách admin
router.get('/api/admins', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT admin_id, admin_name, admin_email, admin_password FROM admin_info'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint để xóa admin
router.delete('/api/admins/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM admin_info WHERE admin_id = $1', [id]);
        res.json({ success: true, message: 'Admin deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint để tạo admin mới
router.post('/api/admins', async (req, res) => {
    try {
        const { admin_name, admin_email, admin_password } = req.body;

        // Kiểm tra email đã tồn tại chưa
        const checkEmail = await pool.query(
            'SELECT * FROM admin_info WHERE admin_email = $1',
            [admin_email]
        );

        if (checkEmail.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Thêm admin mới với SERIAL/AUTO INCREMENT cho admin_id
        const result = await pool.query(
            `INSERT INTO admin_info (admin_name, admin_email, admin_password) 
             VALUES ($1, $2, $3) 
             RETURNING admin_id, admin_name, admin_email`,
            [admin_name, admin_email, admin_password]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        if (err.code === '23505') { // Unique violation
            res.status(400).json({ message: 'Admin already exists' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

module.exports = router; 