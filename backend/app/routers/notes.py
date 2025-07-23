from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List
from services import summarizer, qgenerator
import pdfplumber

router = APIRouter()

class NoteProcessResponse(BaseModel):
    summary: str
    questions: list

@router.post("/process", response_model=NoteProcessResponse)
async def process_notes(file: UploadFile = File(...)):
    try:
        if file.filename.endswith(".pdf"):
            with pdfplumber.open(file.file) as pdf:
                text = "\n".join(page.extract_text() or '' for page in pdf.pages)
        else:
            text = (await file.read()).decode("utf-8")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"File processing error: {e}")
    summary = summarizer.summarize(text)
    questions = qgenerator.generate_questions(text)
    return {"summary": summary, "questions": questions}