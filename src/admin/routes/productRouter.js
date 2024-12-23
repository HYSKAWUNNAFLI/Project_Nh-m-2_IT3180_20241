const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../models/database');
const multer = require('multer');

// Cấu hình multer để xử lý upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/products')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

// Route cho trang products
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'product.html'));
});

// Route cho trang create product
router.get('/create-new', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'create-product.html'));
});

// API endpoint để lấy dữ liệu products
router.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT product_id, product_title, product_price, product_image FROM products');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint để tạo product mới
router.post('/api/products', upload.single('product_image'), async (req, res) => {
    try {
        const { product_title, product_description, product_price, cat_id } = req.body;
        const product_image = req.file ? `/uploads/products/${req.file.filename}` : null;

        const result = await pool.query(
            'INSERT INTO products (product_title, product_description, product_price, product_image, cat_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [product_title, product_description, product_price, product_image, cat_id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint để xóa product
router.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM products WHERE product_id = $1', [id]);
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 