const { Pool } = require('pg');

// Tạo pool kết nối
const pool = new Pool({
    user: 'postgres',           // Thay bằng username PostgreSQL của bạn
    host: 'localhost',          // Địa chỉ máy chủ
    database: 'CXWUD',    // Tên database vừa tạo
    password: '123456',  // Mật khẩu PostgreSQL của bạn
    port: 5432,                 // Cổng mặc định PostgreSQL
});

// Kiểm tra kết nối
async function connect() {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error connecting to PostgreSQL:', err.stack);
    } else {
      console.log('Connected to PostgreSQL database');
    }
    release(); // Release the client connection back to the pool
  });
}

module.exports = { connect };
