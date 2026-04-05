def detect_health_risk(transactions):

    keywords = ["hospital", "clinic", "pharmacy"]

    count = 0

    for t in transactions:
        desc = t["description"].lower()

        if any(k in desc for k in keywords):
            count += 1

    return count