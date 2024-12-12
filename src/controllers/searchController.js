const pool = require('../models/db'); // Giả sử bạn đã kết nối pg pool ở đây

module.exports.searchProducts = async (req, res) => {
    try {
        const query = req.query.query || '';

        if (!query) {
            // Nếu không có từ khóa tìm kiếm, trả về danh sách trống
            return res.json({ products: [] });
        }

        // Truy vấn tìm sản phẩm có tên bắt đầu bằng từ khóa (case-insensitive)
        // Giả sử bạn có bảng "products" với cột "product_title".
        const sql = `
            SELECT product_id, product_title, product_image, product_price
            FROM products
            WHERE product_title ILIKE $1
            LIMIT 10
        `;

        const values = [`${query}%`];
        // Sử dụng pattern matching: query% để tìm các sản phẩm bắt đầu với query

        const result = await pool.query(sql, values);

        res.json({ products: result.rows });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
