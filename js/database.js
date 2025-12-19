// TITANIS JEWELRY - Mock Database
// Fake data for static website demonstration

const JEWELRY_DATABASE = {
    // Product Categories
    categories: [
        { id: 1, name: 'Rings', slug: 'rings', image: 'fas fa-ring' },
        { id: 2, name: 'Necklaces', slug: 'necklaces', image: 'fas fa-necklace' },
        { id: 3, name: 'Earrings', slug: 'earrings', image: 'fas fa-gem' },
        { id: 4, name: 'Bracelets', slug: 'bracelets', image: 'fas fa-circle' },
        { id: 5, name: 'Watches', slug: 'watches', image: 'fas fa-clock' }
    ],

    // Product Data
    products: [
        {
            id: 1,
            name: "Eternal Diamond Ring",
            category: "rings",
            price: 2899,
            originalPrice: 3299,
            description: "A stunning solitaire diamond ring featuring a 1.5-carat round brilliant diamond set in 18k white gold. The perfect symbol of eternal love.",
            detailedDescription: "This magnificent engagement ring showcases exceptional craftsmanship with a premium 1.5-carat round brilliant cut diamond. The stone exhibits excellent clarity (VS1) and color grade (F), ensuring maximum brilliance and fire. Set in luxurious 18k white gold with delicate cathedral setting that elevates the diamond for optimal light performance.",
            images: [
                "images/ring-1-main.jpg",
                "images/ring-1-side.jpg", 
                "images/ring-1-detail.jpg"
            ],
            specifications: {
                "Metal": "18k White Gold",
                "Diamond Weight": "1.5 Carats",
                "Diamond Cut": "Round Brilliant",
                "Diamond Clarity": "VS1",
                "Diamond Color": "F",
                "Ring Size": "Customizable",
                "Setting": "Cathedral Solitaire"
            },
            inStock: true,
            featured: true,
            rating: 4.9,
            reviews: 127
        },
        {
            id: 2,
            name: "Royal Sapphire Necklace",
            category: "necklaces",
            price: 5499,
            originalPrice: 6199,
            description: "An exquisite necklace featuring a 3-carat Ceylon sapphire surrounded by brilliant diamonds in 18k yellow gold.",
            detailedDescription: "This breathtaking necklace features a rare 3-carat natural Ceylon sapphire of exceptional quality, surrounded by a halo of brilliant-cut diamonds. The rich blue sapphire displays remarkable clarity and vibrant color saturation. Crafted in warm 18k yellow gold with an adjustable chain length.",
            images: [
                "images/necklace-1-main.jpg",
                "images/necklace-1-detail.jpg",
                "images/necklace-1-worn.jpg"
            ],
            specifications: {
                "Metal": "18k Yellow Gold",
                "Center Stone": "3ct Ceylon Sapphire",
                "Accent Diamonds": "0.75ct Total Weight",
                "Chain Length": "16-18 inches (adjustable)",
                "Sapphire Origin": "Ceylon (Sri Lanka)",
                "Treatment": "Heat Only",
                "Certification": "GIA Certified"
            },
            inStock: true,
            featured: true,
            rating: 5.0,
            reviews: 89
        },
        {
            id: 3,
            name: "Pearl Drop Earrings",
            category: "earrings",
            price: 1299,
            originalPrice: 1599,
            description: "Elegant Tahitian pearl earrings with diamond accents, perfect for special occasions or everyday luxury.",
            detailedDescription: "These sophisticated drop earrings feature lustrous Tahitian pearls with beautiful peacock overtones. Each pearl is carefully matched for size, shape, and luster. Adorned with brilliant-cut diamond accents and crafted in lustrous 18k white gold for a timeless appeal.",
            images: [
                "images/earrings-1-main.jpg",
                "images/earrings-1-detail.jpg",
                "images/earrings-1-worn.jpg"
            ],
            specifications: {
                "Metal": "18k White Gold",
                "Pearl Type": "Tahitian Cultured Pearls",
                "Pearl Size": "10-11mm",
                "Pearl Quality": "AAA",
                "Diamond Weight": "0.25ct Total",
                "Earring Length": "25mm",
                "Backing": "Secure Lever Back"
            },
            inStock: true,
            featured: false,
            rating: 4.8,
            reviews: 156
        },
        {
            id: 4,
            name: "Tennis Bracelet Deluxe",
            category: "bracelets",
            price: 4299,
            originalPrice: 4899,
            description: "Classic tennis bracelet featuring 5 carats of brilliant diamonds in premium 18k white gold setting.",
            detailedDescription: "This timeless tennis bracelet showcases 42 perfectly matched round brilliant diamonds totaling 5 carats. Each diamond is individually prong-set in 18k white gold, creating maximum brilliance and security. The seamless design features a hidden safety clasp for added security.",
            images: [
                "images/bracelet-1-main.jpg",
                "images/bracelet-1-worn.jpg",
                "images/bracelet-1-detail.jpg"
            ],
            specifications: {
                "Metal": "18k White Gold",
                "Total Diamond Weight": "5.00 Carats",
                "Number of Diamonds": "42 Stones",
                "Diamond Quality": "F-G Color, VS Clarity",
                "Bracelet Length": "7 inches (standard)",
                "Setting Style": "Four-Prong",
                "Clasp": "Hidden Safety Clasp"
            },
            inStock: true,
            featured: true,
            rating: 4.9,
            reviews: 203
        },
        {
            id: 5,
            name: "Heritage Rose Gold Watch",
            category: "watches",
            price: 8999,
            originalPrice: 9999,
            description: "Luxury Swiss timepiece with rose gold case, diamond hour markers, and premium leather strap.",
            detailedDescription: "This exceptional timepiece combines Swiss precision with luxurious aesthetics. The 38mm rose gold case houses a premium automatic movement with 72-hour power reserve. The mother-of-pearl dial features diamond hour markers and elegant rose gold hands.",
            images: [
                "images/watch-1-main.jpg",
                "images/watch-1-face.jpg",
                "images/watch-1-side.jpg"
            ],
            specifications: {
                "Case Material": "18k Rose Gold",
                "Case Diameter": "38mm",
                "Movement": "Swiss Automatic",
                "Power Reserve": "72 Hours",
                "Dial": "Mother of Pearl",
                "Hour Markers": "12 Diamond Markers",
                "Strap": "Premium Alligator Leather",
                "Water Resistance": "30 Meters"
            },
            inStock: false,
            featured: true,
            rating: 4.7,
            reviews: 67
        },
        {
            id: 6,
            name: "Emerald Cocktail Ring",
            category: "rings",
            price: 3799,
            originalPrice: 4299,
            description: "Statement emerald ring with Colombian emerald and diamond halo in vintage-inspired setting.",
            detailedDescription: "This show-stopping cocktail ring features a magnificent 2.5-carat Colombian emerald as the centerpiece. The vibrant green stone is surrounded by a double halo of brilliant diamonds and set in a vintage-inspired 18k yellow gold mounting.",
            images: [
                "images/ring-2-main.jpg",
                "images/ring-2-top.jpg",
                "images/ring-2-side.jpg"
            ],
            specifications: {
                "Metal": "18k Yellow Gold",
                "Center Stone": "2.5ct Colombian Emerald",
                "Halo Diamonds": "1.25ct Total Weight",
                "Ring Style": "Vintage Art Deco",
                "Emerald Treatment": "Minor Oil",
                "Setting": "Double Halo",
                "Ring Size": "Customizable"
            },
            inStock: true,
            featured: false,
            rating: 4.6,
            reviews: 94
        }
    ]
};

