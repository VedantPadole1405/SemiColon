import pdfplumber
import re

from services.categorizer import categorize
from utils.clean import clean_description


async def parse_bank_statement(file):
    content = await file.read()

    with open("temp.pdf", "wb") as f:
        f.write(content)

    results = []

    with pdfplumber.open("temp.pdf") as pdf:
        for page in pdf.pages:
            text = page.extract_text()

            print("PDF TEXT:\n", text)

            if not text:
                continue

            lines = text.split("\n")

            for line in lines:
                match = re.search(
                    r"(\d{2}/\d{2}/\d{4})\s+(.+?)\s+([+-]?\d+\.\d{2})",
                    line
                )

                if match:
                    date = match.group(1)
                    desc = match.group(2)
                    amount_str = match.group(3)

                    amount = float(amount_str)

                    txn_type = "income" if amount > 0 else "expense"

                    clean_desc = clean_description(desc)

                    results.append({
                        "date": date,
                        "description": clean_desc,
                        "amount": abs(amount),
                        "type": txn_type,
                        "category": categorize(clean_desc, txn_type)
                    })

    return results