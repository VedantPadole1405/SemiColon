import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def ask_gemini(prompt: str):
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",  # ✅ CURRENT WORKING MODEL
            contents=prompt,
        )
        return response.text
    except Exception as e:
        return f"Gemini error: {str(e)}"