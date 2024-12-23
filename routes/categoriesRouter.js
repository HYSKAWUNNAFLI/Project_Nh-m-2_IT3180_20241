const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../models/database');

// Route cho trang categories
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'categories.html'));
});

// Route cho trang create category
router.get('/create-new', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'create-category.html'));
});

// API endpoint để lấy danh sách categories
router.get('/api/categories', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT cat_id, cat_title FROM categories'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint để tạo category mới
router.post('/api/categories', async (req, res) => {
    try {
        const { cat_title } = req.body;

        // Validate dữ liệu đầu vào
        if (!cat_title) {
            return res.status(400).json({
                message: 'Category name is required'
            });
        }

        // Kiểm tra category đã tồn tại chưa
        const checkCategory = await pool.query(
            'SELECT * FROM categories WHERE cat_title = $1',
            [cat_title]
        );

        if (checkCategory.rows.length > 0) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Thêm category mới với SERIAL/AUTO INCREMENT cho cat_id
        const result = await pool.query(
            `INSERT INTO categories (cat_title) 
             VALUES ($1) 
             RETURNING cat_id, cat_title`,
            [cat_title.trim()]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0],
            message: 'Category created successfully'
        });
    } catch (err) {
        console.error('Error creating category:', err);
        res.status(500).json({
            success: false,
            message: err.message || 'Error creating category'
        });
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

module.exports = router; 