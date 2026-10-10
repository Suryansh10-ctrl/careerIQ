from pydantic import BaseModel
from typing import List, Optional

class SkillGapItem(BaseModel):
    skillName: str
    status: str  # verified, user_provided, missing, partial
    confidence: str  # high, medium, low, provisional
    isRequired: bool = True
    prerequisites: List[str] = []

class SkillGapAnalysisResult(BaseModel):
    targetRole: str
    domain: str
    readinessScore: float
    demonstratedSkills: List[SkillGapItem]
    missingSkills: List[SkillGapItem]
    recommendedNextSteps: List[str]
    provenance: str = "verified"
