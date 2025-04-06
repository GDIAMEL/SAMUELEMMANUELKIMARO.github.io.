// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navToggle = document.querySelector('.nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const themeToggle = document.getElementById('theme-toggle');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const scrollTop = document.querySelector('.scroll-top');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const contactForm = document.querySelector('.contact-form');
    const counterElements = document.querySelectorAll('.counter');

    // Mobile Navigation Toggle
    navToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close navigation when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Active link on scroll
    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Theme Toggle (Dark/Light Mode)
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Portfolio Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Testimonial Slider
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all dots
            testimonialDots.forEach(d => d.classList.remove('active'));
            // Add active class to clicked dot
            dot.classList.add('active');
            
            // Hide all testimonials
            testimonialCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            });
            
            // Show selected testimonial
            setTimeout(() => {
                testimonialCards[index].style.display = 'block';
                setTimeout(() => {
                    testimonialCards[index].style.opacity = '1';
                    testimonialCards[index].style.transform = 'translateX(0)';
                }, 100);
            }, 300);
        });
    });

    // Auto-advance testimonials every 5 seconds
    let currentTestimonial = 0;
    
    function autoAdvanceTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        testimonialDots[currentTestimonial].click();
    }
    
    const testimonialInterval = setInterval(autoAdvanceTestimonial, 5000);
    
    // Pause auto-advance when hovering over testimonials
    document.querySelector('.testimonials-slider').addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    document.querySelector('.testimonials-slider').addEventListener('mouseleave', () => {
        clearInterval(testimonialInterval);
    });

    // Contact Form Submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form data
        if (validateForm(data)) {
            // Simulate form submission (replace with actual submission)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                // Show success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Message Sent!</h3>
                        <p>Thank you for reaching out. I'll get back to you soon.</p>
                    </div>
                `;
            }, 1500);
        }
    });
    
    function validateForm(data) {
        let isValid = true;
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validate each field
        for (const [key, value] of Object.entries(data)) {
            const input = document.getElementById(key);
            
            if (!value.trim()) {
                isValid = false;
                showError(input, 'This field is required');
            } else if (key === 'email' && !isValidEmail(value)) {
                isValid = false;
                showError(input, 'Please enter a valid email address');
            }
        }
        
        return isValid;
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
        
        input.classList.add('error');
        
        // Remove error on input focus
        input.addEventListener('focus', () => {
            input.classList.remove('error');
            const error = formGroup.querySelector('.error-message');
            if (error) {
                error.remove();
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Stats Counter Animation
    function animateCounters() {
        counterElements.forEach(counter => {
            const target = parseInt(counter.textContent);
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            const updateCounter = () => {
                count += increment;
                counter.textContent = Math.min(Math.floor(count), target);
                
                if (count < target) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            updateCounter();
        });
    }

    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Scroll to top button visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
        
        // Update active link on scroll
        setActiveLink();
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Page loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.section-header, .skill-item, .service-card, .portfolio-item, .testimonial-card, .contact-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});
