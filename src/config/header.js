// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Select all navigation options
    const navOptions = document.querySelectorAll("#navbar .nav-option");
  
    // Loop through each navigation option
    navOptions.forEach((option) => {
      // Add click event listener to each option
      option.addEventListener("click", () => {
        // Remove 'active-nav-option' from all navigation options
        navOptions.forEach((opt) => opt.classList.remove("active-nav-option"));
  
        // Add 'active-nav-option' to the clicked navigation option
        option.classList.add("active-nav-option");
      });
    });
  });
  