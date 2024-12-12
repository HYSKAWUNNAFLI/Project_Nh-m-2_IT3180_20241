const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

// Initialize the PostgreSQL Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CXWUD',
    password: 'scratwos2004',
    port: 5432,
});

// Path to your CSV file
const csvFilePath = path.resolve('C:\\Users\\CTY REDSTAR\\Downloads\\data-1733646889554.csv');
const patht = "C:\\Users\\CTY REDSTAR\\Downloads\\data.csv";
console.log(patht);

// Function to import CSV data
const importCSV = async () => {
    const client = await pool.connect();
    try {
        // Read and parse the CSV file
        const csvData = [];
        const stream = fs.createReadStream(csvFilePath).pipe(parse({ columns: true }));

        for await (const row of stream) {
            csvData.push(row);
        }

        console.log('CSV file successfully parsed.');

        // Insert data into the database
        const queryText = `
            INSERT INTO products(
                product_id, 
                product_cat, 
                product_brand, 
                product_title, 
                product_price, 
                product_desc, 
                product_image, 
                product_keywords
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

        for (const row of csvData) {
            const values = [
                row.product_id,
                row.product_cat,
                row.product_brand,
                row.product_title,
                row.product_price,
                row.product_desc,
                row.product_image,
                row.product_keywords,
            ];

            await client.query(queryText, values);
        }

        console.log('Data successfully imported into the database.');
    } catch (err) {
        console.error('Error while importing CSV:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
};

// Run the import function
importCSV();
