const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // Replace with your actual secret key

// Show Account Page
module.exports.show = async (req, res) => {
    try {
        res.render('users/account.handlebars', {
            title: "Browse",
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Register Controller
module.exports.register = (req, res) => {
    const { first_name, last_name, email, password, phone_number, address } = req.body;

    // Hash the password
    bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
            // Insert the new user into the database
            const query = `
                INSERT INTO users (first_name, last_name, email, password, phone_number, address)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING user_id, first_name, last_name, email, password, phone_number, address;
            `;
            const values = [first_name, last_name, email, hashedPassword, phone_number, address];

            return pool.query(query, values);
        })
        .then((result) => {
            // Log the newly created user data
            console.log('New user created:', result.rows[0]);

            // Render success page
            res.render("success.handlebars", {
                title: "Registration Successful",
                message: `Welcome, ${result.rows[0].first_name} ${result.rows[0].last_name}! You have successfully registered.`,
            });
        })
        .catch((error) => {
            // Handle errors
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
};

// Login Controller
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        // Truy vấn thông tin người dùng từ database
        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await pool.query(query, [email]);

        // Kiểm tra nếu không tìm thấy người dùng
        if (result.rows.length === 0) {
            return res.render('users/account.handlebars', {
                title: "Login",
                error: "Invalid email or password. Please try again.",
            });
        }

        const user = result.rows[0];
        console.log('User from DB:', user);
        console.log('Password from request:', password);
        console.log('Hashed password from DB:', user.password);

        if (!password || !user.password) {
            console.error('Missing password or hash for comparison');
            return res.status(400).render('users/account.handlebars', {
                title: "Login",
                error: "Invalid login credentials.",
            });
        }



        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return res.render('users/account.handlebars', {
                title: "Login",
                error: "Invalid email or password. Please try again.",
            });
        }

        // Lưu thông tin người dùng trong session
        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
        };

        console.log()

        // Nếu đăng nhập thành công, tạo token (tuỳ chọn) và chuyển đến trang home
        const token = jwt.sign({ user_id: user.user_id, email: user.email }, SECRET_KEY, {
            expiresIn: '12h', // Token hết hạn sau 1 giờ
        });

        // Chuyển hướng đến trang chủ
        res.redirect('/');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: "Login failed" });
    }
};