from fastapi import APIRouter, Depends
from app.schemas.skill_gap import SkillGapAnalysisResult
from app.services.skill_gap_service import analyze_skill_gap
from app.routers.profile import get_profile
from app.middleware.auth import get_current_user

router = APIRouter(prefix="/skill-gap", tags=["Skill Gap Analysis"])

@router.get("/analyze", response_model=SkillGapAnalysisResult)
async def analyze_gap(current_user: dict = Depends(get_current_user)):
    user_profile = await get_profile(current_user)
    target_role = user_profile.get("targetRole", "Full Stack Engineer")
    domain = user_profile.get("domain", "Full-Stack Software Engineering")
    skills = user_profile.get("skills", [])

    result = analyze_skill_gap(user_skills=skills, target_role=target_role, domain=domain)
    return result
