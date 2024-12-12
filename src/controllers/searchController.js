const pool = require('../models/db');

module.exports.searchProducts = async (req, res, renderView = false) => {
    try {
        const query = req.query.query || '';
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        if (!query.trim()) {
            // Trả về danh sách rỗng nếu không có từ khóa
            const response = { products: [], query, currentPage: page, totalPages: 0 };
            return renderView ? res.render('search', response) : { response };
        }

        const keywords = query.trim().split(' ').map(word => `%${word}%`);

        // Truy vấn kiểm tra nếu có tên sản phẩm khớp hoàn toàn
        const exactMatchSql = `
            SELECT product_id, product_title, product_image, product_price
            FROM products
            WHERE LOWER(product_title) = LOWER($1)
            LIMIT 1
        `;
        const exactMatchResult = await pool.query(exactMatchSql, [query.trim()]);

        if (exactMatchResult.rows.length > 0) {
            // Nếu tìm thấy sản phẩm khớp hoàn toàn, trả về thông tin sản phẩm
            return {
                exactMatch: exactMatchResult.rows[0], // Trả về sản phẩm khớp hoàn toàn
            };
        }

        // Truy vấn tìm các sản phẩm khớp một phần
        const partialMatchSql = `
            SELECT product_id, product_title, product_image, product_price
            FROM products
            WHERE ${keywords.map((_, idx) => `product_title ILIKE $${idx + 1}`).join(' AND ')}
            LIMIT $${keywords.length + 1} OFFSET $${keywords.length + 2}
        `;
        const partialMatchResult = await pool.query(partialMatchSql, [...keywords, limit, offset]);

        // Truy vấn tổng số sản phẩm
        const countSql = `
            SELECT COUNT(*) AS total
            FROM products
            WHERE ${keywords.map((_, idx) => `product_title ILIKE $${idx + 1}`).join(' AND ')}
        `;
        const totalCountResult = await pool.query(countSql, keywords);

        const totalProducts = parseInt(totalCountResult.rows[0].total, 10);
        const totalPages = Math.ceil(totalProducts / limit);

        const response = {
            products: partialMatchResult.rows,
            query,
            currentPage: page,
            totalPages,
            currentPageGt1: page > 1,
            currentPageLtTotalPages: page < totalPages,
            currentPageMinus1: page - 1,
            currentPagePlus1: page + 1,
            pagination: Array.from({ length: totalPages }, (_, i) => ({
                pageNumber: i + 1,
                isActive: i + 1 === page,
            })),
        };

        return { response }; // Trả về kết quả khớp một phần
    } catch (error) {
        console.error('Error searching products:', error);
        const response = { products: [], query, error: 'Internal server error' };
        return renderView ? res.render('search', response) : { response };
    }
};
