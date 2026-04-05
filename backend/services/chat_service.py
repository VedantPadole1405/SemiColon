from services.gemini_service import ask_gemini

def chat_with_cfo(query, summary, recommendations, user_type):

    prompt = f"""
    You are a smart AI financial advisor.

    User Type: {user_type}

    Summary:
    {summary}

    Recommendations:
    {recommendations}

    Answer clearly and simply.

    Question:
    {query}
    """

    return ask_gemini(prompt)