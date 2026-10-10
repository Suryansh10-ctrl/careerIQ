SUPPORTED_DOMAINS = [
  {
    "domainId": "fullstack",
    "name": "Full-Stack Software Engineering",
    "description": "Master web fundamentals, modern frontend frameworks, scalable backends, microservices, databases, and DevOps practices.",
    "roles": [
      {
        "roleId": "fs-eng",
        "title": "Full Stack Engineer",
        "description": "Builds end-to-end web applications combining React/Next.js frontend with Express/FastAPI backend and SQL/NoSQL databases.",
        "requiredSkills": ["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "SQL", "Git", "REST APIs", "Tailwind CSS"],
        "optionalSkills": ["Docker", "GraphQL", "Redis", "CI/CD", "AWS"]
      },
      {
        "roleId": "fe-eng",
        "title": "Frontend Developer",
        "description": "Specializes in user interfaces, browser performance, modern visual design systems, React, dynamic animations, and state management.",
        "requiredSkills": ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS", "GSAP", "Framer Motion", "Web Accessibility (a11y)"],
        "optionalSkills": ["Next.js", "Vite", "Testing Library", "Cypress"]
      },
      {
        "roleId": "be-eng",
        "title": "Backend Developer",
        "description": "Focuses on server architecture, scalable API endpoints, database schemas, authentication systems, security, and caching.",
        "requiredSkills": ["Node.js", "Python", "FastAPI", "Express", "TypeScript", "MongoDB", "PostgreSQL", "JWT", "REST APIs"],
        "optionalSkills": ["Microservices", "Kafka", "Redis", "Docker", "Kubernetes"]
      }
    ]
  },
  {
    "domainId": "datascience",
    "name": "Data Science & Artificial Intelligence",
    "description": "Transform raw data into actionable insights, machine learning models, predictive pipelines, and generative AI features.",
    "roles": [
      {
        "roleId": "data-scientist",
        "title": "Data Scientist",
        "description": "Analyzes complex datasets, builds statistical models, trains ML algorithms, and presents data-driven recommendations.",
        "requiredSkills": ["Python", "SQL", "Pandas", "NumPy", "Scikit-Learn", "Statistics", "Data Visualization", "Jupyter"],
        "optionalSkills": ["PyTorch", "TensorFlow", "Spark", "MLOps"]
      },
      {
        "roleId": "ai-ml-eng",
        "title": "AI / Machine Learning Engineer",
        "description": "Designs, trains, deploys, and monitors production machine learning pipelines and LLM applications.",
        "requiredSkills": ["Python", "PyTorch", "TensorFlow", "Deep Learning", "NLP", "MLOps", "Docker", "API Deployment"],
        "optionalSkills": ["LangChain", "Vector Databases", "Hugging Face", "CUDA"]
      }
    ]
  },
  {
    "domainId": "devops-cloud",
    "name": "DevOps & Cloud Infrastructure",
    "description": "Automate build pipelines, orchestrate containers, manage cloud infrastructure (AWS/Azure/GCP), and optimize uptime.",
    "roles": [
      {
        "roleId": "devops-eng",
        "title": "DevOps & Platform Engineer",
        "description": "Architects CI/CD pipelines, container orchestration, infrastructure as code, and observability systems.",
        "requiredSkills": ["Linux", "Docker", "Kubernetes", "Terraform", "CI/CD (GitHub Actions/Jenkins)", "Bash/Shell", "AWS / Cloud"],
        "optionalSkills": ["Ansible", "Prometheus", "Grafana", "Helm"]
      }
    ]
  },
  {
    "domainId": "cybersecurity",
    "name": "Cybersecurity & InfoSec",
    "description": "Protect systems, assess vulnerabilities, implement zero-trust architectures, and defend infrastructure against modern threats.",
    "roles": [
      {
        "roleId": "sec-eng",
        "title": "Cybersecurity Engineer",
        "description": "Implement defensive security controls, vulnerability scans, network monitoring, and application security.",
        "requiredSkills": ["Network Security", "Linux", "Python/Bash", "Vulnerability Assessment", "OWASP Top 10", "SIEM Tools"],
        "optionalSkills": ["Penetration Testing", "Cryptography", "CompTIA Security+"]
      }
    ]
  },
  {
    "domainId": "qa-testing",
    "name": "Quality Assurance & Automated Testing",
    "description": "Ensure application stability, performance, end-to-end automation test coverage, and reliability.",
    "roles": [
      {
        "roleId": "sdet",
        "title": "Software Development Engineer in Test (SDET)",
        "description": "Develops automated testing frameworks, integration suites, continuous integration tests, and performance benchmarks.",
        "requiredSkills": ["JavaScript / TypeScript", "Playwright / Cypress", "Selenium", "API Testing (Postman)", "CI/CD Integration"],
        "optionalSkills": ["JMeter", "Load Testing", "K6"]
      }
    ]
  }
]
