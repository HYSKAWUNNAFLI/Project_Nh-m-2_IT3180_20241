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
