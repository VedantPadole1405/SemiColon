from fastapi import APIRouter
from services.learning_service import generate_learning_content
from services.voice_service import text_to_speech
from fastapi.responses import Response

router = APIRouter()

@router.post("/learn")
async def learn(topic: str, user_type: str):

    content = generate_learning_content(topic, user_type)

    audio = text_to_speech(content)

    return Response(content=audio, media_type="audio/mpeg")