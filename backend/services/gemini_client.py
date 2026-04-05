import google.generativeai as genai
import os

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))


# 🔥 SMART FALLBACK ENGINE (HARDCODED DEMO INTELLIGENCE)
def fallback_response(prompt: str, user_type="student"):
    prompt_lower = prompt.lower()

    # 🔥 SUBSCRIPTION OPTIMIZATION
    if any(word in prompt_lower for word in ["subscription", "cancel", "subscriptions"]):
        return {
            "insights": "You currently have an active Spotify subscription which can be optimized.",
            "tips": [
                "Cancel Spotify if you are not using it frequently",
                "Switch to YouTube Music which offers similar features at a lower price",
                "Review all subscriptions monthly to avoid unnecessary charges"
            ],
            "strategy": "Optimizing subscriptions can reduce recurring expenses significantly.",
            "monthly_savings": "$2–9.99/month",
            "recommendations": [
                {
                    "name": "Cancel Spotify",
                    "reason": "Replace with cheaper alternative",
                    "priority": "high"
                },
                {
                    "name": "YouTube Music",
                    "reason": "More affordable music streaming",
                    "priority": "medium"
                }
            ]
        }

    # 🔥 DEALS / DISCOUNTS ENGINE
    elif any(word in prompt_lower for word in ["deal", "offers", "discount", "coupon"]):
        return {
            "insights": "You frequently shop at Walmart, which provides recurring discounts and deals.",
            "tips": [
                "Walmart runs major sales every Friday",
                "Use cashback platforms like Rakuten for additional savings",
                "Stack coupons + cashback to maximize discounts"
            ],
            "strategy": "Leverage recurring sales and cashback platforms to reduce spending.",
            "monthly_savings": "$20–50/month",
            "recommendations": [
                {
                    "name": "Rakuten Cashback",
                    "reason": "Earn cashback on Walmart purchases",
                    "priority": "high",
                    "link": "https://www.rakuten.com/"
                }
            ]
        }

    # 🔥 INSURANCE / POLICY QUESTIONS
    elif any(word in prompt_lower for word in ["policy", "policies", "insurance"]):
        return {
            "insights": "Based on your financial profile, you should consider Life, Health, and Disability Insurance.",
            "tips": [
                "Life Insurance ensures financial security for dependents",
                "Health Insurance covers unexpected medical costs",
                "Disability Insurance protects your income"
            ],
            "strategy": "Start with essential coverage to reduce long-term financial risk.",
            "recommendations": [
                {"name": "Life Insurance", "priority": "high"},
                {"name": "Health Insurance", "priority": "high"},
                {"name": "Disability Insurance", "priority": "high"}
            ]
        }

    # 🔥 SAVINGS / GOALS
    elif "save" in prompt_lower or "goal" in prompt_lower:
        return {
            "insights": "You are overspending on shopping and subscriptions.",
            "tips": [
                "Reduce Amazon/Walmart spending",
                "Cancel unused subscriptions",
                "Set a monthly savings goal"
            ],
            "strategy": "Consistent savings will accelerate your financial goals.",
            "monthly_savings": "$150–200/month" if user_type == "student" else "$400–600/month"
        }

    # 🔥 RISK DETECTION
    elif "risk" in prompt_lower or "danger" in prompt_lower:
        return {
            "insights": "You may be financially exposed due to lack of safety buffers.",
            "tips": [
                "Build an emergency fund",
                "Get basic insurance coverage",
                "Reduce lifestyle overspending"
            ],
            "strategy": "Balance savings and protection to reduce financial risk.",
            "monthly_savings": "$200–300/month"
        }

    # 🔥 DEFAULT RESPONSES
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
                "Optimize subscriptions",
                "Track discretionary spending",
                "Invest surplus money"
            ],
            "strategy": "Reallocate 20% of income towards savings.",
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

        # 🔥 SAFE PARSE (Gemini output is raw text)
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

        # 🔥 FALLBACK
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
