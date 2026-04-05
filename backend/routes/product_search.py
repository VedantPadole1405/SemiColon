from fastapi import APIRouter, Query
import requests
import os
import re

router = APIRouter()

SERP_API_KEY = os.getenv("9eb042df4e5f6dc7ccc4fd9fd4404c8d264529d0a9d193f42444160dbbb73105")


def extract_price(price_str):
    """
    Extract numeric price from strings like:
    '$999', 'From $799', '$1,299.99'
    """
    if not price_str:
        return None

    match = re.search(r"\d+(?:,\d{3})*(?:\.\d+)?", price_str)
    if match:
        return float(match.group().replace(",", ""))
    return None


@router.get("/search-products")
def search_products(q: str = Query(...)):
    url = "https://serpapi.com/search"

    params = {
        "engine": "google_shopping",
        "q": q,
        "api_key": SERP_API_KEY,
        "hl": "en",
        "gl": "us"
    }

    response = requests.get(url, params=params)
    data = response.json()

    results = []

    for item in data.get("shopping_results", [])[:8]:
        raw_price = item.get("price")

        clean_price = extract_price(raw_price)

        # ❌ Skip items with no valid price
        if clean_price is None:
            continue

        results.append({
            "title": item.get("title"),
            "price": clean_price,  # ✅ CLEAN FLOAT
            "link": item.get("link"),
            "thumbnail": item.get("thumbnail")
        })

    return {"products": results}