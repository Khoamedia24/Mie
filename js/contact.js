// Contact Page JavaScript

// Chatbot data and responses
const CHATBOT_RESPONSES = {
    greetings: [
        "Hello! How can I help you find the perfect jewelry today?",
        "Welcome to Titanis! I'm here to assist with any questions.",
        "Hi there! Looking for something special? I'm here to help!"
    ],
    
    products: [
        "We have an amazing collection! What type of jewelry interests you - rings, necklaces, earrings, bracelets, or watches?",
        "Our featured pieces include engagement rings, luxury watches, and pearl collections. Would you like to know more about any category?",
        "I'd be happy to help you find the perfect piece! What's the occasion or your budget range?"
    ],
    
    services: [
        "We offer custom design, repair services, appraisals, and personal consultations. Which service interests you?",
        "Our artisans provide custom jewelry design, professional repairs, and lifetime maintenance. How can we serve you?"
    ],
    
    pricing: [
        "Our jewelry ranges from $1,000 to over $10,000. What's your budget range so I can recommend suitable pieces?",
        "Prices vary by category. Rings start at $1,299, necklaces at $1,299, and watches at $8,999. What are you looking for?"
    ],
    
    appointments: [
        "I'd be happy to schedule a personal consultation! You can book through our contact form or call us at +1 (555) 123-GEMS.",
        "Private appointments are available at our showroom. Would you like me to connect you with our scheduling team?"
    ],
    
    shipping: [
        "We offer complimentary shipping on all orders, with secure packaging and insurance included.",
        "All orders ship free with full insurance. Delivery typically takes 3-5 business days."
    ],
    
    default: [
        "I'd be happy to help! Could you tell me more about what you're looking for?",
        "That's a great question! Let me connect you with our expert team for detailed assistance.",
        "For specific inquiries, I recommend using our contact form or calling our showroom directly."
    ]
};

let chatbotOpen = false;
let chatHistory = [];

// Initialize contact page
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeChatbot();
});

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');
    
    // Show loading state
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'inline-block';
    submitButton.disabled = true;
    
    // Get form data
    const formData = new FormData(e.target);
    const contactData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        newsletter: formData.get('newsletter') === 'on'
    };
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button
        buttonText.style.display = 'inline-block';
        buttonLoader.style.display = 'none';
        buttonText.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT';
        submitButton.style.background = '#28a745';
        
        // Show success message
        showContactSuccess();
        
        // Reset form after delay
        setTimeout(() => {
            e.target.reset();
            buttonText.innerHTML = 'SEND MESSAGE';
            submitButton.style.background = '#8b7355';
            submitButton.disabled = false;
        }, 3000);
        
        // Store in localStorage (for demo purposes)
        const contacts = JSON.parse(localStorage.getItem('titanis_contacts') || '[]');
        contacts.push({ ...contactData, timestamp: new Date().toISOString() });
        localStorage.setItem('titanis_contacts', JSON.stringify(contacts));
        
    }, 2000);
}

// Show contact success message
function showContactSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'contact-success';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting Titanis Jewelry. We'll respond within 24 hours.</p>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        successMessage.classList.remove('show');
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    }, 5000);
}

// Initialize chatbot
function initializeChatbot() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Toggle chatbot
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    const trigger = document.querySelector('.chatbot-trigger');
    
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        chatbot.style.display = 'flex';
        trigger.style.display = 'none';
        setTimeout(() => {
            chatbot.classList.add('show');
        }, 100);
    } else {
        chatbot.classList.remove('show');
        setTimeout(() => {
            chatbot.style.display = 'none';
            trigger.style.display = 'flex';
        }, 300);
    }
}

// Send message in chatbot
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Generate bot response after delay
    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatMessage(response, 'bot');
    }, 1000);
}

// Add message to chat
function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatbotMessages');
    
    const messageElement = document.createElement('div');
    messageElement.className = `${sender}-message`;
    
    if (sender === 'bot') {
        messageElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-gem"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
    } else {
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Store in chat history
    chatHistory.push({ message, sender, timestamp: Date.now() });
}

// Generate bot response
function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check for keywords and return appropriate response
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return getRandomResponse('greetings');
    }
    
    if (message.includes('product') || message.includes('jewelry') || message.includes('ring') || 
        message.includes('necklace') || message.includes('earring') || message.includes('bracelet')) {
        return getRandomResponse('products');
    }
    
    if (message.includes('service') || message.includes('repair') || message.includes('custom') || 
        message.includes('design') || message.includes('appraisal')) {
        return getRandomResponse('services');
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('budget') || 
        message.includes('expensive') || message.includes('cheap')) {
        return getRandomResponse('pricing');
    }
    
    if (message.includes('appointment') || message.includes('visit') || message.includes('showroom') || 
        message.includes('consultation')) {
        return getRandomResponse('appointments');
    }
    
    if (message.includes('shipping') || message.includes('delivery') || message.includes('ship')) {
        return getRandomResponse('shipping');
    }
    
    return getRandomResponse('default');
}

// Get random response from category
function getRandomResponse(category) {
    const responses = CHATBOT_RESPONSES[category];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Export functions for global use
window.toggleChatbot = toggleChatbot;
window.sendMessage = sendMessage;