from pydantic import BaseModel
from typing import List, Optional

class SkillItem(BaseModel):
    name: str
    level: str = "beginner"  # beginner, intermediate, advanced
    verified: bool = False

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    targetRole: Optional[str] = None
    domain: Optional[str] = None
    skills: Optional[List[SkillItem]] = None
    experienceYears: Optional[int] = None
    education: Optional[str] = None
    locationPreference: Optional[str] = None

class UserProfileOut(BaseModel):
    userId: str
    name: str
    targetRole: str
    domain: str
    skills: List[SkillItem]
    experienceYears: int
    education: str
    resumeUrl: Optional[str] = ""
    locationPreference: Optional[str] = "Remote / Hybrid"

class LinkedInAnalyzeRequest(BaseModel):
    linkedinUrl: str
    targetRole: Optional[str] = "Data Analyst"

class SectionScore(BaseModel):
    name: str
    score: int
    focus: bool

class LinkedInAnalyzeResponse(BaseModel):
    linkedinUrl: str
    extractedUsername: str
    overallScore: int
    strengthTitle: str
    strengthSummary: str
    customUrlDetected: bool
    sectionScores: List[SectionScore]
    currentHeadline: str
    issuesFound: List[str]
    suggestedHeadlines: List[str]
    verifiedSkills: List[str]
    recommendedKeywords: List[str]

