from fastapi import APIRouter
from pydantic import BaseModel
from services.student_advisor import student_advice
from services.professional_advisor import professional_advice

router = APIRouter()

from typing import Optional

class AskAIRequest(BaseModel):
    question: str
    user_type: str
    summary: Optional[dict] = {}
    transactions: Optional[list] = []
    subscriptions: Optional[list] = []

@router.post("/ask-ai")
def ask_ai(req: AskAIRequest):

    if req.user_type == "student":
        result = student_advice(
            req.question, req.summary, req.subscriptions, req.transactions
        )
    else:
        result = professional_advice(
            req.question, req.summary, req.subscriptions, req.transactions
        )

    return result