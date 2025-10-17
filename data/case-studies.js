// Dynamic Case Studies Data
const caseStudiesData = {
    "object-detection": {
        id: "object-detection",
        projectId: "object-detection",
        title: "Real-time Object Detection: From Research to Production",
        subtitle: "How we built a production-ready object detection system serving millions of requests daily",
        author: "Alex Chen",
        date: "2024-11-15",
        readTime: "18 min read",
        category: "computer-vision",
        tags: ["case-study", "production", "yolov8", "scalability"],
        featured: true,
        image: "./resources/project-cv.jpg",
        excerpt: "A detailed case study on building and scaling a real-time object detection system from research prototype to production, handling millions of daily requests with 99.9% uptime.",
        challenge: "A major retail client needed a real-time inventory monitoring system that could detect and track products on shelves across 500+ stores, processing over 1 million images daily with sub-second response times.",
        solution: "We developed a distributed object detection system using YOLOv8 with custom optimizations, implementing intelligent caching, load balancing, and edge computing to meet the demanding performance requirements.",
        results: {
            accuracy: "95.2%",
            processingSpeed: "35 FPS",
            uptime: "99.9%",
            costReduction: "60%",
            processingTime: "28ms average"
        },
        timeline: [
            {
                phase: "Research & Prototype",
                duration: "2 months",
                description: "Evaluated different architectures, settled on YOLOv8, created initial prototype"
            },
            {
                phase: "Development",
                duration: "3 months",
                description: "Built core system, implemented custom optimizations, integrated with client infrastructure"
            },
            {
                phase: "Testing & Optimization",
                duration: "1 month",
                description: "Extensive testing, performance optimization, scalability improvements"
            },
            {
                phase: "Production Deployment",
                duration: "2 weeks",
                description: "Gradual rollout, monitoring setup, team training"
            }
        ],
        technicalDetails: {
            architecture: "Microservices-based architecture with containerized deployment",
            model: "Custom YOLOv8 with quantization and pruning optimizations",
            infrastructure: "Kubernetes cluster with auto-scaling capabilities",
            monitoring: "Comprehensive logging, metrics, and alerting system",
            security: "End-to-end encryption, API authentication, audit logging"
        },
        keyInsights: [
            "Edge computing reduced bandwidth costs by 70% while improving response times",
            "Model quantization provided 3x speed improvement with minimal accuracy loss",
            "Intelligent caching reduced redundant computations by 45%",
            "Progressive deployment strategy minimized downtime and risks"
        ],
        lessonsLearned: [
            "Start with a simple baseline and iterate - our initial complex architecture was overkill",
            "Monitor everything from day one - you can't optimize what you don't measure",
            "Plan for scale from the beginning - retrofitting for scale is much harder",
            "Invest in proper testing infrastructure - it pays dividends during development"
        ],
        futureImprovements: [
            "Implement federated learning for continuous model improvement",
            "Add support for more product categories and custom models",
            "Integrate with robotic systems for automated inventory management",
            "Expand to other use cases like loss prevention and customer analytics"
        ],
        content: `
            <h2>Project Background</h2>
            <p>In early 2024, I was approached by a major retail chain facing significant challenges with inventory management across their 500+ stores. Their existing manual inventory tracking system was inefficient, error-prone, and couldn't provide real-time insights into stock levels.</p>
            
            <h3>The Challenge</h3>
            <p>The client needed a system that could:</p>
            <ul>
                <li>Process over 1 million images daily from store cameras</li>
                <li>Detect and identify 500+ different product types</li>
                <li>Provide real-time inventory updates</li>
                <li>Maintain 99.9% uptime across all locations</li>
                <li>Integrate with existing inventory management systems</li>
                <li>Operate within strict privacy and security requirements</li>
            </ul>
            
            <h2>Technical Architecture</h2>
            <p>We designed a distributed system with three main components:</p>
            
            <h3>1. Edge Processing Units</h3>
            <p>Each store was equipped with edge computing devices that performed initial image processing and object detection. This approach provided several benefits:</p>
            <ul>
                <li>Reduced bandwidth requirements by 70%</li>
                <li>Improved response times to under 100ms</li>
                <li>Enhanced privacy by processing data locally</li>
                <li>Enabled offline operation during network issues</li>
            </ul>
            
            <h3>2. Central Processing Hub</h3>
            <p>A cloud-based system handled:</p>
            <ul>
                <li>Model training and updates</li>
                <li>Quality control and validation</li>
                <li>System monitoring and alerting</li>
                <li>Integration with business systems</li>
            </ul>
            
            <h3>3. Model Optimization Pipeline</h3>
            <p>We developed an automated pipeline for continuous model improvement:</p>
            <ul>
                <li>Automated data collection and labeling</li>
                <li>Continuous model retraining</li>
                <li>A/B testing framework</li>
                <li>Performance monitoring and alerting</li>
            </ul>
            
            <h2>Model Development</h2>
            <h3>Architecture Selection</h3>
            <p>After evaluating several options, we chose YOLOv8 as our base architecture due to its excellent balance of accuracy and speed. However, we made several customizations:</p>
            
            <h3>Customizations and Optimizations</h3>
            <ol>
                <li><strong>Model Quantization:</strong> Reduced model size by 75% with minimal accuracy loss</li>
                <li><strong>Pruning:</strong> Removed redundant parameters to improve inference speed</li>
                <li><strong>Knowledge Distillation:</strong> Created smaller, faster models for edge deployment</li>
                <li><strong>Custom Training Pipeline:</strong> Automated data augmentation and model validation</li>
            </ol>
            
            <h2>Performance Optimization</h2>
            <h3>Infrastructure Optimization</h3>
            <ul>
                <li><strong>Kubernetes Orchestration:</strong> Auto-scaling based on demand</li>
                <li><strong>Content Delivery Network:</strong> Reduced latency for global deployment</li>
                <li><strong>Intelligent Caching:</strong> Reduced redundant computations by 45%</li>
                <li><strong>Load Balancing:</strong> Distributed load across multiple instances</li>
            </ul>
            
            <h3>Model Optimization</h3>
            <ul>
                <li><strong>Quantization:</strong> INT8 inference provided 3x speed improvement</li>
                <li><strong>Batch Processing:</strong> Optimized for throughput during peak hours</li>
                <li><strong>Model Ensembling:</strong> Improved accuracy through ensemble methods</li>
                <li><strong>Transfer Learning:</strong> Accelerated training for new product categories</li>
            </ul>
            
            <h2>Results and Impact</h2>
            <h3>Performance Metrics</h3>
            <div class="results-grid">
                <div class="metric">
                    <h4>Detection Accuracy</h4>
                    <p>95.2% - exceeding the 90% target</p>
                </div>
                <div class="metric">
                    <h4>Processing Speed</h4>
                    <p>35 FPS average - well above real-time requirements</p>
                </div>
                <div class="metric">
                    <h4>System Uptime</h4>
                    <p>99.9% - meeting enterprise reliability standards</p>
                </div>
                <div class="metric">
                    <h4>Cost Reduction</h4>
                    <p>60% reduction in operational costs</p>
                </div>
            </div>
            
            <h3>Business Impact</h3>
            <ul>
                <li><strong>Inventory Accuracy:</strong> Improved from 75% to 98%</li>
                <li><strong>Stock-out Reduction:</strong> 45% decrease in out-of-stock incidents</li>
                <li><strong>Labor Savings:</strong> 200+ hours saved per week across all stores</li>
                <li><strong>Revenue Increase:</strong> 12% boost due to better inventory management</li>
            </ul>
            
            <h2>Challenges and Solutions</h2>
            <h3>Challenge 1: Varying Lighting Conditions</h3>
            <p><strong>Problem:</strong> Different store lighting conditions affected detection accuracy.</p>
            <p><strong>Solution:</strong> Implemented data augmentation techniques and trained separate models for different lighting scenarios.</p>
            
            <h3>Challenge 2: Product Variations</h3>
            <p><strong>Problem:</strong> Same products with different packaging created confusion.</p>
            <p><strong>Solution:</strong> Developed a hierarchical classification system and implemented product variant tracking.</p>
            
            <h3>Challenge 3: Scale and Performance</h3>
            <p><strong>Problem:</strong> Processing 1M+ images daily while maintaining performance.</p>
            <p><strong>Solution:</strong> Implemented edge computing and intelligent caching strategies.</p>
            
            <h2>Future Roadmap</h2>
            <p>Based on our success and lessons learned, we're planning several enhancements:</p>
            <ul>
                <li><strong>Federated Learning:</strong> Implementing federated learning for continuous model improvement</li>
                <li><strong>Robotic Integration:</strong> Integrating with robotic systems for automated inventory management</li>
                <li><strong>Advanced Analytics:</strong> Adding predictive analytics for demand forecasting</li>
                <li><strong>Expansion:</strong> Rolling out to additional use cases like loss prevention</li>
            </ul>
            
            <h2>Key Takeaways</h2>
            <p>This project taught us several valuable lessons:</p>
            <ol>
                <li><strong>Start Simple:</strong> Our initial complex architecture was overkill - start with a baseline and iterate</li>
                <li><strong>Monitor Everything:</strong> Comprehensive monitoring is essential for optimization and debugging</li>
                <li><strong>Plan for Scale:</strong> Design for scale from the beginning - retrofitting is much harder</li>
                <li><strong>Edge Computing Works:</strong> Processing data locally provides significant benefits</li>
                <li><strong>Continuous Improvement:</strong> Plan for ongoing model updates and system optimization</li>
            </ol>
            
            <p>This case study demonstrates how cutting-edge AI research can be successfully applied to solve real-world business problems at scale. The combination of advanced machine learning techniques with thoughtful system design and optimization resulted in a solution that exceeded all performance targets while delivering significant business value.</p>
        `,
        views: 1245,
        likes: 43,
        shares: 9,
        comments: 5,
        status: "published"
    }
};

