from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class RoadmapResource(BaseModel):
    title: str
    url: str
    type: str = "Article / Docs"
    provider: str = "Official Docs"
    isVerified: bool = True

class RoadmapNode(BaseModel):
    nodeId: str
    title: str
    description: str = ""
    type: str  # career_goal, phase, skill_group, task, project, assessment, milestone
    parentId: Optional[str] = None
    prerequisiteNodeIds: List[str] = []
    relatedSkillIds: List[str] = []
    status: str = "available"  # locked, available, in_progress, completed, needs_review, blocked
    completedAt: Optional[str] = None
    resources: List[RoadmapResource] = []
    completionCriteria: str = "Complete practical task and satisfy validation criteria."
    estimatedHours: int = 2
    provenance: str = "verified"  # verified, user_provided, ai_suggested, provisional

class NodeCompletionRequest(BaseModel):
    evidenceSummary: Optional[str] = "User marked task complete after completing exercise."

class NodeCompletionResponse(BaseModel):
    success: bool
    message: str
    completedNodeId: str
    newStatus: str
    overallProgress: float
    updatedRoadmap: dict

class RoadmapOut(BaseModel):
    roadmapId: str
    userId: str
    targetRole: str
    domain: str
    overallProgress: float
    version: int = 1
    nodes: List[RoadmapNode]
