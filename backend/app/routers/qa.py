from fastapi import APIRouter
from pydantic import BaseModel
from services import qa_service

router = APIRouter()

class QARequest(BaseModel):
    context: str
    question: str

class QAResponse(BaseModel):
    answer: str

@router.post("/query", response_model=QAResponse)
async def query_qa(request: QARequest):
    answer = qa_service.answer_question(request.context, request.question)
    return {"answer": answer}