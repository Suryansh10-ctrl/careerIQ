from fastapi import APIRouter, Query
from typing import Optional
from app.schemas.job import JobSearchResponse
from app.services.job_service import search_unified_jobs

router = APIRouter(prefix="/jobs", tags=["Unified Job Board"])

@router.get("", response_model=JobSearchResponse)
async def search_jobs(
    keyword: Optional[str] = Query(None, description="Role keyword or skill filter"),
    provider: Optional[str] = Query(None, description="indeed, naukri, or all"),
    work_mode: Optional[str] = Query(None, description="remote, hybrid, or onsite")
):
    result = search_unified_jobs(keyword=keyword, provider=provider, work_mode=work_mode)
    return result
