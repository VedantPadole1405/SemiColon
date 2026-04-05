from google import genai
import os

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))


# 🔥 SMART FALLBACK ENGINE
def fallback_response(prompt: str, user_type="student"):
    prompt_lower = prompt.lower()

    # 🔥 POLICY / INSURANCE QUESTIONS (UPDATED ✅)
    if any(word in prompt_lower for word in ["policy", "policies", "insurance"]):
        return {
            "insights": "Based on your financial profile, you should consider Life Insurance, Health Insurance, and Disability Insurance.",
            "tips": [
                "Life Insurance ensures your dependents are financially secure",
                "Health Insurance protects you from unexpected medical expenses",
                "Disability Insurance provides income if you are unable to work"
            ],
            "strategy": "Start with Life, Health, and Disability coverage to fully protect your financial stability.",
            "recommendations": [
                {
                    "name": "Life Insurance",
                    "reason": "Stable income detected",
                    "priority": "high"
                },
                {
                    "name": "Health Insurance",
                    "reason": "Essential financial protection",
                    "priority": "high"
                },
                {
                    "name": "Disability Insurance",
                    "reason": "Income protection",
                    "priority": "high"
                }
            ]
        }

    # 🔥 SAVING / GOAL QUESTIONS
    elif "save" in prompt_lower or "goal" in prompt_lower:
        return {
            "insights": "You are overspending on non-essential categories like shopping and subscriptions.",
            "tips": [
                "Reduce discretionary spending (Amazon/Walmart)",
                "Cancel unused subscriptions",
                "Set a fixed monthly savings target"
            ],
            "strategy": "Save consistently to accelerate goal achievement.",
            "monthly_savings": "$150–200/month" if user_type == "student" else "$400–600/month"
        }

    # 🔥 RISK QUESTIONS
    elif "risk" in prompt_lower or "danger" in prompt_lower:
        return {
            "insights": "You may be financially exposed due to lack of protection or savings buffer.",
            "tips": [
                "Build an emergency fund",
                "Consider health and life insurance",
                "Avoid overspending on lifestyle expenses"
            ],
            "strategy": "Reduce risk by balancing protection and savings.",
            "monthly_savings": "$200–300/month"
        }

    # 🔥 DEFAULT (STUDENT vs PROFESSIONAL)
    if user_type == "student":
        return {
            "insights": "You are spending heavily on shopping and subscriptions.",
            "tips": [
                "Reduce Amazon/Walmart shopping",
                "Cancel Netflix/Spotify if unused",
                "Use student discounts"
            ],
            "strategy": "Save $150–200/month to reach your goal faster.",
            "monthly_savings": "$150–200/month"
        }

    else:
        return {
            "insights": "A large portion of your income is going into lifestyle expenses.",
            "tips": [
                "Optimize subscriptions and recurring payments",
                "Track discretionary spending",
                "Invest surplus instead of idle spending"
            ],
            "strategy": "Reallocate 20% income towards savings/investments.",
            "monthly_savings": "$400–600/month"
        }


# 🔥 MAIN AI FUNCTION
def generate_response(prompt: str, user_type="student"):
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"""
You are a financial AI assistant.

User type: {user_type}

Respond ONLY in this JSON format:
{{
  "insights": "...",
  "tips": ["...", "..."],
  "strategy": "...",
  "monthly_savings": "...",
  "recommendations": []
}}

User question: {prompt}
"""
        )

        # 🔥 SAFE PARSE
        if response and hasattr(response, "text") and response.text:
            return {
                "source": "gemini",
                "data": {
                    "insights": response.text,
                    "tips": [],
                    "strategy": "",
                    "monthly_savings": "",
                    "recommendations": []
                }
            }

        # 🔥 IF EMPTY RESPONSE
        return {
            "source": "fallback",
            "data": fallback_response(prompt, user_type)
        }

    except Exception as e:
        print("Gemini failed → using fallback:", e)

        return {
            "source": "fallback",
            "data": fallback_response(prompt, user_type)
        }