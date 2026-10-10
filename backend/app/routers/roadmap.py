from fastapi import APIRouter, HTTPException, Depends, status
from app.schemas.roadmap import RoadmapOut, NodeCompletionRequest, NodeCompletionResponse
from app.services.roadmap_service import get_or_create_roadmap, complete_roadmap_node
from app.middleware.auth import get_current_user

router = APIRouter(prefix="/roadmaps", tags=["Interactive Tree Roadmap"])

@router.get("", response_model=RoadmapOut)
async def get_my_roadmap(current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("userId", "usr_guest")
    roadmap = await get_or_create_roadmap(user_id)
    return roadmap

@router.get("/{roadmap_id}", response_model=RoadmapOut)
async def get_roadmap_by_id(roadmap_id: str, current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("userId", "usr_guest")
    roadmap = await get_or_create_roadmap(user_id)
    return roadmap

@router.post("/{roadmap_id}/nodes/{node_id}/completion", response_model=NodeCompletionResponse)
async def complete_node(
    roadmap_id: str, 
    node_id: str, 
    payload: NodeCompletionRequest, 
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user.get("userId", "usr_guest")
    try:
        result = await complete_roadmap_node(
            user_id=user_id,
            roadmap_id=roadmap_id,
            node_id=node_id,
            evidence_summary=payload.evidenceSummary or "Task marked complete."
        )
        return result
    except ValueError as val_err:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(val_err)
        )
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error persisting node completion: {str(err)}"
        )
