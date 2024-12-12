const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controllers/searchController');

// Route GET /search
router.get('/', async (req, res) => {
    try {
        const query = req.query.query || '';
        if (!query.trim()) {
            // Nếu không có từ khóa tìm kiếm, chuyển đến trang tìm kiếm với danh sách rỗng
            return res.render('search', { products: [], query });
        }

        // Gọi hàm searchProducts để xử lý logic tìm kiếm
        const result = await searchProducts(req, res, true);

        // Nếu tìm thấy sản phẩm khớp hoàn toàn
        if (result.exactMatch) {
            return res.redirect(`/viewdetail/${result.exactMatch.product_id}`);
        }

        // Nếu chỉ tìm thấy sản phẩm khớp một phần, render trang tìm kiếm
        return res.render('search', result.response);
    } catch (error) {
        console.error('Error in search route:', error);
        res.status(500).render('search', { products: [], query: req.query.query, error: 'Internal server error' });
    }
});

module.exports = router;
