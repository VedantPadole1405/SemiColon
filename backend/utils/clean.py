# ✅ Clean transaction description
def clean_description(desc: str):
    return desc.lower().strip()


# ✅ Remove unwanted transactions (refunds, transfers)
def clean_transactions(transactions):

    ignore_keywords = ["refund", "transfer"]

    filtered = []

    for t in transactions:
        desc = t["description"].lower()

        if any(k in desc for k in ignore_keywords):
            continue

        filtered.append(t)

    return filtered