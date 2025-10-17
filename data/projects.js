// Dynamic Projects Data
const projectsData = {
    "object-detection": {
        id: "object-detection",
        title: "Real-time Object Detection System",
        category: "cv",
        shortDescription: "Advanced YOLOv8-based detection system with 95% accuracy on custom datasets. Optimized for edge deployment with real-time processing capabilities.",
        longDescription: "This advanced object detection system leverages YOLOv8 architecture to achieve real-time processing with exceptional accuracy. The system is optimized for edge deployment and can process multiple video streams simultaneously, making it ideal for security, autonomous vehicles, and industrial applications.",
        image: "./resources/project-cv.jpg",
        technologies: ["YOLOv8", "PyTorch", "OpenCV", "TensorRT", "CUDA"],
        metrics: {
            accuracy: "95.2%",
            processingSpeed: "35 FPS",
            modelSize: "6.8 MB",
            inferenceTime: "28ms"
        },
        features: [
            "Real-time processing at 30+ FPS",
            "Multi-stream video processing",
            "Edge device optimization",
            "Custom model training pipeline",
            "Support for 80+ object classes",
            "Easy integration with existing systems"
        ],
        githubUrl: "https://github.com/alexchen/yolov8-object-detection",
        liveDemoUrl: "https://demo.alexchen.com/object-detection",
        caseStudyUrl: "./case-studies/object-detection.html",
        dateCreated: "2024-03-15",
        dateUpdated: "2024-11-20",
        status: "completed",
        tags: ["computer-vision", "deep-learning", "real-time", "edge-computing"]
    },
    "sentiment-analysis": {
        id: "sentiment-analysis",
        title: "Sentiment Analysis Engine",
        category: "nlp",
        shortDescription: "BERT-based sentiment analysis achieving 92% accuracy on social media data. Real-time processing with multilingual support and emotion classification.",
        longDescription: "A sophisticated sentiment analysis engine built on BERT architecture, capable of processing multilingual text data with high accuracy. The system provides real-time sentiment classification, emotion detection, and aspect-based sentiment analysis for various applications including social media monitoring, customer feedback analysis, and market research.",
        image: "./resources/project-nlp.jpg",
        technologies: ["BERT", "Transformers", "FastAPI", "Docker", "Redis"],
        metrics: {
            accuracy: "92.4%",
            processingSpeed: "500 texts/sec",
            languages: "12 languages",
            emotionClasses: "8 emotions"
        },
        features: [
            "Multilingual sentiment analysis",
            "Real-time processing capabilities",
            "Emotion classification",
            "Aspect-based sentiment analysis",
            "Easy API integration",
            "Custom model fine-tuning"
        ],
        githubUrl: "https://github.com/alexchen/bert-sentiment-analysis",
        liveDemoUrl: "https://demo.alexchen.com/sentiment-analysis",
        caseStudyUrl: "./case-studies/sentiment-analysis.html",
        dateCreated: "2024-05-20",
        dateUpdated: "2024-10-15",
        status: "completed",
        tags: ["nlp", "bert", "sentiment-analysis", "multilingual"]
    },
    "neural-architecture": {
        id: "neural-architecture",
        title: "Neural Architecture Search",
        category: "dl",
        shortDescription: "Automated neural architecture optimization using genetic algorithms and reinforcement learning. Achieved 15% performance improvement over hand-designed networks.",
        longDescription: "An innovative neural architecture search system that automatically discovers optimal neural network architectures using advanced optimization techniques. The system combines genetic algorithms with reinforcement learning to explore the vast search space of possible architectures, resulting in models that outperform hand-designed networks across various tasks.",
        image: "./resources/project-dl.jpg",
        technologies: ["AutoML", "TensorFlow", "Kubernetes", "Ray", "Optuna"],
        metrics: {
            performanceImprovement: "15%",
            searchTime: "48 hours",
            architecturesEvaluated: "1,200+",
            gpuHours: "2,400"
        },
        features: [
            "Automated architecture discovery",
            "Multi-objective optimization",
            "Resource-aware architecture search",
            "Distributed computing support",
            "Visual architecture exploration",
            "Performance prediction models"
        ],
        githubUrl: "https://github.com/alexchen/neural-architecture-search",
        liveDemoUrl: "https://demo.alexchen.com/nas",
        caseStudyUrl: "./case-studies/neural-architecture-search.html",
        dateCreated: "2024-07-10",
        dateUpdated: "2024-11-05",
        status: "completed",
        tags: ["automl", "neural-architecture", "optimization", "distributed-computing"]
    },
    "medical-imaging": {
        id: "medical-imaging",
        title: "Medical Image Analysis",
        category: "cv",
        shortDescription: "CNN-based diagnostic system for medical imaging analysis. Assisting radiologists with automated anomaly detection and classification with 94% accuracy.",
        longDescription: "A sophisticated medical imaging analysis system that assists healthcare professionals in detecting and classifying anomalies in medical images. Built with deep convolutional neural networks, the system provides accurate diagnostic support while maintaining the highest standards of medical data privacy and security.",
        image: "./resources/project-ds.jpg",
        technologies: ["ResNet", "DICOM", "Flask", "PostgreSQL", "Pydicom"],
        metrics: {
            accuracy: "94.1%",
            sensitivity: "96.2%",
            specificity: "92.8%",
            processingTime: "2.3 seconds"
        },
        features: [
            "DICOM image processing",
            "Multi-organ support",
            "Anomaly detection",
            "Confidence scoring",
            "HIPAA compliance",
            "Integration with PACS systems"
        ],
        githubUrl: "https://github.com/alexchen/medical-image-analysis",
        liveDemoUrl: "https://demo.alexchen.com/medical-imaging",
        caseStudyUrl: "./case-studies/medical-imaging.html",
        dateCreated: "2024-02-28",
        dateUpdated: "2024-09-30",
        status: "completed",
        tags: ["medical-ai", "computer-vision", "healthcare", "dicom"]
    },
    "chatbot": {
        id: "chatbot",
        title: "Intelligent Chatbot",
        category: "nlp",
        shortDescription: "Advanced conversational AI using GPT-3.5 and custom fine-tuning. Handles complex queries with context-aware responses and sentiment understanding.",
        longDescription: "An intelligent conversational AI system that combines the power of GPT-3.5 with custom fine-tuning to provide context-aware, emotionally intelligent responses. The system maintains conversation context, understands user sentiment, and can be customized for specific domains and use cases.",
        image: "./resources/project-ai.jpg",
        technologies: ["GPT-3.5", "LangChain", "Redis", "WebSocket", "FastAPI"],
        metrics: {
            responseAccuracy: "89.3%",
            responseTime: "1.2 seconds",
            contextLength: "4,096 tokens",
            concurrentUsers: "1,000+"
        },
        features: [
            "Context-aware conversations",
            "Sentiment understanding",
            "Custom fine-tuning capability",
            "Real-time response streaming",
            "Multi-turn conversation memory",
            "Easy deployment and scaling"
        ],
        githubUrl: "https://github.com/alexchen/intelligent-chatbot",
        liveDemoUrl: "https://demo.alexchen.com/chatbot",
        caseStudyUrl: "./case-studies/intelligent-chatbot.html",
        dateCreated: "2024-06-15",
        dateUpdated: "2024-10-22",
        status: "completed",
        tags: ["conversational-ai", "gpt", "chatbot", "natural-language"]
    },
    "predictive-analytics": {
        id: "predictive-analytics",
        title: "Predictive Analytics Platform",
        category: "ds",
        shortDescription: "End-to-end machine learning platform for business forecasting. Automated feature engineering, model selection, and deployment with real-time monitoring.",
        longDescription: "A comprehensive predictive analytics platform that automates the entire machine learning lifecycle. From data ingestion and feature engineering to model selection and deployment, the platform provides businesses with powerful forecasting capabilities and real-time performance monitoring.",
        image: "./resources/blog-tech.jpg",
        technologies: ["Scikit-learn", "MLflow", "Apache Spark", "Kafka", "Docker"],
        metrics: {
            modelAccuracy: "91.7%",
            processingSpeed: "1M records/min",
            deploymentTime: "15 minutes",
            uptime: "99.9%"
        },
        features: [
            "Automated feature engineering",
            "Model selection and optimization",
            "Real-time prediction API",
            "Performance monitoring",
            "A/B testing framework",
            "Integration with business systems"
        ],
        githubUrl: "https://github.com/alexchen/predictive-analytics-platform",
        liveDemoUrl: "https://demo.alexchen.com/analytics",
        caseStudyUrl: "./case-studies/predictive-analytics.html",
        dateCreated: "2024-04-10",
        dateUpdated: "2024-08-30",
        status: "completed",
        tags: ["data-science", "predictive-analytics", "mlops", "business-intelligence"]
    }
};

