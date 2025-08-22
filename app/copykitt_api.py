import os
from fastapi import FastAPI, HTTPException
from mangum import Mangum
from dotenv import load_dotenv
import openai
from copykitt import generate_branding_snippet, generate_keywords
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env (for local development)
load_dotenv()

# Configure OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize FastAPI and Lambda handler
app = FastAPI()
handler = Mangum(app)

# to add the CORS policy
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Maximum allowed prompt length
MAX_INPUT_LENGTH = 32

def validate_input_length(prompt: str):
    if len(prompt) > MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters"
        )

@app.get("/")
async def read_root():
    return {"message": "Hello Aaditt!"}

@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    return {"snippet": snippet, "keywords": []}

@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": None, "keywords": keywords}

@app.get("/generate_snippet_and_keywords")
async def generate_snippet_and_keywords_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": snippet, "keywords": keywords}
