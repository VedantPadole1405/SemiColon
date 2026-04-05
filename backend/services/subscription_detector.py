def detect_subscriptions(transactions):
    subs = {}

    for t in transactions:
        name = t["description"].lower()

        if name not in subs:
            subs[name] = []

        subs[name].append(t["amount"])

    result = []

    for name, amounts in subs.items():
        if len(amounts) >= 2:
            result.append({
                "merchant": name,
                "avg_amount": sum(amounts)/len(amounts),
                "count": len(amounts)
            })

    return result