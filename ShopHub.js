// JavaScript for ShopHub Clone

// ======================
// Dropdown Menu Functionality
// ======================

// Get all dropdown elements
const dropdowns = document.querySelectorAll('.dropdown');

// Loop through each dropdown
dropdowns.forEach((dropdown) => {
    // Add event listener for mouse enter (hover)
    dropdown.addEventListener('mouseenter', () => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        dropdownContent.style.display = 'block'; // Show dropdown content
    });

    // Add event listener for mouse leave (stop hovering)
    dropdown.addEventListener('mouseleave', () => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        dropdownContent.style.display = 'none'; // Hide dropdown content
    });
});

// Example: Dropdown menus will now show/hide on hover.

// ======================
// Search Bar Functionality
// ======================

// Get the search bar and search icon
const searchBar = document.querySelector('.search_bar');
const searchIcon = document.querySelector('.search_icon');
const searchInput = document.querySelector('.search_input');

// Add focus event to the search input
searchInput.addEventListener('focus', () => {
    searchBar.style.border = '1px solid #ff3f8f'; // Highlight search bar on focus
    searchIcon.style.color = '#ff3f8f'; // Change search icon color
});

// Add blur event to the search input
searchInput.addEventListener('blur', () => {
    searchBar.style.border = '1px solid #f5f5f6'; // Reset search bar border
    searchIcon.style.color = '#282c3f'; // Reset search icon color
});

// Example: Search bar will highlight when focused and reset when blurred.

// ======================
// Action Bar Hover Effects
// ======================

// Get all action containers (Profile, Wishlist, Bag)
const actionContainers = document.querySelectorAll('.action_container');

// Loop through each action container
actionContainers.forEach((container) => {
    // Add event listener for mouse enter (hover)
    container.addEventListener('mouseenter', () => {
        const icon = container.querySelector('.action_icon');
        const text = container.querySelector('.action_name');
        icon.style.color = '#ff3f8f'; // Change icon color on hover
        text.style.color = '#ff3f8f'; // Change text color on hover
    });

    // Add event listener for mouse leave (stop hovering)
    container.addEventListener('mouseleave', () => {
        const icon = container.querySelector('.action_icon');
        const text = container.querySelector('.action_name');
        icon.style.color = '#282c3f'; // Reset icon color
        text.style.color = '#282c3f'; // Reset text color
    });
});

// Example: Action bar icons and text will change color on hover.

// ======================
// Category Items Hover Effects
// ======================

// Get all category item links
const categoryItems = document.querySelectorAll('.category_items a');

// Loop through each category item
categoryItems.forEach((item) => {
    // Add event listener for mouse enter (hover)
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.03)'; // Slightly enlarge the item
        item.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)'; // Add shadow
    });

    // Add event listener for mouse leave (stop hovering)
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)'; // Reset size
        item.style.boxShadow = 'none'; // Remove shadow
    });
});

// Example: Category items will enlarge and show a shadow on hover.

// ======================
// Footer Link Hover Effects
// ======================

// Get all footer links
const footerLinks = document.querySelectorAll('.footer_column a');

// Loop through each footer link
footerLinks.forEach((link) => {
    // Add event listener for mouse enter (hover)
    link.addEventListener('mouseenter', () => {
        link.style.color = '#ff3f8f'; // Change link color on hover
    });

    // Add event listener for mouse leave (stop hovering)
    link.addEventListener('mouseleave', () => {
        link.style.color = '#030303'; // Reset link color
    });
});

// Example: Footer links will change color on hover.

// ======================
// Banner Image Click Event
// ======================

// Get the banner image
const bannerImage = document.querySelector('.banner_image');

// Add click event to the banner image
bannerImage.addEventListener('click', () => {
    alert('You clicked the banner!'); // Show an alert when the banner is clicked
});

// Example: Clicking the banner will trigger an alert.

// ======================
// Dynamic Copyright Year
// ======================

// Get the copyright element
const copyrightElement = document.querySelector('.copyright');

// Update the copyright year dynamically
const currentYear = new Date().getFullYear();
copyrightElement.textContent = `© ${currentYear} www.shophub.com. All rights reserved.`;

// Example: The copyright year will always show the current year.