const { Pool } = require('pg');

// Khởi tạo Pool
const pool = new Pool({
    user: 'postgres', // Thay bằng tên người dùng PostgreSQL của bạn
    host: 'localhost', // Thay bằng địa chỉ máy chủ của bạn
    database: 'CXWUD', // Thay bằng tên database của bạn
    password: '123456', // Thay bằng mật khẩu của bạn
    port: 5432, // Cổng mặc định của PostgreSQL
});

// Kiểm tra kết nối
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err.stack);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});

// Xuất đối tượng pool
module.exports = pool;
