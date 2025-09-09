 // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 1200,
            once: false,
            offset: 100,
            easing: 'ease-in-out'
        });
        
        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Preloader
            const preloader = document.querySelector('.preloader');
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 1000);
            }, 2500);
            
            // Header scroll effect
            const header = document.getElementById('header');
            let lastScrollTop = 0;
            let ticking = false;
            
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    requestAnimationFrame(function() {
                        const scrollTop = window.scrollY;
                        
                        if (scrollTop > 50) {
                            header.classList.add('scrolled');
                        } else {
                            header.classList.remove('scrolled');
                        }
                        
                        if (scrollTop > 200) {
                            if (scrollTop > lastScrollTop) {
                                header.classList.add('shrink');
                                header.classList.remove('show');
                            } else {
                                header.classList.remove('shrink');
                                header.classList.add('show');
                            }
                        } else {
                            header.classList.remove('shrink');
                            header.classList.add('show');
                        }
                        
                        lastScrollTop = scrollTop;
                        ticking = false;
                    });
                    
                    ticking = true;
                }
            });
            
            // Back to top button
            const backToTopBtn = document.querySelector('.back-to-top');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 500) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Hamburger Menu
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.querySelector('.mobile_menu');
            const mobileMenuOverlay = document.querySelector('.mobile_menu_overlay');
            const mobileMenuClose = document.querySelector('.mobile_menu_close');
            const mobileNavLinks = document.querySelectorAll('.mobile_nav_link');
            
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                mobileMenuOverlay.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
            });
            
            mobileMenuOverlay.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            mobileMenuClose.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            // Mobile Dropdown
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const dropdown = this.parentElement.querySelector('.mobile_dropdown');
                    const icon = this.querySelector('.material-symbols-outlined');
                    
                    if (dropdown.classList.contains('active')) {
                        dropdown.classList.remove('active');
                        icon.textContent = 'expand_more';
                    } else {
                        dropdown.classList.add('active');
                        icon.textContent = 'expand_less';
                    }
                });
            });
            
            // Carousel functionality with 5 images
            const carousel = document.querySelector('.carousel');
            const carouselItems = document.querySelectorAll('.carousel-item');
            const dots = document.querySelectorAll('.carousel-dot');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            let currentIndex = 0;
            let interval;
            let isAnimating = false;
            
            // Function to update carousel
            function updateCarousel() {
                if (isAnimating) return;
                isAnimating = true;
                
                // Remove active class from all items
                carouselItems.forEach(item => {
                    item.classList.remove('active', 'prev', 'next');
                });
                
                // Add active class to current item
                carouselItems[currentIndex].classList.add('active');
                
                // Add prev class to previous item
                const prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
                carouselItems[prevIndex].classList.add('prev');
                
                // Add next class to next item
                const nextIndex = (currentIndex + 1) % carouselItems.length;
                carouselItems[nextIndex].classList.add('next');
                
                // Update dots
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
                
                // Update transform after a small delay to allow CSS transitions
                setTimeout(() => {
                    carousel.style.transform = `translateX(-${currentIndex * 20}%)`;
                    isAnimating = false;
                }, 50);
            }
            
            // Function to move to next slide
            function nextSlide() {
                currentIndex = (currentIndex + 1) % carouselItems.length;
                updateCarousel();
            }
            
            // Function to move to previous slide
            function prevSlide() {
                currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
                updateCarousel();
            }
            
            // Auto slide every 4 seconds
            function startAutoSlide() {
                interval = setInterval(nextSlide, 4000);
            }
            
            // Stop auto slide
            function stopAutoSlide() {
                clearInterval(interval);
            }
            
            // Event listeners for buttons
            nextBtn.addEventListener('click', function() {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
            
            prevBtn.addEventListener('click', function() {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
            
            // Event listeners for dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    stopAutoSlide();
                    currentIndex = index;
                    updateCarousel();
                    startAutoSlide();
                });
            });
            
            // Start auto slide
            startAutoSlide();
            
            // Pause auto slide when hovering over carousel
            const carouselContainer = document.querySelector('.banner-container');
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
            
            // Create particles
            function createParticles(containerId, count) {
                const container = document.getElementById(containerId);
                if (!container) return;
                
                for (let i = 0; i < count; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    const size = Math.random() * 8 + 2;
                    const posX = Math.random() * 100;
                    const posY = Math.random() * 100;
                    const delay = Math.random() * 5;
                    const duration = Math.random() * 15 + 10;
                    const opacity = Math.random() * 0.5 + 0.3;
                    
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    particle.style.left = `${posX}%`;
                    particle.style.top = `${posY}%`;
                    particle.style.opacity = opacity;
                    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
                    
                    container.appendChild(particle);
                }
            }
            
            createParticles('particles-1', 50);
            createParticles('particles-2', 30);
            
            // Testimonials auto sliding
            const testimonialsSlider = document.querySelector('.testimonials-slider');
            const testimonialCards = document.querySelectorAll('.testimonial-card');
            const testimonialDots = document.querySelectorAll('.testimonial-dot');
            let testimonialIndex = 0;
            let testimonialInterval;
            
            function updateTestimonials() {
                testimonialsSlider.style.transform = `translateX(-${testimonialIndex * 100}%)`;
                
                // Update dots
                testimonialDots.forEach((dot, index) => {
                    if (index === testimonialIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            function nextTestimonial() {
                testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
                updateTestimonials();
            }
            
            function startTestimonialAutoSlide() {
                testimonialInterval = setInterval(nextTestimonial, 5000);
            }
            
            function stopTestimonialAutoSlide() {
                clearInterval(testimonialInterval);
            }
            
            // Event listeners for testimonial dots
            testimonialDots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    stopTestimonialAutoSlide();
                    testimonialIndex = index;
                    updateTestimonials();
                    startTestimonialAutoSlide();
                });
            });
            
            // Start testimonial auto slide
            startTestimonialAutoSlide();
            
            // Pause testimonial auto slide when hovering
            const testimonialsContainer = document.querySelector('.testimonials-container');
            testimonialsContainer.addEventListener('mouseenter', stopTestimonialAutoSlide);
            testimonialsContainer.addEventListener('mouseleave', startTestimonialAutoSlide);
            
            
            
            // Enhanced animations for product cards
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.zIndex = '10';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.zIndex = '1';
                });
            });
            
            // Enhanced animations for category items
            const categoryItems = document.querySelectorAll('.category_items a');
            
            categoryItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.zIndex = '10';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.zIndex = '1';
                });
            });
            
            // Form submission handling
            const newsletterForm = document.querySelector('.newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const emailInput = this.querySelector('.newsletter-input');
                    if (emailInput.value.trim() === '') {
                        emailInput.style.borderColor = '#ff3f6c';
                        emailInput.placeholder = 'Please enter a valid email address';
                    } else {
                        // Show success message
                        const originalPlaceholder = emailInput.placeholder;
                        emailInput.value = '';
                        emailInput.placeholder = 'Thank you for subscribing!';
                        emailInput.style.borderColor = '#2ad262';
                        
                        // Reset after 3 seconds
                        setTimeout(() => {
                            emailInput.placeholder = originalPlaceholder;
                            emailInput.style.borderColor = '';
                        }, 3000);
                    }
                });
            }
            
            // Login/Signup button animation
            const authBtns = document.querySelectorAll('.auth_btn');
            authBtns.forEach(btn => {
                btn.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px) scale(1.05) rotate(2deg)';
                });
                
                btn.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                });
            });
            
            // Add ripple effect to buttons
            function createRipple(event) {
                const button = event.currentTarget;
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = event.clientX - rect.left - size / 2;
                const y = event.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.classList.add('ripple');
                
                const existingRipple = button.querySelector('.ripple');
                if (existingRipple) {
                    existingRipple.remove();
                }
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
            
            // Add styles for ripple effect
            const style = document.createElement('style');
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                }
                
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Add ripple effect to all buttons
            const allButtons = document.querySelectorAll('button');
            allButtons.forEach(button => {
                button.addEventListener('click', createRipple);
            });
            
            // Lazy loading for images
            const images = document.querySelectorAll('img');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            images.forEach(img => {
                if (img.getAttribute('data-src')) {
                    imageObserver.observe(img);
                }
            });
            
            // Add smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Add parallax effect to banner images
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                const bannerItems = document.querySelectorAll('.carousel-item');
                
                bannerItems.forEach((item, index) => {
                    const img = item.querySelector('img');
                    if (img) {
                        const speed = 0.1 + (index * 0.05);
                        img.style.transform = `translateY(${scrollPosition * speed}px) scale(1.1)`;
                    }
                });
            });
            
            // Add animation to product badges
            const productBadges = document.querySelectorAll('.product-badge');
            productBadges.forEach((badge, index) => {
                badge.style.animationDelay = `${index * 0.1}s`;
            });
            
            // Add staggered animation to product grid
            const productGridItems = document.querySelectorAll('.products-grid .product-card');
            productGridItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
            });
            
            // Add keyboard navigation support
            document.addEventListener('keydown', function(e) {
                // ESC key to close mobile menu
                if (e.key === 'Escape') {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    mobileMenuOverlay.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // Arrow keys for carousel navigation
                if (e.key === 'ArrowLeft') {
                    stopAutoSlide();
                    prevSlide();
                    startAutoSlide();
                }
                
                if (e.key === 'ArrowRight') {
                    stopAutoSlide();
                    nextSlide();
                    startAutoSlide();
                }
            });
            
            // Add touch support for carousel
            let touchStartX = 0;
            let touchEndX = 0;
            
            carouselContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoSlide();
            }, { passive: true });
            
            carouselContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startAutoSlide();
            }, { passive: true });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                if (touchStartX - touchEndX > swipeThreshold) {
                    nextSlide();
                } else if (touchEndX - touchStartX > swipeThreshold) {
                    prevSlide();
                }
            }
            
            // Add page transition effects
            window.addEventListener('beforeunload', function() {
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
            });
            
            // Initialize all animations
            setTimeout(() => {
                document.body.style.opacity = '1';
                document.body.style.transition = 'opacity 0.5s ease';
            }, 100);
            
            // Add performance optimization
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(function(registration) {
                        console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    }, function(err) {
                        console.log('ServiceWorker registration failed: ', err);
                    });
                });
            }
            
            // Add PWA support
            let deferredPrompt;
            
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                
                // Optionally, show a "Install App" button
                const installButton = document.createElement('button');
                installButton.textContent = 'Install ShopHub App';
                installButton.style.position = 'fixed';
                installButton.style.bottom = '100px';
                installButton.style.right = '20px';
                installButton.style.zIndex = '9999';
                installButton.style.padding = '10px 20px';
                installButton.style.borderRadius = '30px';
                installButton.style.background = 'var(--primary-gradient)';
                installButton.style.color = 'white';
                installButton.style.border = 'none';
                installButton.style.boxShadow = '0 4px 15px rgba(255,63,108,0.3)';
                installButton.style.cursor = 'pointer';
                installButton.style.display = 'none';
                
                installButton.addEventListener('click', () => {
                    if (deferredPrompt) {
                        deferredPrompt.prompt();
                        deferredPrompt.userChoice.then((choiceResult) => {
                            if (choiceResult.outcome === 'accepted') {
                                console.log('User accepted the install prompt');
                            } else {
                                console.log('User dismissed the install prompt');
                            }
                            deferredPrompt = null;
                            installButton.remove();
                        });
                    }
                });
                
                document.body.appendChild(installButton);
                
                // Show the button after 5 seconds if the user hasn't installed the app
                setTimeout(() => {
                    if (deferredPrompt && !window.matchMedia('(display-mode: standalone)').matches) {
                        installButton.style.display = 'block';
                    }
                }, 5000);
            });
            
            // Add dark mode toggle based on system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.classList.add('dark-mode');
            }
            
            // Listen for changes in color scheme
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                if (event.matches) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
            });
            
            // Add accessibility features
            const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
            focusableElements.forEach(element => {
                element.addEventListener('focus', function() {
                    this.style.outline = '2px solid var(--primary)';
                    this.style.outlineOffset = '2px';
                });
                
                element.addEventListener('blur', function() {
                    this.style.outline = '';
                });
            });
            
            // Add skip to content link for accessibility
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.textContent = 'Skip to main content';
            skipLink.style.position = 'absolute';
            skipLink.style.top = '-40px';
            skipLink.style.left = '0';
            skipLink.style.background = 'var(--primary)';
            skipLink.style.color = 'white';
            skipLink.style.padding = '8px 16px';
            skipLink.style.zIndex = '9999';
            skipLink.style.textDecoration = 'none';
            skipLink.style.transition = 'top 0.3s ease';
            
            skipLink.addEventListener('focus', function() {
                this.style.top = '0';
            });
            
            skipLink.addEventListener('blur', function() {
                this.style.top = '-40px';
            });
            
            document.body.insertBefore(skipLink, document.body.firstChild);
            
            // Add ID to main element for skip link
            const mainElement = document.querySelector('main');
            if (mainElement) {
                mainElement.id = 'main';
            }
            
            // Add analytics tracking (simulated)
            function trackEvent(category, action, label) {
                console.log(`Event tracked: ${category} - ${action} - ${label}`);
                // In a real implementation, this would send data to an analytics service
            }
            
            // Track product views
            productCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const productName = this.querySelector('.product-title').textContent;
                    trackEvent('Product', 'View', productName);
                });
            });
            
            // Track button clicks
            document.querySelectorAll('button').forEach(button => {
                button.addEventListener('click', function() {
                    const buttonText = this.textContent.trim();
                    trackEvent('Button', 'Click', buttonText);
                });
            });
            
            // Track link clicks
            document.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function(e) {
                    const linkText = this.textContent.trim();
                    const linkHref = this.getAttribute('href');
                    trackEvent('Link', 'Click', `${linkText} - ${linkHref}`);
                });
            });
            
            console.log('ShopHub website fully loaded with all animations and features enabled!');


            // Function to initialize a countdown timer
