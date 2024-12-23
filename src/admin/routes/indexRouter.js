const express = require('express');
const router = express.Router();
const path = require('path');

// Định tuyến cho trang chủ
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'index.html'));
});

module.exports = router; 