// Shopping Cart Management
let shoppingCart = JSON.parse(localStorage.getItem('titanis_cart')) || [];

// Cart Functions
const CartManager = {
    addItem(productId, quantity = 1) {
        const product = JEWELRY_DATABASE.products.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = shoppingCart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            shoppingCart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: quantity
            });
        }
        this.saveCart();
        this.updateCartUI();
        return true;
    },

    removeItem(productId) {
        shoppingCart = shoppingCart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    },

    updateQuantity(productId, newQuantity) {
        const item = shoppingCart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartUI();
            }
        }
    },

    getTotal() {
        return shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getItemCount() {
        return shoppingCart.reduce((count, item) => count + item.quantity, 0);
    },

    clearCart() {
        shoppingCart = [];
        this.saveCart();
        this.updateCartUI();
    },

    saveCart() {
        localStorage.setItem('titanis_cart', JSON.stringify(shoppingCart));
    },

    updateCartUI() {
        // Update cart icon badge
        const cartIcon = document.querySelector('.cart-count');
        if (cartIcon) {
            const count = this.getItemCount();
            cartIcon.textContent = count;
            cartIcon.style.display = count > 0 ? 'block' : 'none';
        }

        // Update cart page if we're on it
        if (window.location.pathname.includes('cart.html')) {
            this.renderCartPage();
        }
    },

    renderCartPage() {
        const cartContainer = document.getElementById('cart-items');
        const totalElement = document.getElementById('cart-total');
        
        if (!cartContainer) return;

        if (shoppingCart.length === 0) {
            cartContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p><a href="products.html" class="cta-button">Continue Shopping</a></div>';
            if (totalElement) totalElement.textContent = '$0.00';
            return;
        }

        cartContainer.innerHTML = shoppingCart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <div class="placeholder-image small">
                        <i class="fas fa-gem"></i>
                    </div>
                </div>
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toLocaleString()}</p>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button onclick="CartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="CartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-item" onclick="CartManager.removeItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        if (totalElement) {
            totalElement.textContent = `$${this.getTotal().toLocaleString()}`;
        }
    }
};

// Search Functionality
const SearchManager = {
    searchProducts(query) {
        const searchTerm = query.toLowerCase().trim();
        if (!searchTerm) return JEWELRY_DATABASE.products;

        return JEWELRY_DATABASE.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    },

    filterByCategory(category) {
        if (!category || category === 'all') return JEWELRY_DATABASE.products;
        return JEWELRY_DATABASE.products.filter(product => product.category === category);
    },

    filterByPriceRange(min, max) {
        return JEWELRY_DATABASE.products.filter(product => 
            product.price >= min && product.price <= max
        );
    }
};

// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', function() {
    CartManager.updateCartUI();
});

// Export for use in other files
window.JEWELRY_DATABASE = JEWELRY_DATABASE;
window.CartManager = CartManager;
window.SearchManager = SearchManager;