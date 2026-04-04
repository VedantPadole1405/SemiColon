def generate_insights(transactions, summary):
    category_data = summary["category_breakdown"]

    # 🔥 Pie chart data
    labels = []
    values = []

    for category, amount in category_data.items():
        labels.append(category)
        values.append(round(amount, 2))

    # 🔥 Extra insights (optional)
    messages = []

    if "subscriptions" in category_data:
        messages.append("You are spending on subscriptions. Consider reviewing them.")

    if "food" in category_data and category_data["food"] > 50:
        messages.append("Frequent food spending detected. Cooking can save money.")

    return {
        "chart": {
            "labels": labels,
            "values": values
        },
        "messages": messages
    }