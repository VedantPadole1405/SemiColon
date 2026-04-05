from fastapi import APIRouter
from services.chat_service import chat_with_cfo

router = APIRouter()

@router.post("/chat")
async def chat(query: str):

    # temp placeholders
    summary = {}
    recommendations = {}
    user_type = "student"

    response = chat_with_cfo(query, summary, recommendations, user_type)

    return {"response": response}