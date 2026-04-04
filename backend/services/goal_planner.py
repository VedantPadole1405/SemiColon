def plan_goal(transactions, summary, goal_amount=1000):
    category_data = summary["category_breakdown"]

    # 🔥 STEP 1: calculate usable income
    usable_income = 0

    for txn in transactions:
        if txn["type"] == "income" and txn["category"] == "salary":
            usable_income += txn["amount"]

    # 🔥 STEP 2: calculate expenses
    total_spent = summary["total_spent"]

    # 🔥 STEP 3: current savings potential
    monthly_savings = usable_income - total_spent

    # 🔥 STEP 4: identify cut opportunities
    suggestions = []

    if "subscriptions" in category_data:
        suggestions.append("Consider cancelling unused subscriptions.")

    if "food" in category_data and category_data["food"] > 50:
        suggestions.append("Reducing food delivery can save money.")

    if "groceries" in category_data and category_data["groceries"] > 100:
        suggestions.append("Use grocery deals to reduce spending.")

    # 🔥 STEP 5: apply estimated savings boost
    potential_savings = monthly_savings

    if "subscriptions" in category_data:
        potential_savings += category_data["subscriptions"]

    if "food" in category_data:
        potential_savings += category_data["food"] * 0.3  # assume 30% cut possible

    # 🔥 STEP 6: calculate months needed
    if potential_savings <= 0:
        months_needed = "Not feasible with current spending"
    else:
        months_needed = round(goal_amount / potential_savings, 1)

    return {
        "goal": goal_amount,
        "usable_income": usable_income,
        "monthly_spent": total_spent,
        "current_savings": monthly_savings,
        "potential_savings": round(potential_savings, 2),
        "months_to_goal": months_needed,
        "suggestions": suggestions
    }