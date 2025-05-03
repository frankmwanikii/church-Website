document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav item
    document.querySelectorAll('.nav-link').forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let slideInterval;

    // Initialize slider
    function initSlider() {
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
        startSlideInterval();
    }

    // Show slide
    function showSlide(index) {
        // Reset all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show new slide
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Next slide
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // Previous slide
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // Start auto slide
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Reset interval when user interacts with slider
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });

    // Initialize
    initSlider();
});







// Animation for welcome section when scrolling
function animateOnScroll() {
    const welcomeSection = document.querySelector('.welcome-section');
    const sectionPosition = welcomeSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
        welcomeSection.classList.add('in-view');
    }
}

// Initialize scroll animation
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);




// Animation for all sections when scrolling
function animateOnScroll() {
    const sections = document.querySelectorAll('.welcome-section, .cards-section');
    
    sections.forEach(section => {
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPosition < screenPosition) {
            section.classList.add('in-view');
        }
    });
}

// Initialize scroll animation
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);



// Devotions Carousel
function initDevotionsCarousel() {
    const carousel = document.querySelector('.devotions-carousel');
    if (!carousel) return;

    const inner = carousel.querySelector('.carousel-inner');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const indicators = carousel.querySelectorAll('.indicator');
    let currentIndex = 0;
    let intervalId;

    function updateCarousel() {
        inner.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
    });

    function startInterval() {
        intervalId = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });

    carousel.addEventListener('mouseleave', () => {
        startInterval();
    });

    // Initialize
    startInterval();
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', initDevotionsCarousel);




// Sermons Video Modal
document.addEventListener('DOMContentLoaded', function() {
    // Get all video thumbnails
    const thumbnails = document.querySelectorAll('.video-thumbnail');
    const modal = document.querySelector('.video-modal');
    const closeBtn = document.querySelector('.close-modal');
    const videoFrame = document.getElementById('youtube-video');
    
    // Open modal when thumbnail is clicked
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside video
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Load More button functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real implementation, this would load more videos
            window.open('https://youtube.com/yourchannel/videos', '_blank');
        });
    }
});





// Animate events on scroll
document.addEventListener('DOMContentLoaded', function() {
    const eventCards = document.querySelectorAll('.event-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    eventCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});





document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
            // External links will follow normally
        });
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            
            if (emailInput.value) {
                // Replace with actual form submission code
                submitButton.innerHTML = '<i class="fas fa-check"></i> Thank You!';
                submitButton.style.backgroundColor = '#4CAF50';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    emailInput.value = '';
                    submitButton.innerHTML = 'SUBSCRIBE <i class="fas fa-arrow-right"></i>';
                    submitButton.style.backgroundColor = '';
                }, 3000);
                
                // Here you would typically send the data to your server
                console.log('Submitted email:', emailInput.value);
            } else {
                emailInput.style.borderColor = '#ff4444';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 2000);
            }
        });
    }

    // Animate footer elements on scroll
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.footer-column').forEach((column, index) => {
        column.style.opacity = 0;
        column.style.transform = 'translateY(30px)';
        column.style.transition = `all 0.5s ease ${index * 0.2}s`;
        footerObserver.observe(column);
    });

    // Social media link tracking (example)
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', function() {
            // Replace with actual analytics tracking
            console.log('Social link clicked:', this.getAttribute('aria-label'));
        });
    });
});




// Enhanced with requestAnimationFrame for smoother performance
let rafId;
const progressBar = document.querySelector('.scroll-progress');

function updateProgressBar() {
    const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
    rafId = requestAnimationFrame(updateProgressBar);
}

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        if (!rafId) {
            rafId = requestAnimationFrame(updateProgressBar);
        }
    });
});

// Clean up on page leave
window.addEventListener('beforeunload', function() {
    cancelAnimationFrame(rafId);
});



document.addEventListener('DOMContentLoaded', function() {
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.submit-btn');
            
            // Change button state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                    
                    // Show success message
                    alert('Thank you! Your message has been sent successfully.');
                }, 3000);
            }, 1500);
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.contact-item, .contact-form, .map-container');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease';
            observer.observe(element);
        });
    };
    
    animateOnScroll();
});





document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Copy functionality for M-PESA details
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const mpesaDetails = [
                "Paybill: 176 287",
                "Account: tithe/offering",
                "Reference: OFFERING/TITHE"
            ].join('\n');

            navigator.clipboard.writeText(mpesaDetails)
                .then(() => {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    copyBtn.style.backgroundColor = '#4CAF50';
                    
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                        copyBtn.style.backgroundColor = '#e8c547';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    }

    // Add animation to payment cards when they come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const paymentCards = document.querySelectorAll('.payment-card');
    paymentCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});









document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Copy functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            let details = '';
            
            if (this.dataset.details === 'mpesa') {
                details = `Paybill: 176 287\nAccount: GPM - KingdomCity Church\nReference: OFFERING/TITHE`;
            }
            
            navigator.clipboard.writeText(details).then(() => {
                showNotification();
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });
    
    // Animate cards on scroll
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.giving-card');
        const windowHeight = window.innerHeight;
        
        cards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const animationDelay = index * 100;
            
            if (cardPosition < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transitionDelay = `${animationDelay}ms`;
            }
        });
    };
    
    // Set initial state for animation
    const cards = document.querySelectorAll('.giving-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Notification function
    function showNotification() {
        const notification = document.getElementById('notification');
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});




document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Copy functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            let details = '';
            
            if (this.dataset.details === 'mpesa') {
                details = `Paybill: 176 287\nAccount:  OFFERING/TITHE \nReference: OFFERING/TITHE`;
            }
            
            navigator.clipboard.writeText(details).then(() => {
                showNotification();
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });
    
    // Animate cards on scroll
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.giving-card');
        const windowHeight = window.innerHeight;
        
        cards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const animationDelay = index * 100;
            
            if (cardPosition < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transitionDelay = `${animationDelay}ms`;
            }
        });
    };
    
    // Set initial state for animation
    const cards = document.querySelectorAll('.giving-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Notification function
    function showNotification() {
        const notification = document.getElementById('notification');
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});