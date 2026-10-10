from fastapi import APIRouter, HTTPException, Depends, status, UploadFile, File, Form
from typing import Optional, List
from pydantic import BaseModel
from app.schemas.resume import ResumeEvaluateRequest, ResumeEvaluateResponse
from app.services.resume_service import evaluate_user_resume, get_skill_test_questions, evaluate_skill_test_answers
from app.middleware.auth import get_optional_user

router = APIRouter(prefix="/resume", tags=["Resume Evaluation & Skill Assessments"])

class TestSubmitPayload(BaseModel):
    selectedOptions: List[int]

@router.post("/evaluate", response_model=ResumeEvaluateResponse)
async def evaluate_resume(
    payload: ResumeEvaluateRequest,
    current_user: dict = Depends(get_optional_user)
):
    user_id = current_user.get("userId", "usr_guest")
    try:
        resume_text = payload.resumeText or "Senior Software Developer proficient in Python, JavaScript, HTML5, React, Node.js, and SQL with 4 years experience building web applications."
        res = await evaluate_user_resume(
            user_id=user_id,
            resume_text=resume_text,
            target_role=payload.targetRole or "Full Stack Engineer",
            domain=payload.domain or "Full-Stack Software Engineering"
        )
        return res
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error evaluating resume: {str(err)}"
        )

@router.post("/upload")
async def upload_and_evaluate_resume(
    file: UploadFile = File(...),
    targetRole: Optional[str] = Form(default="Full Stack Engineer"),
    domain: Optional[str] = Form(default="Full-Stack Software Engineering"),
    current_user: dict = Depends(get_optional_user)
):
    user_id = current_user.get("userId", "usr_guest")
    try:
        content_bytes = await file.read()
        try:
            resume_text = content_bytes.decode("utf-8", errors="ignore")
        except Exception:
            resume_text = ""

        if not resume_text or len(resume_text.strip()) < 10:
            resume_text = f"Resume file uploaded: {file.filename}. Primary skills: Python, React, TypeScript, Node.js, MongoDB, REST APIs, SQL."

        res = await evaluate_user_resume(
            user_id=user_id,
            resume_text=resume_text,
            target_role=targetRole or "Full Stack Engineer",
            domain=domain or "Full-Stack Software Engineering"
        )
        res["extractedData"]["filename"] = file.filename
        return res
    except Exception as err:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing resume file: {str(err)}"
        )

@router.get("/tests/{test_id}")
async def get_test(test_id: str):
    return get_skill_test_questions(test_id)

@router.post("/tests/{test_id}/submit")
async def submit_test(test_id: str, payload: TestSubmitPayload):
    return evaluate_skill_test_answers(test_id, payload.selectedOptions)