// Project categories
const projectCategories = {
    all: { name: "All Projects", count: 0 },
    cv: { name: "Computer Vision", count: 0 },
    nlp: { name: "Natural Language Processing", count: 0 },
    dl: { name: "Deep Learning", count: 0 },
    ds: { name: "Data Science", count: 0 }
};

// Calculate category counts
Object.values(projectsData).forEach(project => {
    projectCategories.all.count++;
    if (projectCategories[project.category]) {
        projectCategories[project.category].count++;
    }
});

// Featured projects for homepage
const featuredProjects = [
    projectsData["object-detection"],
    projectsData["sentiment-analysis"],
    projectsData["neural-architecture"],
    projectsData["medical-imaging"],
    projectsData["chatbot"],
    projectsData["predictive-analytics"]
];

// Utility functions
const ProjectsManager = {
    getAllProjects: () => projectsData,
    
    getProjectById: (id) => projectsData[id],
    
    getProjectsByCategory: (category) => {
        if (category === 'all') return Object.values(projectsData);
        return Object.values(projectsData).filter(project => project.category === category);
    },
    
    getFeaturedProjects: () => featuredProjects,
    
    getProjectCategories: () => projectCategories,
    
    searchProjects: (query) => {
        const searchTerm = query.toLowerCase();
        return Object.values(projectsData).filter(project => 
            project.title.toLowerCase().includes(searchTerm) ||
            project.shortDescription.toLowerCase().includes(searchTerm) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchTerm)) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    },
    
    getProjectsByTag: (tag) => {
        return Object.values(projectsData).filter(project => 
            project.tags.includes(tag)
        );
    },
    
    getRecentProjects: (limit = 3) => {
        return Object.values(projectsData)
            .sort((a, b) => new Date(b.dateUpdated) - new Date(a.dateUpdated))
            .slice(0, limit);
    }
};

// Make it available globally
window.ProjectsManager = ProjectsManager;