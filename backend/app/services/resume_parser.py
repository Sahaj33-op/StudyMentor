import tempfile
from pyresparser import ResumeParser
import os
from typing import Tuple, List

def analyze_resume(filename: str, content: bytes) -> Tuple[str, List[dict]]:
    # Save to temp file
    ext = os.path.splitext(filename)[-1].lower()
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        tmp.write(content)
        tmp.flush()
        data = ResumeParser(tmp.name).get_extracted_data()
    os.unlink(tmp.name)
    feedback = f"Education: {data.get('education')}\nSkills: {data.get('skills')}\nExperience: {data.get('experience')}"
    # Dummy role suggestion
    suggested_roles = [
        {"title": "Data Scientist", "company": "OpenAI", "link": "https://openai.com/careers"},
        {"title": "ML Engineer", "company": "Google", "link": "https://careers.google.com"}
    ]
    return feedback, suggested_roles