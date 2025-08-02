// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = body.getAttribute('data-theme') === 'dark' 
            ? 'rgba(10, 26, 58, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = body.getAttribute('data-theme') === 'dark' 
            ? 'rgba(10, 26, 58, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero animations
gsap.timeline()
    .from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' })
    .from('.hero-subtitle', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5')
    .from('.hero-buttons', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5')
    .from('.float-item', { duration: 1.5, scale: 0, rotation: 180, stagger: 0.2, ease: 'back.out(1.7)' }, '-=0.8');

// Scroll-triggered animations
gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: i * 0.1,
        ease: 'power3.out'
    });
});

gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        delay: i * 0.1,
        ease: 'power3.out'
    });
});

gsap.utils.toArray('.blog-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: i * 0.1,
        ease: 'power3.out'
    });
});

// Portfolio Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                gsap.to(item, { duration: 0.5, scale: 1, opacity: 1, display: 'block' });
            } else {
                gsap.to(item, { duration: 0.5, scale: 0.8, opacity: 0, display: 'none' });
            }
        });
    });
});

// Service Card Hover Effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.service-icon'), {
            duration: 0.3,
            rotation: 360,
            scale: 1.1,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.service-icon'), {
            duration: 0.3,
            rotation: 0,
            scale: 1,
            ease: 'power2.out'
        });
    });
});

// Floating Elements Continuous Animation
gsap.to('.float-item', {
    duration: 3,
    y: -20,
    rotation: 5,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut',
    stagger: {
        each: 0.5,
        from: 'random'
    }
});

// AI Assistant Functionality
const aiToggle = document.getElementById('ai-toggle');
const aiChat = document.getElementById('ai-chat');
const aiClose = document.getElementById('ai-close');
const aiSend = document.getElementById('ai-send');
const aiInputField = document.getElementById('ai-input-field');
const aiMessages = document.getElementById('ai-messages');

// AI Assistant Toggle
aiToggle.addEventListener('click', () => {
    aiChat.classList.toggle('active');
    if (aiChat.classList.contains('active')) {
        gsap.from(aiChat, { duration: 0.3, scale: 0.8, opacity: 0, ease: 'back.out(1.7)' });
    }
});

aiClose.addEventListener('click', () => {
    gsap.to(aiChat, { 
        duration: 0.3, 
        scale: 0.8, 
        opacity: 0, 
        ease: 'power2.in',
        onComplete: () => aiChat.classList.remove('active')
    });
});

// AI Chat Functionality
const aiResponses = {
    'services': 'We offer Website Design & Development, Mobile & Web App Development, AI Automation Services, Digital Marketing, AI Tools Training & Workshops, Virtual Assistance, Content Writing, Design Services, Social Media Management, Customer Support, and Transcription Services.',
    'web development': 'Our web development services include modern, responsive websites built with the latest technologies. We create custom solutions tailored to your business needs.',
    'mobile app': 'We develop cross-platform mobile applications for iOS and Android using modern frameworks like React Native and Flutter.',
    'ai automation': 'Our AI automation services help streamline your business processes, reduce manual work, and improve efficiency through intelligent automation solutions.',
    'digital marketing': 'We provide comprehensive digital marketing services including SEO, social media marketing, content marketing, and paid advertising campaigns.',
    'training': 'We offer AI tools training and workshops to help your team stay updated with the latest AI technologies and best practices.',
    'contact': 'You can reach us via WhatsApp at +254111546120, email us at info@quirktech.com, or use our contact form on the website.',
    'pricing': 'Our pricing varies based on project requirements. Please contact us for a custom quote tailored to your specific needs.',
    'portfolio': 'You can view our portfolio on the Portfolio page to see examples of our work across web development, mobile apps, and AI solutions.',
    'default': 'I\'m here to help you learn about Quirk Tech\'s services. You can ask me about our web development, mobile apps, AI automation, digital marketing, or any other services. For complex queries, I\'d recommend contacting our team directly!'
};

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${isUser ? 'user-message' : ''}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    aiMessages.appendChild(messageDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
    
    // Animate new message
    gsap.from(messageDiv, { duration: 0.3, y: 20, opacity: 0, ease: 'power2.out' });
}

function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(aiResponses)) {
        if (message.includes(key)) {
            return response;
        }
    }
    
    return aiResponses.default;
}

function sendMessage() {
    const message = aiInputField.value.trim();
    if (message) {
        addMessage(message, true);
        aiInputField.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage(response);
        }, 1000);
    }
}

aiSend.addEventListener('click', sendMessage);
aiInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Smooth Scrolling for Navigation Links
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

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-visual');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Loading Animation
window.addEventListener('load', () => {
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, { duration: 0.5, opacity: 0, onComplete: () => loader.remove() });
    }
    
    // Trigger entrance animations
    gsap.from('body', { duration: 0.5, opacity: 0 });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.service-card, .portfolio-item, .blog-card, .section-title').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Dynamic Year in Footer
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    yearElement.innerHTML = `&copy; ${currentYear} Quirk Tech. All rights reserved.`;
}

// Performance Optimization - Lazy Loading Images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Service Card Click Navigation
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const service = card.getAttribute('data-service');
        window.location.href = `services.html#${service}`;
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn, .filter-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn, .filter-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);