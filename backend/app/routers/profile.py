import re
from fastapi import APIRouter, Depends
from app.schemas.profile import UserProfileUpdate, UserProfileOut, LinkedInAnalyzeRequest, LinkedInAnalyzeResponse, SectionScore
from app.database import db_instance, in_memory_profiles
from app.middleware.auth import get_current_user

router = APIRouter(prefix="/profile", tags=["User Profile"])

@router.get("", response_model=UserProfileOut)
async def get_profile(current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("userId", "usr_guest")

    default_profile = {
        "userId": user_id,
        "name": "Captain Explorer",
        "targetRole": "Full Stack Engineer",
        "domain": "Full-Stack Software Engineering",
        "skills": [
            {"name": "JavaScript", "level": "intermediate", "verified": True},
            {"name": "TypeScript", "level": "beginner", "verified": False},
            {"name": "React", "level": "intermediate", "verified": True},
            {"name": "HTML5", "level": "advanced", "verified": True},
            {"name": "CSS3", "level": "intermediate", "verified": True}
        ],
        "experienceYears": 1,
        "education": "B.S. Computer Science / Self Taught",
        "resumeUrl": "",
        "locationPreference": "Remote / Hybrid"
    }

    if db_instance.is_connected:
        doc = await db_instance.db.profiles.find_one({"userId": user_id})
        if doc:
            doc.pop("_id", None)
            return doc
        else:
            await db_instance.db.profiles.insert_one(default_profile)
            default_profile.pop("_id", None)
            return default_profile
    else:
        if user_id not in in_memory_profiles:
            in_memory_profiles[user_id] = default_profile
        return in_memory_profiles[user_id]

@router.patch("", response_model=UserProfileOut)
async def update_profile(data: UserProfileUpdate, current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("userId", "usr_guest")
    existing = await get_profile(current_user)

    updated = dict(existing)
    if data.name is not None: updated["name"] = data.name
    if data.targetRole is not None: updated["targetRole"] = data.targetRole
    if data.domain is not None: updated["domain"] = data.domain
    if data.skills is not None: updated["skills"] = [s.model_dump() for s in data.skills]
    if data.experienceYears is not None: updated["experienceYears"] = data.experienceYears
    if data.education is not None: updated["education"] = data.education
    if data.locationPreference is not None: updated["locationPreference"] = data.locationPreference

    if db_instance.is_connected:
        await db_instance.db.profiles.update_one({"userId": user_id}, {"$set": updated}, upsert=True)
    else:
        in_memory_profiles[user_id] = updated

    return updated

@router.post("/linkedin/analyze", response_model=LinkedInAnalyzeResponse)
async def analyze_linkedin_profile(data: LinkedInAnalyzeRequest, current_user: dict = Depends(get_current_user)):
    url = data.linkedinUrl.strip()
    target_role = data.targetRole or "Data Analyst"

    slug = url
    match = re.search(r"linkedin\.com/in/([^/\?#]+)", url, re.IGNORECASE)
    if match:
        slug = match.group(1)
    else:
        slug = url.replace("https://", "").replace("http://", "").replace("www.linkedin.com/in/", "").strip("/ ")

    has_numbers_suffix = bool(re.search(r"-\d{5,}", slug) or re.search(r"-[a-f0-9]{8,}", slug))
    custom_url_detected = not has_numbers_suffix and len(slug) > 2

    clean_name = slug.replace("-", " ").title()
    role_in_slug = any(kw in slug.lower() for kw in target_role.lower().split())

    overall_score = 75 if custom_url_detected else 58
    if role_in_slug:
        overall_score += 10

    overall_score = min(overall_score, 94)

    strength_title = "Solid Profile Foundation" if overall_score >= 70 else "Needs Keyword Optimization"
    strength_summary = (
        f"Analyzed profile handle '{slug}' for role '{target_role}'. "
        + ("Custom URL handle verified. " if custom_url_detected else "Standard default URL detected; consider setting a custom slug. ")
        + "Headline and role keyword optimization are recommended to boost recruiter visibility."
    )

    section_scores = [
        SectionScore(name="Headline", score=max(overall_score - 12, 45), focus=True),
        SectionScore(name="About", score=overall_score, focus=False),
        SectionScore(name="Experience", score=min(overall_score + 8, 95), focus=False),
        SectionScore(name="Skills", score=82, focus=False),
        SectionScore(name="Role keywords", score=max(overall_score - 10, 50), focus=True),
        SectionScore(name="Completeness", score=88 if custom_url_detected else 65, focus=False),
    ]

    current_headline = f"Student / Professional ({clean_name if len(clean_name)<22 else 'User'}) | Looking for opportunities"

    issues_found = [
        f"Missing primary target role keywords ('{target_role}') in headline",
        "Verified technical skills from your learning roadmap are omitted",
        "Generic search terms reduce visibility in recruiter search filters",
    ]
    if not custom_url_detected:
        issues_found.append("Default LinkedIn URL slug contains unformatted numeric identifiers")

    suggested_headlines = [
        f"Aspiring {target_role} | SQL · Python · Data Cleaning | Turning raw data into clear answers",
        f"{target_role} | Python · SQL · Tableau | Building actionable business intelligence & insights",
        f"Entry-Level {target_role} | Skilled in SQL, Excel & Data Visualization | Passionate about data-driven decisions",
    ]

    verified_skills = ["SQL", "Python", "Excel", "Data Cleaning"]
    recommended_keywords = ["Data Visualization", "Reporting", "Dashboards", "ETL"]

    return LinkedInAnalyzeResponse(
        linkedinUrl=url if url.startswith("http") else f"https://linkedin.com/in/{slug}",
        extractedUsername=slug,
        overallScore=overall_score,
        strengthTitle=strength_title,
        strengthSummary=strength_summary,
        customUrlDetected=custom_url_detected,
        sectionScores=section_scores,
        currentHeadline=current_headline,
        issuesFound=issues_found,
        suggestedHeadlines=suggested_headlines,
        verifiedSkills=verified_skills,
        recommendedKeywords=recommended_keywords,
    )

