def simulate_savings(summary, goal_amount=1000):

    monthly = summary.get("monthly_savings", 0)

    if monthly == 0:
        return {"months_needed": 0}

    months = goal_amount / monthly

    return {"months_needed": round(months, 1)}