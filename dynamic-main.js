// Dynamic Content Management System for Portfolio Website
// This file handles all dynamic content loading, filtering, and interactions

class PortfolioDynamic {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    init() {
        this.loadDataFiles();
        this.initializeCommonFeatures();
        this.initializePageSpecificFeatures();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('projects.html')) return 'projects';
        if (path.includes('blog.html')) return 'blog';
        if (path.includes('contact.html')) return 'contact';
        if (path.includes('case-studies/')) return 'case-study';
        return 'home';
    }

    loadDataFiles() {
        // Data files are loaded via script tags in HTML
        // This method ensures data is available before initialization
        this.checkDataAvailability();
    }

    checkDataAvailability() {
        const checkInterval = setInterval(() => {
            if (window.ProjectsManager && window.BlogManager && window.CaseStudyManager) {
                clearInterval(checkInterval);
                this.dataLoaded = true;
            }
        }, 100);

        // Timeout after 5 seconds
        setTimeout(() => {
            if (!this.dataLoaded) {
                console.error('Data files not loaded within timeout period');
                clearInterval(checkInterval);
            }
        }, 5000);
    }

    initializeCommonFeatures() {
        this.initScrollAnimations();
        this.initNavigation();
        this.initMobileMenu();
        this.initFooterAnimations();
    }

    initializePageSpecificFeatures() {
        switch (this.currentPage) {
            case 'home':
                this.initHomePage();
                break;
            case 'projects':
                this.initProjectsPage();
                break;
            case 'blog':
                this.initBlogPage();
                break;
            case 'contact':
                this.initContactPage();
                break;
            case 'case-study':
                this.initCaseStudyPage();
                break;
        }
    }

    // Home Page Features
    initHomePage() {
        this.initTypewriter();
        this.initSkillsRadar();
        this.initFeaturedProjects();
        this.initTestimonialSlider();
        this.initSkillBars();
    }

    initTypewriter() {
        if (typeof Typed !== 'undefined') {
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
    }

    initSkillsRadar() {
        const radarElement = document.getElementById('skills-radar');
        if (radarElement && typeof echarts !== 'undefined') {
            const radarChart = echarts.init(radarElement);
            
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
            
            window.addEventListener('resize', () => {
                radarChart.resize();
            });
        }
    }

    initFeaturedProjects() {
        if (window.ProjectsManager) {
            const featuredProjects = window.ProjectsManager.getFeaturedProjects();
            this.renderFeaturedProjects(featuredProjects);
            this.initProjectFilters();
        }
    }

    renderFeaturedProjects(projects) {
        const container = document.getElementById('featured-projects');
        if (!container) return;

        const html = projects.map(project => `
            <div class="project-card card-hover bg-gray-900 rounded-xl overflow-hidden border border-gray-800" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-3">${project.title}</h3>
                    <p class="text-gray-400 mb-4 text-sm leading-relaxed">${project.shortDescription}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${project.technologies.slice(0, 3).map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                    <div class="flex justify-between items-center">
                        <a href="${project.caseStudyUrl}" class="text-amber-500 hover:text-amber-400 font-semibold text-sm">View Case Study</a>
                        <div class="flex space-x-3">
                            <a href="${project.githubUrl}" class="text-gray-400 hover:text-white" target="_blank">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="${project.liveDemoUrl}" class="text-gray-400 hover:text-white" target="_blank">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    initProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
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
                
                this.filterProjects(filter);
            });
        });
    }

    filterProjects(filter) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.style.display = 'block';
                anime({
                    targets: card,
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            } else {
                anime({
                    targets: card,
                    opacity: 0,
                    scale: 0.8,
                    duration: 200,
                    easing: 'easeInCubic',
                    complete: () => {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }

    initTestimonialSlider() {
        if (typeof Splide !== 'undefined') {
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
    }

    initSkillBars() {
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

    // Projects Page Features
    initProjectsPage() {
        this.loadAllProjects();
        this.initProjectSearch();
        this.initProjectModal();
    }

    loadAllProjects() {
        if (window.ProjectsManager) {
            const projects = window.ProjectsManager.getProjectsByCategory('all');
            this.renderProjectsGrid(projects);
            this.updateProjectFilterCounts();
        }
    }

    renderProjectsGrid(projects) {
        const container = document.getElementById('projects-grid');
        if (!container) return;

        const html = projects.map(project => `
            <div class="project-card card-hover bg-gray-900 rounded-xl overflow-hidden border border-gray-800 cursor-pointer" data-category="${project.category}" data-project="${project.id}">
                <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-3">${project.title}</h3>
                    <p class="text-gray-400 mb-4 text-sm leading-relaxed">${project.shortDescription}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${project.technologies.slice(0, 4).map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-amber-500 font-semibold text-sm">View Details</span>
                        <div class="flex space-x-3">
                            <a href="${project.githubUrl}" class="text-gray-400 hover:text-white" onclick="event.stopPropagation()" target="_blank">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="${project.liveDemoUrl}" class="text-gray-400 hover:text-white" onclick="event.stopPropagation()" target="_blank">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
        
        // Add click handlers
        const projectCards = container.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                this.openProjectModal(projectId);
            });
        });
    }

    updateProjectFilterCounts() {
        const categories = window.ProjectsManager.getProjectCategories();
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            const filter = button.getAttribute('data-filter');
            const category = categories[filter];
            if (category) {
                button.textContent = `${category.name} (${category.count})`;
            }
        });
    }

    initProjectSearch() {
        const searchInput = document.getElementById('project-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value;
                this.searchProjects(query);
            });
        }
    }

    searchProjects(query) {
        if (!window.ProjectsManager) return;
        
        const projects = window.ProjectsManager.searchProjects(query);
        this.renderProjectsGrid(projects);
    }

    initProjectModal() {
        const modal = document.getElementById('project-modal');
        const closeModal = document.getElementById('close-modal');
        
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.closeProjectModal();
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeProjectModal();
                }
            });
        }
    }

    openProjectModal(projectId) {
        if (!window.ProjectsManager) return;
        
        const project = window.ProjectsManager.getProjectById(projectId);
        if (!project) return;
        
        const modal = document.getElementById('project-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        if (modal && modalTitle && modalBody) {
            modalTitle.textContent = project.title;
            modalBody.innerHTML = this.generateProjectModalContent(project);
            modal.classList.add('active');
        }
    }

    closeProjectModal() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    generateProjectModalContent(project) {
        return `
            <div class="space-y-6">
                <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-lg">
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-xl font-semibold mb-3 text-amber-500">Project Overview</h3>
                        <p class="text-gray-300 mb-4">${project.longDescription}</p>
                        <h4 class="text-lg font-semibold mb-2 text-amber-500">Key Features</h4>
                        <ul class="text-gray-300 space-y-1">
                            ${project.features.map(feature => `<li>• ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-semibold mb-3 text-amber-500">Technical Stack</h3>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <h4 class="text-lg font-semibold mb-2 text-amber-500">Performance Metrics</h4>
                        <div class="space-y-2">
                            ${Object.entries(project.metrics).map(([key, value]) => `
                                <div class="flex justify-between">
                                    <span class="text-gray-300 capitalize">${key.replace(/([A-Z])/g, ' $1')}:</span>
                                    <span class="text-amber-500">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="flex gap-4 mt-6">
                    <a href="${project.githubUrl}" class="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors" target="_blank">
                        View on GitHub
                    </a>
                    <a href="${project.liveDemoUrl}" class="bg-amber-500 text-black px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors" target="_blank">
                        Live Demo
                    </a>
                    <a href="${project.caseStudyUrl}" class="border border-amber-500 text-amber-500 px-6 py-3 rounded-lg hover:bg-amber-500 hover:text-black transition-colors">
                        Full Case Study
                    </a>
                </div>
            </div>
        `;
    }

    // Blog Page Features
    initBlogPage() {
        this.loadBlogPosts();
        this.initBlogSearch();
        this.initBlogFilters();
        this.initBlogTimeline();
    }

    loadBlogPosts() {
        if (window.BlogManager) {
            const posts = window.BlogManager.getPostsByCategory('all');
            this.renderBlogTimeline(posts);
            this.updateBlogFilterCounts();
        }
    }

    renderBlogTimeline(posts) {
        const container = document.getElementById('blog-timeline');
        if (!container) return;

        const html = posts.map(post => `
            <div class="blog-post relative flex items-center" data-tags="${post.tags.join(',')}" data-post-id="${post.id}">
                <div class="timeline-dot"></div>
                <div class="w-full">
                    <div class="blog-card bg-gray-900 rounded-xl p-6 border border-gray-800 ml-8">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="text-gray-400 text-sm">${this.formatDate(post.date)}</span>
                            <span class="text-gray-400 text-sm">•</span>
                            <span class="text-gray-400 text-sm">${post.readTime}</span>
                        </div>
                        <h3 class="text-2xl font-bold mb-3">
                            <a href="./blog-post.html?id=${post.id}" class="hover:text-amber-500 transition-colors">
                                ${post.title}
                            </a>
                        </h3>
                        <p class="text-gray-300 leading-relaxed mb-4">${post.excerpt}</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                <span class="text-gray-400 text-sm">${post.views} views</span>
                            </div>
                            <a href="./blog-post.html?id=${post.id}" class="text-amber-500 hover:text-amber-400 font-semibold">
                                Read Article →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
        
        // Animate blog posts
        this.animateBlogPosts();
    }

    animateBlogPosts() {
        const blogPosts = document.querySelectorAll('.blog-post');
        blogPosts.forEach((post, index) => {
            setTimeout(() => {
                post.classList.add('visible');
            }, index * 200);
        });
    }

    initBlogSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value;
                this.searchBlogPosts(query);
            });
        }
    }

    searchBlogPosts(query) {
        if (!window.BlogManager) return;
        
        const posts = window.BlogManager.searchPosts(query);
        this.renderBlogTimeline(posts);
    }

    initBlogFilters() {
        const tagButtons = document.querySelectorAll('.tag[data-tag]');
        
        tagButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tag = button.getAttribute('data-tag');
                
                // Update active tag
                tagButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                this.filterBlogPosts(tag);
            });
        });
    }

    filterBlogPosts(tag) {
        if (!window.BlogManager) return;
        
        const posts = window.BlogManager.getPostsByCategory(tag);
        this.renderBlogTimeline(posts);
    }

    updateBlogFilterCounts() {
        const categories = window.BlogManager.getBlogCategories();
        // Update filter counts if needed
    }

    initBlogTimeline() {
        const timeline = document.getElementById('blog-timeline');
        if (timeline) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            
            const posts = timeline.querySelectorAll('.blog-post');
            posts.forEach(post => observer.observe(post));
        }
    }

    // Contact Page Features
    initContactPage() {
        this.initContactForm();
        this.initContactAnimations();
    }

    initContactForm() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', this.handleContactSubmit.bind(this));
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateContactField(input));
                input.addEventListener('input', () => this.clearContactFieldError(input));
            });
        }
    }

    async handleContactSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Clear previous errors
        this.clearContactErrors();
        
        // Validate form
        const validation = this.validateContactForm(data);
        if (!validation.isValid) {
            this.showContactErrors(validation.errors);
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const submitText = submitBtn.querySelector('.submit-text');
        const loadingText = submitBtn.querySelector('.loading-text');
        
        submitBtn.disabled = true;
        submitText.classList.add('hidden');
        loadingText.classList.remove('hidden');
        
        try {
            await this.simulateContactSubmission(data);
            
            // Show success message
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
                successMessage.classList.add('show');
            }
            
            form.reset();
            
            // Reset button state
            setTimeout(() => {
                submitBtn.disabled = false;
                submitText.classList.remove('hidden');
                loadingText.classList.add('hidden');
            }, 2000);
            
            // Hide success message
            setTimeout(() => {
                if (successMessage) {
                    successMessage.classList.remove('show');
                }
            }, 5000);
            
        } catch (error) {
            alert('Sorry, there was an error sending your message. Please try again.');
            submitBtn.disabled = false;
            submitText.classList.remove('hidden');
            loadingText.classList.add('hidden');
        }
    }

    validateContactForm(data) {
        const errors = {};
        
        if (!data.firstName || data.firstName.trim().length < 2) {
            errors.firstName = 'First name must be at least 2 characters long';
        }
        
        if (!data.lastName || data.lastName.trim().length < 2) {
            errors.lastName = 'Last name must be at least 2 characters long';
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!data.projectType) {
            errors.projectType = 'Please select a project type';
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long';
        }
        
        if (!data.privacy) {
            errors.privacy = 'You must agree to the privacy policy';
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    validateContactField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        let error = '';
        
        switch (fieldName) {
            case 'firstName':
                if (!value || value.length < 2) {
                    error = 'First name must be at least 2 characters long';
                }
                break;
            case 'lastName':
                if (!value || value.length < 2) {
                    error = 'Last name must be at least 2 characters long';
                }
                break;
            case 'email':
                if (!value || !this.isValidEmail(value)) {
                    error = 'Please enter a valid email address';
                }
                break;
            case 'projectType':
                if (!value) {
                    error = 'Please select a project type';
                }
                break;
            case 'message':
                if (!value || value.length < 10) {
                    error = 'Message must be at least 10 characters long';
                }
                break;
        }
        
        if (error && errorElement) {
            errorElement.textContent = error;
            errorElement.classList.add('show');
            field.classList.add('error');
            field.classList.remove('success');
        } else if (value && errorElement) {
            errorElement.classList.remove('show');
            field.classList.remove('error');
            field.classList.add('success');
        }
    }

    clearContactFieldError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.classList.remove('show');
            field.classList.remove('error');
        }
    }

    showContactErrors(errors) {
        Object.keys(errors).forEach(fieldName => {
            const errorElement = document.getElementById(`${fieldName}-error`);
            const field = document.getElementById(fieldName);
            
            if (errorElement && field) {
                errorElement.textContent = errors[fieldName];
                errorElement.classList.add('show');
                field.classList.add('error');
            }
        });
    }

    clearContactErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const fields = document.querySelectorAll('.form-input');
        
        errorElements.forEach(element => {
            element.classList.remove('show');
        });
        
        fields.forEach(field => {
            field.classList.remove('error', 'success');
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async simulateContactSubmission(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Contact form submitted with data:', data);
                resolve();
            }, 2000);
        });
    }

    initContactAnimations() {
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200);
        });
    }

    // Case Study Page Features
    initCaseStudyPage() {
        this.loadCaseStudyContent();
    }

    loadCaseStudyContent() {
        const urlParams = new URLSearchParams(window.location.search);
        const caseStudyId = urlParams.get('id');
        
        if (caseStudyId && window.CaseStudyManager) {
            const caseStudy = window.CaseStudyManager.getCaseStudyById(caseStudyId);
            if (caseStudy) {
                this.renderCaseStudy(caseStudy);
            }
        }
    }

    renderCaseStudy(caseStudy) {
        // This would render the full case study content
        // Implementation depends on the specific case study page structure
        console.log('Rendering case study:', caseStudy.title);
    }

    // Common Features
    initScrollAnimations() {
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

        document.querySelectorAll('.section-reveal, .skill-item, .contact-card').forEach(el => {
            observer.observe(el);
        });
    }

    initNavigation() {
        // Smooth scrolling for navigation links
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

    initMobileMenu() {
        const mobileMenuButton = document.querySelector('button[class*="md:hidden"]');
        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', this.toggleMobileMenu);
        }
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    }

    initFooterAnimations() {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                anime({
                    targets: link,
                    scale: 1.1,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
            
            link.addEventListener('mouseleave', () => {
                anime({
                    targets: link,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
        });
    }

    // Utility Functions
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    debounce(func, wait) {
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
}

// Initialize the dynamic portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioDynamic = new PortfolioDynamic();
});

// Export for use in other scripts
window.PortfolioDynamic = PortfolioDynamic;