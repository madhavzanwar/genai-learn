from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import os

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class HintRequest(BaseModel):
    question: str
    correct_answer: str
    student_answer: str


class ExplainRequest(BaseModel):
    concept: str


class HintBatchRequest(BaseModel):
    wrong_answers: list[dict]


@app.get("/")
def root():
    return {"status": "GenAI Learn AI Service running"}


@app.post("/hint")
async def get_hint(req: HintRequest):
    prompt = f"""
You are a friendly AI tutor for a beginner-level AI/ML course.

A student answered a quiz question incorrectly.

Question: {req.question}
Student's answer: {req.student_answer}
Correct answer: {req.correct_answer}

Give a short, simple explanation (2-3 sentences max) of why the correct answer is right.
Use simple language — explain as if to a complete beginner.
Do not use bullet points. Just plain conversational text.
"""
    response = model.generate_content(prompt)
    return {"hint": response.text.strip()}


@app.post("/hints/batch")
async def get_hints_batch(req: HintBatchRequest):
    hints = []
    for item in req.wrong_answers:
        prompt = f"""
You are a friendly AI tutor teaching a beginner AI/ML course.

Question: {item['question']}
Student answered: {item['student_answer']}
Correct answer: {item['correct_answer']}

In 2 sentences max, explain why the correct answer is right. Use very simple language.
"""
        response = model.generate_content(prompt)
        hints.append({
            "question": item["question"],
            "hint": response.text.strip()
        })
    return {"hints": hints}


@app.post("/explain")
async def explain_concept(req: ExplainRequest):
    prompt = f"""
You are a friendly AI tutor teaching a beginner AI/ML course called GenAI Learn.

A student wants to understand: "{req.concept}"

Explain this in 3-4 simple sentences. Avoid jargon. Use a real-life analogy if possible.
End with one sentence on why this concept matters.
"""
    response = model.generate_content(prompt)
    return {"explanation": response.text.strip()}
