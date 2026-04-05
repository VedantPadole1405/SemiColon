from utils.constants import INSURANCE_MAPPING

def get_priority(score: float):
    if score > 0.3:
        return "high"
    elif score > 0.15:
        return "medium"
    return "low"
# 🔥 BACKWARD COMPATIBILITY (FIXES IMPORT ERROR)

def generate_recommendations(subscriptions, summary, user_type):
    return generate_insurance_needs(summary, user_type)

def generate_insurance_needs(summary, user_type):
    recommendations = []

    total_spent = summary.get("total_spent", 0)
    categories = summary.get("category_breakdown", {})

    if total_spent == 0:
        return recommendations

    # 🔥 CATEGORY-BASED RECOMMENDATIONS
    for category, amount in categories.items():
        if category not in INSURANCE_MAPPING:
            continue

        config = INSURANCE_MAPPING[category]
        percentage = amount / total_spent

        score = percentage * config["weight"]

        recommendations.append({
            "type": config["type"],
            "name": config["name"],
            "priority": get_priority(score),
            "score": round(score, 2),
            "reason": f"Based on your spending in {category}"
        })

    # 🔥 ALWAYS ADD CORE POLICIES
    base_policies = [
        {
            "type": "life_insurance",
            "name": "Life Insurance",
            "score": 0.9,
            "reason": "Stable income detected"
        },
        {
            "type": "health_insurance",
            "name": "Health Insurance",
            "score": 0.8,
            "reason": "Essential financial protection"
        },
        {
            "type": "disability_insurance",
            "name": "Disability Insurance",
            "score": 0.7,
            "reason": "Income protection"
        }
    ]

    for policy in base_policies:
        policy["priority"] = get_priority(policy["score"])
        recommendations.append(policy)

    # 🔥 SORT + LIMIT TO TOP 5
    recommendations = sorted(
        recommendations,
        key=lambda x: x["score"],
        reverse=True
    )

    return recommendations[:5]