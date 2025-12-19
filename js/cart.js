// Cart Page JavaScript

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
});

// Initialize cart functionality
function initializeCart() {
    CartManager.renderCartPage();
    loadRecentlyViewed();
}

// Proceed to checkout
function proceedToCheckout() {
    const cartItems = JSON.parse(localStorage.getItem('titanis_cart') || '[]');
    
    if (cartItems.length === 0) {
        showCartNotification('Your cart is empty', 'warning');
        return;
    }
    
    // For demo purposes, show checkout simulation
    showCheckoutModal();
}

// Show checkout modal
function showCheckoutModal() {
    const modal = document.createElement('div');
    modal.className = 'checkout-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Secure Checkout</h2>
                <button onclick="closeCheckoutModal()" class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="checkout-form">
                    <h3>Shipping Information</h3>
                    <div class="form-row">
                        <input type="text" placeholder="First Name" required>
                        <input type="text" placeholder="Last Name" required>
                    </div>
                    <div class="form-row">
                        <input type="email" placeholder="Email Address" required>
                        <input type="tel" placeholder="Phone Number" required>
                    </div>
                    <input type="text" placeholder="Address Line 1" required>
                    <input type="text" placeholder="Address Line 2 (Optional)">
                    <div class="form-row">
                        <input type="text" placeholder="City" required>
                        <input type="text" placeholder="State" required>
                        <input type="text" placeholder="ZIP Code" required>
                    </div>
                    
                    <h3>Payment Information</h3>
                    <input type="text" placeholder="Card Number" required>
                    <div class="form-row">
                        <input type="text" placeholder="MM/YY" required>
                        <input type="text" placeholder="CVV" required>
                    </div>
                    <input type="text" placeholder="Cardholder Name" required>
                </div>
                
                <div class="checkout-summary">
                    <h3>Order Summary</h3>
                    <div class="summary-items" id="checkoutItems">
                        <!-- Items will be loaded here -->
                    </div>
                    <div class="summary-totals">
                        <div class="summary-line">
                            <span>Subtotal:</span>
                            <span id="checkoutSubtotal">$0.00</span>
                        </div>
                        <div class="summary-line">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div class="summary-line">
                            <span>Tax:</span>
                            <span id="checkoutTax">$0.00</span>
                        </div>
                        <div class="summary-line total">
                            <span>Total:</span>
                            <span id="checkoutTotal">$0.00</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="completeOrder()" class="complete-order-btn">
                    <i class="fas fa-lock"></i>
                    COMPLETE ORDER
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Load checkout data
    loadCheckoutData();
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 100);
}

// Close checkout modal
function closeCheckoutModal() {
    const modal = document.querySelector('.checkout-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Load checkout data
function loadCheckoutData() {
    const cartItems = JSON.parse(localStorage.getItem('titanis_cart') || '[]');
    const checkoutItems = document.getElementById('checkoutItems');
    const subtotalElement = document.getElementById('checkoutSubtotal');
    const taxElement = document.getElementById('checkoutTax');
    const totalElement = document.getElementById('checkoutTotal');
    
    if (checkoutItems) {
        checkoutItems.innerHTML = cartItems.map(item => `
            <div class="checkout-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toLocaleString()}</span>
            </div>
        `).join('');
    }
    
    const subtotal = CartManager.getTotal();
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toLocaleString()}`;
    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}

// Complete order
function completeOrder() {
    const completeBtn = document.querySelector('.complete-order-btn');
    if (completeBtn) {
        completeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSING...';
        completeBtn.disabled = true;
    }
    
    // Simulate order processing
    setTimeout(() => {
        // Clear cart
        CartManager.clearCart();
        
        // Show success message
        showOrderSuccess();
        
        // Close modal
        closeCheckoutModal();
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }, 2000);
}

// Show order success
function showOrderSuccess() {
    const successModal = document.createElement('div');\n    successModal.className = 'order-success-modal';\n    successModal.innerHTML = `\n        <div class=\"success-content\">\n            <div class=\"success-icon\">\n                <i class=\"fas fa-check-circle\"></i>\n            </div>\n            <h2>Order Placed Successfully!</h2>\n            <p>Thank you for your purchase. You'll receive a confirmation email shortly.</p>\n            <p>Order #: TJ-${Date.now().toString().slice(-6)}</p>\n            <button onclick=\"closeOrderSuccess()\" class=\"success-btn\">CONTINUE SHOPPING</button>\n        </div>\n    `;\n    \n    document.body.appendChild(successModal);\n    \n    setTimeout(() => {\n        successModal.classList.add('show');\n    }, 100);\n}\n\n// Close order success\nfunction closeOrderSuccess() {\n    const modal = document.querySelector('.order-success-modal');\n    if (modal) {\n        modal.classList.remove('show');\n        setTimeout(() => {\n            modal.remove();\n        }, 300);\n    }\n}\n\n// Load recently viewed products\nfunction loadRecentlyViewed() {\n    const recentlyViewed = JSON.parse(localStorage.getItem('titanis_recently_viewed') || '[]');\n    const recentlyViewedSection = document.getElementById('recentlyViewedSection');\n    const recentlyViewedGrid = document.getElementById('recentlyViewedGrid');\n    \n    if (recentlyViewed.length === 0 || !recentlyViewedGrid) {\n        if (recentlyViewedSection) recentlyViewedSection.style.display = 'none';\n        return;\n    }\n    \n    if (recentlyViewedSection) recentlyViewedSection.style.display = 'block';\n    \n    // Get product details for recently viewed items\n    const recentProducts = recentlyViewed\n        .map(id => JEWELRY_DATABASE.products.find(p => p.id === id))\n        .filter(Boolean)\n        .slice(0, 4); // Show only 4 items\n    \n    recentlyViewedGrid.innerHTML = recentProducts.map(product => `\n        <div class=\"recently-viewed-item\" onclick=\"viewProduct(${product.id})\">\n            <div class=\"item-image\">\n                <div class=\"placeholder-image\">\n                    <i class=\"fas fa-gem\"></i>\n                </div>\n            </div>\n            <div class=\"item-info\">\n                <h4>${product.name}</h4>\n                <p>$${product.price.toLocaleString()}</p>\n            </div>\n        </div>\n    `).join('');\n}\n\n// View product\nfunction viewProduct(productId) {\n    window.location.href = `product.html?id=${productId}`;\n}\n\n// Show cart notification\nfunction showCartNotification(message, type = 'info') {\n    const notification = document.createElement('div');\n    notification.className = `cart-notification ${type}`;\n    notification.innerHTML = `\n        <div class=\"notification-content\">\n            <i class=\"fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}\"></i>\n            <span>${message}</span>\n        </div>\n    `;\n    \n    document.body.appendChild(notification);\n    \n    setTimeout(() => {\n        notification.classList.add('show');\n    }, 100);\n    \n    setTimeout(() => {\n        notification.classList.remove('show');\n        setTimeout(() => {\n            notification.remove();\n        }, 300);\n    }, 3000);\n}\n\n// Export functions for global use\nwindow.proceedToCheckout = proceedToCheckout;\nwindow.closeCheckoutModal = closeCheckoutModal;\nwindow.completeOrder = completeOrder;\nwindow.closeOrderSuccess = closeOrderSuccess;