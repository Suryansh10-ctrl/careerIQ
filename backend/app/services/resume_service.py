import re
from typing import Dict, Any, List
from app.services.skill_gap_service import analyze_skill_gap
from app.services.roadmap_service import get_or_create_roadmap

# ─── Comprehensive skill dictionary keyed by domain ───────────────────────────
SKILL_REGISTRY = {
    # Data & Analytics
    "SQL": ["sql", "mysql", "postgresql", "sqlite", "t-sql", "pl/sql"],
    "Python": ["python", "py"],
    "Excel": ["excel", "microsoft excel", "spreadsheet"],
    "R": [r"\br\b", "r programming", "rstudio"],
    "Tableau": ["tableau"],
    "Power BI": ["power bi", "powerbi"],
    "Pandas": ["pandas"],
    "NumPy": ["numpy"],
    "Data Cleaning": ["data cleaning", "data wrangling", "etl", "data preparation", "data preprocessing"],
    "Data Visualization": ["data visualization", "data viz", "matplotlib", "seaborn", "plotly"],
    "Statistics": ["statistics", "statistical analysis", "regression", "hypothesis testing", "probability"],
    "Machine Learning": ["machine learning", "ml", "scikit-learn", "sklearn", "xgboost", "random forest"],
    "Deep Learning": ["deep learning", "neural network", "pytorch", "tensorflow", "keras"],
    "Apache Spark": ["spark", "apache spark", "pyspark"],
    "Airflow": ["airflow", "apache airflow"],
    "BigQuery": ["bigquery", "big query"],
    "Snowflake": ["snowflake"],
    "Looker": ["looker", "looker studio"],
    "A/B Testing": ["a/b test", "ab test", "split test", "experiment design"],
    "Business Intelligence": ["business intelligence", "bi", "reporting", "dashboards"],
    # Software Engineering
    "JavaScript": ["javascript", "js"],
    "TypeScript": ["typescript", "ts"],
    "React": ["react", "react.js", "reactjs"],
    "Node.js": ["node.js", "nodejs", "node"],
    "Express": ["express", "express.js"],
    "MongoDB": ["mongodb", "mongo"],
    "PostgreSQL": ["postgresql", "postgres"],
    "HTML5": ["html", "html5"],
    "CSS3": ["css", "css3", "scss", "sass", "less"],
    "Tailwind CSS": ["tailwind"],
    "Docker": ["docker", "containeriz"],
    "Kubernetes": ["kubernetes", "k8s"],
    "AWS": ["aws", "amazon web services", "ec2", "s3", "lambda"],
    "Git": ["git", "github", "gitlab", "version control"],
    "REST APIs": ["rest api", "restful", "api design", "http api"],
    "GraphQL": ["graphql"],
    "Redis": ["redis"],
    "CI/CD": ["ci/cd", "continuous integration", "github actions", "jenkins", "circle ci"],
    "Linux": ["linux", "unix", "bash", "shell script"],
    "Django": ["django"],
    "FastAPI": ["fastapi"],
    "Flask": ["flask"],
    "Java": ["java"],
    "Spring Boot": ["spring boot", "spring"],
    "C++": ["c++", "cpp"],
    "C#": ["c#", "csharp", ".net"],
    "Go": [r"\bgo\b", "golang"],
    "Rust": ["rust"],
    "Vue.js": ["vue", "vue.js", "vuejs"],
    "Angular": ["angular"],
    "Next.js": ["next.js", "nextjs"],
    # AI/ML
    "Natural Language Processing": ["nlp", "natural language processing", "bert", "gpt", "transformers", "hugging face"],
    "Computer Vision": ["computer vision", "opencv", "image recognition", "object detection"],
    "MLOps": ["mlops", "model deployment", "mlflow", "kubeflow"],
    "Data Engineering": ["data engineering", "data pipeline", "data lake", "data warehouse"],
}

