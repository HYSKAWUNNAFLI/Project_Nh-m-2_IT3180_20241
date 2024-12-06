const pool = require('../models/db'); // Kết nối database từ db.js

const showAllProducts = async (req, res) => {
    try {
        // Thực hiện query để lấy tất cả sản phẩm
        const result = await pool.query('SELECT * FROM products');
        
        // Kiểm tra nếu không có sản phẩm nào
        if (result.rows.length === 0) {
            return res.render('products', { message: 'No products found.' });
        }

        // Gửi dữ liệu sản phẩm đến view
        res.render('products', { products: result.rows });
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { showAllProducts };
