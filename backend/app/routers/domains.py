from fastapi import APIRouter
from app.models.domain import SUPPORTED_DOMAINS

router = APIRouter(prefix="/domains", tags=["Career Domains"])

@router.get("")
async def list_domains():
    return {"success": True, "domains": SUPPORTED_DOMAINS}
