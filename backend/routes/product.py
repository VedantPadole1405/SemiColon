from fastapi import APIRouter, UploadFile, File
from services.product_service import detect_product, summarize_deals

router = APIRouter()

@router.post("/product")
async def product(file: UploadFile = File(...)):

    image = await file.read()

    product = detect_product(image)

    deals = []

    insights = summarize_deals(product, deals)

    return {
        "product": product,
        "insights": insights
    }