// Lấy các phần tử cần thiết
const loginForm = document.getElementById('LoginForm');
const regForm = document.getElementById('RegForm');
const indicator = document.getElementById('Indicator');

// Hàm để chuyển sang form Login
function switchToLogin() {
    loginForm.style.transform = 'translateX(0)';
    regForm.style.transform = 'translateX(300px)';
    indicator.style.transform = 'translateX(0)'; // Gạch chân di chuyển về Login
}

// Hàm để chuyển sang form Register
function switchToRegister() {
    loginForm.style.transform = 'translateX(-300px)';
    regForm.style.transform = 'translateX(0)';
    indicator.style.transform = 'translateX(100%)'; // Gạch chân di chuyển về Register
}
