const pool = require('../models/db'); // Kết nối database từ db.js

// Số sản phẩm hiển thị trên mỗi trang
const productsPerPage = 12;

// Hiển thị tất cả sản phẩm với phân trang
const showAllProducts = async (req, res) => {
    try {
        // Xác định trang hiện tại từ query string (?page=x)
        const page = parseInt(req.query.page) || 1; // Nếu không có ?page, mặc định là trang 1
        const offset = (page - 1) * productsPerPage;

        // Lấy tổng số sản phẩm
        const totalProductsResult = await pool.query('SELECT COUNT(*) FROM products');
        const totalProducts = parseInt(totalProductsResult.rows[0].count);

        // Tính tổng số trang
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        // Lấy danh sách sản phẩm cho trang hiện tại
        const productsResult = await pool.query(
            'SELECT * FROM products LIMIT $1 OFFSET $2',
            [productsPerPage, offset]
        );
        const products = productsResult.rows;

        // Tạo danh sách số trang
        const pagination = [];
        for (let i = 1; i <= totalPages; i++) {
            pagination.push({
                pageNumber: i,
                isActive: i === page, // Trang hiện tại được đánh dấu
                url: i === 1 ? '/product' : `/product?page=${i}`, // Đường dẫn nút 1 là /product
            });
        }

        // Gửi dữ liệu sản phẩm và phân trang đến view
        res.render('products', {
            products,           // Danh sách sản phẩm
            pagination,         // Danh sách số trang
            currentPage: page,  // Trang hiện tại
            totalPages,         // Tổng số trang
            currentPageGt1: page > 1,
            currentPageLtTotalPages: page < totalPages,
            currentPageMinus1: page > 1 ? (page === 2 ? '/product' : `/product?page=${page - 1}`) : null,
            currentPagePlus1: page < totalPages ? `/product?page=${page + 1}` : null,
        });
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).send('Internal Server Error');
    }
};

//GetProductsByCategory
const getProductsByCategory = async (req, res) => {
    try {
        // Lấy tên danh mục từ URL (shoes, top, bottom, accessories)
        const category = req.path.split('/')[1]; // Ví dụ: "/shoes" -> "shoes"

        // Map danh mục với cart_id
        const categoryMap = {
            shoes: 1,
            top: 2,
            bottom: 3,
            accessories: 4,
        };

        const cartId = categoryMap[category];

        // Truy vấn database để lấy sản phẩm theo cart_id
        const query = 'SELECT * FROM products WHERE cat_id = $1';
        const { rows } = await pool.query(query, [cartId]);

        // Render trang với dữ liệu sản phẩm
        res.render('products', { products: rows });
    } catch (err) {
        console.error('Error fetching products by category:', err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { showAllProducts, getProductsByCategory };
