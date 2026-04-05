from services.gemini_client import generate_response


def professional_advice(question, summary, subscriptions, transactions):
    prompt = f"""
User Type: Professional

Question: {question}

Summary: {summary}
Subscriptions: {subscriptions}
Transactions: {transactions}

Give:
- Financial insights
- Expense optimization
- Investment suggestions
- Monthly savings estimate
"""

    return generate_response(prompt, "professional")