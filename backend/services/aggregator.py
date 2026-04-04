def aggregate_transactions(transactions):
    category_totals = {}
    total_spent = 0
    total_income = 0

    for txn in transactions:
        category = txn["category"]
        amount = txn["amount"]
        txn_type = txn.get("type", "expense")

        if txn_type == "income":
            total_income += amount
        else:
            total_spent += amount

            if category not in category_totals:
                category_totals[category] = 0

            category_totals[category] += amount

    return {
        "total_income": round(total_income, 2),
        "total_spent": round(total_spent, 2),
        "net_balance": round(total_income - total_spent, 2),
        "category_breakdown": category_totals
    }