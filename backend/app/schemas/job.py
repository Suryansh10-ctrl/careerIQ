from pydantic import BaseModel
from typing import List, Optional

class JobItem(BaseModel):
    id: str
    sourceJobId: str
    provider: str  # indeed, naukri, direct
    title: str
    company: str
    location: str = "Remote"
    workMode: str = "remote"  # remote, hybrid, onsite
    experienceLevel: str = "Mid Level"
    requiredSkills: List[str] = []
    url: str
    isVerified: bool = True
    postedAt: str = "Recently"
    provenanceBadge: str = "Direct Provider Link"

class JobSearchResponse(BaseModel):
    success: bool
    total: int
    jobs: List[JobItem]
    availableProviders: List[str]
    disclaimer: str
