// Product Detail Page JavaScript

// Initialize product detail page
document.addEventListener('DOMContentLoaded', function() {
    loadProductDetail();
    initializeProductGallery();
    loadRelatedProducts();
    loadProductReviews();
});

// Load product detail
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }
    
    const product = JEWELRY_DATABASE.products.find(p => p.id === productId);
    
    if (!product) {
        showProductError('Product not found');
        return;
    }
    
    // Update page title
    document.title = `${product.name} | Titanis Jewelry`;
    
    // Update product details
    updateProductDetails(product);
    
    // Add to recently viewed
    addToRecentlyViewed(productId);
}

// Update product details
function updateProductDetails(product) {
    // Update product name
    const productName = document.getElementById('productName');
    if (productName) productName.textContent = product.name;
    
    // Update product price
    const productPrice = document.getElementById('productPrice');
    if (productPrice) productPrice.textContent = `$${product.price.toLocaleString()}`;
    
    // Update product description
    const productDescription = document.getElementById('productDescription');
    if (productDescription) productDescription.textContent = product.description;
    
    // Update product rating
    const productRating = document.getElementById('productRating');
    if (productRating) {
        productRating.innerHTML = `
            ${generateStars(product.rating)}
            <span class="rating-text">${product.rating}/5 (${product.reviews || 0} reviews)</span>
        `;
    }
    
    // Update product specifications
    updateProductSpecifications(product);
    
    // Update product gallery
    updateProductGallery(product);
    
    // Update add to cart button
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.onclick = () => addProductToCart(product);
    }
}

// Update product specifications
function updateProductSpecifications(product) {
    const specs = document.getElementById('productSpecs');
    if (!specs) return;
    
    const specifications = [
        { label: 'Material', value: product.material || 'Sterling Silver' },
        { label: 'Category', value: product.category },
        { label: 'Collection', value: product.collection || 'Classic' },
        { label: 'SKU', value: `TJ-${product.id.toString().padStart(4, '0')}` },
        { label: 'Weight', value: product.weight || '5.2g' },
        { label: 'Dimensions', value: product.dimensions || '2.5cm x 1.8cm' }
    ];
    
    specs.innerHTML = specifications.map(spec => `
        <div class="spec-item">
            <span class="spec-label">${spec.label}:</span>
            <span class="spec-value">${spec.value}</span>
        </div>
    `).join('');
}

