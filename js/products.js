// Products Page JavaScript

let currentProducts = [];
let filteredProducts = [];

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadCategories();
    
    // Check URL parameters for category filter
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        document.getElementById('categoryFilter').value = category;
        applyFilters();
    }
});

// Load all products
function loadProducts() {
    currentProducts = [...JEWELRY_DATABASE.products];
    filteredProducts = [...currentProducts];
    renderProducts(filteredProducts);
}

// Load categories
function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;
    
    categoriesGrid.innerHTML = JEWELRY_DATABASE.categories.map(category => `
        <div class="category-card" onclick="filterByCategory('${category.slug}')">
            <div class="category-icon">
                <i class="${category.image}"></i>
            </div>
            <h3>${category.name}</h3>
            <p>Explore our ${category.name.toLowerCase()} collection</p>
        </div>
    `).join('');
}

// Render products
function renderProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    const noProducts = document.getElementById('noProducts');
    
    if (!productsGrid) return;
    
    if (products.length === 0) {
        productsGrid.style.display = 'none';
        if (noProducts) noProducts.style.display = 'block';
        return;
    }
    
    productsGrid.style.display = 'grid';
    if (noProducts) noProducts.style.display = 'none';
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <div class="placeholder-image">
                    <i class="fas fa-gem"></i>
                </div>
                ${product.originalPrice > product.price ? '<div class="sale-badge">SALE</div>' : ''}
                ${product.featured ? '<div class="featured-badge">FEATURED</div>' : ''}
                <div class="product-overlay">
                    <button onclick="addToCart(${product.id})" class="quick-add">
                        <i class="fas fa-shopping-bag"></i> ADD TO BAG
                    </button>
                    <button onclick="viewProduct(${product.id})" class="quick-view">
                        <i class="fas fa-eye"></i> VIEW DETAILS
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span class="rating-count">(${product.reviews} reviews)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toLocaleString()}</span>
                    ${product.originalPrice > product.price ? `<span class="original-price">$${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                ${!product.inStock ? '<div class="stock-status out-of-stock">Out of Stock</div>' : ''}
            </div>
        </div>
    `).join('');
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

// Apply filters
function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    let filtered = [...currentProducts];
    
    // Category filter
    if (categoryFilter !== 'all') {
        filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    // Price filter
    if (priceFilter !== 'all') {
        const [min, max] = priceFilter.split('-').map(Number);
        filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }
    
    // Sorting
    switch (sortFilter) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'featured':
        default:
            filtered.sort((a, b) => b.featured - a.featured);
            break;
    }
    
    filteredProducts = filtered;
    renderProducts(filteredProducts);
}

// Reset filters
function resetFilters() {
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('priceFilter').value = 'all';
    document.getElementById('sortFilter').value = 'featured';
    applyFilters();
}

// Filter by category (for category cards)
function filterByCategory(category) {
    document.getElementById('categoryFilter').value = category;
    applyFilters();
    
    // Scroll to products section
    document.querySelector('.products-grid-section').scrollIntoView({
        behavior: 'smooth'
    });
}

// Add to cart
function addToCart(productId) {
    const success = CartManager.addItem(productId, 1);
    if (success) {
        // Show success message
        showNotification('Item added to cart!', 'success');
    }
}

// View product
function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}