// Case study categories
const caseStudyCategories = {
    all: { name: "All Case Studies", count: 0 },
    "computer-vision": { name: "Computer Vision", count: 0 },
    nlp: { name: "Natural Language Processing", count: 0 },
    "deep-learning": { name: "Deep Learning", count: 0 },
    production: { name: "Production Systems", count: 0 },
    scalability: { name: "Scalability", count: 0 }
};

// Calculate category counts
Object.values(caseStudiesData).forEach(caseStudy => {
    caseStudyCategories.all.count++;
    caseStudyCategories[caseStudy.category].count++;
    caseStudy.tags.forEach(tag => {
        if (caseStudyCategories[tag]) {
            caseStudyCategories[tag].count++;
        }
    });
});

// Utility functions
const CaseStudyManager = {
    getAllCaseStudies: () => caseStudiesData,
    
    getCaseStudyById: (id) => caseStudiesData[id],
    
    getCaseStudiesByCategory: (category) => {
        if (category === 'all') return Object.values(caseStudiesData);
        return Object.values(caseStudiesData).filter(caseStudy => 
            caseStudy.category === category || caseStudy.tags.includes(category)
        );
    },
    
    getFeaturedCaseStudies: () => {
        return Object.values(caseStudiesData).filter(caseStudy => caseStudy.featured);
    },
    
    getRecentCaseStudies: (limit = 3) => {
        return Object.values(caseStudiesData)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    },
    
    searchCaseStudies: (query) => {
        const searchTerm = query.toLowerCase();
        return Object.values(caseStudiesData).filter(caseStudy => 
            caseStudy.title.toLowerCase().includes(searchTerm) ||
            caseStudy.subtitle.toLowerCase().includes(searchTerm) ||
            caseStudy.excerpt.toLowerCase().includes(searchTerm) ||
            caseStudy.challenge.toLowerCase().includes(searchTerm) ||
            caseStudy.solution.toLowerCase().includes(searchTerm) ||
            caseStudy.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    },
    
    getCaseStudiesByProject: (projectId) => {
        return Object.values(caseStudiesData).filter(caseStudy => 
            caseStudy.projectId === projectId
        );
    },
    
    getCaseStudyCategories: () => caseStudyCategories,
    
    getPopularCaseStudies: (limit = 5) => {
        return Object.values(caseStudiesData)
            .sort((a, b) => b.views - a.views)
            .slice(0, limit);
    },
    
    incrementViews: (caseStudyId) => {
        if (caseStudiesData[caseStudyId]) {
            caseStudiesData[caseStudyId].views++;
        }
    }
};

// Make it available globally
window.CaseStudyManager = CaseStudyManager;