ATS_SECTION_KEYWORDS = {
    "contact": ["email", "phone", "linkedin", "github", "portfolio", "@"],
    "summary": ["summary", "objective", "about", "profile"],
    "experience": ["experience", "work history", "employment", "intern", "engineer", "analyst", "developer"],
    "education": ["education", "university", "college", "bachelor", "master", "degree", "b.s", "b.e", "m.s", "gpa"],
    "skills": ["skills", "technical skills", "competencies", "proficiencies"],
    "projects": ["project", "built", "developed", "created", "designed", "implemented", "deployed"],
    "achievements": ["award", "achievement", "honor", "published", "certified", "certification"],
}

QUANTIFICATION_PATTERNS = [
    r'\d+%', r'\d+x', r'\$\d+', r'\d+k\b', r'\d+m\b',
    r'increased|decreased|reduced|improved|grew|saved|generated',
    r'\d+\s*(users|customers|clients|employees|records|queries|requests)',
    r'(from|by)\s+\d+', r'\d+\+', r'\d+\s*-\s*\d+',
]

def extract_skills(text: str) -> List[Dict[str, Any]]:
    text_lower = text.lower()
    found: List[Dict[str, Any]] = []

    senior_signals = ["senior", "lead", "principal", "staff", "head of", "manager", "director"]
    level = "intermediate" if any(s in text_lower for s in senior_signals) else "beginner"

    for skill_name, patterns in SKILL_REGISTRY.items():
        for pat in patterns:
            try:
                if re.search(pat, text_lower):
                    found.append({"name": skill_name, "level": level, "verified": True})
                    break
            except re.error:
                if pat in text_lower:
                    found.append({"name": skill_name, "level": level, "verified": True})
                    break

    if not found:
        found = [
            {"name": "JavaScript", "level": "beginner", "verified": True},
            {"name": "HTML5",      "level": "beginner", "verified": True},
            {"name": "CSS3",       "level": "beginner", "verified": True},
        ]

    return found


def compute_ats_score(text: str) -> Dict[str, Any]:
    """
    Score the resume on ATS-friendliness across 5 dimensions.
    Returns a composite 0-100 score and per-dimension breakdown.
    """
    text_lower = text.lower()
    word_count = len(text.split())

    # 1. Sections present (20 pts)
    sections_found = sum(
        1 for kw_list in ATS_SECTION_KEYWORDS.values()
        if any(kw in text_lower for kw in kw_list)
    )
    section_score = min(int((sections_found / len(ATS_SECTION_KEYWORDS)) * 20), 20)

    # 2. Keyword density (25 pts)
    all_skill_matches = sum(
        1 for pats in SKILL_REGISTRY.values()
        for p in pats
        if re.search(p, text_lower)
    )
    keyword_score = min(int((all_skill_matches / 15) * 25), 25)

    # 3. Quantification (20 pts)
    quant_matches = sum(
        1 for p in QUANTIFICATION_PATTERNS
        if re.search(p, text_lower)
    )
    quant_score = min(int((quant_matches / 5) * 20), 20)

    # 4. Length / completeness (15 pts)
    if 300 <= word_count <= 1000:
        length_score = 15
    elif word_count < 150:
        length_score = 4
    elif word_count < 300:
        length_score = 9
    else:
        length_score = 10  # too long — slight penalty

    # 5. Formatting signals (20 pts) — bullet points, consistent dates, no tables
    bullet_score = min(len(re.findall(r'[•\-\*]', text)) * 2, 10)
    date_patterns = len(re.findall(r'(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|20\d\d|19\d\d)', text_lower))
    format_score = min(bullet_score + min(date_patterns, 5) * 2, 20)

    composite = section_score + keyword_score + quant_score + length_score + format_score

    return {
        "composite": composite,
        "dimensions": {
            "sections":       {"score": section_score,  "max": 20, "label": "Required Sections"},
            "keywords":       {"score": keyword_score,  "max": 25, "label": "Keyword Density"},
            "quantification": {"score": quant_score,    "max": 20, "label": "Measurable Achievements"},
            "length":         {"score": length_score,   "max": 15, "label": "Length & Completeness"},
            "formatting":     {"score": format_score,   "max": 20, "label": "Formatting Signals"},
        }
    }


