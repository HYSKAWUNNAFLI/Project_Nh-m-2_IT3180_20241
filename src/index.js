// Import required modules
const express = require('express');
const { engine } = require('express-handlebars');
const { Pool } = require('pg');
const path = require('path');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configure Handlebars as the view engine
app.engine(
  'handlebars',
  engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts'), // Thư mục layout
    defaultLayout: 'main', // Layout mặc định
    partialsDir: path.join(__dirname, 'views', 'partials'), // Thư mục partials
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for assets (e.g., CSS, images, JS files)
app.use(express.static(path.join(__dirname, 'public')));

//connect to database
const db = require('./models/db');
db.connect();



const productRouters = require('./routes/productRouters');
app.use('/product',productRouters);

const defaultRouters = require('./routes/defaultRouters');
app.use('/',defaultRouters);

const cartRouters = require('./routes/cartRouters');
app.use('/cart',cartRouters);

const usersRouters = require('./routes/usersRouters');
app.use('/account',usersRouters);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

