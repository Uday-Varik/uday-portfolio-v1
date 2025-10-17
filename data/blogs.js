// Dynamic Blog Posts Data
const blogPostsData = {
    "multimodal-ai-future": {
        id: "multimodal-ai-future",
        title: "The Future of Multimodal AI: Beyond Text and Images",
        subtitle: "Exploring the latest developments in multimodal AI systems that can understand and process multiple types of data simultaneously",
        author: "Alex Chen",
        date: "2024-12-15",
        readTime: "8 min read",
        category: "research",
        tags: ["multimodal-ai", "gpt-4v", "research", "future-tech"],
        featured: true,
        image: "./resources/blog-tech.jpg",
        excerpt: "Exploring the latest developments in multimodal AI systems that can understand and process multiple types of data simultaneously. From GPT-4V to custom multimodal architectures, we dive deep into what's possible and what's coming next.",
        content: `
            <p>The field of artificial intelligence is undergoing a paradigm shift with the emergence of multimodal AI systems. These sophisticated models can process and understand multiple types of data simultaneously - text, images, audio, video, and even sensor data - creating a more comprehensive understanding of the world around us.</p>
            
            <h2>The Evolution of Multimodal AI</h2>
            <p>Traditional AI systems have been largely unimodal, specializing in a single type of data. However, the real world is inherently multimodal. We humans process information through multiple senses simultaneously, and AI systems are now beginning to replicate this capability.</p>
            
            <h3>Key Breakthroughs in 2024</h3>
            <ul>
                <li><strong>GPT-4V Integration:</strong> OpenAI's vision-capable language model</li>
                <li><strong>CLIP and DALL-E Advancements:</strong> Text-to-image and image-to-text capabilities</li>
                <li><strong>Audio-Visual Models:</strong> Understanding relationships between sound and sight</li>
                <li><strong>Sensor Fusion:</strong> Combining data from multiple sensor types</li>
            </ul>
            
            <h2>Real-World Applications</h2>
            <p>Multimodal AI is already making significant impacts across various industries:</p>
            
            <h3>Healthcare</h3>
            <p>Medical professionals can now use AI systems that analyze patient data from multiple sources - medical images, electronic health records, lab results, and even voice patterns to provide comprehensive diagnostic insights.</p>
            
            <h3>Autonomous Vehicles</h3>
            <p>Self-driving cars use multimodal AI to process data from cameras, LiDAR, radar, and GPS sensors to create a complete understanding of their environment and make safe driving decisions.</p>
            
            <h3>Content Creation</h3>
            <p>Creative professionals are using multimodal AI to generate content that combines text, images, and audio in ways previously impossible, opening new avenues for artistic expression.</p>
            
            <h2>Technical Challenges and Solutions</h2>
            <p>While the potential of multimodal AI is enormous, several technical challenges need to be addressed:</p>
            
            <h3>Alignment and Fusion</h3>
            <p>Different modalities may have different scales, formats, and temporal dynamics. Advanced alignment techniques and fusion architectures are required to effectively combine information from multiple sources.</p>
            
            <h3>Computational Complexity</h3>
            <p>Processing multiple data types simultaneously requires significant computational resources. Efficient architectures and optimization techniques are crucial for practical deployment.</p>
            
            <h2>The Road Ahead</h2>
            <p>As we look toward the future, multimodal AI will likely become the standard rather than the exception. The ability to understand and process information from multiple perspectives will enable AI systems to achieve a more human-like understanding of the world.</p>
            
            <p>The implications for fields like robotics, virtual reality, and human-computer interaction are profound. We're moving toward a future where AI can truly understand and interact with the world in all its complexity.</p>
        `,
        views: 3247,
        likes: 89,
        shares: 23,
        comments: 12,
        status: "published"
    },
    "yolov8-tutorial": {
        id: "yolov8-tutorial",
        title: "Building Real-time Object Detection with YOLOv8",
        subtitle: "A comprehensive tutorial on implementing real-time object detection using YOLOv8",
        author: "Alex Chen",
        date: "2024-12-10",
        readTime: "12 min read",
        category: "tutorial",
        tags: ["computer-vision", "yolov8", "tutorial", "object-detection"],
        featured: false,
        image: "./resources/project-cv.jpg",
        excerpt: "A comprehensive tutorial on implementing real-time object detection using YOLOv8. Covers everything from data preparation to model optimization for edge devices.",
        content: `
            <p>Object detection is one of the most exciting applications of computer vision, and YOLOv8 represents the state-of-the-art in real-time object detection. In this tutorial, we'll build a complete object detection system from scratch.</p>
            
            <h2>What is YOLOv8?</h2>
            <p>YOLOv8 (You Only Look Once version 8) is the latest iteration of the YOLO family of object detection models. It's known for its exceptional balance of accuracy and speed, making it perfect for real-time applications.</p>
            
            <h3>Key Features of YOLOv8</h3>
            <ul>
                <li>High accuracy with fast inference times</li>
                <li>Easy to use and customize</li>
                <li>Excellent documentation and community support</li>
                <li>Flexible architecture for various use cases</li>
            </ul>
            
            <h2>Setting Up Your Environment</h2>
            <p>First, let's set up our development environment:</p>
            
            <pre><code>
            # Install required packages
            pip install ultralytics opencv-python torch torchvision
            
            # Verify installation
            python -c "from ultralytics import YOLO; print('YOLOv8 installed successfully!')"
            </code></pre>
            
            <h2>Step 1: Data Preparation</h2>
            <p>For this tutorial, we'll use a custom dataset. Here's how to structure your data:</p>
            
            <pre><code>
            dataset/
            ├── images/
            │   ├── train/
            │   └── val/
            └── labels/
                ├── train/
                └── val/
            </code></pre>
            
            <h2>Step 2: Training Your Model</h2>
            <p>Now let's train our YOLOv8 model:</p>
            
            <pre><code>
            from ultralytics import YOLO
            
            # Load a pretrained model
            model = YOLO('yolov8n.pt')
            
            # Train the model
            results = model.train(
                data='path/to/your/dataset.yaml',
                epochs=100,
                imgsz=640,
                batch=16,
                name='custom_yolov8'
            )
            </code></pre>
            
            <h2>Step 3: Model Optimization for Edge Devices</h2>
            <p>To deploy on edge devices, we need to optimize our model:</p>
            
            <pre><code>
            # Export to ONNX format for better compatibility
            model.export(format='onnx', optimize=True)
            
            # Or export to TensorRT for NVIDIA GPUs
            model.export(format='engine', device=0)
            </code></pre>
            
            <h2>Step 4: Real-time Inference</h2>
            <p>Here's how to perform real-time object detection:</p>
            
            <pre><code>
            import cv2
            from ultralytics import YOLO
            
            # Load the trained model
            model = YOLO('path/to/your/best.pt')
            
            # Initialize video capture
            cap = cv2.VideoCapture(0)
            
            while True:
                ret, frame = cap.read()
                if not ret:
                    break
                
                # Perform inference
                results = model(frame)
                
                # Draw bounding boxes
                annotated_frame = results[0].plot()
                
                # Display the result
                cv2.imshow('YOLOv8 Object Detection', annotated_frame)
                
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
            
            cap.release()
            cv2.destroyAllWindows()
            </code></pre>
            
            <h2>Performance Optimization Tips</h2>
            <ul>
                <li><strong>Reduce input size:</strong> Smaller images process faster</li>
                <li><strong>Use quantization:</strong> INT8 models are faster than FP32</li>
                <li><strong>Batch processing:</strong> Process multiple images together</li>
                <li><strong>GPU acceleration:</strong> Use CUDA when available</li>
            </ul>
            
            <h2>Common Issues and Solutions</h2>
            <h3>Low FPS on CPU</h3>
            <p>If you're experiencing low frame rates on CPU, consider using a smaller model variant or enabling quantization.</p>
            
            <h3>Memory Issues</h3>
            <p>For memory-constrained environments, reduce the batch size and input image resolution.</p>
            
            <h2>Conclusion</h2>
            <p>You've now built a complete real-time object detection system with YOLOv8. The possibilities are endless - from security applications to autonomous systems, object detection is a fundamental computer vision task with countless real-world applications.</p>
        `,
        views: 2156,
        likes: 67,
        shares: 18,
        comments: 8,
        status: "published"
    },
    "transformer-deep-dive": {
        id: "transformer-deep-dive",
        title: "Understanding Transformer Architecture: A Deep Dive",
        subtitle: "An in-depth exploration of the Transformer architecture that powers modern NLP models",
        author: "Alex Chen",
        date: "2024-12-05",
        readTime: "15 min read",
        category: "research",
        tags: ["transformers", "nlp", "bert", "attention-mechanism"],
        featured: false,
        image: "./resources/project-nlp.jpg",
        excerpt: "An in-depth exploration of the Transformer architecture that powers modern NLP models. From attention mechanisms to positional encoding, we break down the magic behind BERT and GPT.",
        content: `
            <p>The Transformer architecture has revolutionized natural language processing and is the foundation for models like BERT, GPT, and many others. In this deep dive, we'll explore how Transformers work and why they're so effective.</p>
            
            <h2>The Problem with RNNs</h2>
            <p>Before Transformers, Recurrent Neural Networks (RNNs) were the standard for sequence processing. However, RNNs had several limitations:</p>
            <ul>
                <li>Sequential processing made parallelization difficult</li>
                <li>Vanishing gradient problems with long sequences</li>
                <li>Limited memory of past information</li>
            </ul>
            
            <h2>The Transformer Solution</h2>
            <p>The Transformer architecture, introduced in the paper "Attention Is All You Need," solved these problems by using self-attention mechanisms instead of recurrence.</p>
            
            <h3>Key Components</h3>
            <ol>
                <li><strong>Self-Attention:</strong> Allows the model to focus on different parts of the input sequence</li>
                <li><strong>Multi-Head Attention:</strong> Runs multiple attention mechanisms in parallel</li>
                <li><strong>Positional Encoding:</strong> Adds information about word positions</li>
                <li><strong>Feed-Forward Networks:</strong> Process attention outputs</li>
            </ol>
            
            <h2>Self-Attention in Detail</h2>
            <p>Self-attention is the heart of the Transformer. Here's how it works:</p>
            
            <pre><code>
            # Self-attention calculation
            def self_attention(Q, K, V, mask=None):
                # Calculate attention scores
                scores = torch.matmul(Q, K.transpose(-2, -1))
                scores = scores / math.sqrt(K.size(-1))
                
                # Apply mask if provided
                if mask is not None:
                    scores = scores.masked_fill(mask == 0, -1e9)
                
                # Apply softmax
                attention_weights = F.softmax(scores, dim=-1)
                
                # Apply attention to values
                output = torch.matmul(attention_weights, V)
                return output, attention_weights
            </code></pre>
            
            <h2>Multi-Head Attention</h2>
            <p>Instead of a single attention mechanism, Transformers use multiple attention heads:</p>
            
            <pre><code>
            class MultiHeadAttention(nn.Module):
                def __init__(self, d_model, num_heads):
                    super().__init__()
                    self.d_model = d_model
                    self.num_heads = num_heads
                    self.d_k = d_model // num_heads
                    
                    self.W_q = nn.Linear(d_model, d_model)
                    self.W_k = nn.Linear(d_model, d_model)
                    self.W_v = nn.Linear(d_model, d_model)
                    self.W_o = nn.Linear(d_model, d_model)
                
                def forward(self, query, key, value, mask=None):
                    batch_size = query.size(0)
                    
                    # Linear transformations
                    Q = self.W_q(query)
                    K = self.W_k(key)
                    V = self.W_v(value)
                    
                    # Reshape for multi-head attention
                    Q = Q.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
                    K = K.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
                    V = V.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
                    
                    # Apply attention
                    attention_output, attention_weights = self_attention(Q, K, V, mask)
                    
                    # Concatenate heads
                    attention_output = attention_output.transpose(1, 2).contiguous().view(
                        batch_size, -1, self.d_model
                    )
                    
                    return self.W_o(attention_output)
            </code></pre>
            
            <h2>Positional Encoding</h2>
            <p>Since Transformers don't have recurrence, they need another way to understand word order:</p>
            
            <pre><code>
            class PositionalEncoding(nn.Module):
                def __init__(self, d_model, max_seq_length=5000):
                    super().__init__()
                    
                    pe = torch.zeros(max_seq_length, d_model)
                    position = torch.arange(0, max_seq_length, dtype=torch.float).unsqueeze(1)
                    
                    div_term = torch.exp(torch.arange(0, d_model, 2).float() *
                                       (-math.log(10000.0) / d_model))
                    
                    pe[:, 0::2] = torch.sin(position * div_term)
                    pe[:, 1::2] = torch.cos(position * div_term)
                    
                    pe = pe.unsqueeze(0).transpose(0, 1)
                    self.register_buffer('pe', pe)
                
                def forward(self, x):
                    return x + self.pe[:x.size(0), :]
            </code></pre>
            
            <h2>The Complete Transformer Block</h2>
            <p>Putting it all together:</p>
            
            <pre><code>
            class TransformerBlock(nn.Module):
                def __init__(self, d_model, num_heads, d_ff, dropout=0.1):
                    super().__init__()
                    self.attention = MultiHeadAttention(d_model, num_heads)
                    self.norm1 = nn.LayerNorm(d_model)
                    self.norm2 = nn.LayerNorm(d_model)
                    
                    self.feed_forward = nn.Sequential(
                        nn.Linear(d_model, d_ff),
                        nn.ReLU(),
                        nn.Linear(d_ff, d_model)
                    )
                    
                    self.dropout = nn.Dropout(dropout)
                
                def forward(self, x, mask=None):
                    # Multi-head attention with residual connection
                    attn_output = self.attention(x, x, x, mask)
                    x = self.norm1(x + self.dropout(attn_output))
                    
                    # Feed-forward network with residual connection
                    ff_output = self.feed_forward(x)
                    x = self.norm2(x + self.dropout(ff_output))
                    
                    return x
            </code></pre>
            
            <h2>Why Transformers Are So Effective</h2>
            <ol>
                <li><strong>Parallelization:</strong> All words can be processed simultaneously</li>
                <li><strong>Long-range dependencies:</strong> Attention can focus on any part of the sequence</li>
                <li><strong>Scalability:</strong> The architecture scales well with more data and parameters</li>
                <li><strong>Interpretability:</strong> Attention weights provide insights into model decisions</li>
            </ol>
            
            <h2>Conclusion</h2>
            <p>The Transformer architecture has fundamentally changed how we approach sequence modeling. Its elegant design and powerful capabilities have enabled the development of large language models that continue to push the boundaries of what's possible in AI.</p>
            
            <p>Understanding these fundamentals is crucial for anyone working in NLP or AI, as Transformers are likely to remain a cornerstone of the field for years to come.</p>
        `,
        views: 1876,
        likes: 54,
        shares: 12,
        comments: 6,
        status: "published"
    }
};

