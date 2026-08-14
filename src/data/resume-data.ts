export const resumeData = {
  name: "Abhineet Menon",
  initials: "AM",
  location: "Open to Relocation",
  locationLink: "",
  about:
    "I am a Data Engineer who doesn't just move data, I build the systems that make data useful. With a foundation in full-stack development and a Master's degree from UIC, I bridge the technical gap between raw ETL pipelines and polished user experiences. My work at LTIMindtree involved optimizing high-scale Snowflake migrations, while my personal projects explore the nuances of ML and Application Design. I value clean code, scalable architecture, and solving hard problems with elegant solutions.",
  summary:
    "I am a Full-Stack Data Engineer with a hybrid background in distributed systems and application development. Currently pursuing my MS in Computer Science at UIC (4.0 GPA), I have professional experience optimizing ETL pipelines at LTIMindtree and building full-stack web solutions.",
  avatarUrl: "./profile.jpg",
  resumeUrl: "./Abhineet_Menon_Resume.pdf",
  personalWebsiteUrl: "https://menonabhineet.github.io/portfolio",
  contact: {
    email: "menonabhineet@gmail.com",
    tel: "+13123940278",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/menonabhineet",
        icon: "Github",
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/menonabhineet",
        icon: "Linkedin",
      },
    ],
  },
  education: [
    {
      school: "University of Illinois Chicago",
      degree: "Master of Science in Computer Science",
      start: "Aug 2024",
      end: "May 2026",
      description: "GPA: 4.0/4.0 | Coursework: CS424 - Visualization & Visual Analytics, CS472 - Provably Correct Programming, CS473 - Compiler Design, CS476 - Programming Language Design, CS505 - Computability & Complexity Theory, CS511 - Artificial Intelligence II, CS533 - Deep Learning for Natural Language Processing, CS582 - Information Retrieval, CS594 - Foundations of Permissionless Systems",
    },
    {
      school: "University of Mumbai",
      degree: "Bachelor of Engineering in Information Technology",
      start: "Aug 2018",
      end: "May 2022",
      description: "GPA: 8.37/10 | Built foundational skills in Algorithms, Database Management, and Web Engineering.",
    },
  ],
  work: [
    {
      company: "LTIMindtree",
      link: "https://www.ltimindtree.com",
      badges: ["Snowflake", "Azure ADF", "SQL", "Python"],
      impactBadges: [
        "20% Runtime Reduction",
        "40% Latency Drop",
        "Led 10 Engineers",
        "Real-Time ADF Pipelines",
      ],
      title: "Senior Data Engineer",
      start: "Aug 2022",
      end: "Mar 2024",
      description: [
        "Engineered massive-scale ETL pipelines to migrate legacy data from SQL Server to Snowflake, achieving a 20% reduction in reporting runtime.",
        "Spearheaded the optimization of Snowflake query logic, cutting data retrieval latency by up to 40% for critical business dashboards.",
        "Led a 10-member team of interns, managing sprint lifecycles and removing technical blockers to ensure 100% on-time delivery of milestones.",
        "Designed incremental-load pipelines using Azure Data Factory (ADF) to ensure real-time data availability for analytics teams.",
      ],
    },
    {
      company: "Abner Security",
      link: "https://abnersecurity.com",
      badges: ["Web Dev", "WordPress", "SEO", "PHP"],
      impactBadges: [
        "+30% Organic Traffic",
        "Security Plugin Hardening",
        "Asset Delivery Optimization",
      ],
      title: "Web Development Intern",
      start: "May 2021",
      end: "Sep 2021",
      description: [
        "Revamped the company's core web platform, implementing responsive design principles and SEO strategies that drove a 30% increase in organic traffic.",
        "Hardened site security by customizing third-party plugins and implementing strict validation protocols.",
        "Optimized asset delivery and caching strategies to significantly reduce page load times.",
      ],
    },
    {
      company: "Innovatiive Creators",
      link: "",
      badges: ["PHP", "MySQL", "Backend", "Analytics"],
      impactBadges: [
        "40% Faster Content Ops",
        "30% Query Optimization",
        "Centralized Analytics Dashboard",
      ],
      title: "Web Developer Intern",
      start: "Oct 2020",
      end: "Nov 2020",
      description: [
        "Architected a custom PHP admin panel basically a CMS for the National Institute of Hospitality Management, streamlining content updates by 40%.",
        "Developed a centralized dashboard integrating real-time traffic analytics, student enrollment data, and lead management.",
        "Refactored and normalized the existing database schema, eliminating redundancy and improving query performance by 30%.",
      ],
    },
  ],
  skills: {
    languages: ["C", "C++", "Python", "Java", "SQL", "JavaScript", "TypeScript", "C#"],
    frameworks: ["Next.js", "React", "Zustand", "Flask", "ASP.NET", "Tailwind CSS", "Streamlit"],
    dataTools: ["Snowflake", "Azure Data Factory", "Supabase", "PostgreSQL", "ChromaDB", "AWS", "MySQL", "MongoDB", "Power BI", "Tableau"],
    devTools: ["Docker", "Git", "Jira", "Linux", "Postman", "VS Code"],
  },
  projects: [
    {
      title: "Pro Pundits League - FPL Addon Platform",
      categories: ["ai", "fullstack"],
      techStack: ["Next.js", "React 19", "Supabase", "TypeScript", "Tailwind CSS", "AI-Assisted Dev"],
      impactBadges: [
        "Real-Time FPL API Sync",
        "PostgreSQL RLS & OAuth",
        "Automated Scoring Engine",
      ],
      description:
        "Engineered a full-stack companion platform for Fantasy Premier League mini-leagues featuring real-time data synchronization with official FPL REST APIs, automated scoring pipelines, Survivor knockout tournaments, and exact score predictions. Built with Supabase (PostgreSQL, Row-Level Security, OAuth) and Next.js App Router, leveraging modern AI-assisted development workflows and automated agent auditing to accelerate end-to-end delivery, harden state machines, and optimize server actions.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet/fpl-addon-app",
      },
    },
    {
      title: "CaseQuery - Legal RAG System",
      categories: ["ai"],
      techStack: ["Python", "FAISS", "Llama-3", "GitHub", "REST APIs"],
      impactBadges: [
        "50% ROUGE-L Improvement",
        "Hybrid Dense/Sparse Retrieval",
        "Zero-Hallucination Legal RAG",
      ],
      description:
        "Architected a Retrieval-Augmented Generation (RAG) system for legal QA, integrating a hybrid retrieval pipeline to reduce LLM or AI hallucinations by anchoring answers to specific case law citations. Implemented embeddings generation and document chunking strategies for dense and sparse retrieval with a custom evaluation pipeline, achieving a high recall score and a 50% improvement in ROUGE-L scores over zero-shot baselines.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet/caseQuery",
      },
    },
    {
      title: "10-K Financial QA - Layout-Aware RAG",
      categories: ["ai"],
      techStack: ["Python", "ChromaDB", "DeepSeek", "Streamlit", "Sentence-Transformers", "pdfplumber"],
      impactBadges: [
        "90.5% Benchmark Accuracy",
        "Spatial Whitespace Preservation",
        "21-Benchmark Eval Suite",
      ],
      description:
        "Architected a layout-aware Retrieval-Augmented Generation (RAG) assistant designed for zero-hallucination question-answering over dense, table-heavy SEC 10-K annual financial filings (Apple, NVIDIA, JPMorgan, etc.). Implemented spatial whitespace preservation via pdfplumber and character chunking to maintain balance sheet alignments, paired with ChromaDB vector search, dynamic intent routing, and strict metadata filtering. Validated via a 21-benchmark QA evaluation suite achieving a 90.5% accuracy rate across single-fact lookups, cross-company comparisons, and out-of-corpus queries.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet/10K-QA",
      },
    },
    {
      title: "MathSCV: Multi-Agent Reasoning Architecture",
      categories: ["ai"],
      techStack: ["Python", "DeepSeek", "Multi-Agent Systems", "Prompt Engineering", "LLM Evaluation", "Benchmarking"],
      impactBadges: [
        "Solver-Critic-Verifier Framework",
        "Benchmarked 4 Baselines",
        "3 Datasets (GSM8K/SVAMP/ASDiv)",
      ],
      description:
        "Engineered a multi-agent debate and verification framework (Solver-Critic-Verifier) with DeepSeek-V4-Flash to investigate mathematical reasoning and arithmetic slip correction. Developed a token-efficient Unified Evaluation Engine benchmarking SCV against 4 baselines (Single-Agent CoT, Self-Consistency Voting, Self-Refine, and Basic Debate) across GSM8K, SVAMP, and ASDiv datasets. Uncovered empirical dynamics of multi-agent interactions, quantifying 'Degeneration-of-Thought' failure modes and token-efficiency trade-offs.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet/mathSCV",
      },
    },
    {
      title: "Bluejay Compiler",
      categories: ["fullstack"],
      techStack: ["C", "Flex", "Bison", "MIPS Assembly", "AST & IR", "Compiler Design"],
      impactBadges: [
        "End-to-End C Compiler",
        "Flex & Bison Frontend",
        "MIPS Target & Optimization Passes",
      ],
      description:
        "Engineered a full-scale optimizing compiler in C for the statically typed Bluejay language, targeting MIPS assembly architecture (CS473 Coursework at UIC). Built lexical and syntactic analyzers with Flex and Bison, abstract syntax trees (AST), scoped symbol tables, and strict type checking. Implemented intermediate representation (IR) lowering with tree canonicalization, stack frame activation records, MIPS code generation, and optimization passes.",
      link: {
        label: "Academic / Coursework",
        href: "",
      },
    },
    {
      title: "HVAC Field Estimate - On-Site Quoting Tool",
      categories: ["fullstack"],
      techStack: ["Next.js", "React 19", "Zustand", "Tailwind CSS", "Fuse.js", "Framer Motion", "PWA"],
      impactBadges: [
        "Offline PWA Architecture",
        "Fuzzy Search & Barcode Scan",
        "Native Print-to-PDF Engine",
      ],
      description:
        "Architected a mobile-first, offline-resilient Progressive Web App (PWA) for HVAC technicians to generate on-site service estimates and client quotes. Features a responsive split-screen stepper, persistent state management via Zustand and localStorage, typo-tolerant fuzzy search with Fuse.js, and camera-based barcode scanning (react-zxing). Engineered dedicated CSS print media styling to generate clean, professional PDF quotes natively on mobile devices.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet/hvac-field-estimate",
      },
    },
    {
      title: "NYC Restaurant Inspection Analytics & UMAP Explorer",
      categories: ["viz", "ml"],
      techStack: ["Python", "Vega-Lite", "UMAP", "Pandas", "Altair", "JavaScript", "GeoJSON"],
      impactBadges: [
        "280k+ Inspections Analyzed",
        "UMAP Semantic Clustering",
        "Linked Multi-View Dashboards",
      ],
      description:
        "Engineered an interactive multi-view visual analytics platform for UIC CS424, analyzing 280,000+ NYC Department of Health restaurant inspections across 25,000+ establishments. Extracted high-dimensional feature vectors reduced via UMAP to project semantic violation clusters. Developed linked multi-view dashboards with Vega-Lite and Vanilla JS featuring global interval cluster brushing, point metadata inspection, seasonal infraction heatmaps, MODZCTA geospatial choropleth maps, and longitudinal trend lines.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet/NYC-restaurant-viz",
      },
    },
    {
      title: "BattyCoda: Acoustic Classification",
      categories: ["ml", "viz"],
      techStack: ["Open Source", "Python", "Streamlit", "Signal Processing", "Matplotlib"],
      impactBadges: [
        "Open Source Contribution",
        "Acoustic Signal Processing",
        "Sonogram Frequency Analysis",
      ],
      description:
        "Contributed to an open-source tool designed to classify bat echolocation calls using sonogram analysis. I contributed critical features including an audio speed toggle for detailed listening and fixed complex frequency rendering errors. This tool aids researchers in accurate species identification through visual and audio signal processing.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet/BattyCoda",
      },
    },
    {
      title: "Word Add-in: Document Redaction Suite",
      categories: ["fullstack"],
      techStack: ["TypeScript", "Office.js", "Word JavaScript API", "Regex", "HTML5", "CSS3"],
      impactBadges: [
        "Automated PII De-Identification",
        "WordApi 1.5+ Track Changes",
        "Multi-Pattern Regex Engine",
      ],
      description:
        "Developed an enterprise-grade Microsoft Word Add-in using Office.js and TypeScript to automate document de-identification and compliance tagging. Built multi-pattern regex engines with Unicode and whitespace normalization to sanitize sensitive PII (Emails, Phones, SSNs, Credit Cards, Employee IDs, MRNs, Insurance IDs). Integrated programmatic Track Changes activation (WordApi 1.5+) for full auditability, dynamic section header injection ('CONFIDENTIAL DOCUMENT'), and run summary reporting.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet/Word-Addin-For-Document-Redaction",
      },
    },
    {
      title: "Receipt Volume Forecasting Engine",
      categories: ["ml"],
      techStack: ["Docker", "Flask", "NumPy", "Machine Learning", "Polynomial Regression"],
      impactBadges: [
        "Custom NumPy Model",
        "Docker Containerized",
        "Time-Series Forecasting",
      ],
      description:
        "A machine learning based application that forecasts monthly receipt volumes for retail businesses. Unlike standard library implementations, I built a custom polynomial regression model from scratch using NumPy to demonstrate mathematical understanding. The entire application is containerized with Docker, ensuring consistent behavior across development and production environments.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet/receiptCountPrediction",
      },
    },
    {
      title: "Gym Buddy: Health Tracking Suite",
      categories: ["fullstack"],
      techStack: ["Android SDK", "Java", "XML", "SQLite", "Mobile Architecture"],
      impactBadges: [
        "Native Android App (Java)",
        "Local SQLite Storage",
        "Workout & Macro Algorithms",
      ],
      description:
        "A native Android application designed for holistic health tracking. It features a custom-built XML user interface and a local SQLite database to manage user data securely offline. Features include personalized workout planning algorithms, diet macro tracking, and a real-time BMI calculator, demonstrating strong command over the Android Activity lifecycle.",
      link: {
        label: "GitHub",
        href: "https://github.com/Elite-R-P-W-N/Gym-Buddy",
      },
    },
    {
      title: "IPL Match Predictive Model",
      categories: ["ml", "viz"],
      techStack: ["Python", "Scikit-learn", "Flask", "Pandas", "Data Visualization"],
      impactBadges: [
        "84% Prediction Accuracy",
        "Feature Engineering Pipeline",
        "Flask REST Serving API",
      ],
      description:
        "A predictive analytics model achieving 84% accuracy in forecasting IPL cricket match outcomes. I engineered features from historical match data using Pandas and trained multiple classifiers using Scikit-learn. The model is served via a lightweight Flask REST API, allowing users to input match conditions and receive real-time win probability predictions.",
      link: {
        label: "GitHub",
        href: "https://github.com/menonabhineet/IPL-Prediction",
      },
    },
  ],
} as const;