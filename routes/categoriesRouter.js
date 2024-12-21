const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../models/database');

// Định tuyến cho trang categories
router.get('/views/categories.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'categories.html'));
});

// API endpoint để lấy dữ liệu categories
router.get('/api/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT cat_id, cat_title FROM categories');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint để xóa category
router.delete('/api/categories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM categories WHERE cat_id = $1', [id]);
        res.json({ success: true, message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route cho trang create category
router.get('/create-new', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'create-category.html'));
});

// API endpoint để tạo category mới
router.post('/api/categories', async (req, res) => {
    try {
        const { cat_name } = req.body;
        const result = await pool.query(
            'INSERT INTO categories (cat_name) VALUES ($1) RETURNING *',
            [cat_name]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 