from services.gemini_service import ask_gemini

def generate_insights(transactions, summary, user_type):

    prompt = f"""
    You are a financial assistant.

    User Type: {user_type}

    Summary:
    {summary}

    Analyze spending patterns and give:
    - Key insights
    - Spending problems
    - Suggestions

    Keep it simple and actionable.
    """

    return ask_gemini(prompt)