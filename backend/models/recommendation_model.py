from pydantic import BaseModel
from typing import List, Optional

class Product(BaseModel):
    name: str
    premium: Optional[float] = None


class Recommendation(BaseModel):
    type: str
    priority: str
    score: float
    reason: str
    products: Optional[List[Product]] = []