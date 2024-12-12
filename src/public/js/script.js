/*-------------------------Menu-hover--------------------------*/
document.addEventListener("DOMContentLoaded", function () {
    const allNavItems = document.querySelectorAll("#navbar li"); // Tất cả các mục trong navbar
    const overlay = document.querySelector(".fullscreen-overlay"); // Lớp phủ
    const dropdown = document.querySelector(".display-none"); // Menu con

    let productItem = null; // Biến lưu trữ mục "Products"
    let isHovering = false; // Trạng thái để kiểm soát hover

    // Tìm mục chứa chữ "Products"
    allNavItems.forEach((item) => {
        if (item.textContent.trim() === "Products") {
            productItem = item;
        }
    });

    if (!productItem) {
        console.error("Không tìm thấy mục 'Products'.");
        return;
    }

    // Hiển thị lớp phủ và menu con
    const showDropdown = () => {
        isHovering = true;
        overlay.style.display = "block";
        dropdown.style.display = "grid"; // Hiển thị menu con
    };

    // Ẩn lớp phủ và menu con
    const hideDropdown = () => {
        setTimeout(() => {
            if (
                !productItem.matches(":hover") &&
                !overlay.matches(":hover") &&
                !dropdown.matches(":hover")
            ) {
                isHovering = false;
                overlay.style.display = "none";
                dropdown.style.display = "none";
            }
        }, 200); // Độ trễ 200ms
    };

    // Sự kiện hover cho Products
    productItem.addEventListener("mouseenter", showDropdown);
    productItem.addEventListener("mouseleave", hideDropdown);

    // Thêm sự kiện hover cho lớp phủ và menu con
    overlay.addEventListener("mouseleave", hideDropdown);
    dropdown.addEventListener("mouseleave", hideDropdown);

    // Sự kiện click vào Products để chuyển trang
    productItem.querySelector("a").addEventListener("click", (e) => {
        // Điều hướng sang trang Product
        window.location.href = "/product";
    });

    // Trường hợp đã ở trang /product, cho phép hover
    if (window.location.pathname === "/product") {
        productItem.addEventListener("mouseenter", showDropdown);
        productItem.addEventListener("mouseleave", hideDropdown);
    }
});
/*---------------------------------------------------*/

/*---------------------Account-page------------------*/
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

/*----------------------------------------*/

async function updateCartCount() {
    try {
        const response = await fetch('/cart/count');
        const data = await response.json();

        // Tìm và cập nhật số lượng sản phẩm
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = data.totalItems || 0;
        }
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Gọi hàm cập nhật ngay khi trang tải xong
document.addEventListener('DOMContentLoaded', updateCartCount);

// Gọi hàm mỗi khi thực hiện thay đổi giỏ hàng (nút update hoặc delete)
document.querySelectorAll('.update-form').forEach(form => {
    form.addEventListener('submit', async function (e) {
        // Tạm thời bỏ e.preventDefault();
        const formData = new FormData(this);
        const action = this.action;

        try {
            await fetch(action, {
                method: 'POST',
                body: formData,
            });
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    });
});



/*-------------------------Search-box-----------------------*/
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    let timeout = null;
    let currentProducts = []; // Lưu kết quả sản phẩm tìm kiếm hiện tại

    function showResults(products) {
        searchResults.innerHTML = '';
        currentProducts = products; // Cập nhật danh sách sản phẩm hiện tại

        if (products.length === 0) {
            // Nếu không có sản phẩm, hiển thị thông báo "No product found"
            const message = document.createElement('div');
            message.textContent = 'No product found';
            message.style.padding = '10px';
            message.style.color = '#555';
            message.style.fontStyle = 'italic';
            searchResults.appendChild(message);
            searchResults.style.display = 'block';
            return;
        }

        const ul = document.createElement('ul');
        products.forEach(product => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `/viewdetail/${product.product_id}`;
            link.textContent = product.product_title;
            li.appendChild(link);
            ul.appendChild(li);
        });

        searchResults.appendChild(ul);
        searchResults.style.display = 'block';
    }

    async function searchProducts(query) {
        if (!query) {
            searchResults.style.display = 'none';
            currentProducts = [];
            return;
        }

        try {
            const response = await fetch(`/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();
            showResults(data.products || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            searchProducts(query);
        }, 300);
    });

    // Ẩn kết quả khi nhấp ra ngoài
    document.addEventListener('click', (event) => {
        if (!searchResults.contains(event.target) && event.target !== searchInput) {
            searchResults.style.display = 'none';
        }
    });

    // Xử lý khi nhấn Enter
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            // Nếu có ít nhất một sản phẩm trong kết quả
            if (currentProducts.length > 0) {
                // Chuyển sang trang chi tiết sản phẩm đầu tiên
                window.location.href = `/viewdetail/${currentProducts[0].product_id}`;
            } else {
                // Hiển thị thông báo không tìm thấy sản phẩm
                searchResults.innerHTML = '';
                const message = document.createElement('div');
                message.textContent = 'No product found';
                message.style.padding = '10px';
                message.style.color = '#555';
                message.style.fontStyle = 'italic';
                searchResults.appendChild(message);
                searchResults.style.display = 'block';
            }
        }
    });
});
/*--------------------------------------------------*/