function initializeCountdown(timerElement, hours, minutes, seconds) {
    // Calculate the target time (current time + specified hours, minutes, seconds)
    let targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + hours);
    targetTime.setMinutes(targetTime.getMinutes() + minutes);
    targetTime.setSeconds(targetTime.getSeconds() + seconds);

    // Update the timer every second
    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetTime - now;

        // Calculate days, hours, minutes and seconds
        const hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

        // Check if the countdown has ended
        if (distance < 0) {
            clearInterval(interval);
            timerElement.innerHTML = '<div class="timer-unit"><span class="timer-value">EXPIRED</span></div>';
            return;
        }

        // Update the HTML elements with the calculated values
        const timerUnits = timerElement.querySelectorAll('.timer-unit');
        if (timerUnits.length >= 3) {
            timerUnits[0].querySelector('.timer-value').textContent = hoursLeft.toString().padStart(2, '0');
            timerUnits[1].querySelector('.timer-value').textContent = minutesLeft.toString().padStart(2, '0');
            timerUnits[2].querySelector('.timer-value').textContent = secondsLeft.toString().padStart(2, '0');
        }
    }, 1000);
}

// Initialize the main Flash Sale timer (set to 24 hours from page load)
const flashSaleTimer = document.querySelector('.flash-sale-timer');
if (flashSaleTimer) {
    initializeCountdown(flashSaleTimer, 24, 0, 0); // 24 hours, 0 minutes, 0 seconds
}

// Initialize timers in the carousel (optional - you can set different durations for each)
const carouselCountdowns = document.querySelectorAll('.sale-countdown .countdown-timer');
carouselCountdowns.forEach((timer, index) => {
    // Set different durations for each slide, e.g., 12 hours for the first, 6 for the second, etc.
    const durations = [12, 6, 18, 3, 24]; // Example durations in hours
    const hours = durations[index] || 12; // Default to 12 hours if not specified
    initializeCountdown(timer, hours, 0, 0);
});

        });