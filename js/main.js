/**
 * Main JavaScript file for Shading Systems Website
 * Contains all the interactive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');
    const html = document.documentElement;
    
    // Check for saved user preference, if any, on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        updateThemeIcons('dark');
    } else {
        html.removeAttribute('data-theme');
        updateThemeIcons('light');
    }
    
    // Function to update theme icons
    function updateThemeIcons(theme) {
        const icons = document.querySelectorAll('#theme-toggle i, #mobile-theme-toggle i');
        icons.forEach(icon => {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                // Update mobile button text if it exists
                const mobileText = icon.parentElement.querySelector('span');
                if (mobileText) {
                    mobileText.textContent = 'الوضع النهاري';
                }
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                // Update mobile button text if it exists
                const mobileText = icon.parentElement.querySelector('span');
                if (mobileText) {
                    mobileText.textContent = 'الوضع الليلي';
                }
            }
        });
    }
    
    // Add click event listeners to all theme toggle buttons
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                html.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                updateThemeIcons('light');
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateThemeIcons('dark');
            }
        });
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            menuBtn.querySelector('i').classList.toggle('fa-bars');
            menuBtn.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        // Show/hide button on scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.remove('opacity-100', 'visible');
                backToTopBtn.classList.add('opacity-0', 'invisible');
            }
        });

        // Smooth scroll to top
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle answer visibility
            answer.classList.toggle('max-h-0');
            answer.classList.toggle('opacity-0');
            answer.classList.toggle('py-0');
            answer.classList.toggle('py-4');
            
            // Toggle icon
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');
            
            // Toggle active class on question
            this.classList.toggle('bg-blue-50');
            this.classList.toggle('text-blue-700');
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Add error message if not exists
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('text-red-500')) {
                        const error = document.createElement('p');
                        error.className = 'text-red-500 text-sm mt-1';
                        error.textContent = 'هذا الحقل مطلوب';
                        field.parentNode.insertBefore(error, field.nextSibling);
                    }
                } else {
                    field.classList.remove('border-red-500');
                    
                    // Remove error message if exists
                    if (field.nextElementSibling && field.nextElementSibling.classList.contains('text-red-500')) {
                        field.nextElementSibling.remove();
                    }
                    
                    // Email validation
                    if (field.type === 'email' && !isValidEmail(field.value)) {
                        isValid = false;
                        field.classList.add('border-red-500');
                        
                        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('text-red-500')) {
                            const error = document.createElement('p');
                            error.className = 'text-red-500 text-sm mt-1';
                            error.textContent = 'الرجاء إدخال بريد إلكتروني صحيح';
                            field.parentNode.insertBefore(error, field.nextSibling);
                        }
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Scroll to first error
                const firstError = this.querySelector('.border-red-500');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        
        // Remove error state on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('border-red-500');
                    
                    // Remove error message if exists
                    if (this.nextElementSibling && this.nextElementSibling.classList.contains('text-red-500')) {
                        this.nextElementSibling.remove();
                    }
                }
            });
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    if (menuBtn) {
                        menuBtn.querySelector('i').classList.add('fa-bars');
                        menuBtn.querySelector('i').classList.remove('fa-times');
                    }
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });

    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src || '';
            img.srcset = img.dataset.srcset || '';
            img.removeAttribute('data-src');
            img.removeAttribute('data-srcset');
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || '';
                    img.srcset = img.dataset.srcset || '';
                    img.removeAttribute('data-src');
                    img.removeAttribute('data-srcset');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('opacity-100', 'translate-y-0');
                element.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Add active class to current navigation link
    const currentLocation = location.href;
    const navLinks = document.querySelectorAll('nav a');
    const navLength = navLinks.length;
    
    for (let i = 0; i < navLength; i++) {
        if (navLinks[i].href === currentLocation) {
            navLinks[i].classList.add('text-blue-200', 'font-semibold');
            navLinks[i].classList.remove('hover:text-blue-200');
        }
    }
});

// Helper function to validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Helper function to debounce function calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