// Update product gallery
function updateProductGallery(product) {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.getElementById('productThumbnails');
    
    if (!mainImage || !thumbnails) return;
    
    // Create placeholder images for demo
    const imageCount = 4;
    const images = Array.from({ length: imageCount }, (_, index) => ({
        id: index + 1,
        url: `placeholder-${index + 1}`,
        alt: `${product.name} - View ${index + 1}`
    }));
    
    // Update main image
    mainImage.innerHTML = `
        <div class="main-image-container">
            <div class="placeholder-image main">
                <i class="fas fa-gem"></i>
                <span>Main Product Image</span>
            </div>
            <div class="zoom-hint">
                <i class="fas fa-search-plus"></i>
                Click to zoom
            </div>
        </div>
    `;
    
    // Update thumbnails
    thumbnails.innerHTML = images.map((image, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="selectImage(${index})">
            <div class="placeholder-image">
                <i class="fas fa-gem"></i>
            </div>
        </div>
    `).join('');
}

// Initialize product gallery
function initializeProductGallery() {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.onclick = () => openImageZoom();
    }
}

// Select image
function selectImage(index) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Open image zoom
function openImageZoom() {
    const modal = document.createElement('div');
    modal.className = 'image-zoom-modal';
    modal.innerHTML = `
        <div class="zoom-content">
            <button onclick="closeImageZoom()" class="zoom-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="zoom-image">
                <div class="placeholder-image zoom">
                    <i class="fas fa-gem"></i>
                    <span>Zoomed Product Image</span>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
}

// Close image zoom
function closeImageZoom() {
    const modal = document.querySelector('.image-zoom-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Add product to cart
function addProductToCart(product) {
    const quantity = parseInt(document.getElementById('quantityInput')?.value || 1);
    CartManager.addItem(product, quantity);
    
    showProductNotification('Product added to cart!', 'success');
    
    // Optional: Show mini cart preview
    showMiniCartPreview();
}

// Show mini cart preview
function showMiniCartPreview() {
    const cartItems = JSON.parse(localStorage.getItem('titanis_cart') || '[]');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const total = CartManager.getTotal();
    
    const miniCart = document.createElement('div');
    miniCart.className = 'mini-cart-preview';
    miniCart.innerHTML = `
        <div class="mini-cart-content">
            <div class="mini-cart-header">
                <h3>Shopping Cart (${totalItems})</h3>
                <button onclick="closeMiniCart()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="mini-cart-items">
                ${cartItems.slice(0, 3).map(item => `
                    <div class="mini-cart-item">
                        <div class="item-image">
                            <div class="placeholder-image mini">
                                <i class="fas fa-gem"></i>
                            </div>
                        </div>
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>$${item.price.toLocaleString()} x ${item.quantity}</p>
                        </div>
                    </div>
                `).join('')}
                ${cartItems.length > 3 ? `<p class="more-items">+${cartItems.length - 3} more items</p>` : ''}
            </div>
            <div class="mini-cart-footer">
                <div class="mini-cart-total">
                    <strong>Total: $${total.toLocaleString()}</strong>
                </div>
                <a href="cart.html" class="view-cart-btn">VIEW CART</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(miniCart);
    
    setTimeout(() => {
        miniCart.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        closeMiniCart();
    }, 5000);
}

// Close mini cart
function closeMiniCart() {
    const miniCart = document.querySelector('.mini-cart-preview');
    if (miniCart) {
        miniCart.classList.remove('show');
        setTimeout(() => {
            miniCart.remove();
        }, 300);
    }
}

// Load related products
function loadRelatedProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const currentProduct = JEWELRY_DATABASE.products.find(p => p.id === productId);
    
    if (!currentProduct) return;
    
    // Get related products from same category
    const relatedProducts = JEWELRY_DATABASE.products
        .filter(p => p.id !== productId && p.category === currentProduct.category)
        .slice(0, 4);
    
    const relatedGrid = document.getElementById('relatedProductsGrid');
    if (!relatedGrid || relatedProducts.length === 0) return;
    
    relatedGrid.innerHTML = relatedProducts.map(product => `
        <div class="related-product" onclick="navigateToProduct(${product.id})">
            <div class="product-image">
                <div class="placeholder-image">
                    <i class="fas fa-gem"></i>
                </div>
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                </div>
                <p class="product-price">$${product.price.toLocaleString()}</p>
            </div>
        </div>
    `).join('');
}

// Load product reviews
function loadProductReviews() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    // Generate demo reviews
    const reviews = generateDemoReviews(productId);
    const reviewsContainer = document.getElementById('productReviews');
    
    if (!reviewsContainer) return;
    
    reviewsContainer.innerHTML = `
        <div class="reviews-header">
            <h3>Customer Reviews</h3>
            <button class="write-review-btn" onclick="openReviewModal()">
                Write a Review
            </button>
        </div>
        <div class="reviews-list">
            ${reviews.map(review => `
                <div class="review-item">
                    <div class="review-header">
                        <div class="reviewer-info">
                            <h4>${review.name}</h4>
                            <div class="review-rating">
                                ${generateStars(review.rating)}
                            </div>
                        </div>
                        <span class="review-date">${review.date}</span>
                    </div>
                    <p class="review-text">${review.text}</p>
                    ${review.verified ? '<span class="verified-purchase">✓ Verified Purchase</span>' : ''}
                </div>
            `).join('')}
        </div>
    `;
}

// Generate demo reviews
function generateDemoReviews(productId) {
    const reviewTexts = [
        "Absolutely stunning piece! The craftsmanship is exceptional and it looks even better in person.",
        "Beautiful jewelry, exactly as described. Fast shipping and great customer service.",
        "Love this piece! It's become my favorite accessory. High quality and elegant design.",
        "Gorgeous design and excellent quality. Would definitely recommend to anyone looking for luxury jewelry.",
        "Perfect gift for my wife. She absolutely loves it and the packaging was beautiful too."
    ];
    
    const names = ['Sarah M.', 'Jennifer L.', 'Maria R.', 'Emily C.', 'Lisa K.'];
    
    return Array.from({ length: 3 }, (_, index) => ({
        name: names[index],
        rating: 4 + Math.random(),
        text: reviewTexts[index],
        date: new Date(Date.now() - (index + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        verified: Math.random() > 0.3
    }));
}

// Open review modal
function openReviewModal() {
    const modal = document.createElement('div');
    modal.className = 'review-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Write a Review</h2>
                <button onclick="closeReviewModal()" class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="review-form">
                    <div class="rating-input">
                        <label>Your Rating:</label>
                        <div class="star-rating">
                            ${Array.from({ length: 5 }, (_, i) => `
                                <i class="fas fa-star" onclick="setReviewRating(${i + 1})" data-rating="${i + 1}"></i>
                            `).join('')}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Your Name:</label>
                        <input type="text" id="reviewerName" placeholder="Enter your name">
                    </div>
                    <div class="form-group">
                        <label>Your Review:</label>
                        <textarea id="reviewText" placeholder="Share your thoughts about this product..." rows="4"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="submitReview()" class="submit-review-btn">
                    SUBMIT REVIEW
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
}

// Close review modal
function closeReviewModal() {
    const modal = document.querySelector('.review-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Set review rating
function setReviewRating(rating) {
    const stars = document.querySelectorAll('.star-rating i');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
    });
}

// Submit review
function submitReview() {
    const rating = document.querySelectorAll('.star-rating i.active').length;
    const name = document.getElementById('reviewerName')?.value;
    const text = document.getElementById('reviewText')?.value;
    
    if (!rating || !name || !text) {
        showProductNotification('Please fill in all fields and select a rating', 'warning');
        return;
    }
    
    // For demo purposes, just show success message
    showProductNotification('Thank you for your review! It will be published after moderation.', 'success');
    closeReviewModal();
}

// Navigate to product
function navigateToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Add to recently viewed
function addToRecentlyViewed(productId) {
    let recentlyViewed = JSON.parse(localStorage.getItem('titanis_recently_viewed') || '[]');
    
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(id => id !== productId);
    
    // Add to beginning
    recentlyViewed.unshift(productId);
    
    // Keep only last 10 items
    recentlyViewed = recentlyViewed.slice(0, 10);
    
    localStorage.setItem('titanis_recently_viewed', JSON.stringify(recentlyViewed));
}

// Generate stars
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Show product error
function showProductError(message) {
    const container = document.querySelector('.product-detail');
    if (container) {
        container.innerHTML = `
            <div class="product-error">
                <div class="error-content">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Product Not Found</h2>
                    <p>${message}</p>
                    <a href="products.html" class="back-to-products-btn">
                        <i class="fas fa-arrow-left"></i>
                        BACK TO PRODUCTS
                    </a>
                </div>
            </div>
        `;
    }
}

// Show product notification
function showProductNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `product-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Export functions for global use
window.selectImage = selectImage;
window.closeImageZoom = closeImageZoom;
window.closeMiniCart = closeMiniCart;
window.navigateToProduct = navigateToProduct;
window.openReviewModal = openReviewModal;
window.closeReviewModal = closeReviewModal;
window.setReviewRating = setReviewRating;
window.submitReview = submitReview;
window.increaseQuantity = function() {
    const input = document.getElementById('quantityInput');
    if (input) {
        input.value = parseInt(input.value) + 1;
    }
};
window.decreaseQuantity = function() {
    const input = document.getElementById('quantityInput');
    if (input && parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
};
window.toggleWishlist = function() {
    showProductNotification('Added to wishlist!', 'success');
};