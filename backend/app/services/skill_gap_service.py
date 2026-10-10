from typing import List, Dict, Any

def analyze_skill_gap(user_skills: List[Dict[str, Any]], target_role: str = "Full Stack Engineer", domain: str = "Full-Stack Software Engineering") -> Dict[str, Any]:
    # Requirement skill sets for target roles
    role_requirements = {
        "Full Stack Engineer": ["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "SQL", "Tailwind CSS", "Git", "REST APIs"],
        "Frontend Developer": ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS", "GSAP", "Framer Motion", "Web Accessibility"],
        "Backend Developer": ["Node.js", "Express", "TypeScript", "MongoDB", "PostgreSQL", "JWT", "REST APIs", "Zod", "Docker"],
        "Data Scientist": ["Python", "SQL", "Pandas", "NumPy", "Scikit-Learn", "Statistics", "Data Visualization"],
        "AI / Machine Learning Engineer": ["Python", "PyTorch", "TensorFlow", "Deep Learning", "NLP", "MLOps", "Docker"],
        "DevOps & Platform Engineer": ["Linux", "Docker", "Kubernetes", "Terraform", "CI/CD", "Bash", "AWS"],
        "Cybersecurity Engineer": ["Network Security", "Linux", "Python", "Vulnerability Assessment", "OWASP Top 10", "SIEM"],
        "SDET": ["JavaScript", "TypeScript", "Playwright", "Cypress", "Selenium", "API Testing", "CI/CD"]
    }

    required = role_requirements.get(target_role, role_requirements["Full Stack Engineer"])
    user_skill_names = {s["name"].lower(): s for s in user_skills}

    demonstrated = []
    missing = []

    for req in required:
        req_lower = req.lower()
        if req_lower in user_skill_names:
            u_skill = user_skill_names[req_lower]
            demonstrated.append({
                "skillName": req,
                "status": "verified" if u_skill.get("verified") else "user_provided",
                "confidence": "high" if u_skill.get("verified") else "medium",
                "isRequired": True,
                "prerequisites": []
            })
        else:
            missing.append({
                "skillName": req,
                "status": "missing",
                "confidence": "provisional",
                "isRequired": True,
                "prerequisites": ["Foundational Programming"]
            })

    total_req = max(len(required), 1)
    readiness_score = round((len(demonstrated) / total_req) * 100, 1)

    recommended_steps = []
    if missing:
        top_missing = [m["skillName"] for m in missing[:3]]
        recommended_steps.append(f"Focus learning roadmap on key missing competencies: {', '.join(top_missing)}.")
        recommended_steps.append("Complete practical project milestones to generate verified skill evidence.")
    else:
        recommended_steps.append("Skill coverage looks excellent! Prepare for mock interview assessments and active job matching.")

    return {
        "targetRole": target_role,
        "domain": domain,
        "readinessScore": readiness_score,
        "demonstratedSkills": demonstrated,
        "missingSkills": missing,
        "recommendedNextSteps": recommended_steps,
        "provenance": "verified"
    }
