/**
 * Main JavaScript file for Shading Systems Website
 * Contains all the interactive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    
    // Toggle mobile menu with animation
    const toggleMobileMenu = (show) => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        
        if (show === undefined) {
            show = !isExpanded;
        }
        
        mobileMenuButton.setAttribute('aria-expanded', show);
        
        if (show) {
            // Show menu with animation
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            
            // Trigger reflow
            void mobileMenu.offsetHeight;
            
            mobileMenu.classList.remove('opacity-0', '-translate-y-2');
            mobileMenu.classList.add('opacity-100', 'translate-y-0');
            
            // Add animation to menu items
            const menuItems = mobileMenu.querySelectorAll('nav a, #mobile-theme-toggle');
            menuItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 50}ms`;
                item.style.transform = 'translateX(1rem)';
                item.style.opacity = '0';
                
                // Trigger reflow
                void item.offsetWidth;
                
                item.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            });
        } else {
            // Hide menu with animation
            mobileMenu.classList.remove('opacity-100', 'translate-y-0');
            mobileMenu.classList.add('opacity-0', '-translate-y-2');
            document.body.style.overflow = ''; // Re-enable scrolling
            
            // Reset menu items animation
            const menuItems = mobileMenu.querySelectorAll('nav a, #mobile-theme-toggle');
            menuItems.forEach(item => {
                item.style.transitionDelay = '';
                item.style.transform = '';
                item.style.opacity = '';
                item.style.transition = '';
            });
            
            // Wait for animation to complete before hiding
            setTimeout(() => {
                if (mobileMenuButton.getAttribute('aria-expanded') === 'false') {
                    mobileMenu.classList.add('hidden');
                }
            }, 300);
        }
    };
    
    // Event listeners for mobile menu
    if (mobileMenuButton && mobileMenu) {
        // Toggle menu on button click
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close menu when clicking the close button
        if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMobileMenu(false);
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isClickInsideMenu = mobileMenu.contains(e.target);
            const isClickOnButton = mobileMenuButton.contains(e.target);
            
            if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu(false);
            }
        });
        
        // Close menu when clicking on a menu item (except theme toggle)
        const mobileMenuItems = mobileMenu.querySelectorAll('a:not([id])');
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', () => {
                // Small delay to allow for click animation
                setTimeout(() => toggleMobileMenu(false), 100);
            });
        });
        
        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu(false);
                mobileMenuButton.focus();
            }
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
