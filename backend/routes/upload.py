from fastapi import APIRouter, UploadFile, File, Header

from services.parser import parse_bank_statement
from services.aggregator import aggregate_transactions
from services.insights import generate_insights
from services.goal_planner import plan_goal

# NEW IMPORTS
from services.subscription_detector import detect_subscriptions
from services.recommendation_engine import generate_recommendations
from services.savings_simulator import simulate_savings
from services.risk_detector import detect_health_risk
from utils.clean import clean_transactions

router = APIRouter()


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...), user_type: str = Header(...)):

    transactions = await parse_bank_statement(file)

    transactions = clean_transactions(transactions)

    summary = aggregate_transactions(transactions)

    subscriptions = detect_subscriptions(transactions)

    insights = generate_insights(transactions, summary, user_type)

    recommendations = generate_recommendations(subscriptions, summary, user_type)

    goal = plan_goal(transactions, summary)

    simulation = simulate_savings(summary)

    health_risk = detect_health_risk(transactions)

    return {
        "transactions": transactions,
        "summary": summary,
        "subscriptions": subscriptions,
        "insights": insights,
        "recommendations": recommendations,
        "goal": goal,
        "simulation": simulation,
        "health_risk": health_risk
    }