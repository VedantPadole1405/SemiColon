import requests
import os

ELEVEN_API_KEY = os.getenv("ELEVEN_API_KEY")

VOICE_ID = "21m00Tcm4TlvDq8ikWAM"  # default voice (Rachel)

def text_to_speech(text: str):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"

    headers = {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json"
    }

    data = {
        "text": text,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.7
        }
    }

    response = requests.post(url, json=data, headers=headers)

    return response.content  # returns audio bytes