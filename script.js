// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding page
            const targetPage = this.getAttribute('data-page');
            const targetPageElement = document.getElementById(targetPage);
            if (targetPageElement) {
                targetPageElement.classList.add('active');
            }
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            navMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
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

    // Add scroll effect to headers
    const mainHeader = document.querySelector('.main-header');
    const topHeader = document.querySelector('.top-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Always keep headers visible, just add shadow when scrolling
        if (scrollTop > 50) {
            mainHeader.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            topHeader.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        } else {
            mainHeader.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            topHeader.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.filter = 'grayscale(100%)';
        });
    });

    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effects to process cards
    const processCards = document.querySelectorAll('.process-card');
    processCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            processCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
        });
    });

    // Initialize tooltips for contact information
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        const title = item.querySelector('h3');
        const content = item.querySelector('p');
        
        if (title && content) {
            item.setAttribute('title', content.textContent);
        }
    });

    // Remove parallax effect to keep images fixed
    // const heroSections = document.querySelectorAll('.hero-section');
    // window.addEventListener('scroll', function() {
    //     const scrolled = window.pageYOffset;
    //     
    //     heroSections.forEach(hero => {
    //         const rate = scrolled * -0.5;
    //         hero.style.transform = `translateY(${rate}px)`;
    //     });
    // });

    // Add fade-in animation for sections
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

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add counter animation for prices
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        const text = price.textContent;
        const number = text.match(/[\d,]+/);
        
        if (number) {
            const targetNumber = parseInt(number[0].replace(/,/g, ''));
            let currentNumber = 0;
            const increment = targetNumber / 50;
            
            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    currentNumber = targetNumber;
                    clearInterval(counter);
                }
                
                price.textContent = text.replace(number[0], Math.floor(currentNumber).toLocaleString());
            }, 20);
        }
    });

    // Add map marker animation
    const mapMarker = document.querySelector('.map-marker');
    if (mapMarker) {
        setInterval(() => {
            mapMarker.style.transform = 'translate(-50%, -50%) scale(1.1)';
            setTimeout(() => {
                mapMarker.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 200);
        }, 3000);
    }

    // Add form validation for contact form (if exists)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff0000';
                    isValid = false;
                } else {
                    input.style.borderColor = '#4CAF50';
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.');
                this.reset();
            } else {
                alert('Mohon lengkapi semua field yang diperlukan.');
            }
        });
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activePage = document.querySelector('.page.active');
        const currentIndex = Array.from(pages).indexOf(activePage);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            // Navigate to previous page
            const prevLink = navLinks[currentIndex - 1];
            prevLink.click();
        } else if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
            // Navigate to next page
            const nextLink = navLinks[currentIndex + 1];
            nextLink.click();
        }
    });

    // Add touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const activePage = document.querySelector('.page.active');
            const currentIndex = Array.from(pages).indexOf(activePage);
            
            if (diff > 0 && currentIndex < pages.length - 1) {
                // Swipe left - next page
                const nextLink = navLinks[currentIndex + 1];
                nextLink.click();
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - previous page
                const prevLink = navLinks[currentIndex - 1];
                prevLink.click();
            }
        }
    }

    // Initialize the first page as active
    if (pages.length > 0) {
        pages[0].classList.add('active');
    }

    console.log('HANJUANG website loaded successfully!');
}); 