from transformers import pipeline
from functools import lru_cache

@lru_cache(maxsize=1)
def get_qa():
    return pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

def answer_question(context: str, question: str) -> str:
    qa = get_qa()
    result = qa(question=question, context=context)
    return result['answer']