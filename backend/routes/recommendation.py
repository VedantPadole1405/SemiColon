from fastapi import APIRouter
from services.recommendation_service import get_full_recommendations

router = APIRouter()


@router.post("/recommend")
async def recommend(data: dict):

    summary = data.get("summary", {})
    user_type = data.get("user_type", "professional")

    recommendations = get_full_recommendations(summary, user_type)

    return {
        "recommendations": recommendations
    }