const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CXWUD',
    password: 'scratwos2004',
    port: 5432,
});

module.exports = pool; 