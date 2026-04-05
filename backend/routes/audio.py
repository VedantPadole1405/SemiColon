from fastapi import APIRouter
from fastapi.responses import Response
from services.elevenlabs_client import text_to_speech

router = APIRouter()

@router.post("/speak")
def speak(payload: dict):
    text = payload.get("text", "")

    audio = text_to_speech(text)

    return Response(content=audio, media_type="audio/mpeg")