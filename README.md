# StudyMentor AI

All-in-one AI-powered learning companion: note summarization, quiz generation, personalized learning roadmaps, context-aware Q&A, and resume analysis.

---

## Features

- **Note Summarizer & Quiz Generator**: Upload notes (PDF/text), get concise summaries and quizzes.
- **AI-Curated Learning Roadmap**: Enter your goal, get a stepwise roadmap with resources.
- **Context-Aware Q&A**: Ask questions about your notes or summaries.
- **Resume Analyzer**: Upload your resume for AI feedback and career suggestions.

---

## Architecture

```
+-------------------+         REST API         +-------------------+
|   React + Vite    | <---------------------> |     FastAPI       |
|   Tailwind UI     |                         |  HuggingFace AI   |
|   (frontend)      |                         |  Resume Parser    |
+-------------------+                         +-------------------+
        |                                              |
        |<---------- Tauri (optional) ---------------->|
```

---

## Setup & Usage

### 1. Backend (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2. Frontend (React + Vite + Tailwind)

```bash
cd frontend
npm install
npm run dev
```

- The frontend runs on `localhost:5173` (default Vite port).
- The backend runs on `localhost:8000`.
- Make sure CORS is enabled (already set in backend).

### 3. (Optional) Tauri Desktop App

- See [https://tauri.app/](https://tauri.app/) for wrapping the frontend as a desktop app.

---

## Endpoints

- `POST /api/notes/process` — PDF/text upload → { summary, questions[] }
- `POST /api/roadmap/generate` — { goal, level } → [ { milestone, description, resources[] } ]
- `POST /api/qa/query` — { context, question } → { answer }
- `POST /api/resume/analyze` — Resume upload → { feedback, suggestedRoles[] }

---

## Demo

![Demo GIF](demo.gif)

---

## Environment

See `.env.example` for any API keys (not required for local models).

---

## License

MIT
