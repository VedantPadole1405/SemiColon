from services.gemini_client import generate_response


def student_advice(question, summary, subscriptions, transactions):
    prompt = f"""
User Type: Student

Question: {question}

Summary: {summary}
Subscriptions: {subscriptions}
Transactions: {transactions}

Give:
- Insights
- Savings tips
- Mention shopping platforms like Amazon/Walmart if relevant
- Monthly savings estimate
"""

    return generate_response(prompt, "student")