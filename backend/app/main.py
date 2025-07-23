from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import notes, roadmap, qa, resume

app = FastAPI(title="StudyMentor AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notes.router, prefix="/api/notes", tags=["Notes"])
app.include_router(roadmap.router, prefix="/api/roadmap", tags=["Roadmap"])
app.include_router(qa.router, prefix="/api/qa", tags=["Q&A"])
app.include_router(resume.router, prefix="/api/resume", tags=["Resume"])