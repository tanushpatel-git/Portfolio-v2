"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MusicPlayer, type MusicTrack } from "@/component/ui/music-player";
import WaveGridBackground from "@/component/WaveGridBackground";

// Each entry is a complete, editable article. Add or remove a JSX fragment to
// add or remove a slide. Write any HTML/JSX inside it: headings, images, video,
// links, and other components are all supported.
const articles = [
  <>
    <header className="mb-8 max-w-[900px] sm:mb-10">
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#e33b58] sm:text-sm">PROFILE / 01</p>
      <h1 className="mb-3 mt-0 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[0.98] tracking-[-0.065em]">A little more about me.</h1>
      <p className="m-0 max-w-[800px] text-base leading-relaxed sm:text-lg">
        I’m Tanush, a 19-year-old CSE student, developer, and curious maker. I love learning how things work—and building ideas into things people can use.
      </p>
    </header>

    <section
      aria-label="Tanush — About me"
      className="relative isolate mb-12 flex h-[min(76dvh,780px)] min-h-[440px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-black sm:mb-16 sm:rounded-[2rem]"
    >
      <span className="sr-only">About me</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[43%] z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(6rem,25vw,22rem)] font-black leading-none tracking-[-0.11em] text-[#f04416]/55"
      >
        TLUX
      </span>
      <span className="absolute left-3 top-1/2 z-20 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white [writing-mode:vertical-rl] rotate-180 sm:left-6 sm:text-xs sm:tracking-[0.4em]">
        ABOUT ME
      </span>
      <img
        src="/aboutMain.png"
        alt="Anime illustration centered over the TLUX wordmark"
        className="relative z-10 h-[98%] max-w-[86vw] object-contain object-bottom mix-blend-screen"
      />
      <span className="absolute right-3 top-1/2 z-20 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white [writing-mode:vertical-rl] sm:right-6 sm:text-xs sm:tracking-[0.4em]">
        ABOUT ME
      </span>
      <span className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 bg-black/50 px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm sm:bottom-6 sm:text-xs">
        Tanush · 19 · CSE
      </span>
    </section>

    <div className="max-w-[1050px] space-y-12 text-[15px] leading-[1.75] sm:space-y-16 sm:text-base lg:text-[clamp(16px,1.2vw,20px)]">
      <section aria-labelledby="about-education" className="grid gap-4 sm:grid-cols-2">
        <div className="bio-panel relative overflow-hidden rounded-2xl border border-black/10 bg-[#f6f4f2] p-5 sm:p-6">
          <img src="/about/cursed-seal.svg" alt="Decorative occult seal" className="absolute right-4 top-4 size-12 opacity-80 sm:size-14" />
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] opacity-60">Currently</p>
          <h2 id="about-education" className="mb-2 mt-0 text-xl font-medium tracking-tight sm:text-2xl">Learning and building</h2>
          <p className="m-0">I’m pursuing a B.Tech in Computer Science and Engineering at Oriental Institute of Science and Technology. I’m in my third semester, with graduation expected in 2029.</p>
        </div>
        <div className="bio-panel rounded-2xl border border-black/10 bg-[#f6f4f2] p-5 sm:p-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] opacity-60">Experience · 2026</p>
          <h2 className="mb-2 mt-0 text-xl font-medium tracking-tight sm:text-2xl">EmrgeX</h2>
          <p className="m-0">I completed an internship at EmrgeX, gaining experience working in a professional environment.</p>
        </div>
      </section>

      <section aria-labelledby="about-interests" className="max-w-[850px]">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] opacity-60">Away from the screen</p>
        <h2 id="about-interests" className="mb-3 mt-0 text-2xl font-medium tracking-tight sm:text-3xl">A few things I enjoy</h2>
        <p className="m-0">I love sketching and dancing, and anime is a favourite way to unwind. Coding has become a hobby too: I enjoy exploring a new idea and seeing where I can take it.</p>
      </section>

      <section aria-labelledby="about-skills">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-current/15 pb-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] opacity-60">Curiosity, put to work</p>
            <h2 id="about-skills" className="m-0 text-2xl font-medium tracking-tight sm:text-3xl">Things I work with</h2>
          </div>
          <span className="text-sm opacity-60">A growing toolkit</span>
        </div>

        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
{[
  {
    title: "Programming Languages",
    skills: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C++",
      "Go",
      "SQL",
      "HTML5",
      "CSS3",
    ],
  },

  {
    title: "Frontend Development",
    skills: [
      "React",
      "Next.js",
      "Vite",
      "Redux Toolkit",
      "Zustand",
      "React Query",
      "React Hook Form",
      "Framer Motion",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
      "Shadcn UI",
      "Sass",
      "CSS Modules",
      "Styled Components",
      "Responsive Design",
      "Accessibility",
      "Progressive Web Apps",
      "Server-Side Rendering",
      "Static Site Generation",
    ],
  },

  {
    title: "Backend Development",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "FastAPI",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "gRPC",
      "Microservices",
      "Event-Driven Architecture",
      "Authentication",
      "Authorization",
      "JWT",
      "OAuth 2.0",
      "OpenAPI",
      "Swagger",
      "API Rate Limiting",
      "Background Jobs",
    ],
  },

  {
    title: "Databases & Data Storage",
    skills: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "SQL Server",
      "MongoDB",
      "Redis",
      "Firebase",
      "Elasticsearch",
      "Pinecone",
      "Qdrant",
      "ChromaDB",
      "pgvector",
      "Database Design",
      "Database Indexing",
      "Query Optimization",
      "Mongoose",
    ],
  },

  {
    title: "DevOps & CI/CD",
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "GitHub Actions",
      "GitLab CI/CD",
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "Deployment Automation",
      "Infrastructure as Code",
    ],
  },

  {
    title: "Cloud Computing",
    skills: [
      "Amazon Web Services",
      "Google Cloud Platform",
      "Cloudflare",
      "Vercel",
      "Netlify",
      "Render",
      "AWS EC2",
      "AWS S3",
      "AWS Lambda",
      "AWS ECS",
      "Google Cloud Run",
      "Google Cloud Storage",
      "Load Balancing",
      "Auto Scaling",
      "Cloud Security",
      "Cost Optimization",
    ],
  },

  {
    title: "Monitoring & Observability",
    skills: [
      "Prometheus",
      "Grafana",
      "ELK Stack",
      "Elastic Stack",
      "Root Cause Analysis",
    ],
  },

  {
    title: "Data Analysis",
    skills: [
      "Python Data Analysis",
      "SQL Data Analysis",
      "Microsoft Excel",
      "Advanced Excel",
      "Pivot Tables",
      "Power Query",
      "Power Pivot",
      "Power BI",
      "Tableau",
      "Pandas",
      "NumPy",
      "Jupyter Notebook",
      "Exploratory Data Analysis",
      "Data Cleaning",
      "Data Validation",
      "Data Visualization",
      "Descriptive Statistics",
      "Hypothesis Testing",
      "A/B Testing",
      "KPI Development",
      "Business Intelligence",
      "Dashboard Development",
      "Statistical Analysis",
    ],
  },

  {
    title: "Data Science & Statistics",
    skills: [
      "NumPy",
      "Pandas",
      "SciPy",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Probability",
      "Linear Algebra",
      "Statistical Inference",
      "Regression Analysis",
      "Correlation Analysis",
      "Bayesian Statistics",
      "Feature Engineering",
      "Feature Selection",
      "Dimensionality Reduction",
      "Principal Component Analysis",
      "Missing Value Imputation",
      "Outlier Detection",
      "Model Evaluation",
      "Cross-Validation",
      "Hyperparameter Tuning",
      "Experimental Design",
    ],
  },

  {
    title: "Machine Learning",
    skills: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Semi-Supervised Learning",
      "Classification",
      "Regression",
      "Clustering",
      "Decision Trees",
      "Random Forest",
      "Gradient Boosting",
      "XGBoost",
      "LightGBM",
      "Support Vector Machines",
      "K-Nearest Neighbors",
      "K-Means",
      "DBSCAN",
      "Naive Bayes",
      "Ensemble Learning",
      "Recommendation Systems",
      "Model Explainability",
    ],
  },

  {
    title: "Deep Learning & Computer Vision",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Neural Networks",
      "Artificial Neural Networks",
      "Convolutional Neural Networks",
      "Recurrent Neural Networks",
      "LSTM",
      "GRU",
      "Transformers",
      "Attention Mechanisms",
      "Computer Vision",
      "Image Classification",
      "Object Detection",
      "Image Segmentation",
      "OpenCV",
      "YOLO",
      "Transfer Learning",
      "Fine-Tuning",
      "GPU Computing",
    ],
  },

  {
    title: "NLP & Generative AI",
    skills: [
      "Natural Language Processing",
      "Hugging Face",
      "Transformers",
      "Tokenization",
      "Text Classification",
      "Sentiment Analysis",
      "Text Embeddings",
      "Semantic Search",
      "Vector Search",
      "Retrieval-Augmented Generation",
      "RAG",
      "LangChain",
      "LangGraph",
      "LangFlow",
      "OpenAI API",
      "Anthropic API",
      "Google Gemini API",
      "Ollama",
      "Hugging Face Inference",
      "Prompt Engineering",
      "AI Agents",
      "Agentic Workflows",
      "Tool Calling",
      "Structured Outputs",
      "LLM Evaluation",
      "Fine-Tuning LLMs",
      "Model Context Protocol",
      "Multimodal AI",
      "Speech Recognition",
      "Text-to-Speech",
    ],
  },

  {
    title: "Big Data & Distributed Systems",
    skills: [
      "Apache Kafka",
      "Apache ZooKeeper",
      "Distributed Computing",
      "Distributed Systems",
      "Message Queues",
      "RabbitMQ",
      "Amazon SQS",
      "Amazon SNS",
      "Google Pub/Sub",
      "Azure Service Bus",
      "Event Streaming",
      "Data Partitioning",
      "Replication",
      "Consistency Models",
      "Fault Tolerance",
      "Horizontal Scaling",
      "CAP Theorem",
    ],
  },

  {
    title: "Software Architecture & Engineering",
    skills: [
      "Object-Oriented Programming",
      "Functional Programming",
      "Data Structures",
      "Algorithms",
      "System Design",
      "Low-Level Design",
      "High-Level Design",
      "Design Patterns",
      "SOLID Principles",
      "Clean Architecture",
      "Monolithic Architecture",
      "Microservices Architecture",
      "Event-Driven Architecture",
      "CQRS",
      "Event Sourcing",
      "Caching Strategies",
      "Concurrency",
      "Parallel Programming",
      "Distributed Transactions (In lerning phase)",
      "Scalability",
      "Reliability Engineering",
      "Performance Optimization",
    ],
  },

  {
    title: "Tools & Developer Productivity",
    skills: [
      "VS Code",
      "IntelliJ IDEA",
      "PyCharm",
      "WebStorm",
      "JupyterLab",
      "Jupyter Notebook",
      "GitHub Copilot",
      "Postman",
      "Swagger UI",
      "Figma",
      "Notion",
      "Markdown",
      "Regex",
      "Cron",
    ],
  },
].map(({ title, skills }, sectionIndex) => (
            <section key={title} aria-label={title} className="bio-skill-group border-t border-current/15 pt-4">
              <h3 className="mb-3 mt-0 flex items-center gap-3 text-base font-medium sm:text-lg"><span className="text-xs opacity-50">0{sectionIndex + 1}</span>{title}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => <span key={skill} className="skill-pill rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[13px] leading-5">{skill}</span>)}
              </div>
            </section>
          ))}</div>
      </section>

      <blockquote className="m-0 max-w-[850px] border-l-2 border-[#dedede] py-1 pl-5 text-lg font-medium sm:pl-7 sm:text-xl">
        Curious by nature. Always learning, always looking for the next idea to bring to life.
      </blockquote>
    </div>
  </>,
  <>
