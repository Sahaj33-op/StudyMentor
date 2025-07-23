from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from services import resume_parser

router = APIRouter()

class ResumeAnalysisResponse(BaseModel):
    feedback: str
    suggestedRoles: list

@router.post("/analyze", response_model=ResumeAnalysisResponse)
async def analyze_resume(file: UploadFile = File(...)):
    try:
        content = await file.read()
        feedback, suggested_roles = resume_parser.analyze_resume(file.filename, content)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Resume processing error: {e}")
    return {"feedback": feedback, "suggestedRoles": suggested_roles}