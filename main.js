// Main JavaScript functionality for the portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTypewriter();
    initScrollAnimations();
    initSkillsRadar();
    initProjectFilters();
    initTestimonialSlider();
    initSmoothScrolling();
    initSkillBars();
});

// Typewriter effect for hero section
function initTypewriter() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Building Intelligent Systems',
            'Transforming Data into Insights',
            'Advancing AI Research',
            'Creating Real-World Impact'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections with reveal animation
    document.querySelectorAll('.section-reveal').forEach(el => {
        observer.observe(el);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 200);
    });

    // Observe skill items
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Skills radar chart using ECharts
function initSkillsRadar() {
    const radarChart = echarts.init(document.getElementById('skills-radar'));
    
    const option = {
        backgroundColor: 'transparent',
        radar: {
            indicator: [
                { name: 'Machine Learning', max: 100 },
                { name: 'Deep Learning', max: 100 },
                { name: 'Computer Vision', max: 100 },
                { name: 'NLP', max: 100 },
                { name: 'MLOps', max: 100 },
                { name: 'Data Science', max: 100 },
                { name: 'Python', max: 100 },
                { name: 'Research', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 4,
            axisName: {
                color: '#d4a574',
                fontSize: 12,
                fontWeight: 'bold'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(212, 165, 116, 0.2)'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(212, 165, 116, 0.3)'
                }
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: [95, 90, 88, 85, 82, 92, 98, 87],
                name: 'Technical Skills',
                areaStyle: {
                    color: 'rgba(212, 165, 116, 0.2)'
                },
                lineStyle: {
                    color: '#d4a574',
                    width: 2
                },
                itemStyle: {
                    color: '#d4a574',
                    borderColor: '#d4a574',
                    borderWidth: 2
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };
    
    radarChart.setOption(option);
    
    // Make chart responsive
    window.addEventListener('resize', () => {
        radarChart.resize();
    });
}

// Project filtering system
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-amber-500', 'text-black');
                btn.classList.add('bg-gray-800', 'text-gray-300');
            });
            
            button.classList.add('active', 'bg-amber-500', 'text-black');
            button.classList.remove('bg-gray-800', 'text-gray-300');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const splide = new Splide('#testimonials-slider', {
        type: 'loop',
        perPage: 1,
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        arrows: false,
        pagination: true,
        gap: '2rem'
    });
    
    splide.mount();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
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
}

// Animated skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-item .bg-gradient-to-r');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.width = width;
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                rotateX: 5,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateX: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Add click handlers for mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('button[class*="md:hidden"]');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
});

// Form validation helper (for contact page)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formData) {
    const errors = {};
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long';
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Export functions for use in other pages
window.PortfolioJS = {
    validateEmail,
    validateForm,
    toggleMobileMenu
};