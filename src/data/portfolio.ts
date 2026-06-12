export const profile = {
  name: "Parasa Deepak Kumar",
  title: "AI Engineer · AIML Student · Building Intelligent Systems",
  tagline:
    "Final-year B.Tech CSE (AIML) student engineering production-grade LLM, RAG, and agentic AI systems.",
  email: "deepak0422v@gmail.com",
  github: "https://github.com/deepak0422v",
  linkedin: "https://www.linkedin.com/in/deepak0422/",
  resume: "/Resume_Main.pdf",
  location: "India",
};

export const stats = [
  { label: "AI Projects Built", value: "5+" },
  { label: "Technologies", value: "20+" },
  { label: "GitHub Repos", value: "10+" },
  { label: "Hackathons", value: "8" },
];

export const skills = [
  { group: "AI / ML", items: ["Machine Learning", "Deep Learning", "NLP", "Transformers"] },
  { group: "LLM Engineering", items: ["Prompt Engineering", "RAG Pipeline", "LLM Applications"] },
  { group: "RAG Systems", items: ["Chunking", "Vector Search", "Retrieval", "Citations"] },
  {
    group: "Agentic AI",
    items: ["Tool Calling", "AI Agents", "Multi-Agent", "LangChain and LangGraph"],
  },
  {
    group: "AI Data Layer",
    items: ["Vector Databases", "Embeddings", "ChromaDB", "Semantic Search", "Document Indexing"],
  },
  { group: "Backend", items: ["Java", "Spring Boot", "REST APIs", "SQL", "FastAPI"] },
  { group: "Frontend", items: ["React", "TypeScript", "Tailwind"] },
  { group: "Languages", items: ["Python", "Java", "SQL", "TypeScript"] },
  { group: "Tooling", items: ["Git", "GitHub", "Docker"] },
];

export const projects = [
  {
    slug: "loan",
    name: "Intelligent Loan Approval System",
    summary:
      "End-to-end machine learning system that predicts loan approval eligibility using applicant financial and demographic information.",
    problem:
      "Loan approval decisions require evaluating multiple applicant attributes. This system automates eligibility prediction using machine learning to support faster and more consistent decision-making.",
    tech: ["Python", "scikit-learn", "Pandas", "Numpy", "Random Forest", "Strealit", "Joblib"],
    features: [
      "Data preprocessing and feature engineering pipeline",
      "Logistic Regression and Random Forest model comparison. Random Forest based loan eligibility prediction",
      "Hyperparameter tuning using GridSearchCV",
      "Model evaluation using Accuracy, Precision, Recall and F1 Score",
      "Trained model serialization with Joblib",
      "Live deployment on Streamlit Cloud",
    ],
    pipeline: [
      "Application Data",
      "Data Preprocessing",
      "Feature Engineering",
      "Random Forest Model",
      "Loan Approval Prediction",
    ],
    github: "https://github.com/deepak0422v/Intelligent-Loan-Eligibility-Prediction-System",
    demo: "https://loan-approval-predictor-ml.streamlit.app",
  },
  {
    slug: "AI App Compiler",
    name: "AI App Compiler",
    summary:
      "Multi-stage AI system that transforms natural language requirements into validated application architectures, database schemas, API specifications, and UI definitions.",
    problem:
      "Turning business requirements into technical specifications is slow and error-prone. AI App Compiler automates this process by converting natural language requirements into structured application blueprints through a compiler-style pipeline.",
    tech: ["JavaScript", "OpenRouter", "Vercel", "REST APIs", "JSON Validation", "LLMs"],
    features: [
      "Intent extraction from natural language requirements",
      "Architecture, schema, and API generation",
      "Ambiguity detection and assumption handling",
      "Cross-layer validation (UI → API → Database)",
      "Automatic JSON repair and consistency checks",
      "Execution simulation and validation scoring",
    ],
    pipeline: ["PROMPT", "INTENT", "ARCHITECTURE", "SCHEMA GEN", "VALIDATION", "EXECUTION SIM"],
    github: "https://github.com/deepak0422v/app-compiler",
    demo: "https://app-compiler-seven.vercel.app",
  },
  {
    slug: "lumora",
    name: "Lumora – AI Research Assistant",
    summary:
      "AI-powered research platform that enables users to chat with documents, generate reports, and extract insights using Retrieval-Augmented Generation (RAG).",
    problem:
      "Researchers, students, and professionals spend hours reading lengthy PDFs, extracting information, and preparing reports. Traditional search tools cannot understand document context or provide synthesized insights.",
    tech: [
      "Python",
      "LangChain",
      "TypeScript",
      "Vector Database",
      "FastAPI",
      "React",
      "Grok API",
      "Railway",
      "Vercel",
    ],
    features: [
      "Upload and analyze PDF documents instantly",
      "AI-powered document chat with contextual answers",
      "Real-time streaming responses",
      "Research report generation from uploaded documents",
      "Session-based conversation memory",
      "Citation-grounded responses using RAG",
      "Multi-document knowledge retrieval",
      "Interactive research workspace",
    ],
    pipeline: [
      "User",
      "LUMORA UI",
      "FASTAPI",
      "RAG PIPELINE",
      "VECTOR STORE",
      "LLM",
      "AI RESPONSE",
    ],
    github: "https://github.com/deepak-parasa/rag-assistant",
    demo: "#",
  },
  {
    slug: "ML",
    name: "Traffic Demand Prediction System",
    summary:
      "Machine learning system that predicts normalized traffic demand using geospatial, temporal, road infrastructure, and environmental features.",
    problem:
      "Urban traffic demand varies significantly across locations and time periods. This system predicts future traffic demand using historical patterns, road characteristics, geolocation data, and weather information.",
    tech: ["Python", "Pandas", "NumPy", "ScikIt-Learn", "CatBoost", "PyGeoHash", "VS Code"],
    features: [
      "Traffic demand prediction using CatBoost Regressor",
      "Geospatial feature extraction from geohash (latitude & longitude)",
      "Temporal feature engineering with cyclical time encoding",
      "Out-of-Fold target encoding for location-based demand patterns",
      "Feature importance analysis and model optimization",
      "Public leaderboard score of 91.09 in Flipkart Gridlock Hackathon 2.0",
    ],
    pipeline: [
      "RAW DATA",
      "PREPROCESSING",
      "FEATURE ENGINEERING",
      "CATBOOST MODEL",
      "VALIDATION",
      "PREDICTION",
    ],
    github: "https://github.com/deepak-parasa/research-agent",
    demo: "#",
  },
];
