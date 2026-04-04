from fastapi import APIRouter, UploadFile, File, HTTPException
from services.parser import parse_bank_statement
from services.aggregator import aggregate_transactions
from services.goal_planner import plan_goal
from services.insights import generate_insights

router = APIRouter()


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    transactions = await parse_bank_statement(file)

    summary = aggregate_transactions(transactions)

    # 🔥 ADD THIS
    insights = generate_insights(transactions, summary)

    goal = plan_goal(transactions, summary)

    return {
        "success": True,
        "count": len(transactions),
        "transactions": transactions,
        "summary": summary,
        "insights": insights,   # ✅ now defined
        "goal_plan": goal
    }