def generate_recommendations(text: str, ats: Dict[str, Any], target_role: str, missing_skills: List[Dict]) -> List[Dict[str, Any]]:
    """
    Produce 5–8 specific, prioritised actionable recommendations.
    """
    recs = []
    text_lower = text.lower()
    dims = ats["dimensions"]

    # Quantification gap
    if dims["quantification"]["score"] < 12:
        recs.append({
            "priority": "HIGH",
            "icon": "📊",
            "title": "Add Measurable Impact Numbers",
            "detail": (
                "ATS and hiring managers both weight numbers heavily. "
                "Transform vague bullets into impact statements: "
                "e.g. 'Reduced report generation time by 45% using Python automation' "
                "or 'Analyzed 2M+ rows of customer transaction data in SQL'."
            ),
            "category": "Content Quality"
        })

    # Missing sections
    if dims["sections"]["score"] < 14:
        missing_secs = [
            name.capitalize() for name, kws in ATS_SECTION_KEYWORDS.items()
            if not any(kw in text_lower for kw in kws)
        ]
        recs.append({
            "priority": "HIGH",
            "icon": "📋",
            "title": f"Add Missing Sections: {', '.join(missing_secs[:3])}",
            "detail": (
                "ATS systems parse resumes by section headers. "
                f"Your resume appears to be missing: {', '.join(missing_secs)}. "
                "Add clearly labeled sections with standard headings (e.g. 'Work Experience', 'Skills', 'Projects')."
            ),
            "category": "Structure"
        })

    # Keyword density gap
    if dims["keywords"]["score"] < 16:
        role_keywords = {
            "Data Analyst":        ["SQL", "Python", "Tableau", "Power BI", "Data Visualization", "Excel", "Statistics"],
            "Full Stack Engineer": ["React", "Node.js", "REST APIs", "PostgreSQL", "Docker", "Git"],
            "Frontend Developer":  ["React", "TypeScript", "CSS3", "Next.js", "Accessibility", "Performance"],
            "Backend Developer":   ["Python", "Django", "FastAPI", "PostgreSQL", "Redis", "Docker", "REST APIs"],
            "AI/ML Engineer":      ["Python", "TensorFlow", "PyTorch", "Machine Learning", "MLOps", "Pandas"],
        }.get(target_role, ["Python", "SQL", "Git", "APIs"])
        recs.append({
            "priority": "HIGH",
            "icon": "🔑",
            "title": f"Inject More {target_role} Keywords",
            "detail": (
                f"Recruiters and ATS search specifically for these {target_role} terms: "
                f"{', '.join(role_keywords)}. "
                "Naturally weave them into your experience bullets and summary — "
                "avoid keyword stuffing but mention each key tool at least once."
            ),
            "category": "ATS Optimisation"
        })

    # Missing skills from gap analysis
    if missing_skills:
        top_missing = [s.get("skillName", s.get("name", "")) for s in missing_skills[:3]]
        recs.append({
            "priority": "MEDIUM",
            "icon": "🚀",
            "title": f"Demonstrate Missing Skills: {', '.join(top_missing)}",
            "detail": (
                f"Your profile is missing evidence for: {', '.join(top_missing)}. "
                "Add a Projects section that explicitly uses these tools, "
                "e.g. 'Built a sales dashboard in Tableau / Power BI integrating SQL data from 5 sources'."
            ),
            "category": "Skill Gap"
        })

    # Projects / portfolio
    if "project" not in text_lower and "github" not in text_lower:
        recs.append({
            "priority": "MEDIUM",
            "icon": "💡",
            "title": "Add a Projects Section with GitHub Links",
            "detail": (
                "Projects are the single best proxy for experience for early-career candidates. "
                "Include 2–3 projects with: what problem you solved, what tools you used, "
                "and a measurable outcome. Link your GitHub profile."
            ),
            "category": "Portfolio"
        })

    # Formatting
    if dims["formatting"]["score"] < 12:
        recs.append({
            "priority": "MEDIUM",
            "icon": "🎨",
            "title": "Improve Formatting for ATS Parsing",
            "detail": (
                "ATS systems struggle with tables, columns, headers/footers, and fancy graphics. "
                "Use a single-column layout, standard fonts (Arial/Calibri), "
                "consistent date formatting (e.g. Jun 2023 – Aug 2023), "
                "and bullet points (•) for experience entries."
            ),
            "category": "Formatting"
        })

    # Summary / objective section
    if not any(kw in text_lower for kw in ATS_SECTION_KEYWORDS["summary"]):
        recs.append({
            "priority": "LOW",
            "icon": "✍️",
            "title": "Write a Targeted Professional Summary",
            "detail": (
                f"Add a 3–4 line professional summary at the top that includes: "
                f"your target role ({target_role}), your top 3 technical skills, "
                f"years of experience, and one notable achievement. "
                "This is the first thing ATS systems and recruiters read."
            ),
            "category": "Content Quality"
        })

    # Certifications
    if not any(kw in text_lower for kw in ["certif", "certificate", "aws certified", "google cloud"]):
        recs.append({
            "priority": "LOW",
            "icon": "🏆",
            "title": "Add Relevant Certifications",
            "detail": (
                f"Certifications provide verified signals to both ATS and recruiters. "
                f"For {target_role}, consider: "
                + {
                    "Data Analyst":        "Google Data Analytics Certificate, Microsoft PL-300 (Power BI), Tableau Desktop Specialist",
                    "Full Stack Engineer": "AWS Certified Developer, MongoDB Atlas, Meta Front-End Developer Certificate",
                    "AI/ML Engineer":      "TensorFlow Developer Certificate, DeepLearning.AI courses, AWS Machine Learning Specialty",
                    "Frontend Developer":  "Meta Front-End Developer Certificate, Google UX Design Certificate",
                    "Backend Developer":   "AWS Certified Developer, Redis Certified Developer",
                }.get(target_role, "relevant industry certifications from Coursera or Google")
            ),
            "category": "Credentials"
        })

    return recs[:7]  # cap at 7 recommendations


