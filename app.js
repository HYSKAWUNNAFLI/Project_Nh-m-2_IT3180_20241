const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 5050;

// Thiết lập Handlebars làm view engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware để xử lý tệp tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Định tuyến
app.get('/', (req, res) => {
    res.render('admin', { title: 'Admin Dashboard' });
});

// Lắng nghe trên cổng
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
