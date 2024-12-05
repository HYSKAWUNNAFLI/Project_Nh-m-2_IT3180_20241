// Import required modules
const express = require('express');
const { engine } = require('express-handlebars');
const { Pool } = require('pg');
const path = require('path');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configure Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for assets (e.g., CSS, images, JS files)
app.use(express.static(path.join(__dirname, 'public')));

// PostgreSQL connection setup
// const pool = new Pool({
//   user: process.env.PGUSER || 'your_username',
//   host: process.env.PGHOST || 'localhost',
//   database: process.env.PGDATABASE || 'your_database',
//   password: process.env.PGPASSWORD || 'your_password',
//   port: process.env.PGPORT || 5432,
// });

// Test the PostgreSQL connection
// pool.connect((err) => {
//   if (err) {
//     console.error('Error connecting to PostgreSQL:', err.stack);
//   } else {
//     console.log('Connected to PostgreSQL database');
//   }
// });

// Define routes
// app.get('/', async (req, res) => {
//   try {o
//     const result = await pol.query('SELECT * FROM your_table_name'); // Replace with your table name
//     res.render('home', { data: result.rows }); // Render the 'home' view with data
//   } catch (err) {
//     console.error('Error executing query:', err.stack);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.get('/about', (req, res) => {
//   res.render('about', { title: 'About Page' });
// });

// 404 handler
// app.use((req, res) => {
//   res.status(404).render('404', { title: '404 - Page Not Found' });
// });

const route = require("./routes/siteRouters");
route(app);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

