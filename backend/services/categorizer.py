def categorize(description: str, txn_type: str) -> str:
    text = description.lower().strip()

    # 🔥 EXPENSE CATEGORIES
    grocery_keywords = ["walmart", "costco", "target", "aldi"]
    food_keywords = ["ubereats", "doordash", "mcdonald", "starbucks"]
    subscription_keywords = ["spotify", "netflix", "amazon prime", "hulu"]
    transport_keywords = ["uber", "lyft", "taxi", "metro"]

    # 🔥 INCOME / TRANSFER CATEGORIES
    salary_keywords = ["salary", "payroll", "company", "wages"]
    friend_keywords = ["from", "transfer from", "received", "friend"]
    refund_keywords = ["refund", "cashback", "reversal"]

    # 🔥 EXPENSE LOGIC
    if txn_type == "expense":
        if any(k in text for k in grocery_keywords):
            return "groceries"

        if any(k in text for k in food_keywords):
            return "food"

        if any(k in text for k in subscription_keywords):
            return "subscriptions"

        if any(k in text for k in transport_keywords):
            return "transport"

        return "others"

    # 🔥 INCOME LOGIC
    if txn_type == "income":
        if any(k in text for k in salary_keywords):
            return "salary"

        if any(k in text for k in friend_keywords):
            return "friends_transfer"

        if any(k in text for k in refund_keywords):
            return "refund"

        return "income"

    return "others"