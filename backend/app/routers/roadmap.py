from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Literal

router = APIRouter()

class Resource(BaseModel):
    title: str
    url: str

class Milestone(BaseModel):
    milestone: str
    description: str
    resources: List[Resource]

class RoadmapRequest(BaseModel):
    goal: str
    level: Literal["beginner", "intermediate", "advanced"]

@router.post("/generate", response_model=List[Milestone])
async def generate_roadmap(request: RoadmapRequest):
    # Placeholder: Replace with actual AI logic
    return [
        Milestone(milestone="Start", description="Get basics", resources=[Resource(title="Intro", url="https://example.com")]),
        Milestone(milestone="Next", description="Go deeper", resources=[Resource(title="Advanced", url="https://example.com/adv")]),
    ]