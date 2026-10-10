from pydantic import BaseModel
from typing import List, Optional

class ResumeEvaluateRequest(BaseModel):
    resumeText: Optional[str] = None
    targetRole: Optional[str] = "Full Stack Engineer"
    domain: Optional[str] = "Full-Stack Software Engineering"

class SkillTestItem(BaseModel):
    testId: str
    title: str
    skill: str
    questionCount: int
    durationMinutes: int
    difficulty: str
    description: str

class ResumeEvaluateResponse(BaseModel):
    success: bool
    message: str
    extractedData: dict
    skillGapAnalysis: dict
    personalizedRoadmap: dict
    recommendedTests: List[SkillTestItem]