def parse_resume_content(text: str) -> Dict[str, Any]:
    extracted_skills = extract_skills(text)
    exp_match = re.search(r'(\d+)\+?\s*years?', text.lower())
    exp_years = int(exp_match.group(1)) if exp_match else 1
    word_count = len(text.split())

    return {
        "name": "Candidate",
        "experienceYears": exp_years,
        "wordCount": word_count,
        "extractedSkills": extracted_skills
    }


def generate_tailored_tests(missing_skills: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    tests = []
    for idx, item in enumerate(missing_skills):
        skill = item.get("skillName", "General")
        tests.append({
            "testId": f"test_{skill.lower().replace(' ', '_')}_{idx}",
            "title": f"{skill} Competency & Practical Skill Test",
            "skill": skill,
            "questionCount": 10,
            "durationMinutes": 15,
            "difficulty": "Intermediate",
            "description": f"Validate your practical knowledge of {skill} to update your roadmap and earn verified skill badges."
        })
    if not tests:
        tests.append({
            "testId": "test_fullstack_mastery",
            "title": "Full Stack Architecture & System Design Readiness Test",
            "skill": "Full Stack Integration",
            "questionCount": 15,
            "durationMinutes": 25,
            "difficulty": "Advanced",
            "description": "Demonstrate end-to-end web architecture, API security, and database modeling capabilities."
        })
    return tests


async def evaluate_user_resume(
    user_id: str,
    resume_text: str,
    target_role: str = "Full Stack Engineer",
    domain: str = "Full-Stack Software Engineering"
) -> Dict[str, Any]:
    parsed = parse_resume_content(resume_text)
    user_skills = parsed["extractedSkills"]

    # 1. ATS score
    ats = compute_ats_score(resume_text)

    # 2. Skill gap
    gap_analysis = analyze_skill_gap(user_skills=user_skills, target_role=target_role, domain=domain)

    # 3. Roadmap
    roadmap = await get_or_create_roadmap(user_id=user_id, target_role=target_role, domain=domain)

    # 4. Tailored tests
    tests = generate_tailored_tests(gap_analysis.get("missingSkills", []))

    # 5. Actionable recommendations
    recommendations = generate_recommendations(
        text=resume_text,
        ats=ats,
        target_role=target_role,
        missing_skills=gap_analysis.get("missingSkills", [])
    )

    return {
        "success": True,
        "message": "Resume analyzed successfully.",
        "extractedData": {
            "targetRole": target_role,
            "domain": domain,
            "experienceYears": parsed["experienceYears"],
            "wordCount": parsed["wordCount"],
            "totalSkillsFound": len(user_skills),
            "primarySkills": [s["name"] for s in user_skills[:10]],
            "extractedSkills": [s["name"] for s in user_skills],
        },
        "atsScore": ats,
        "skillGapAnalysis": gap_analysis,
        "personalizedRoadmap": roadmap,
        "recommendedTests": tests,
        "recommendations": recommendations,
    }


def get_skill_test_questions(test_id: str) -> Dict[str, Any]:
    skill_name = test_id.replace("test_", "").split("_")[0].capitalize()
    questions = [
        {
            "id": 1,
            "prompt": f"What is the primary architectural purpose of {skill_name} in scalable deployments?",
            "options": [
                f"Standardized dependency isolation and predictable environments for {skill_name}",
                "Client-side DOM rendering speed boost only",
                "Automated database index creation",
                "Encrypting HTTP request payloads at rest"
            ],
            "correctIndex": 0
        },
        {
            "id": 2,
            "prompt": f"Which best practice applies when configuring production environments for {skill_name}?",
            "options": [
                "Hardcode API credentials directly in source files",
                "Use environment variable injection and secret managers",
                "Disable all CORS headers globally",
                "Run processes as root without resource caps"
            ],
            "correctIndex": 1
        },
        {
            "id": 3,
            "prompt": f"How do you handle asynchronous error boundaries effectively with {skill_name}?",
            "options": [
                "Ignore all rejected promises",
                "Wrap calls in try/catch blocks with centralized log reporting",
                "Restart the server on every 404",
                "Return null values silently"
            ],
            "correctIndex": 1
        },
        {
            "id": 4,
            "prompt": f"What is a key performance bottleneck to avoid in {skill_name} workflows?",
            "options": [
                "Blocking event loops with synchronous CPU-heavy computation",
                "Using gzip/brotli compression on static assets",
                "Caching query results in Redis",
                "Minifying JavaScript bundles"
            ],
            "correctIndex": 0
        },
        {
            "id": 5,
            "prompt": f"How does {skill_name} maintain backward compatibility during updates?",
            "options": [
                "By breaking existing endpoints immediately",
                "Through semantic versioning, deprecation headers, and additive schema changes",
                "By forcing all clients to update synchronously",
                "By dropping older database collections on startup"
            ],
            "correctIndex": 1
        }
    ]
    return {
        "testId": test_id,
        "skillName": skill_name,
        "title": f"{skill_name} Competency Assessment",
        "totalQuestions": len(questions),
        "passingScorePercentage": 70,
        "questions": questions
    }


def evaluate_skill_test_answers(test_id: str, selected_options: List[int]) -> Dict[str, Any]:
    test_data = get_skill_test_questions(test_id)
    questions = test_data["questions"]
    correct_count = sum(
        1 for idx, q in enumerate(questions)
        if idx < len(selected_options) and selected_options[idx] == q["correctIndex"]
    )
    score_pct = int((correct_count / len(questions)) * 100) if questions else 0
    passed = score_pct >= test_data["passingScorePercentage"]
    return {
        "testId": test_id,
        "skillName": test_data["skillName"],
        "scorePercentage": score_pct,
        "correctCount": correct_count,
        "totalQuestions": len(questions),
        "passed": passed,
        "badgeAwarded": f"Captain's Certified: {test_data['skillName']} Navigator" if passed else None,
        "message": (
            f"Congratulations! You passed with {score_pct}% and earned your {test_data['skillName']} badge!"
            if passed else
            f"You scored {score_pct}%. Review the recommended modules and try again."
        )
    }
