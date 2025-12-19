// Search Page JavaScript for TITANIS JEWELRY

let searchResults = [];
let searchFilters = {
    category: 'all',
    priceRange: 'all'
};

// Sample products that match the display
const sampleProducts = [
    {
        id: 1,
        name: "Diamond Solitaire Ring",
        category: "rings",
        price: 4890,
        description: "Exquisite diamond solitaire ring in platinum setting",
        rating: 5.0,
        reviews: 24,
        inStock: true,
        badge: "NEW"
    },
    {
        id: 2,
        name: "Pearl Necklace Elegance",
        category: "necklaces", 
        price: 2150,
        description: "Classic pearl necklace with 18k gold clasp",
        rating: 5.0,
        reviews: 18,
        inStock: true,
        badge: "BESTSELLER"
    },
    {
        id: 3,
        name: "Sapphire Drop Earrings",
        category: "earrings",
        price: 3750,
        description: "Elegant sapphire and diamond drop earrings",
        rating: 5.0,
        reviews: 31,
        inStock: true,
        badge: "EXCLUSIVE"
    },
    {
        id: 4,
        name: "Gold Tennis Bracelet",
        category: "bracelets",
        price: 6200,
        description: "Diamond tennis bracelet in 18k yellow gold",
        rating: 4.5,
        reviews: 12,
        inStock: true,
        badge: "LIMITED"
    },
    {
        id: 5,
        name: "Swiss Luxury Watch",
        category: "watches",
        price: 12500,
        description: "Premium Swiss automatic watch with leather strap",
        rating: 5.0,
        reviews: 8,
        inStock: true,
        badge: "PRESTIGE"
    }
];

// Initialize search page
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    
    // Show default products on page load
    displaySearchResults(sampleProducts);
    searchResults = sampleProducts;
    
    // Check URL parameters for search query
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
        document.getElementById('searchInput').value = query;
        performSearch();
    }
});

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Perform search
function performSearch() {
    const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (!searchQuery) {
        searchResults = sampleProducts;
        displaySearchResults(searchResults);
        return;
    }
    
    // Search in sample products
    let results = sampleProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
    );
    
    // Apply additional filters
    results = applyFilters(results);
    
    // Store results
    searchResults = results;
    
    // Display results
    displaySearchResults(results);
    
    // Update URL
    updateSearchURL(searchQuery);
}

// Apply search filters
function applyFilters(products = searchResults) {
    let filtered = [...products];
    
    // Category filter
    if (searchFilters.category !== 'all') {
        filtered = filtered.filter(product => product.category === searchFilters.category);
    }
    
    // Price filter
    if (searchFilters.priceRange !== 'all') {
        const [min, max] = searchFilters.priceRange.split('-').map(Number);
        const maxPrice = max === 999999 ? Infinity : max;
        filtered = filtered.filter(product => product.price >= min && product.price <= maxPrice);
    }
    
    return filtered;
}

// Apply search filters from UI
function applySearchFilters() {
    const categoryFilter = document.getElementById('searchCategoryFilter').value;
    const priceFilter = document.getElementById('searchPriceFilter').value;
    
    searchFilters.category = categoryFilter;
    searchFilters.priceRange = priceFilter;
    
    const filteredResults = applyFilters();
    displaySearchResults(filteredResults);
}

// Reset search filters
function resetSearchFilters() {
    document.getElementById('searchCategoryFilter').value = 'all';
    document.getElementById('searchPriceFilter').value = 'all';
    
    searchFilters = {
        category: 'all',
        priceRange: 'all'
    };
    
    displaySearchResults(searchResults.length ? searchResults : sampleProducts);
}

// Display search results - keep existing HTML structure
function displaySearchResults(results) {
    const resultsHeader = document.getElementById('searchResultsHeader');
    const noResults = document.getElementById('noSearchResults');
    
    // Update results header
    if (resultsHeader) {
        const searchQuery = document.getElementById('searchInput').value.trim();
        if (searchQuery && results.length > 0) {
            resultsHeader.innerHTML = `<h3>Search Results for "${searchQuery}" (${results.length} products found)</h3>`;
        } else if (results.length > 0) {
            resultsHeader.innerHTML = `<h3>Search Results (${results.length} products found)</h3>`;
        } else {
            resultsHeader.innerHTML = `<h3>No results found</h3>`;
        }
    }
    
    // Show/hide no results message
    if (results.length === 0) {
        if (noResults) noResults.style.display = 'block';
        return;
    }
    
    if (noResults) noResults.style.display = 'none';
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Search by tag
function searchByTag(tag) {
    document.getElementById('searchInput').value = tag;
    performSearch();
}

// Add to cart from search
function addToCartFromSearch(productId) {
    // Simple cart notification
    showSearchNotification('Item added to cart!', 'success');
    
    // Update cart count if element exists
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
    }
}

// Show search notification
function showSearchNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.search-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `search-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#6b7856' : '#333'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Update search URL
function updateSearchURL(query) {
    if (window.history && window.history.pushState) {
        const newUrl = new URL(window.location);
        if (query) {
            newUrl.searchParams.set('q', query);
        } else {
            newUrl.searchParams.delete('q');
        }
        window.history.pushState({}, '', newUrl);
    }
}

// Export functions for global use
window.performSearch = performSearch;
window.applySearchFilters = applySearchFilters;
window.resetSearchFilters = resetSearchFilters;
window.searchByTag = searchByTag;
window.addToCartFromSearch = addToCartFromSearch;
