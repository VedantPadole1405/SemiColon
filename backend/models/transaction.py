from pydantic import BaseModel
from typing import Optional


class Transaction(BaseModel):
    date: Optional[str] = None
    description: str
    amount: float
    category: str