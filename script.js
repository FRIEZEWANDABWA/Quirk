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

// Three.js Background Animation
function initThreeJSBackground() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x1E90FF,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create geometric shapes
    const shapes = [];
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshBasicMaterial({ 
            color: i % 2 === 0 ? 0x1E90FF : 0x00F5FF,
            transparent: true,
            opacity: 0.6,
            wireframe: true
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4
        );
        shapes.push(cube);
        scene.add(cube);
    }
    
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.002;
        
        // Animate shapes
        shapes.forEach((shape, index) => {
            shape.rotation.x += 0.01 * (index + 1);
            shape.rotation.y += 0.01 * (index + 1);
            shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (canvas.offsetWidth && canvas.offsetHeight) {
            camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        }
    });
}

// Initialize Three.js when page loads
window.addEventListener('load', () => {
    setTimeout(initThreeJSBackground, 100);
});

// AI Assistant Functionality
const aiToggle = document.getElementById('ai-toggle');
const aiChat = document.getElementById('ai-chat');
const aiClose = document.getElementById('ai-close');
const aiSend = document.getElementById('ai-send');
const aiInputField = document.getElementById('ai-input-field');
const aiMessages = document.getElementById('ai-messages');

let aiChatOpen = false;
let hasInteracted = false;

// Auto-popup AI Assistant after 5 seconds
setTimeout(() => {
    if (!hasInteracted) {
        openAIChat();
        setTimeout(() => {
            if (!hasInteracted) {
                closeAIChat();
            }
        }, 5000);
    }
}, 5000);

function openAIChat() {
    aiChatOpen = true;
    aiChat.classList.add('active');
    gsap.fromTo(aiChat, 
        { scale: 0.8, opacity: 0, y: 20 },
        { duration: 0.4, scale: 1, opacity: 1, y: 0, ease: 'back.out(1.7)' }
    );
}

function closeAIChat() {
    aiChatOpen = false;
    gsap.to(aiChat, { 
        duration: 0.3, 
        scale: 0.8, 
        opacity: 0, 
        y: 20,
        ease: 'power2.in',
        onComplete: () => aiChat.classList.remove('active')
    });
}

// AI Assistant Toggle
aiToggle.addEventListener('click', () => {
    hasInteracted = true;
    if (aiChatOpen) {
        closeAIChat();
    } else {
        openAIChat();
    }
});

aiClose.addEventListener('click', () => {
    hasInteracted = true;
    closeAIChat();
});

// Enhanced AI Knowledge Base
const aiKnowledgeBase = {
    company: {
        name: 'Quirk Tech',
        founded: '2022',
        mission: 'To empower businesses worldwide with innovative digital solutions that drive growth, efficiency, and success in the digital age.',
        vision: 'To be the leading global provider of digital transformation solutions, recognized for innovation, quality, and client success.',
        stats: {
            projects: '300+',
            satisfaction: '99%',
            support: '24/7',
            countries: '7+',
            team: '20+',
            experience: '2 years'
        }
    },
    services: {
        'web development': 'Modern, responsive websites with SEO optimization, fast loading, custom CMS, and e-commerce integration using React, Node.js, and latest technologies.',
        'mobile app': 'Cross-platform mobile applications for iOS and Android using React Native and Flutter with native performance and cloud integration.',
        'ai automation': 'Intelligent automation solutions including process automation, chatbot development, data analysis, machine learning, and custom AI solutions.',
        'digital marketing': 'Comprehensive digital marketing including SEO/SEM, social media marketing, content marketing, email campaigns, and analytics reporting.',
        'training': 'AI tools training and workshops with hands-on experience, custom programs, certification courses, and ongoing support.',
        'virtual assistance': 'Professional virtual assistance for business operations management.',
        'content writing': 'High-quality content creation for websites, blogs, and marketing materials.',
        'design services': 'Creative design solutions including logos, branding, graphics, and visual identity.',
        'social media': 'Complete social media management to build brand and engage audiences.',
        'customer support': '24/7 customer support services for optimal client experience.',
        'transcription': 'Accurate and fast transcription services for audio and video content.'
    },
    contact: {
        phone: '+254111546120',
        email: 'info@quirktech.com',
        whatsapp: '+254111546120',
        location: 'Worldwide Service'
    },
    pricing: 'Our pricing is customized based on project scope and requirements. We offer competitive rates with flexible payment options. Contact us for a detailed quote.',
    process: 'Our process includes: 1) Initial consultation, 2) Project planning and proposal, 3) Development/implementation, 4) Testing and quality assurance, 5) Deployment and launch, 6) Ongoing support and maintenance.'
};

function addMessage(message, isUser = false, isTyping = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${isUser ? 'user-message' : ''}`;
    
    if (isTyping) {
        messageDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
    } else {
        messageDiv.innerHTML = `<p>${message}</p>`;
    }
    
    aiMessages.appendChild(messageDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
    
    gsap.from(messageDiv, { duration: 0.3, y: 20, opacity: 0, ease: 'power2.out' });
    return messageDiv;
}

async function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check knowledge base first
    for (const [category, data] of Object.entries(aiKnowledgeBase)) {
        if (typeof data === 'object' && !Array.isArray(data)) {
            for (const [key, value] of Object.entries(data)) {
                if (message.includes(key.toLowerCase()) || message.includes(category)) {
                    return typeof value === 'object' ? JSON.stringify(value, null, 2) : value;
                }
            }
        } else if (message.includes(category)) {
            return data;
        }
    }
    
    // Fallback responses for common queries
    if (message.includes('hello') || message.includes('hi')) {
        return 'Hello! I\'m Quirk AI, your digital assistant. I can help you learn about our services, pricing, contact information, and more. What would you like to know?';
    }
    
    if (message.includes('help')) {
        return 'I can assist you with information about our services (web development, mobile apps, AI automation, digital marketing), pricing, contact details, company information, and project processes. What specific area interests you?';
    }
    
    // For complex queries, provide helpful guidance
    return `I understand you're asking about "${userMessage}". While I have extensive knowledge about Quirk Tech's services and capabilities, for detailed technical discussions or custom requirements, I'd recommend contacting our team directly at +254111546120 or info@quirktech.com. They can provide personalized assistance for your specific needs.`;
}

async function sendMessage() {
    const message = aiInputField.value.trim();
    if (message) {
        hasInteracted = true;
        addMessage(message, true);
        aiInputField.value = '';
        
        // Show typing indicator
        const typingMsg = addMessage('', false, true);
        
        // Simulate realistic response time
        setTimeout(async () => {
            typingMsg.remove();
            const response = await getAIResponse(message);
            addMessage(response);
        }, 1000 + Math.random() * 1000);
    }
}

aiSend.addEventListener('click', sendMessage);
aiInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Track user interaction with chat
aiInputField.addEventListener('focus', () => {
    hasInteracted = true;
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

// Smooth Page Transitions
function initPageTransitions() {
    // Fade in page content smoothly
    gsap.set('body', { opacity: 0 });
    gsap.to('body', { duration: 0.6, opacity: 1, ease: 'power2.out' });
    
    // Handle page navigation with smooth transitions
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            gsap.to('body', {
                duration: 0.3,
                opacity: 0,
                ease: 'power2.in',
                onComplete: () => {
                    window.location.href = href;
                }
            });
        });
    });
}

// Loading Animation
window.addEventListener('load', () => {
    initPageTransitions();
    
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, { duration: 0.5, opacity: 0, onComplete: () => loader.remove() });
    }
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
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => {
                    img.classList.add('loaded');
                    img.classList.remove('lazy');
                };
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
window.addEventListener('DOMContentLoaded', initLazyLoading);

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