// Blog categories
const blogCategories = {
    all: { name: "All Posts", count: 0 },
    research: { name: "Research", count: 0 },
    tutorial: { name: "Tutorials", count: 0 },
    industry: { name: "Industry", count: 0 },
    "computer-vision": { name: "Computer Vision", count: 0 },
    nlp: { name: "NLP", count: 0 },
    "deep-learning": { name: "Deep Learning", count: 0 }
};

// Calculate category counts
Object.values(blogPostsData).forEach(post => {
    blogCategories.all.count++;
    blogCategories[post.category].count++;
    post.tags.forEach(tag => {
        if (blogCategories[tag]) {
            blogCategories[tag].count++;
        }
    });
});

// Utility functions
const BlogManager = {
    getAllPosts: () => blogPostsData,
    
    getPostById: (id) => blogPostsData[id],
    
    getPostsByCategory: (category) => {
        if (category === 'all') return Object.values(blogPostsData);
        return Object.values(blogPostsData).filter(post => 
            post.category === category || post.tags.includes(category)
        );
    },
    
    getFeaturedPosts: () => {
        return Object.values(blogPostsData).filter(post => post.featured);
    },
    
    getRecentPosts: (limit = 3) => {
        return Object.values(blogPostsData)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    },
    
    searchPosts: (query) => {
        const searchTerm = query.toLowerCase();
        return Object.values(blogPostsData).filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.subtitle.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            post.content.toLowerCase().includes(searchTerm)
        );
    },
    
    getPostsByTag: (tag) => {
        return Object.values(blogPostsData).filter(post => 
            post.tags.includes(tag)
        );
    },
    
    getPostsByAuthor: (author) => {
        return Object.values(blogPostsData).filter(post => 
            post.author === author
        );
    },
    
    getBlogCategories: () => blogCategories,
    
    getPopularPosts: (limit = 5) => {
        return Object.values(blogPostsData)
            .sort((a, b) => b.views - a.views)
            .slice(0, limit);
    },
    
    incrementViews: (postId) => {
        if (blogPostsData[postId]) {
            blogPostsData[postId].views++;
        }
    }
};

// Make it available globally
window.BlogManager = BlogManager;