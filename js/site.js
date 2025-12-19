// TITANIS JEWELRY - Interactive Functionality
// Sophisticated JavaScript for luxury jewelry website

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize cart count
    updateCartCount();
    
    // ========================================================================
    // NAVIGATION SCROLL EFFECT
    // ========================================================================
    
    const nav = document.querySelector('.luxury-nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            nav.style.padding = '15px 0';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
            nav.style.padding = '20px 0';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ========================================================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================================================================
    // MOBILE MENU TOGGLE
    // ========================================================================
    
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (navLeft) navLeft.classList.toggle('mobile-active');
            if (navRight) navRight.classList.toggle('mobile-active');
        });
    }
    
    // ========================================================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================================================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    document.querySelectorAll('.collection-item, .service-item, .value-item, .story-block').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ========================================================================
    // PARALLAX EFFECT FOR HERO SECTION
    // ========================================================================
    
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallaxSpeed}px)`;
        });
    }
    
    // ========================================================================
    // LUXURY HOVER EFFECTS
    // ========================================================================
    
    // Collection items hover effect
    document.querySelectorAll('.collection-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button elegant hover effects
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(139, 115, 85, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // ========================================================================
    // NEWSLETTER FORM ENHANCEMENT
    // ========================================================================
    
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitButton = newsletterForm.querySelector('button');
        
        if (submitButton) {
            submitButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (emailInput && emailInput.value.trim() !== '') {
                    // Add elegant loading state
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SUBSCRIBING...';
                    this.disabled = true;
                    
                    // Simulate subscription process
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-check"></i> SUBSCRIBED';
                        this.style.background = '#28a745';
                        
                        setTimeout(() => {
                            this.innerHTML = 'SUBSCRIBE';
                            this.style.background = '#8b7355';
                            this.disabled = false;
                            emailInput.value = '';
                        }, 2000);
                    }, 1500);
                }
            });
        }
    }
    
    // ========================================================================
    // SMOOTH PAGE TRANSITIONS
    // ========================================================================
    
    // Add page transition effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
    // ========================================================================
    // TYPING ANIMATION FOR HERO TEXT
    // ========================================================================
    
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a brief delay
        setTimeout(typeWriter, 500);
    }
    
    // ========================================================================
    // LUXURY CURSOR EFFECT (Optional Enhancement)
    // ========================================================================
    
    const cursor = document.createElement('div');
    cursor.className = 'luxury-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(139, 115, 85, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    // Show custom cursor only on hover over interactive elements
    document.querySelectorAll('a, button, .collection-item').forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.display = 'block';
            cursor.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.display = 'none';
            cursor.style.transform = 'scale(1)';
        });
    });
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // ========================================================================
    // PRELOADER (Optional)
    // ========================================================================
    
    // Create and show elegant preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">TITANIS</div>
            <div class="preloader-spinner"></div>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fefefe;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    `;
    
    const preloaderContent = preloader.querySelector('.preloader-content');
    if (preloaderContent) {
        preloaderContent.style.cssText = 'text-align: center;';
    }
    
    const preloaderLogo = preloader.querySelector('.preloader-logo');
    if (preloaderLogo) {
        preloaderLogo.style.cssText = `
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: 3px;
            color: #8b7355;
            margin-bottom: 20px;
        `;
    }
    
    const preloaderSpinner = preloader.querySelector('.preloader-spinner');
    if (preloaderSpinner) {
        preloaderSpinner.style.cssText = `
            width: 40px;
            height: 40px;
            border: 2px solid #f3f3f3;
            border-top: 2px solid #8b7355;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        `;
    }
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(preloader);
    
    // Hide preloader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
});

// Update cart count function
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('titanis_cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Make updateCartCount globally available
window.updateCartCount = updateCartCount;
