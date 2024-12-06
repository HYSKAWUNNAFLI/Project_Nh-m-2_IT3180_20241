// Import PostgreSQL client
const { Pool } = require('pg');

// Tạo kết nối tới database
const pool = new Pool({
    user: 'postgres', // Thay bằng username PostgreSQL của bạn
    host: 'localhost', // Địa chỉ máy chủ
    database: 'CXWUD', // Tên database của bạn
    password: '123456', // Mật khẩu PostgreSQL của bạn
    port: 5432, // Cổng PostgreSQL mặc định
});

// Danh sách sản phẩm và đường dẫn ảnh tương ứng
const productImages = [
    { id: 1, image: 'classic_leather_jacket.png' },
    { id: 2, image: 'slim_fit_jeans.png' },
    { id: 3, image: 'casual_sneakers.png' },
    { id: 4, image: 'graphic_tshirt.png' },
    { id: 5, image: 'vintage_sunglasses.png' },
    { id: 6, image: 'woolen_scarf.png' },
    { id: 7, image: 'sports_watch.png' },
    { id: 8, image: 'leather_wallet.png' },
    { id: 9, image: 'denim_shorts.png' },
    { id: 10, image: 'running_shoes.png' },
];

// Hàm cập nhật ảnh sản phẩm trong cơ sở dữ liệu
async function updateProductImages() {
    try {
        for (const product of productImages) {
            const { id, image } = product;

            // Câu lệnh UPDATE
            const query = `
                UPDATE products
                SET product_image = $1
                WHERE product_id = $2
            `;

            // Thực thi truy vấn
            await pool.query(query, [image, id]);
            console.log(`Updated product ID ${id} with image ${image}`);
        }

        console.log('All product images updated successfully!');
    } catch (err) {
        console.error('Error updating product images:', err);
    } finally {
        // Đóng kết nối sau khi hoàn thành
        await pool.end();
    }
}

// Gọi hàm để cập nhật ảnh sản phẩm
updateProductImages();
