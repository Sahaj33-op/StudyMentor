from transformers import pipeline
from functools import lru_cache

@lru_cache(maxsize=1)
def get_qg():
    return pipeline("text2text-generation", model="valhalla/t5-base-qg-hl")

def generate_questions(text: str):
    qg = get_qg()
    # Placeholder: In practice, split text and generate Qs per chunk
    result = qg(f"generate questions: {text}")
    # Return dummy format for now
    return [{"question": "What is StudyMentor AI?", "options": ["A tool", "A car", "A fruit"], "answerIndex": 0}]