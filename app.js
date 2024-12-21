const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const { authenticateToken } = require('./middleware/AuthMiddleware');

// Import routes
const indexRouter = require('./routes/indexRouter');
const adminRouter = require('./routes/adminRouter');
const userRouter = require('./routes/userRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const productRouter = require('./routes/productRouter');
const authRouter = require('./routes/authRouter');

const app = express();
const PORT = 5050;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Thiết lập Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Auth routes (không cần xác thực)
app.use('/auth', authRouter);

// Root route - kiểm tra auth
app.get('/', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.redirect('/login');
    } else {
        res.redirect('/views/index.html');
    }
});

app.get('/login', (req, res) => {
    const token = req.cookies.token;
    if (token) {
        res.redirect('/views/index.html');
    } else {
        res.sendFile(path.join(__dirname, 'public/views/login.html'));
    }
});

// Protected routes (cần xác thực)
app.use('/views', authenticateToken);
app.use('/admin', authenticateToken, adminRouter);
app.use('/user', authenticateToken, userRouter);
app.use('/categories', authenticateToken, categoriesRouter);
app.use('/products', authenticateToken, productRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
