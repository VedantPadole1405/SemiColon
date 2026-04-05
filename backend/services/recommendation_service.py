from services.recommendation_engine import generate_insurance_needs
from services.product_service import get_products


def get_full_recommendations(summary, user_type):
    needs = generate_insurance_needs(summary, user_type)

    final = []

    for need in needs:
        products = get_products(need["type"])

        final.append({
            **need,
            "products": products
        })

    return final