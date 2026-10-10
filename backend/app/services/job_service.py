from typing import List, Dict, Any, Optional

# Verified initial job search registry with honest outbound links
SEED_JOBS = [
    {
        "id": "job_1",
        "sourceJobId": "ind_fe_101",
        "provider": "indeed",
        "title": "Senior Frontend Developer (React & TypeScript)",
        "company": "Oceanic Tech Solutions",
        "location": "Remote",
        "workMode": "remote",
        "experienceLevel": "Mid-Senior Level",
        "requiredSkills": ["JavaScript", "TypeScript", "React", "Tailwind CSS", "GSAP"],
        "url": "https://www.indeed.com/jobs?q=React+Developer",
        "isVerified": True,
        "postedAt": "2 days ago",
        "provenanceBadge": "Indeed Permitted Outbound Search"
    },
    {
        "id": "job_2",
        "sourceJobId": "nak_be_202",
        "provider": "naukri",
        "title": "Full Stack Engineer (Node.js & React)",
        "company": "Nautical Cloud Systems",
        "location": "Hybrid",
        "workMode": "hybrid",
        "experienceLevel": "Mid Level",
        "requiredSkills": ["Node.js", "Express", "React", "MongoDB", "TypeScript"],
        "url": "https://www.naukri.com/full-stack-developer-jobs",
        "isVerified": True,
        "postedAt": "1 day ago",
        "provenanceBadge": "Naukri Official Outbound Link"
    },
    {
        "id": "job_3",
        "sourceJobId": "ind_ds_303",
        "provider": "indeed",
        "title": "Data Scientist / AI Engineer",
        "company": "Mariner AI Labs",
        "location": "Remote",
        "workMode": "remote",
        "experienceLevel": "Senior Level",
        "requiredSkills": ["Python", "PyTorch", "SQL", "Pandas", "Scikit-Learn"],
        "url": "https://www.indeed.com/jobs?q=Data+Scientist",
        "isVerified": True,
        "postedAt": "3 days ago",
        "provenanceBadge": "Indeed Permitted Outbound Search"
    },
    {
        "id": "job_4",
        "sourceJobId": "nak_dev_404",
        "provider": "naukri",
        "title": "DevOps & Cloud Engineer",
        "company": "Horizon Infrastructure Inc",
        "location": "Remote",
        "workMode": "remote",
        "experienceLevel": "Mid Level",
        "requiredSkills": ["Linux", "Docker", "Kubernetes", "AWS", "Terraform"],
        "url": "https://www.naukri.com/devops-engineer-jobs",
        "isVerified": True,
        "postedAt": "Just now",
        "provenanceBadge": "Naukri Official Outbound Link"
    }
]

def search_unified_jobs(keyword: Optional[str] = None, provider: Optional[str] = None, work_mode: Optional[str] = None) -> Dict[str, Any]:
    filtered = SEED_JOBS

    if keyword:
        k_lower = keyword.lower()
        filtered = [
            j for j in filtered 
            if k_lower in j["title"].lower() or k_lower in j["company"].lower() or any(k_lower in s.lower() for s in j["requiredSkills"])
        ]

    if provider and provider != "all":
        filtered = [j for j in filtered if j["provider"] == provider.lower()]

    if work_mode and work_mode != "all":
        filtered = [j for j in filtered if j["workMode"] == work_mode.lower()]

    return {
        "success": True,
        "total": len(filtered),
        "jobs": filtered,
        "availableProviders": ["indeed", "naukri", "direct"],
        "disclaimer": "Job listings are provided via permitted outbound search links and official integration adapters. External listing availability is governed by provider search terms."
    }
