# 🔥 STATE FARM PRODUCT MAPPING

PRODUCTS = {
    "auto_insurance": [
        {"name": "State Farm Auto Basic", "premium": 120},
        {"name": "State Farm Auto Premium", "premium": 180}
    ],
    "renters_insurance": [
        {"name": "State Farm Renters Basic", "premium": 25},
        {"name": "State Farm Renters Plus", "premium": 40}
    ],
    "life_insurance": [
        {"name": "State Farm Life Protect", "premium": 60}
    ],
    "travel_insurance": [
        {"name": "State Farm Travel Cover", "premium": 30}
    ]
}


# ✅ MAIN FUNCTION (THIS FIXES YOUR ERROR)
def get_products(insurance_type: str):
    return PRODUCTS.get(insurance_type, [])


# 🔥 BACKWARD COMPATIBILITY (old routes won’t break)

def detect_product(data):
    return {
        "message": "Legacy product detection",
        "data": data
    }


def summarize_deals(products):
    return {
        "summary": f"{len(products)} products available",
        "products": products
    }