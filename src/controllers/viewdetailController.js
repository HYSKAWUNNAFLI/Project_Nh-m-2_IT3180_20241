const db = require('../models/db');

// Lấy thông tin chi tiết sản phẩm và các sản phẩm liên quan
const getProductDetails = async (req, res) => {
    try {
        const productId = req.params.product_id;

        // Truy vấn thông tin sản phẩm
        const productQuery = `
            SELECT * FROM products
            WHERE product_id = $1
        `;
        const productResult = await db.query(productQuery, [productId]);

        // Nếu không tìm thấy sản phẩm
        if (productResult.rows.length === 0) {
            return res.status(404).render('404', { message: 'Product not found!' });
        }

        const product = productResult.rows[0];

        // Truy vấn các sản phẩm liên quan
        const relatedProductsQuery = `
            SELECT * FROM products
            WHERE product_brand = $1 AND product_id != $2
            LIMIT 4
        `;
        const relatedProductsResult = await db.query(relatedProductsQuery, [product.product_brand, productId]);

        // Render view và truyền dữ liệu vào Handlebars
        res.render('product_detail', {
            product,
            related_products: relatedProductsResult.rows
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getProductDetails
};
