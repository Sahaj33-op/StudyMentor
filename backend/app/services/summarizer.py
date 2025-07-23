from transformers import pipeline
from functools import lru_cache

@lru_cache(maxsize=1)
def get_summarizer():
    return pipeline("summarization", model="facebook/bart-large-cnn")

def summarize(text: str) -> str:
    summarizer = get_summarizer()
    summary = summarizer(text, max_length=150, min_length=40, do_sample=False)
    return summary[0]['summary_text']