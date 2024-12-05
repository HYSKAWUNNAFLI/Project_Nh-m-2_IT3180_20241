const { Pool } = require('pg');

// Create a pool to connect to PostgreSQL
const pool = new Pool({
  user: process.env.PGUSER || 'your_username',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'ecommerce',
  password: process.env.PGPASSWORD || 'your_password',
  port: process.env.PGPORT || 5432,
});

module.exports = pool;
